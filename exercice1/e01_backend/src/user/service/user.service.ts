import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from '../model/user.interface';

import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { AuthService } from '../../auth/services/auth.service';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Like } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  create(user: User): Observable<User> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.password = passwordHash;

        // SOLO para testing mode
        if (process.env.CONTROL === 'prod' || process.env.CONTROL === 'dev') {
          newUser.role = UserRole.USER;
        } else {
          if (user.email === 'admin@admin.com') newUser.role = UserRole.ADMIN;
        }
        // SOLO para testing mode

        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            const { password, ...result } = user;
            return result;
          }),
          catchError((err) => throwError(() => err)),
        );
      }),
    );
    // return from(this.userRepository.save(user));
  }

  findOne(id: number): Observable<User> {
    // findOne({ where: { id: id } }));  también sería válido
    return from(this.userRepository.findOneBy({ id })).pipe(
      map((user: User) => {
        if (user) {
          const { password, ...result } = user;
          return result;
        } else {
          return null; // enviar un mensaje de no existe y por supuesto status code no puede ser 200
        }
      }),
    );
  }

  // TODO  crear un método para encontrar a un usuario por su email, ya que puede que no sepamos su id. findOneByEmail()
  findOneByEmail(user: User): Observable<User> {
    return from(this.userRepository.findOne({ where: { email: user.email } }));
    // borrale el password antes de entregarlo y si no se encuentra mensaje y status code 204
  }

  emailExist(user: User): Observable<boolean> {
    return from(
      this.userRepository
        .findOne({
          where: {
            email: Like(`%${user.email}%`),
          },
        })
        .then((resp) => {
          if (resp !== null) {
            return true;
          } else {
            return false;
          }
        }),
    );
  }

  findAll(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users: User[]) => {
        users.forEach((user) => {
          delete user.password;
        });
        return users;
      }),
    );
  }

  paginate(options: IPaginationOptions): Observable<Pagination<User>> {
    return from(paginate<User>(this.userRepository, options)).pipe(
      map((usersPageable: Pagination<User>) => {
        usersPageable.items.forEach((user) => {
          delete user.password;
        });
        return usersPageable;
      }),
    );
  }

  paginateFilterByName(
    options: IPaginationOptions,
    user: User,
  ): Observable<Pagination<User>> {
    return from(
      this.userRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 10,
        order: { id: 'ASC' },
        select: ['id', 'name', 'email', 'role'],
        where: [
          {
            name: Like(`%${user.name}%`),
          },
        ],
      }),
    ).pipe(
      map(([users, totalUsers]) => {
        const usersPageable: Pagination<User> = {
          items: users,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + '',
            next:
              options.route +
              `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last:
              options.route +
              `?limit=${options.limit}&page=${Math.ceil(
                totalUsers / Number(options.page),
              )}`,
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: users.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalUsers,
            totalPages: Math.ceil(totalUsers / Number(options.limit)),
          },
        };

        return usersPageable;
      }),
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  updateOne(id: number, user: User): Observable<any> {
    delete user.email;
    delete user.password;
    delete user.role;

    return from(this.userRepository.update(Number(id), user)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }

  updateRoleOfUser(id: number, user: User): Observable<any> {
    delete user.email;
    delete user.password;
    delete user.name;

    return from(this.userRepository.update(id, user));
  }

  login(user: User): Observable<string> {
    console.log('#### User: ', user);
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.authService
            .generateJWT(user)
            .pipe(map((jwt: string) => jwt));
        } else {
          return 'Wrong Credentials';
        }
      }),
    );
  }

  private validateUser(email: string, password: string): Observable<User> {
    console.log('#### PASSWORD: ', password);
    return from(
      this.findByEmail(email).pipe(
        switchMap((user: User) => {
          // TODO if (user) { .... } // porque puede ser que no exista y estamos comparando passwords que  no hay en BD
          console.log('#### User BD: ', user);
          console.log('#### Passwords: ', password, user.password);
          return this.authService
            .comparePasswords(password, user.password)
            .pipe(
              map((match: boolean) => {
                if (match) {
                  const { password, ...result } = user;
                  return result;
                } else {
                  throw Error;
                }
              }),
            );
        }),
      ),
    );
  }

  private findByEmail(email: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        select: ['id', 'name', 'email', 'role', 'profileImage', 'password'],
        where: { email: email },
      }),
    );
  }
}

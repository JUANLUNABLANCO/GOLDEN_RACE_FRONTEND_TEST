import { UserEntity } from '../model/user.entity';
import { Repository } from 'typeorm';
import { User } from '../model/user.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    create(user: User): Observable<User>;
    findOne(id: number): Observable<User>;
    findOneByEmail(user: User): Observable<User>;
    emailExist(user: User): Observable<boolean>;
    findAll(): Observable<User[]>;
    paginate(options: IPaginationOptions): Observable<Pagination<User>>;
    paginateFilterByName(options: IPaginationOptions, user: User): Observable<Pagination<User>>;
    deleteOne(id: number): Observable<any>;
    updateOne(id: number, user: User): Observable<any>;
    updateRoleOfUser(id: number, user: User): Observable<any>;
    login(user: User): Observable<string>;
    private validateUser;
    private findByEmail;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../model/user.entity");
const typeorm_2 = require("typeorm");
const user_interface_1 = require("../model/user.interface");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const auth_service_1 = require("../../auth/services/auth.service");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_3 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    create(user) {
        return this.authService.hashPassword(user.password).pipe((0, operators_1.switchMap)((passwordHash) => {
            const newUser = new user_entity_1.UserEntity();
            newUser.name = user.name;
            newUser.email = user.email;
            newUser.password = passwordHash;
            if (process.env.CONTROL === 'prod' || process.env.CONTROL === 'dev') {
                newUser.role = user_interface_1.UserRole.USER;
            }
            if (user.email == 'admin@admin.com') {
                newUser.role = user_interface_1.UserRole.ADMIN;
                console.log('#### ADMIN REGISTER ####', newUser);
            }
            return (0, rxjs_1.from)(this.userRepository.save(newUser)).pipe((0, operators_1.map)((user) => {
                const { password, ...result } = user;
                return result;
            }), (0, operators_1.catchError)((err) => (0, rxjs_1.throwError)(() => err)));
        }));
    }
    findOne(id) {
        return (0, rxjs_1.from)(this.userRepository.findOneBy({ id })).pipe((0, operators_1.map)((user) => {
            if (user) {
                const { password, ...result } = user;
                return result;
            }
            else {
                return null;
            }
        }));
    }
    findOneByEmail(user) {
        return (0, rxjs_1.from)(this.userRepository.findOne({ where: { email: user.email } }));
    }
    emailExist(user) {
        return (0, rxjs_1.from)(this.userRepository
            .findOne({
            where: {
                email: (0, typeorm_3.Like)(`%${user.email}%`),
            },
        })
            .then((resp) => {
            if (resp !== null) {
                return true;
            }
            else {
                return false;
            }
        }));
    }
    findAll() {
        return (0, rxjs_1.from)(this.userRepository.find()).pipe((0, operators_1.map)((users) => {
            users.forEach((user) => {
                delete user.password;
            });
            return users;
        }));
    }
    paginate(options) {
        return (0, rxjs_1.from)((0, nestjs_typeorm_paginate_1.paginate)(this.userRepository, options)).pipe((0, operators_1.map)((usersPageable) => {
            usersPageable.items.forEach((user) => {
                delete user.password;
            });
            return usersPageable;
        }));
    }
    paginateFilterByName(options, user) {
        return (0, rxjs_1.from)(this.userRepository.findAndCount({
            skip: Number(options.page) * Number(options.limit) || 0,
            take: Number(options.limit) || 10,
            order: { id: 'ASC' },
            select: ['id', 'name', 'email', 'role'],
            where: [
                {
                    name: (0, typeorm_3.Like)(`%${user.name}%`),
                },
            ],
        })).pipe((0, operators_1.map)(([users, totalUsers]) => {
            const usersPageable = {
                items: users,
                links: {
                    first: options.route + `?limit=${options.limit}`,
                    previous: options.route + '',
                    next: options.route +
                        `?limit=${options.limit}&page=${Number(options.page) + 1}`,
                    last: options.route +
                        `?limit=${options.limit}&page=${Math.ceil(totalUsers / Number(options.page))}`,
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
        }));
    }
    deleteOne(id) {
        return (0, rxjs_1.from)(this.userRepository.delete(id));
    }
    updateOne(id, user) {
        delete user.email;
        delete user.password;
        delete user.role;
        return (0, rxjs_1.from)(this.userRepository.update(Number(id), user)).pipe((0, operators_1.switchMap)(() => this.findOne(id)));
    }
    updateRoleOfUser(id, user) {
        delete user.email;
        delete user.password;
        delete user.name;
        return (0, rxjs_1.from)(this.userRepository.update(id, user));
    }
    login(user) {
        console.log('#### User: ', user);
        return this.validateUser(user.email, user.password).pipe((0, operators_1.switchMap)((user) => {
            if (user) {
                return this.authService
                    .generateJWT(user)
                    .pipe((0, operators_1.map)((jwt) => jwt));
            }
            else {
                return 'Wrong Credentials';
            }
        }));
    }
    validateUser(email, password) {
        console.log('#### PASSWORD: ', password);
        return (0, rxjs_1.from)(this.findByEmail(email).pipe((0, operators_1.switchMap)((user) => {
            console.log('#### User BD: ', user);
            console.log('#### Passwords: ', password, user.password);
            return this.authService
                .comparePasswords(password, user.password)
                .pipe((0, operators_1.map)((match) => {
                if (match) {
                    const { password, ...result } = user;
                    return result;
                }
                else {
                    throw Error;
                }
            }));
        })));
    }
    findByEmail(email) {
        return (0, rxjs_1.from)(this.userRepository.findOne({
            select: ['id', 'name', 'email', 'role', 'profileImage', 'password'],
            where: { email: email },
        }));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UserService);
//# sourceMappingURL=user.service.js.map
import { UserService } from '../service/user.service';
import { User, File } from '../model/user.interface';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare const storage: {
    storage: any;
};
export declare class UserController {
    private userService;
    private configService;
    constructor(userService: UserService, configService: ConfigService);
    create(user: User): Observable<User | {
        error: any;
    }>;
    login(user: User): Observable<{
        access_token: any;
    }>;
    logout(req: Request): Promise<{
        message: string;
    }>;
    findOne(params: any): Observable<User>;
    findOneByEmail(user: User): Observable<User>;
    userExist(user: User): Observable<boolean>;
    index(page: number, limit: number, name: string): Observable<Pagination<User>>;
    updateOne(id: string, user: User): Observable<any>;
    uploadFile(file: any, req: any): Observable<File>;
    findProfileImage(imagename: any, resp: any): Observable<unknown>;
    deleteOne(id: string): Observable<User>;
    updateOneRoleOfUser(id: string, user: User): Observable<any>;
}

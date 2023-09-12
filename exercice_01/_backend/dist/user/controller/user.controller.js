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
exports.UserController = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user.service");
const user_interface_1 = require("../model/user.interface");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const userIsUser_guard_1 = require("../../auth/guards/userIsUser.guard");
exports.storage = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/profileImages',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        },
    }),
};
let UserController = class UserController {
    constructor(userService, configService) {
        this.userService = userService;
        this.configService = configService;
    }
    create(user) {
        return this.userService.create(user).pipe((0, rxjs_1.map)((user) => user), (0, operators_1.catchError)((err) => (0, rxjs_1.of)({ error: err.message })));
    }
    login(user) {
        return this.userService.login(user).pipe((0, rxjs_1.map)((jwt) => {
            return { access_token: jwt };
        }));
    }
    async logout(req) {
        return { message: 'Logged out successfully' };
    }
    findOne(params) {
        return this.userService.findOne(params.id);
    }
    findOneByEmail(user) {
        return this.userService.findOneByEmail(user);
    }
    userExist(user) {
        return (0, rxjs_1.from)(this.userService.emailExist(user));
    }
    index(page = 1, limit = 10, name) {
        limit = limit > 100 ? 100 : limit;
        const route = `${process.env.API_URL}:${process.env.API_PORT}/api/users`;
        if (name === null || name === undefined) {
            return this.userService.paginate({
                page: Number(page),
                limit: Number(limit),
                route: route,
            });
        }
        else {
            return this.userService.paginateFilterByName({
                page: Number(page),
                limit: Number(limit),
                route: route,
            }, { name });
        }
    }
    updateOne(id, user) {
        return this.userService.updateOne(Number(id), user);
    }
    uploadFile(file, req) {
        const user = req.user.user;
        console.log('#### file name: ', file.filename);
        return this.userService
            .updateOne(user.id, { profileImage: file.filename })
            .pipe((0, rxjs_1.tap)((user) => console.log(user)), (0, rxjs_1.map)((user) => ({ profileImage: user.profileImage })));
    }
    findProfileImage(imagename, resp) {
        return (0, rxjs_1.of)(resp.sendFile(path.join(process.cwd(), 'uploads/profileImages/' + imagename)));
    }
    deleteOne(id) {
        return this.userService.deleteOne(Number(id));
    }
    updateOneRoleOfUser(id, user) {
        return this.userService.updateRoleOfUser(Number(id), user);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('findOneByEmail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findOneByEmail", null);
__decorate([
    (0, common_1.Post)('exist'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "userExist", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "index", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, userIsUser_guard_1.UserIsUserGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "updateOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', exports.storage)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('profile-image/:imagename'),
    __param(0, (0, common_1.Param)('imagename')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findProfileImage", null);
__decorate([
    (0, roles_decorator_1.hasRoles)(user_interface_1.UserRole.ADMIN),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "deleteOne", null);
__decorate([
    (0, roles_decorator_1.hasRoles)(user_interface_1.UserRole.ADMIN),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Put)(':id/role'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "updateOneRoleOfUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService])
], UserController);
//# sourceMappingURL=user.controller.js.map
import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Put,
  Param,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  Request,
  Response,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { UserService } from '../service/user.service';
import { User, UserRole, File } from '../model/user.interface';
import { Observable, map, of, from, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { hasRoles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ConfigService } from '@nestjs/config';

import { Pagination } from 'nestjs-typeorm-paginate';
// files
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { UserIsUserGuard } from 'src/auth/guards/userIsUser.guard';

// TODO cross-origin for angular in development mode: @CrossOrigin(origins = 'http://localhost:4200/')

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileImages', // INVESTIGAR referencia README TASK-13
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    // console.log('#### Upload: ', this.configService.get('UPLOAD_IMAGE_URL'));
  }

  @Post()
  create(@Body() user: User): Observable<User | { error: any }> {
    return this.userService.create(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message })),
    );
  }

  @Post('login')
  login(@Body() user: User): Observable<{ access_token: any }> {
    return this.userService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      }),
    );
  }

  @Get(':id')
  findOne(@Param() params): Observable<User> {
    return this.userService.findOne(params.id);
  }

  @Post('findOneByEmail')
  findOneByEmail(@Body() user: User): Observable<User> {
    return this.userService.findOneByEmail(user);
  }

  @Post('exist')
  userExist(@Body() user: User): Observable<boolean> {
    return from(this.userService.emailExist(user));
  }

  // metodos publicos de momento
  @Get()
  index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('name') name: string,
  ): Observable<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;

    const route = `${process.env.API_URL}:${process.env.API_PORT}/api/users`;

    if (name === null || name === undefined) {
      return this.userService.paginate({
        page: Number(page),
        limit: Number(limit),
        route: route,
      });
    } else {
      return this.userService.paginateFilterByName(
        {
          page: Number(page),
          limit: Number(limit),
          route: route,
        },
        { name },
      );
    }
  }

  // solo el propio usuario puede actualizarse sus datos, excepto el role que lo hará el admin
  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
    return this.userService.updateOne(Number(id), user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Request() req): Observable<File> {
    const user: User = req.user.user;

    // console.log('#### Upload: ', this.configService.get('UPLOAD_IMAGE_URL'));
    console.log('#### file name: ', file.filename);

    return this.userService
      .updateOne(user.id, { profileImage: file.filename })
      .pipe(
        tap((user: User) => console.log(user)),
        map((user: User) => ({ profileImage: user.profileImage })),
      );
  }

  @Get('profile-image/:imagename')
  findProfileImage(
    @Param('imagename') imagename,
    @Response() resp,
  ): Observable<unknown> {
    return of(
      resp.sendFile(
        path.join(process.cwd(), 'uploads/profileImages/' + imagename),
      ),
    );
  }

  // ### ADMIN METHODS
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<User> {
    return this.userService.deleteOne(Number(id));
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/role')
  updateOneRoleOfUser(
    @Param('id') id: string,
    @Body() user: User,
  ): Observable<any> {
    return this.userService.updateRoleOfUser(Number(id), user);
  }
}

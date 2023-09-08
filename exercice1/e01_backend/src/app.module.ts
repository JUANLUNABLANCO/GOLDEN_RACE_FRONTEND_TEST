import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import { BlogModule } from './blog/product.module';

// "postgres://test_cypress:test123@localhost:5432/blogTest"
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./config/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // set to false on production
    }),
    UserModule,
    AuthModule,
    // BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

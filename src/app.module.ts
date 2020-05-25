import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketModule } from './market/market.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const MONGODB_URL = process.env['MONGO_URL']

@Module({
  imports: [
    UsersModule, MarketModule, AuthModule, MongooseModule.forRoot(`${MONGODB_URL}market?retryWrites=true&w=majority`),
    MongooseModule.forRoot(`${MONGODB_URL}user?retryWrites=true&w=majority`),
    MulterModule.register({dest: 'static/MarketImages'})
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

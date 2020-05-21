import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketModule } from './market/market.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule, MarketModule, AuthModule, MongooseModule.forRoot(
    'mongodb+srv://jayanwana:Jp5cGb8nW2mTT3Ow@cluster0-fgqw7.gcp.mongodb.net/market?retryWrites=true&w=majority'),
    MongooseModule.forRoot(
    'mongodb+srv://jayanwana:Jp5cGb8nW2mTT3Ow@cluster0-fgqw7.gcp.mongodb.net/user?retryWrites=true&w=majority'),
    MulterModule.register({dest: 'static/MarketImages'})
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

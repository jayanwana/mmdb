import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketModule } from './market/market.module';

@Module({
  imports: [
    MarketModule, MongooseModule.forRoot(
    'mongodb+srv://jayanwana:Jp5cGb8nW2mTT3Ow@cluster0-fgqw7.gcp.mongodb.net/market?retryWrites=true&w=majority'
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketSchema } from './market.model'
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{name: 'Market', schema: MarketSchema }])],
  controllers: [MarketController],
  providers: [MarketService]
})
export class MarketModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketSchema } from './market.model'
import { MarketService } from './market.service';
import { MarketController } from './market.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Market', schema: MarketSchema }])],
  controllers: [MarketController],
  providers: [MarketService]
})
export class MarketModule {}

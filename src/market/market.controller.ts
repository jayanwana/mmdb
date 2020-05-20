import { Controller, Get, Post, Patch, Delete, Param, Body, Logger, Header} from '@nestjs/common';
import { MarketService } from './market.service'
import { CreateMarketDto } from './createMarket.dto'

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}
  private readonly logger = new Logger(MarketController.name)

  @Get()
  async getAllMarkets(){
    const markets = this.marketService.allMarkets();
    return markets;
  };

  @Get(':id')
  async getMarket(@Param('id') marketId: string) {
    return this.marketService.getSingleMarket(marketId);
  };

  @Post()
  @Header('Content-Type', 'application/json')
  async createMarket(
    @Body() createMarketDto: CreateMarketDto) {
      const newMarket = await this.marketService.createMarket(createMarketDto)
      return {id: newMarket}
  };

  @Patch(':id')
  async updateProduct(
    @Param('id') marketId: string,
    @Body() createMarketDto: CreateMarketDto
  ) {
    await this.marketService.updateMarket(marketId, createMarketDto);
    return null;
  };

  @Delete(':id')
  async removeMarket(@Param('id') marketId: string) {
      await this.marketService.deleteMarket(marketId);
      return null;
  };

}

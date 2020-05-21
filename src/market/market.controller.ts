import { Controller, Get, Post, Patch, Delete, Param, Body, Header, UseInterceptors, UploadedFiles} from '@nestjs/common';
import { diskStorage } from 'multer';
import { MarketService } from './market.service'
import { CreateMarketDto } from './createMarket.dto'
import { FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/upload.utils';
import { LoggingInterceptor } from 'src/utils/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

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
  @Header("Content-Type", "multipart/form-data")
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: diskStorage({
      destination: './static/MarketImages',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),
  )
  async createMarket(
    @UploadedFiles() files: [],
    @Body() createMarketDto: CreateMarketDto,
  ) {
      const newMarket = await this.marketService.createMarket(files, createMarketDto);
      return {id: newMarket};
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') marketId: string,
    @Body() createMarketDto: CreateMarketDto,
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

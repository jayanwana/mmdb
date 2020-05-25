import { Controller, Get, Post, Patch, Delete, Param, Body, Header, UseInterceptors, UploadedFiles, UseGuards} from '@nestjs/common';
import { diskStorage } from 'multer';
import { MarketService } from './market.service'
import { CreateMarketDto } from './createMarket.dto'
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/upload.utils';
import { LoggingInterceptor } from 'src/utils/logging.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @Post('search')
  async findMarket(@Body('term') term: string, @Body('method') method: string) {
    return this.marketService.searchMarket(term, method)
  }

  @Post('location')
  async findMarketByLocation(@Body('coordinates') coordinates: Array<number>) {
    return this.marketService.searchMarketByLocation(coordinates)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @Header("Content-Type", "multipart/form-data")
  @UseInterceptors(FileFieldsInterceptor([
      { name: 'img_1', maxCount: 1 },
      { name: 'img_2', maxCount: 1 },
      { name: 'img_3', maxCount: 1 }
    ],
      {
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Header("Content-Type", "multipart/form-data")
  @UseInterceptors(FileFieldsInterceptor([
      { name: 'img_1', maxCount: 1 },
      { name: 'img_2', maxCount: 1 },
      { name: 'img_3', maxCount: 1 }
    ],
      {
      storage: diskStorage({
      destination: './static/MarketImages',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),
  )
  async updateMarket(
    @UploadedFiles() files: [],
    @Param('id') marketId: string,
    @Body() createMarketDto: CreateMarketDto,
  ) {
    await this.marketService.updateMarket(marketId, files, createMarketDto);
    return null;
  };

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeMarket(@Param('id') marketId: string) {
      await this.marketService.deleteMarket(marketId);
      return null;
  };

}

import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import {InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Market } from './market.model';
import { CreateMarketDto } from './createMarket.dto';


@Injectable()
export class MarketService {

    constructor(@InjectModel('Market') private readonly marketModel: Model<Market>){}

    async allMarkets() {
      const markets = await this.marketModel.find().exec();
      return markets.map((market: Market) =>
    ({id: market.id,
      name: market.name,
      description: market.description,
      foodCategory: market.foodCategory,
      img: market.img,
      location: market.location
    }));
    }

    async searchMarket(term: string, method: string) {
      const markets = await this.marketModel.find({ [method]: {$regex: term, $options: 'i'}}).exec()
      if(markets) {
        return markets.map((market: Market) =>
        ({id: market.id,
          name: market.name,
          description: market.description,
          foodCategory: market.foodCategory,
          img: market.img,
          location: market.location
        }));
      }

    }

    async searchMarketByLocation(coordinates: Array<number>) {
      if(coordinates.length === 2){const markets = await this.marketModel.find({
        location: {
             $near: {
               $geometry: {
                  type: "Point" ,
                  coordinates: [ coordinates[1] ,coordinates[0] ]
               },
               $maxDistance: 1000000,
               $minDistance: 10
     }
   }
      })
      if(markets) {
        return markets.map((market: Market) =>
        ({id: market.id,
          name: market.name,
          description: market.description,
          foodCategory: market.foodCategory,
          img: market.img,
          location: market.location
        }));
      }
    } else {
      throw new NotFoundException('Invalid Location Details.');
    }
    }

    async createMarket(files: {}, createMarketDto: CreateMarketDto): Promise<string> {
      if(files){
        let imagePaths: Object = {};
        Object.keys(files).map(key => imagePaths[key] = files[key][0].filename);
        createMarketDto.img = imagePaths;
      }
      if(typeof(createMarketDto.location)==='string'){
        createMarketDto.location = JSON.parse(createMarketDto.location)
      }
      try {const newMarket = new this.marketModel(createMarketDto);
      const result = await newMarket.save();
      return result.id as string;}
      catch (error){
        if(error.name === "MongoNetworkError") {
          throw new HttpException('Database Connection Error', HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
          throw new HttpException('An error occured', HttpStatus.BAD_REQUEST);
        }
      }

    }

    async getSingleMarket(marketId: string) {
    const market = await this.findMarket(marketId);
    return {
      id: market.id,
      name: market.name,
      description: market.description,
      foodCategory: market.foodCategory,
      img: market.img,
      location: market.location
    };
  }

    async updateMarket(marketId: string, createMarketDto: CreateMarketDto){
        const updatedMarket = await this.findMarket(marketId);
        if (createMarketDto.name) {
          updatedMarket.name = name;
        }
        if (createMarketDto.description) {
          updatedMarket.description = createMarketDto.description;
        }
        if (createMarketDto.foodCategory) {
          updatedMarket.foodCategory = createMarketDto.foodCategory;
        }
        if (createMarketDto.img) {
          updatedMarket.img = createMarketDto.img;
        }
        if (createMarketDto.location) {
          updatedMarket.location = createMarketDto.location;
        }
        updatedMarket.save();
    }

    async deleteMarket(marketId: string) {
      const result = await this.marketModel.deleteOne({_id: marketId}).exec();
      if (result.n === 0) {
        throw new NotFoundException('Market not found.');
      }
    }

    private async findMarket(id:string): Promise<Market> {
      let market: Market;
      try {
      market = await this.marketModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Market not found.');
    }
    if (!market) {
      throw new NotFoundException('Market not found.');
    }
    return market;
    }
}

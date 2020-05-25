export class CreateMarketDto {
  name: string;
  description: string;
  foodCategory: string;
  address: string;
  location: LocationDto;
  img: Object;
}

class LocationDto {
  type: string;
  coordinates: number[]
}

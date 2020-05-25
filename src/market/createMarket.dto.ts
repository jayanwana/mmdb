export class CreateMarketDto {
  name: string;
  description: string;
  foodCategory: string;
  img: Object;
  location: LocationDto;
}

class LocationDto {
  type: string;
  coordinates: number[]
}

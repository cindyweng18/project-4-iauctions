import { IsNumber } from 'class-validator';

export default class CreateBidsDto {
  @IsNumber()
  public amount: number;
}

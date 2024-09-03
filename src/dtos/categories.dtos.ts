import { IsString, IsOptional } from 'class-validator';

export default class CreateCategoriesDto {
  @IsString()
  public name: string;
}

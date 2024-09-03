import { Optional } from 'sequelize';
import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import Listing from 'models/listings.model';

export interface CategoriesAttributes {
  id: number;
  name: string;
}

export type CategoriesCreationAttributes = Optional<CategoriesAttributes, 'id' | 'name'>;

@Table({
  timestamps: true,
  tableName: 'categories',
})
export default class Categories extends Model<CategoriesAttributes, CategoriesCreationAttributes> {
  @Column({
    type: DataType.STRING(255),
  })
  public name: string;

  @HasMany(() => Listing, 'categoryId')
  listings: Listing[];
}

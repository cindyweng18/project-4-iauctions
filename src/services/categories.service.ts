import { ModelDefined } from 'sequelize';
import { isEmpty, HttpException } from 'utils/util';
import Categories from 'models/categories.model';
import Listing from 'models/listings.model';
import CreateCategoriesDto from 'dtos/categories.dtos';

class CategoriesService {
  public categories = Categories;

  public async category(): Promise<Categories[]> {
    const categories: Categories[] = await this.categories.findAll();
    return categories;
  }

  public async findCategoryById(categoryId: number): Promise<Categories> {
    const findCategory: Categories = await this.categories.findByPk(categoryId, {
      include: [Listing as ModelDefined<any, any>],
    });
    return findCategory;
  }

  public async create(categoryData: CreateCategoriesDto): Promise<Categories> {
    const createdCategory = await this.categories.create({ ...categoryData });
    return createdCategory;
  }

  public async updateCategory(categoryId: number, categoryData: CreateCategoriesDto): Promise<Categories> {
    if (isEmpty(categoryData)) throw new HttpException(400, 'Empty payload');

    await this.categories.update(categoryData, { where: { id: categoryId } });

    const updateCategory: Categories = await this.categories.findByPk(categoryId);
    return updateCategory;
  }

  public async deleteCategoryData(categoryId: number): Promise<Categories> {
    if (isEmpty(categoryId)) throw new HttpException(400, "List_id doesn't exist");

    const findList: Categories = await this.categories.findByPk(categoryId);
    if (!findList) throw new HttpException(404, 'Not found');

    await this.categories.destroy({ where: { id: categoryId } });

    return findList;
  }
}

export default CategoriesService;

import Listing from 'models/listings.model';
import CreateListingDto from 'dtos/listings.dtos';
import User from 'models/users.model';
import Comment from 'models/comments.model';
import Bid from 'models/bids.model';
import Categories from 'models/categories.model';
import { ModelDefined } from 'sequelize';
import { isEmpty, HttpException } from 'utils/util';

class ListingService {
  public listings = Listing;

  public async list(): Promise<Listing[]> {
    const listings: Listing[] = await this.listings.findAll();
    return listings;
  }

  public async findListById(listId: number): Promise<Listing> {
    const findList: Listing = await this.listings.findByPk(listId, {
      include: [Comment as ModelDefined<any, any>, Bid as ModelDefined<any, any>],
    });
    return findList;
  }

  public async create(listingData: CreateListingDto, user: User): Promise<Listing> {
    const createdListing = await this.listings.create({ ...listingData, userId: user.id });
    return createdListing;
  }

  public async updateList(listId: number, listData: CreateListingDto): Promise<Listing> {
    if (isEmpty(listData)) throw new HttpException(400, 'Empty payload');

    await this.listings.update(listData, { where: { id: listId } });

    const updateList: Listing = await this.listings.findByPk(listId);
    return updateList;
  }

  public async deleteListData(listId: number): Promise<Listing> {
    if (isEmpty(listId)) throw new HttpException(400, "List_id doesn't exist");

    const findList: Listing = await this.listings.findByPk(listId);
    if (!findList) throw new HttpException(404, 'Not found');

    await this.listings.destroy({ where: { id: listId } });

    return findList;
  }
}

export default ListingService;

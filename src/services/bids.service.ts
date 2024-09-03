import { ModelDefined } from 'sequelize';
import { isEmpty, HttpException } from 'utils/util';
import Bids from 'models/bids.model';
import User from 'models/users.model';
import CreateBidsDto from 'dtos/bids.dtos';
import Listing from 'models/listings.model';

class BidsService {
  public bids = Bids;
  public listing = Listing;

  public async bid(): Promise<Bids[]> {
    const bids: Bids[] = await this.bids.findAll();
    return bids;
  }

  public async findListById(listId: number): Promise<Listing> {
    const findList: Listing = await this.listing.findByPk(listId);
    return findList;
  }

  public async create(bidData: CreateBidsDto, user: User, listId: number): Promise<Bids> {
    const createdBid = await this.bids.create({ ...bidData, userId: user.id, listingId: listId });
    return createdBid;
  }
}

export default BidsService;

import Listing from 'models/listings.model';
import User from 'models/users.model';
import Category from 'models/categories.model';

describe('Listing Model', () => {
  it('can create a listing', async () => {
    const sampleUser = {
      email: 'sample_9934@gma.com',
      password: 'j343',
    };
    const sampleCategory = {
      name: 'iPhones',
    };
    const user = await User.create(sampleUser);
    const category = await Category.create(sampleCategory);

    const sampleListing = {
      title: 'title',
      price: 500,
      description: 'testing description',
      userId: user.id,
      categoryId: category.id,
    };

    const listing = await Listing.create(sampleListing);
    expect(listing).toMatchObject(sampleListing);
  });
});

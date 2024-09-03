import Listing from 'models/listings.model';
import User from 'models/users.model';
import Category from 'models/categories.model';
import Comment from 'models/comments.model';

describe('Comment Model', () => {
  it('can create a comment', async () => {
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

    const sampleComment = {
      description: 'testing comment description',
      userId: user.id,
      listingId: listing.id,
    };

    const comment = await Comment.create(sampleComment);
    expect(comment).toMatchObject(sampleComment);
  });
});

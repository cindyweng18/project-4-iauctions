import Category from 'models/categories.model';

describe('Category Model', () => {
  it('can create a category', async () => {
    const sampleUser = {
      email: 'sample_9934@gma.com',
      password: 'j343',
    };
    const sampleCategory = {
      name: 'iPhones',
    };
    const category = await Category.create(sampleCategory);

    expect(category).toMatchObject(sampleCategory);
  });
});

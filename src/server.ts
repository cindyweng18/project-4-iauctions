import App from 'app';
import CategoriesRoute from 'routes/categories.route';
import CommentsRoute from 'routes/comments.route';
import ListingsRoute from 'routes/listings.route';
import UsersRoute from 'routes/users.route';
import AuthRoute from 'routes/auth.route';
import BidsRoute from 'routes/bids.route';

const app = new App([
  new BidsRoute(),
  new CategoriesRoute(),
  new CommentsRoute(),
  new ListingsRoute(),
  new UsersRoute(),
  new AuthRoute(),
]);

app.connectToDatabase();
app.listen();

import { createStore } from "easy-peasy";
import CategoryModel from "./model/category";
import ColorModel from "./model/color";
import CountryModel from "./model/country";
import ProductModel from "./model/product";
import SizeModel from "./model/size";
import SubcategoryModel from "./model/subcategory";
import TagModel from "./model/tag";
import StateModel from './model/state';
import CityModel from './model/city';
import StreetModel from "./model/street";
import UserModel from './model/user';
import ReviewModel from "./model/review";
import CartModel from "./model/cart";
import OrderModel from "./model/order";
import AuthModel from "./model/auth";
import CommentModel from "./model/comment";


const Store = createStore({
    comment: CommentModel,
    auth: AuthModel,
    order: OrderModel,
    cart: CartModel,
    review: ReviewModel,
    user: UserModel,
    street: StreetModel,
    city: CityModel,
    state: StateModel,
    country: CountryModel,
    product: ProductModel,
    size: SizeModel,
    color: ColorModel,
    tag: TagModel,
    subcategory: SubcategoryModel,
    category: CategoryModel
})

export default Store
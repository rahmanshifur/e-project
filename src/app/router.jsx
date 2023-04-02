
import { Router } from '@reach/router'
import { Container } from 'reactstrap';


// IMPORT LAYOUT
import Layout from '../components/layout'


// IMPORT PAGES
import PageNotFound from '../pages/404';
import Home from '../pages/home';
import FAQ from '../pages/faq';
import Category from '../pages/category';
import Subcategory from '../pages/subcategory';
import Color from '../pages/color';
import Size from '../pages/size';
import Tags from '../pages/tag';
import Product from '../pages/product';
import Country from './../pages/country/index';
import State from '../pages/state';
import City from '../pages/city';
import Street from '../pages/street';
import User from '../pages/user';
import Review from '../pages/review';
import ScatProduct from '../pages/scat-product';
import ProductDetails from '../pages/product-datails';
import CheckOut from './../pages/checkOut/index';
import Payment from '../pages/payment';
import Auth from '../pages/auth';
import UserOrder from '../pages/user-order';
import AllProduct from '../pages/all-profuct';
import AdminOrder from '../pages/admin-order';



function AppRouter() {
    return (
        <Container>
            <Layout>
                <Router>
                    <AdminOrder path='/admin-order' />
                    <UserOrder path='/user-order' />
                    <Auth path='/login' />
                    <Payment path='/payment' />
                    <CheckOut path='/check-out' />
                    <ProductDetails path='/product-details/:PdtId' />
                    <AllProduct path='/all-product' />
                    <ScatProduct path='/scat-product/:scatId' />
                    <Review path='/review' />
                    <User path='/user' />
                    <Street path='/street' />
                    <City path='/city' />
                    <State path='/state' />
                    <Country path='/country' />
                    <Product path='/product' />
                    <Tags path='/tag' />
                    <Size path='/size' />
                    <Color path='/color' />
                    <Subcategory path='/subcategory' />
                    <Category path='/category' />
                    <FAQ path='/faq' />
                    <Home path='/' />
                    <PageNotFound default />
                </Router>
            </Layout>
        </Container>
    )
}

export default AppRouter;
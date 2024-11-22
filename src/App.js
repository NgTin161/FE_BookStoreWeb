import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Pages/user/layout';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/user/Home/Home';
import Login from './Pages/user/Login/Login';
import NotFound from './Pages/user/NotFound/NotFound';
import Register from './Pages/user/Register/Register';
import FogotPassword from './Pages/user/ForgotPassword/FogotPassword';
import ConfirmPassword from './Pages/user/ConfirmPassword/ConfirmPassword';
import Details from './Pages/user/Details/Details';
import Search from './Pages/user/Search/Search';
import Cart from './Pages/user/Cart/Cart';
import LayoutAdmin from './Pages/admin/LayoutAdmin';
import ConfirmPayment from './Pages/user/ConfirmPayment/ConfirmPayment';
import PrivateRoute from './axios/PrivateRoute';
import DashBoard from './Pages/admin/DashBoard';
import CategoryManager from './Pages/admin/CategoryManager/CategoryManager';
import Information from './Pages/admin/Information/Information';
import PublisherManager from './Pages/admin/PublisherManager/PublisherManager';
import Contact from './Pages/user/Contact/Contact';
import ProductManager from './Pages/admin/ProductManager/ProductManager';


const App = () => {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
         <Route path="/chi-tiet" element = {<Details/>} />
        <Route path="/search" element={<Search />} />
        <Route path="/gio-hang" element={<Cart />} />
        <Route path="/lien-he" element={<Contact />} />
     
     

     <Route path="/confirm-payment" element={<ConfirmPayment />}></Route>
<Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route> 
<Route path="*" element={<NotFound />}></Route>

<Route path="/admin"  element={<LayoutAdmin />}>
{/* <PrivateRoute></PrivateRoute> */}
    <Route path="/admin/dashboard" index element={<DashBoard />} />
    <Route path="/admin/category-manager"  element={<CategoryManager/>} />
    <Route path="/admin/information"  element={<Information/>} />
    <Route path="/admin/publisher-manager"  element={<PublisherManager/>} />
    <Route path="/admin/product-manager"  element={<ProductManager/>} />
</Route>
    </Route>






    <Route path="/forgot-password" element={<FogotPassword />}></Route>
    <Route path="/reset-password" element={<ConfirmPassword />}></Route> 





</Routes >
  );
}

export default App;

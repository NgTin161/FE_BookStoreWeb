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
import DashBoard from './Pages/admin/Dashboard/DashBoard';
import ConfirmPayment from './Pages/user/ConfirmPayment/ConfirmPayment';


const App = () => {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
         <Route path="/details" element = {<Details/>} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
     
     

     <Route path="/confirm-payment" element={<ConfirmPayment />}></Route>
<Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route> 
<Route path="*" element={<NotFound />}></Route>

<Route path="/admin" element={<LayoutAdmin />}>
    <Route path="/admin/dashboard" element={<DashBoard />} />
</Route>
    </Route>






    <Route path="/forgot-password" element={<FogotPassword />}></Route>
    <Route path="/reset-password" element={<ConfirmPassword />}></Route> 





</Routes >
  );
}

export default App;

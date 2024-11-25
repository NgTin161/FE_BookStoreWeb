import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";



const Layout = () => {
    return (
        <div>
     
                <Header />
            <div style={{ }}>
                < Outlet />
            </div>
            <Footer />


        </div>
    );
};

export default Layout;
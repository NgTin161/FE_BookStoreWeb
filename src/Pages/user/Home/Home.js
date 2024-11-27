import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Marquee from "react-fast-marquee";
import { Carousel, Flex } from 'antd';
import './Home.css'
import SlideProduct from './SlideProduct';
import { Helmet } from 'react-helmet';
import PopupLogin from './PopupLogin';
import TabCategory from './TabCategory';
import { axiosJson } from '../../../axios/AxiosCustomize';


const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slideshow, setSlideshow] = useState([]);

  const [newBook, setNewBook] = useState([]);

  const [hotBook, setHotBook] = useState([]);
  const fetchSlideshow = async () => {
    const response = await axiosJson.get('/Home/get-slideshows');
    setSlideshow(response.data);
  }

  const fetchNewBook = async () => {
    const response = await axiosJson.get('/Home/new-books');
    setNewBook(response.data);
  }

  const fetchHotBook = async () => {
    const response = await axiosJson.get('/Home/hot-books');
    setHotBook(response.data);
  }
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      setIsModalOpen(true);
    }

    fetchSlideshow();
    fetchNewBook(); 
    fetchHotBook();
       
  }, []);
  

  // const settings = {
  //   dots: true,
  //   infinite: false,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: slideshow?.length > 1,
  //   speed: 1000,
  //   autoplaySpeed: 5000,
  //   arrows: true,
  //   prevArrow: <CustomPrevArrow />,
  //   nextArrow: <CustomNextArrow />,
  // };

  return (
    <>
     <Helmet>
        <title>ABC.com - Nhà sách trực tuyến</title>
        <meta name="description" content="Mô tả cho trang này" />
        <link rel="icon" href="%PUBLIC_URL%/path-to-your-logo.ico" /> 
        <img src="/Logo/logoABC.png" alt="logo" style={{width: '100px', height: '100px'}} />
      </Helmet>
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px'}}>
 
      {/* <Slider {...settings}>
        {slideshow?.map((item, index) => (
          <div key={index} style={{ justifyContent:'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <a href={item.link} target="_blank" rel="">
           
              <img 
                src={item.imageURL} 
                alt="Slide" 
                style={{ width: '94vw', height: '300px', objectFit: 'cover', borderRadius:'30px'  }} 
              />
            
            </a>
          </div>
        ))}
      </Slider> */}

      <Carousel style={{paddingLeft:'20px'}}  dots={false} arrows draggable={true} autoplay={true} autoplaySpeed={1000} >
      {slideshow?.map((item, index) => (
          // <div key={index} style={{ justifyContent:'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <a href={item.link} target="_blank" rel="">
           
              <img 
                src={item.imageURL} 
                alt="Slide" 
                style={{ width: '94vw', height: '300px', objectFit: 'cover', borderRadius:'30px'  }} 
              />
            
            </a>
          // </div>
        ))}
    </Carousel>
        
   <SlideProduct data={hotBook} title="SẢN PHẨM HOT"/>
   <SlideProduct data={newBook} title="SẢN PHẨM MỚI"/>
   <TabCategory/> 
      <Marquee speed={50} style={{ padding: '20px'}}>
      <div style={{ display: 'flex', gap: 20}}>
        <img src="/Logo/firstnews.png" alt="First News"  />
        <img src="/Logo/chinhtriquocgia.png" />
        <img src="/Logo/giaoduc.jpg" alt="Giao Duc" />
        <img src="/Logo/Cambridge.png" alt="Cambridge"  />
        <img src="/Logo/kimdong.jpg" alt="Kim Dong"  />
        <img src="/Logo/nxblaodong.png" alt="NXB Lao Dong" />
        <img src="/Logo/nxbtphcm.png" alt="NXB TP HCM"  />
        <img src="/Logo/nxbtre.png" alt="NXB Tre"  />
        <img src="/Logo/oxford.png" alt="Oxford"  />
        <img src="/Logo/vh.png" alt="VH"  />
        <img src="/Logo/nxbphunu.jpg" alt="NXB Phu Nu"   />
      </div>
    </Marquee>
    </div>

    <PopupLogin setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
    </>
  );
};

export default Home;

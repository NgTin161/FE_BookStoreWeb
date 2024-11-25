import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Marquee from "react-fast-marquee";
import { Carousel, Flex } from 'antd';
import './Home.css'
import SlideProduct from './SlideProduct';
import { Helmet } from 'react-helmet';
import PopupLogin from './PopupLogin';
import TabCategory from './TabCategory';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      setIsModalOpen(true);
    }
       
  }, []);
  const images = [ 
    {
      thumbnail: 'https://img1.kienthucvui.vn/uploads/2019/10/10/hinh-anh-cac-nhan-vat-trong-naruto_110706155.jpg',
      link: 'https://example.com/link1'
    },
    {
      thumbnail: 'https://images8.alphacoders.com/505/505616.png',
      link: 'https://example.com/link2'
    },
  ];

  // Custom arrow components
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className='arrow-left'
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    );
  };
  
  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
      className="arrow-right"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: images.length > 1,
    speed: 1000,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

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
        {images.map((item, index) => (
          <div key={index} style={{ justifyContent:'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <a href={item.link} target="_blank" rel="">
           
              <img 
                src={item.thumbnail} 
                alt="Slide" 
                style={{ width: '94vw', height: '300px', objectFit: 'cover', borderRadius:'30px'  }} 
              />
            
            </a>
          </div>
        ))}
      </Slider> */}

      <Carousel style={{paddingLeft:'20px'}}  arrows draggable={true} infinite={true} autoplay={true} autoplaySpeed={1000} >
      {images.map((item, index) => (
          <div key={index} style={{ justifyContent:'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <a href={item.link} target="_blank" rel="">
           
              <img 
                src={item.thumbnail} 
                alt="Slide" 
                style={{ width: '94vw', height: '300px', objectFit: 'cover', borderRadius:'30px'  }} 
              />
            
            </a>
          </div>
        ))}
    </Carousel>
        
   <SlideProduct/>
   <SlideProduct/>
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

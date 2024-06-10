import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"; 
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
type Props = {};

const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
        className="prev-arrow bg-gray-800 text-white rounded-full p-2 absolute top-1/2 left-4 transform -translate-y-1/2 z-[50]"
        onClick={onClick}
      >
        <IoIosArrowBack size={30}/>
      </button>
    );
  };
  
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
        className="next-arrow bg-gray-800 text-white rounded-full p-2 absolute top-1/2 right-4 transform -translate-y-1/2"
        onClick={onClick}
      >
        <IoIosArrowForward size={30}/>
      </button>
    );
  };

const HomeSlider = (props: Props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <>
      <Slider className="z-10" {...settings}>
        <div>
          <Image
            src="/banner/banner1.jpg"
            className="w-full h-full"
            width={1000}
            height={500}
            alt="banner"
          />
        </div>
        <div>
          <Image
            className="w-full h-full"
            src="/banner/banner2.jpg"
            width={1000}
            height={500}
            alt="banner"
          />
        </div>
        <div>
          <Image
            className="w-full h-full"
            src="/banner/banner3.jpg"
            width={1000}
            height={500}
            alt="banner"
          />
        </div>
        <div>
          <Image
            className="w-full h-full"
            src="/banner/banner4.jpg"
            width={1000}
            height={500}
            alt="banner"
          />
        </div>
      </Slider>
      
    </>
  );
};

export default HomeSlider;

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "../css/swiper-bundle.css";
import "../css/styles.css";

import SwiperCore, { Pagination, Navigation } from "swiper";

SwiperCore.use([Pagination, Navigation]);

const Slider = ({ image }) => {
  return (
    <Swiper
      pagination={{ type: "progressbar" }}
      navigation={true}
      className="mySwiper"
    >
      {image.map((item) => {
        return (
          <SwiperSlide>
            <div className="imageDiv">
              <img src={item.imgUrl} alt="name" />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;

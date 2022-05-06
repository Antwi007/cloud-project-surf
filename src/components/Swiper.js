import React from "react";
import CardRestaurant from "./CardRestaurant";
import CardBeach from "./CardBeach";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Paginagtion module
import 'swiper/modules/scrollbar/scrollbar.scss' //scroll module

const RSwiper = (props) => {

  return props.data ? (
    <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={50}
    slidesPerView={2}
    navigation
    scrollbar={{ draggable: true }}
    >
      {props.data.map((slide, index) =>
        props.simple ? (
          <div
            key={slide}
            style={{
              // backgroundColor:'red',
              backgroundImage: `${props.darken
                  ? "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.3)),linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.9)),"
                  : ""
                } \
                url(/content/img/photo/${slide})`,
            }}
          />
        ) : (
          <div key={index} className="h-auto w-50 px-2">
            {props.cards && (
              <SwiperSlide>
                <div className="w-100 h-100 mb-4 hover-animate">
                    <CardRestaurant
                      data={slide}
                      onCardEnter={props.onCardEnter}
                      onCardExit={props.onCardExit}
                    />
                </div>
              </SwiperSlide>
            )}
            {props.beaches && (
               <SwiperSlide>
                <div className="w-100 h-100 mb-4 hover-animate">
                  <CardBeach
                    data={slide}
                    type={props.type}
                    center={props.center}
                  />
                </div>
              </SwiperSlide>
            )}
          </div>
        )
      )}
    </Swiper>
  ) : (
    null
  )
};

export default RSwiper;

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import images from "../assets";
import { Button } from "../components";

const terms = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='flex items-center justify-center w-full nav-h'>
      <div className='overflow-hidden pl-36 pr-36 pt-36 pb-36'>
        <div className='rounded-2xl shadow-grad'>
          <Slider
            {...settings}
            className='min-h-[200px] rounded-2xl p-3 backdrop-blur-sm slider-main'
          >
            <ul>
              <li>
                <h1 className='text-2xl text-gradient font-bold text-center mb-4 text-font'>
                  Terms and Conditions
                </h1>
                <div className='text-center text-font mb-1'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dicta quia accusamus consectetur
                  </p>
                </div>
                <div className='text-center text-font mb-1'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dicta quia accusamus consectetur
                  </p>
                </div>
                <div className='text-center text-font'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dicta quia accusamus consectetur
                  </p>
                </div>
              </li>
            </ul>

            <ul>
              <li>
                <h1 className='text-2xl text-gradient font-bold text-center mb-4 text-font'>
                  Terms and Conditions
                </h1>
                <div className='text-center text-font mb-1'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dicta quia accusamus consectetur
                  </p>
                </div>
                <div className='text-center text-font mb-1'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dicta quia accusamus consectetur
                  </p>
                </div>
                <div className='text-center text-font'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dicta quia accusamus consectetur
                  </p>
                </div>
              </li>
            </ul>

            <ul>
              <li>
                <h1 className='text-2xl text-gradient font-bold text-center mb-4 text-font'>
                  Terms and Conditions
                </h1>
                <div className='text-center text-font mb-1'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dicta quia accusamus consectetur
                  </p>
                </div>
                <div className='text-center text-font mb-1'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dicta quia accusamus consectetur
                  </p>
                </div>
                <div className='text-center text-font'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dicta quia accusamus consectetur
                  </p>
                </div>
              </li>
            </ul>
          </Slider>
        </div>

        <div className='py-[60px] flex items-center justify-end'>
          <Button
            btnName='Finish'
            classStyles='mx-2 rounded-xl'
            moveTo='loan'
          />
        </div>
      </div>
    </div>
  );
};

export default terms;

// const Carousel = styled(Slider)`
//   margin-top: 20px;

//   & > button {
//     opacity: 0;
//   }

//   ul li button {
//     &:before {
//       font-size: 10px;
//       color: rgb(150, 158, 171);
//     }
//   }

//   li.slick-active button:before {
//     color: white;
//   }

//   .slick-list {
//     overflow: initial;
//   }

//   .slick-prev {
//     left: -75px;
//   }

//   .slick-next {
//     right: -75px;
//   }
// `;

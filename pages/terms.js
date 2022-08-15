import Image from "next/image";
import React from "react";
import Slider from "react-slick";

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
      {/* <div className='p-52 bg-red-400'>apple</div> */}
      <div className='overflow-hidden pl-36 pr-36 pt-36 pb-36'>
        <div className='rounded-2xl shadow-grad cryptobg'>
          <Slider
            {...settings}
            className='min-h-[200px] rounded-2xl p-3 backdrop-blur-sm slider-main'
          >
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
                quia accusamus consectetur, esse suscipit voluptatibus ea ut
                nihil repudiandae non hic veniam eligendi? Nemo, eos architecto.
                Autem vel molestiae modi!
              </p>
            </div>
            <div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
                ducimus, eos veritatis reprehenderit aut, voluptate distinctio
                cupiditate debitis molestias repellendus ratione at sint cumque
                eius maxime eveniet! Quisquam, ut commodi?
              </p>
            </div>
            <div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
                ducimus, eos veritatis reprehenderit aut, voluptate distinctio
                cupiditate debitis molestias repellendus ratione at sint cumque
                eius maxime eveniet! Quisquam, ut commodi?
              </p>
            </div>
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

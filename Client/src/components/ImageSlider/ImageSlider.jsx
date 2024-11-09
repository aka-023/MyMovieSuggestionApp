import React, { useRef } from 'react';
import './ImageSlider.css';
import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5";

const ImageSlider = ({imageList}) => {
  const sliderRef = useRef(null);
  
  // Function to handle scrolling on button clicks
  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = direction === 'left' ? -slider.offsetWidth : slider.offsetWidth;
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Function to handle mouse wheel scrolling
  const handleWheel = (event) => {
    const slider = sliderRef.current;
    slider.scrollBy({ left: event.deltaY < 0 ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <div className='imgeslider-wrapper'>
      <div className='back_btn' onClick={() => scroll('left')}>
        <IoChevronBackCircleOutline size={30} />
      </div>
      <div className="imgeslider" ref={sliderRef} onWheel={handleWheel}>
        {imageList && imageList.map((image,i) => (
          <div key={i}><img className='imgeslider_img' src={`https://image.tmdb.org/t/p/w500${image.file_path}`} alt="movie_img" /></div>
        ))}

      </div>
      <div className='for_btn' onClick={() => scroll('right')}>
        <IoChevronForwardCircleOutline size={30} />
      </div>
    </div>
  );
};

export default ImageSlider;

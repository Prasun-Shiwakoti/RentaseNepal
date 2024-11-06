import React, {useState, useEffect} from "react";
import {FaAngleDoubleUp} from 'react-icons/fa';

const ScrollToTop = () =>{
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  
  useEffect(() => {
    window.addEventListener("scroll",()=>{
      if(window.scrollY > 300){
      setShowScrollTopButton(true);
      } else{
      setShowScrollTopButton(false);
      }
    })
  },[]);

  const scrollTop = (elementRef) => {
    window.scrollTo({
      top : 0,
      behavior : "smooth"
    })
  }
  return (
    <div>
      {showScrollTopButton && <FaAngleDoubleUp onClick={scrollTop} className="top-btn-position top-btn-style"/>}
    </div>
  );
}
export default ScrollToTop;


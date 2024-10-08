import { useEffect, useState } from "react";
import "./slider.css";
import Astro from "../assets/images/Astro.png";
import Bobcat from "../assets/images/Bobcat.png";
import Elephant from "../assets/images/Ruth-Elephant.png";
import Einstien from "../assets/images/Einstien.png";
import Dog from "../assets/images/Dog.png"


const images = [
  { id: 1, pos: "right", img: Astro },
  { id: 2, pos: "left", img: Einstien },
  { id: 3, pos: "right", img: Elephant },
  { id: 4, pos: "left", img: Dog },
  { id: 5, pos: "right", img: Bobcat },
];

const Slider = ({ isModalOpen }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!isModalOpen) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 700);

      return () => clearInterval(interval);
    }
  }, [isModalOpen]);

  return (
    <div className="slider-container w-[100%]  h-[350px] lg:w-[100%] lg:h-[400px] bg-[#f1efef] rounded-[30px]">
      {images.map((image, index) => (
        <div
          key={index}
          className={` w-full md:!w-full image-box ${index === 0
            ? currentImageIndex === index
              ? "active-horizontal-right"
              : ""
            : index === 1
              ? currentImageIndex === index
                ? "active-horizontal-left"
                : ""
              : currentImageIndex >= 2 && currentImageIndex === index
                ? "active-vertical"
                : ""
            }`}
          style={{ justifyContent: image.pos === "right" ? "end" : "start", backgroundColor: "#f1efef" }}
        >
          <img src={image.img} alt={`Slide ${index}`} className="slider-image w-[100%] lg:w-[250px] lg:h-[350px] " />
        </div>
      ))}
    </div>
  );
};

export default Slider;

import React from "react";
import { Carousel } from "antd";
// import { Link } from "react-router-dom";

const images = [
  {
    image:
      "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/compressed/5fed81142f212_json_image_1609400596.jpg",
  },
  {
    image:
      "https://marketplace.canva.com/EAFGKRRskMs/1/0/1600w/canva-brown-and-beige-minimalist-fashion-banner-lYcbGpUSVGo.jpg",
  },
  {
    image:
      "https://marketplace.canva.com/EAFVHstxnwk/1/0/1600w/canva-beige-aesthetic-exclusive-fashion-wear-collection-clothing-banner-BZb4KkCdNP0.jpg",
  },
];

const MainCarousel: React.FC = () => {
  return (
    <Carousel autoplay>
      {images.map((item, index) => {
        return (
          //   <Link key={index} to={item.path}>
          <div key={index}>
            <img
              width="100%"
              style={{
                maxHeight: "35rem",
                objectFit: "cover",
                objectPosition: "top",
                marginBottom: "1rem",
              }}
              alt="img"
              src={item.image}
            />
          </div>
          //   </Link>
        );
      })}
    </Carousel>
  );
};

export default MainCarousel;

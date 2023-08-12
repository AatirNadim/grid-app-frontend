import React from "react";
import { Carousel } from "antd";
// import { Link } from "react-router-dom";

const images = [
  {
    image:
      "https://images.unsplash.com/photo-1570875625565-4aaf02f5655f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fHNob3dyb29tfGVufDB8fHx8MTYzMzQ0MzU0MQ&ixlib=rb-1.2.1&q=80&w=2000",
  },
  {
    image:
      "https://static.startuptalky.com/2022/05/fast-fashion-brands-business-models-startuptalky-.jpg",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi39DUsDrg3JGHf-gLN1-ilSPoKlcbUXrgcA&usqp=CAU",
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

/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, ConfigProvider, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
// import ProductCard from "../atoms/ProductCard";
import { Image } from "antd";
import {
  HeartFilled,
  ShoppingCartOutlined,
  ShoppingFilled,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
// import { products } from "../utils/products";
import useHttp from "../hooks/useHttp";
import { GetProductById, SendLocationHistory } from "../lib/api";
import { authState } from "../atoms/authState";
import { useRecoilValue } from "recoil";

// interface Iprops {
//   image: string;
//   name: string;
//   price: number;
//   id: number;
// }

// const filler = {
//   link: "/",
//   image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
//   id: 1,
//   name: "Cotton Schiffli Tier Dress",
//   price: 2199,
//   description:
//     "This is a beautiful dress, I truly recomment you to buy it so i can tear it off your body. Yeah, you know what I mean.",
// };

// function displayLocation(latitude, longitude) {
//   const request = new XMLHttpRequest();

//   const method = "GET";
//   const url =
//     "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +
//     latitude +
//     "," +
//     longitude +
//     "&sensor=true" +
//     "&key=AIzaSyA3zeQUA47kyCgI5XJFJMn6zybxb3jPqeQ";
//   const async = true;

//   request.open(method, url, async);
//   request.onreadystatechange = function () {
//     if (request.readyState == 4 && request.status == 200) {
//       const data = JSON.parse(request.responseText);
//       const address = data.results[0];
//       console.log(data);
//     }
//   };
//   request.send();
// }

const options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0,
};

const Productpage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const auth = useRecoilValue(authState);
  const { sendRequest: getSingleProduct } = useHttp(GetProductById);
  const { sendRequest: sendLocation } = useHttp(SendLocationHistory);

  useEffect(() => {
    const successCallback = function (position) {
      console.log(position);
      const x = position.coords.latitude;
      const y = position.coords.longitude;

      sendLocation(
        (res) => console.log(res),
        () => {},
        {
          payload: {
            product_id: id,
            data: "" + x + " " + y,
          },
          accessToken: auth?.accessToken,
        }
      );
      // displayLocation(x, y);
    };

    const errorCallback = function (error) {
      let errorMessage = "Unknown error";
      switch (error.code) {
        case 1:
          errorMessage = "Permission denied";
          break;
        case 2:
          errorMessage = "Position unavailable";
          break;
        case 3:
          errorMessage = "Timeout";
          break;
      }
      console.log(errorMessage);
      // document.write(errorMessage);
    };
    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  }, []);
  useEffect(() => {
    getSingleProduct(
      (res) => {
        console.log(res);
        setProduct(res);
      },
      () => {},
      { accessToken: auth.accessToken, id: +id }
    );
  }, [id]);
  // back to products to set the product detail to null
  return (
    // <div>jkasjas</div>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#A459D1",
          colorPrimaryHover: "#7b439e",
        },
      }}
    >
      <Col span={24}>
        <Row
          style={{
            padding: "20px",
            backgroundColor: "#F5F5F5",
          }}
          // gutter={[16, 24]}
        >
          <Col className="h-[500px]" xl={12} md={12} sm={24} xs={24}>
            <Image src={product?.image} height={"inherit"} />
          </Col>
          <Col xl={12} md={12} sm={24} xs={24}>
            <Typography.Title className="text-left">
              {product?.name}
            </Typography.Title>
            <Typography.Text className="block text-left text-lg font-normal">
              {product?.description}
            </Typography.Text>
            <Typography.Title level={3} className="text-left">
              {`Rs. ${product?.inventory[0]?.price}`}
            </Typography.Title>
            <Row gutter={[0, 12]} >
              <Col span={24}>
                <Button
                  size="large"
                  type="primary"
                  icon={<ShoppingFilled />}
                  className="bg-[#A459D1] font-semibold w-56"
                >
                  Buy Now
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  size="large"
                  type="default"
                  className="font-semibold text-[#A459D1] border-[#A459D1] border-2"
                  icon={<ShoppingCartOutlined className="text-[#A459D1]" />}
                >
                  Add to cart
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="text"
                  size="large"
                  className="font-semibold border-2 border-pink-700"
                  icon={<HeartFilled className="text-pink-700" />}
                >
                  Wishlist
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <Row gutter={[24, 24]}>
          {new Array(8).fill(0).map((itr) => (
            <Col xl={6} md={8} sm={12} xs={24}  >
              <ProductCard
                to={filler.link}
                image={filler.image}
                id={filler.id}
                name={filler.name}
                price={filler.price}
              />
            </Col>
          ))}
        </Row> */}
      </Col>
    </ConfigProvider>
  );
};

export default Productpage;

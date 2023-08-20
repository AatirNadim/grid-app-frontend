/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Col,
  ConfigProvider,
  Row,
  Typography,
  message,
  Grid,
} from "antd";
import React, { useEffect, useState } from "react";
// import ProductCard from "../atoms/ProductCard";
import { SettingOutlined, ShoppingFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";
// import { products } from "../utils/products";
import useHttp from "../hooks/useHttp";
import { GetProductById, PlaceOrder, SendLocationHistory } from "../lib/api";
import { authState } from "../atoms/authState";
import { useRecoilValue } from "recoil";
import ChangeModal from "../components/Layout/ChangeModal";
import ProductCard from "../atoms/ProductCard";

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

const Productpage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const auth = useRecoilValue(authState);
  const { sendRequest: getSingleProduct } = useHttp(GetProductById);
  const { sendRequest: sendLocation } = useHttp(SendLocationHistory);
  const { sendRequest: BuyProduct } = useHttp(PlaceOrder);
  const [open, setOpen] = useState(false);
  const { xl, md } = Grid.useBreakpoint();

  useEffect(() => {
    const successCallback = async (position) => {
      const x = position.coords.latitude;
      const y = position.coords.longitude;

      const options = {
        method: "GET",
        headers: { Accept: "application/json" },
      };

      fetch(`https://geocode.maps.co/reverse?lat=${x}&lon=${y}`, options)
        .then((response) => response.json())
        .then((response) => {
          sendLocation(
            (res) => console.log(res),
            () => {},
            {
              payload: {
                product_id: id,
                data: response?.address?.city || response?.address?.state,
              },
              accessToken: auth?.accessToken,
            }
          );
        })
        .catch((err) => console.error(err));

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
  }, [auth.isLoggedIn]);
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

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FC7300",
          colorPrimaryHover: "#BFDB38",
          borderRadius: 4,
        },
      }}
    >
      <ChangeModal open={open} setOpen={setOpen} product={product} />
      <Row
        style={{
          padding: "4rem 0",
          backgroundColor: "#F5F5F5",
        }}
        gutter={[24, 24]}
        justify="center"
      >
        <Col xl={8} lg={10} sm={18} xs={20} style={{ display: "flex" }}>
          <img
            style={{
              borderRadius: 6,
              objectFit: "cover",
              objectPosition: "top",
              width: "100%",
            }}
            src={product?.product?.image}
            alt="image not available"
          />
        </Col>
        <Col
          style={{ textAlign: "left", paddingLeft: "1rem" }}
          xl={10}
          lg={12}
          sm={18}
          xs={20}
        >
          <Typography.Title level={2} style={{ marginTop: 0, fontWeight: 400 }}>
            {product?.product?.name}
          </Typography.Title>
          <Row>
            <Col span={12}>
              <Typography.Title level={5} style={{ marginTop: 0 }}>
                Designed By:{" "}
                <Typography.Text style={{ color: "gray" }}>
                  {product?.product?.brand}
                </Typography.Text>
              </Typography.Title>
            </Col>
            <Col span={12} style={{ display: "flex", justifyContent: "end" }}>
              <Button
                icon={<SettingOutlined />}
                shape="circle"
                type="primary"
                style={{ boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)" }}
                onClick={() => {
                  setOpen(true);
                }}
              />
            </Col>
          </Row>

          <Typography.Title
            level={2}
            style={{ fontWeight: 500, marginTop: "1.5rem" }}
          >
            {`₹ ${product?.product?.price}`}
          </Typography.Title>
          <Typography.Title level={4}>
            Color:{" "}
            <Typography.Text style={{ color: "gray", fontSize: "18px" }}>
              {product?.product?.color}
            </Typography.Text>
          </Typography.Title>
          <Row style={{ marginTop: "3rem" }}>
            <Col span={24}>
              <Button
                size="large"
                type="primary"
                block
                icon={<ShoppingFilled />}
                onClick={() => {
                  BuyProduct(
                    (res) => message.success("Order Placed Successfully!"),
                    () => {},
                    {
                      payload: { product_id: product?.product?.id },
                      accessToken: auth?.accessToken,
                    }
                  );
                }}
              >
                Place Order
              </Button>
            </Col>
          </Row>
          <Typography.Title level={4} style={{ marginTop: "3rem" }}>
            Description
          </Typography.Title>
          <Typography.Title
            level={5}
            style={{ fontWeight: 500, color: "gray", marginTop: "0" }}
          >
            {product?.product?.description}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Title level={2}>Similar Products</Typography.Title>
          <Row
            gutter={[24, 24]}
            style={{
              padding: xl ? "6rem" : md ? "3rem" : "4rem 2rem",
              marginLeft: 0,
              marginRight: 0,
            }}
          >
            {product?.similar_products?.slice(0, 8)?.map((item, index) => {
              return (
                <Col span={6} key={index}>
                  <ProductCard
                    name={item?.name}
                    image={item?.image}
                    id={item?.id}
                    price={item?.price}
                    wishList={false}
                    cart={false}
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default Productpage;

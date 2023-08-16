import React from "react";
import { Card, ConfigProvider, Typography, message } from "antd";
import { Link } from "react-router-dom";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  ShoppingFilled,
} from "@ant-design/icons";
import useHttp from "../hooks/useHttp";
import { AddToCart, AddToWishList } from "../lib/api";
import { useRecoilValue } from "recoil";
import { authState } from "./authState";

const { Meta } = Card;
interface CardProps {
  image: string;
  id: number;
  name: string;
  price: number;
}
const ProductCard: React.FC<CardProps> = ({ id, image, name, price }) => {
  const { sendRequest } = useHttp(AddToWishList);
  const { sendRequest: AddCart } = useHttp(AddToCart);
  const [isWishList, setIsWishlist] = React.useState(false);
  const [isCart, setIsCart] = React.useState(false);
  const auth = useRecoilValue(authState);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorLink: "#213555",
          colorLinkHover: "#B799FF",
        },
      }}
    >
      <Card
        actions={[
          !isWishList ? (
            <HeartOutlined
              onClick={() => {
                if (!auth.isLoggedIn) {
                  message.error("User is not logged in!");
                  return;
                } else {
                  sendRequest(
                    () => {
                      message.success("Added to wishlist!");
                      setIsWishlist(true);
                    },
                    (err) => console.log(err),
                    {
                      payload: { product_inventory_id: id },
                      accessToken: auth?.accessToken,
                    }
                  );
                }
              }}
              key="setting"
            />
          ) : (
            <HeartFilled />
          ),
          !isCart ? (
            <ShoppingCartOutlined
              onClick={() => {
                if (!auth.isLoggedIn) {
                  message.error("User is not logged in!");
                  return;
                } else {
                  AddCart(
                    () => {
                      message.success("Added to Cart!");
                      setIsCart(true);
                    },
                    (err) => console.log(err),
                    {
                      payload: { product_inventory_id: id, quantity: 1 },
                      accessToken: auth?.accessToken,
                    }
                  );
                }
              }}
              key="edit"
            />
          ) : (
            <ShoppingFilled />
          ),
        ]}
        hoverable
        cover={
          <img
            alt="example"
            src={image}
            style={{
              height: "300px",
              // width: "80%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        }
        style={{}}
      >
        <Meta
          title={<Link to={`/product/${id}`}>{name}</Link>}
          description={
            <Typography.Title level={5}>Rs. {price || 1000}</Typography.Title>
          }
        />
      </Card>
    </ConfigProvider>
  );
};

export default ProductCard;

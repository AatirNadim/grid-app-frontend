import React from "react";
import { Card, ConfigProvider, Typography, message } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;
interface CardProps {
  to: string;
  image: string;
  id: number;
  name: string;
  price: number;
}
const ProductCard: React.FC<CardProps> = ({ to, image, name, price }) => {
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
          <HeartOutlined
            onClick={() => message.success("Wishlist")}
            key="setting"
          />,
          <ShoppingCartOutlined
            onClick={() => message.success("cart")}
            key="edit"
          />,
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
          title={<Link to={to}>{name}</Link>}
          description={
            <Typography.Title level={5}>Rs. {price}</Typography.Title>
          }
        />
      </Card>
    </ConfigProvider>
  );
};

export default ProductCard;

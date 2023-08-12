import React from "react";
import { Card, ConfigProvider, Typography, message } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { productState } from "./productState";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
interface CardProps {
  to: string;
  image: string;
  id: number;
  name: string;
  price: number;
}
const ProductCard: React.FC<CardProps> = ({ to, image, id, name, price }) => {
  const navigate = useNavigate();
  const [productVal, setProductVal] = useRecoilState(productState);
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
          // title={<Link to={to}>{name}</Link>}
          title = {
            <span onClick={() => {
              // setProductVal({
              //   id: id,
              //   link: to,
              //   image: image,
              //   name: name,
              //   price: price,
              // });
              // navigate(`/product?id=${id}`)
              navigate(`/product/${id}`)
            }} 
              className="hover:text-blue-600 transition "
            >{name}</span>
          }
          description={
            <Typography.Title level={5}>Rs. {price}</Typography.Title>
          }
        />
      </Card>
    </ConfigProvider>
  );
};

export default ProductCard;

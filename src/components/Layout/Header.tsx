/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Grid,
  ConfigProvider,
  Row,
  Col,
  Button,
  Input,
  Typography,
} from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./Loginform";
import SignupModal from "./SignupForm";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authState";
import WishlistModal from "./WishlistModal";
import CartModal from "./CartModal";
import OrdersModal from "./OrdersModal";

const { useBreakpoint } = Grid;

const TopNavigation = () => {
  const { lg } = useBreakpoint();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  return (
    <ConfigProvider
      theme={{
        token: {
          // colorBgHeader: "#fff"
          colorPrimary: "#A459D1",
          colorPrimaryHover: "#7b439e",
          borderRadius: 4,
          colorLink: "#213555",
          colorLinkHover: "#B799FF",
          lineWidth: 2,
        },
      }}
    >
      <LoginModal open={loginOpen} setOpen={setLoginOpen} />
      <SignupModal open={signupOpen} setOpen={setSignupOpen} />
      <WishlistModal open={wishlistOpen} setOpen={setWishlistOpen} />
      <OrdersModal open={ordersOpen} setOpen={setOrdersOpen} />
      <CartModal open={cartOpen} setOpen={setCartOpen} />
      <Row
        // className="sticky top-0 z-10 bg-white shadow-md"
        style={{
          padding: "1rem 2rem",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "#fff",
        }}
        justify="center"
      >
        <Col sm={24} lg={14}>
          <Row gutter={12}>
            <Col span={6} className="flex justify-center !items-center">
              <Link to="/">
                <Typography.Text
                  style={{
                    margin: 0,
                    fontFamily: "cursive",
                    fontSize: "32px",
                    color: "#FC7300",
                    fontWeight: 600,
                  }}
                >
                  Grid
                </Typography.Text>
                <Typography.Text
                  style={{
                    margin: 0,
                    fontFamily: "cursive",
                    fontSize: "32px",
                    color: "#2874f0",
                    fontWeight: 600,
                  }}
                >
                  Kart
                </Typography.Text>
              </Link>
            </Col>
            <Col
              span={16}
              xl={12}
              style={{ display: "flex", alignItems: "center" }}
            >
              {/* Searchbar */}
              <Input.Search
                onSearch={(prompt) => {
                  if (prompt === "") return;
                  navigate("/search/" + prompt);
                }}
                placeholder="Search for products..."
              />
            </Col>
          </Row>
        </Col>
        <Col
          lg={10}
          span={0}
          sm={0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          {!auth?.isLoggedIn && lg && (
            <Button
              onClick={() => setLoginOpen(true)}
              size="large"
              style={{ marginRight: "1rem" }}
              className="mr-4 font-semibold border-2 text-gray-700"
            >
              {/* <Typography.Text className="h-[fit-content]" > */}
              Login
              {/* </Typography.Text> */}
            </Button>
          )}
          {!auth?.isLoggedIn && lg && (
            <Button
              onClick={() => setSignupOpen(true)}
              size="large"
              type="primary"
              className=" font-semibold"
            >
              {" "}
              Signup
            </Button>
          )}
          {auth?.isLoggedIn && lg && (
            <Button
              style={{ marginRight: "1rem" }}
              className=""
              size="large"
              type="link"
              onClick={() => setCartOpen(true)}
              icon={<ShoppingCartOutlined />}
            >
              Cart
            </Button>
          )}
          {auth?.isLoggedIn && lg && (
            <Button
              style={{ marginRight: "1rem" }}
              size="large"
              type="link"
              icon={<HeartFilled />}
              onClick={() => setWishlistOpen(true)}
            >
              Wishlist
            </Button>
          )}
          {auth?.isLoggedIn && lg && (
            <Button
              size="large"
              type="link"
              icon={<UserOutlined />}
              onClick={() => setOrdersOpen(true)}
            >
              Orders
            </Button>
          )}
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default TopNavigation;

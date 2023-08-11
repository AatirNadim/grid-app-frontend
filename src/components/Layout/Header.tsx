import {
  // Grid,
  ConfigProvider,
  Typography,
  Row,
  Col,
  Button,
  Input,
} from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./Loginform";

// const { useBreakpoint } = Grid;

const TopNavigation = () => {
  // const { sm } = useBreakpoint();
  const [open, setOpen] = useState(false);

  return (
    <ConfigProvider
      theme={{
        token: {
          // colorBgHeader: "#fff"
          colorPrimary: "#6845",
        },
      }}
    >
      <LoginModal open={open} setOpen={setOpen} />
      <Row
        className="sticky top-0 z-10"
        style={{ padding: "1rem 2rem" }}
        justify="center"
      >
        <Col span={12}>
          <Row gutter={12}>
            <Col span={8} className="flex justify-center !items-center">
              <Link to="/">
                <img src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg" />
              </Link>
            </Col>
            <Col span={12} style={{ display: "flex", alignItems: "center" }}>
              {/* Searchbar */}
              <Input.Search placeholder="Basic usage" />
            </Col>
          </Row>
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Button
            onClick={() => setOpen(true)}
            size="large"
            style={{ marginRight: "1rem" }}
          >
            <Typography.Text>Login</Typography.Text>
          </Button>
          <Button size="large" type="primary">
            {" "}
            Signup
          </Button>
          <Button size="large" type="link" icon={<UserOutlined />}>
            Account
          </Button>
          <Button size="large" type="link" icon={<ShoppingCartOutlined />}>
            Cart
          </Button>
          <Button size="large" type="link" icon={<HeartOutlined />}>
            Wishlist
          </Button>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default TopNavigation;

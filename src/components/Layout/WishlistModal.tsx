import { Avatar, ConfigProvider, List, Modal, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { GetWishlistedProducts } from "../../lib/api";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authState";

const WishlistModal = (props) => {
  const { sendRequest, isLoading } = useHttp(GetWishlistedProducts);
  const auth = useRecoilValue(authState);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    sendRequest(
      (res) => {
        console.log(res);
        setProducts(res);
      },
      () => {},
      {
        accessToken: auth?.accessToken,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1a5173",
          colorPrimaryBg: "#e6f4ff",
          borderRadius: 4,
        },
      }}
    >
      <Modal
        destroyOnClose
        bodyStyle={{ height: "80vh", overflow: "auto" }}
        style={{
          top: 20,
        }}
        open={props.open}
        footer={null}
        onCancel={() => props.setOpen(false)}
      >
        {isLoading ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
              style={{}}
            />
          </div>
        ) : (
          <div>
            <Typography.Title level={3} style={{ marginLeft: "1.5rem" }}>
              Your Wishlist
            </Typography.Title>
            <div>
              <List
                dataSource={products}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item?.product[0]?.image} />}
                      title={
                        <Link to={`/product/${item?.product[0]?.id}`}>
                          {item?.product[0]?.name}
                        </Link>
                      }
                      description={
                        item?.product[0]?.description?.substr(0, 100) + "..."
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        )}
      </Modal>
    </ConfigProvider>
  );
};

export default WishlistModal;

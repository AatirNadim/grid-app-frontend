/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import ProductCard from "../../atoms/ProductCard";
import useHttp from "../../hooks/useHttp";
import {
  GetWishlistedProducts,
  getALLProductsWithoutLogin,
} from "../../lib/api";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authState";
const ProductRows = () => {
  const { sendRequest: getProducts } = useHttp(getALLProductsWithoutLogin);
  const { sendRequest: getWishlistedProducts } = useHttp(GetWishlistedProducts);
  const auth = useRecoilValue(authState);
  const [normalProducts, setNormalProducts] = useState([]);

  useEffect(() => {
    console.log(auth);
    getWishlistedProducts(
      (res) => {
        getProducts(
          (products) => {
            setNormalProducts((prev) => {
              return products?.map((item) => {
                return {
                  ...item,
                  isWishList:
                    res?.filter((p) => +p?.product[0]?.id === +item.id).length >
                    0
                      ? true
                      : false,
                };
              });
            });
          },
          (err) => console.log(err),
          {}
        );
      },
      () => {},
      { accessToken: auth?.accessToken }
    );
    if (!auth.isLoggedIn) {
      getProducts(
        (res) => {
          setNormalProducts((prev) => {
            return res;
          });
        },
        (err) => console.log(err),
        {}
      );
    }
  }, [auth.isLoggedIn]);

  console.log(normalProducts);

  return (
    <>
      <Row style={{ padding: "6rem" }}>
        <Col span={24}>
          <Typography.Title level={1} style={{ marginBottom: "4rem" }}>
            Trending
          </Typography.Title>
          <Row gutter={[24, 24]}>
            {normalProducts?.map((item, idx) => {
              return (
                <Col key={idx} xl={6} md={8} sm={12} xs={24}>
                  <ProductCard
                    wishList={item?.isWishList}
                    image={item.image}
                    id={item.id}
                    name={item.name}
                    productInventoryId={item?.inventory[0]?.id}
                    price={+item?.inventory[0]?.price}
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ProductRows;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Typography, Grid } from "antd";
import { useEffect, useState } from "react";
import ProductCard from "../../atoms/ProductCard";
import useHttp from "../../hooks/useHttp";
import {
  GetCartProducts,
  GetRecommendedProducts,
  GetWishlistedProducts,
  getALLProductsWithoutLogin,
} from "../../lib/api";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authState";
const { useBreakpoint } = Grid;

const ProductRows = () => {
  const { xl, md } = useBreakpoint();
  const { sendRequest: getProducts } = useHttp(getALLProductsWithoutLogin);
  const { sendRequest: getWishlistedProducts } = useHttp(GetWishlistedProducts);
  const { sendRequest: getCartProducts } = useHttp(GetCartProducts);
  const { sendRequest: getRecommendedProducts } = useHttp(
    GetRecommendedProducts
  );
  const auth = useRecoilValue(authState);
  const [normalProducts, setNormalProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    if (auth?.isLoggedIn && auth?.accessToken !== "") {
      getWishlistedProducts(
        (wishlist) => {
          getCartProducts(
            (cart) => {
              getProducts(
                (products) => {
                  setNormalProducts((prev) => {
                    return products?.map((item) => {
                      return {
                        ...item,
                        isWishList:
                          wishlist?.filter(
                            (p) => +p?.product[0]?.id === +item?.id
                          ).length > 0
                            ? true
                            : false,
                        isCart:
                          cart?.filter((p) => +p?.product[0]?.id === +item?.id)
                            .length > 0,
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
        },
        () => {},
        { accessToken: auth?.accessToken }
      );
    }
    if (auth.isLoggedIn) {
      getRecommendedProducts(
        (res) => {
          console.log(res);
          setRecommendedProducts(res);
        },
        () => {},
        { accessToken: auth.accessToken }
      );
    }
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

  return (
    <>
      <Row
        gutter={[24, 24]}
        style={{ padding: xl ? "6rem" : md ? "4rem" : "4rem 2rem" }}
      >
        <Col span={24}>
          <Typography.Title level={1} style={{ marginBottom: "4rem" }}>
            Our Products
          </Typography.Title>
          <Row gutter={[24, 24]}>
            {normalProducts?.slice(0, 8)?.map((item, idx) => {
              return (
                <Col key={idx} xl={6} md={8} sm={12} xs={24}>
                  <ProductCard
                    wishList={item?.isWishList}
                    cart={item?.isCart}
                    image={item.image}
                    id={item.id}
                    name={item.name}
                    // productInventoryId={item?.inventory[0]?.id}
                    price={+item?.price}
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col span={24}>
          <Typography.Title level={1} style={{ marginBottom: "4rem" }}>
            Recommended for You.
          </Typography.Title>
          <Row gutter={[24, 24]}>
            {recommendedProducts?.slice(0, 8)?.map((item, idx) => {
              return (
                <Col key={idx} xl={6} md={8} sm={12} xs={24}>
                  <ProductCard
                    wishList={item?.isWishList}
                    cart={item?.isCart}
                    image={item.image}
                    id={item.id}
                    name={item.name}
                    // productInventoryId={item?.inventory[0]?.id}
                    price={+item?.price}
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

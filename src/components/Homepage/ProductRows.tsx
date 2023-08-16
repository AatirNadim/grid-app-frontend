/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import ProductCard from "../../atoms/ProductCard";
import useHttp from "../../hooks/useHttp";
import { getALLProductsWithoutLogin } from "../../lib/api";
const ProductRows = () => {
  const { sendRequest } = useHttp(getALLProductsWithoutLogin);
  const [normalProducts, setNormalProducts] = useState([]);

  useEffect(() => {
    sendRequest(
      (res) => {
        console.log(res);
        setNormalProducts((prev) => {
          return res;
        });
      },
      (err) => console.log(err),
      {}
    );
  }, []);

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
                    image={item.image}
                    id={item.id}
                    name={item.name}
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

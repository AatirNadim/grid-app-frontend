import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { GetProductsBySearch } from "../../lib/api";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authState";
import { Col, Row, Spin, Grid, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ProductCard from "../../atoms/ProductCard";

const { useBreakpoint } = Grid;

const ProductsPage = () => {
  const { prompt } = useParams();
  const { sendRequest: GetSearchProducts, isLoading } =
    useHttp(GetProductsBySearch);
  const [products, setProducts] = useState([]);
  const auth = useRecoilValue(authState);
  const { xl, md } = useBreakpoint();

  useEffect(() => {
    GetSearchProducts(
      (res) => {
        console.log(res);
        setProducts(res);
      },
      () => {},
      { payload: { prompt: prompt }, accessToken: auth.accessToken }
    );
  }, [prompt]);
  return (
    <Row
      justify={"center"}
      gutter={[24, 24]}
      style={{
        minHeight: "100vh",
        backgroundColor: "#C4DFDF",
        marginLeft: 0,
        marginRight: 0,
        padding: xl ? "6rem" : md ? "3rem" : "4rem 2rem",
      }}
    >
      {isLoading && (
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {!isLoading && (
        <>
          <Col span={24}>
            <Typography.Title style={{ marginBottom: "2rem" }} level={2}>
              Search results for "{prompt}"
            </Typography.Title>
          </Col>
          {products?.map((item, idx) => {
            return (
              <Col key={idx} span={6}>
                <ProductCard
                  image={item?.image}
                  id={item?.id}
                  name={item?.name}
                  price={item?.price}
                  wishList={false}
                  cart={false}
                />
              </Col>
            );
          })}
        </>
      )}
    </Row>
  );
};

export default ProductsPage;

import { Col, Row, Typography } from "antd";
import ProductCard from "../../atoms/ProductCard";
import { products } from "../../utils/products";
const ProductRows = () => {
  

  return (
    <>
      <Row style={{ padding: "6rem" }}>
        <Col span={24}>
          <Typography.Title level={1} style={{ marginBottom: "4rem" }}>
            Trending
          </Typography.Title>
          <Row gutter={[24, 24]}>
            {products.map((item, idx) => {
              return (
                <Col key={idx} xl={6} md={8} sm={12} xs={24}>
                  <ProductCard
                    to={item.link}
                    image={item.image}
                    id={item.id}
                    name={item.name}
                    price={item.price}
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

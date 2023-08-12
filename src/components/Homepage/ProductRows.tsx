import { Col, Row, Typography } from "antd";
import ProductCard from "../../atoms/ProductCard";
const products = [
  {
    link: "/",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    id: 1,
    name: "Cotton Schiffli Tier Dress",
    price: 2199,
  },
  {
    link: "/",
    image:
      "https://beabrand-public-uploads.s3.ap-south-1.amazonaws.com/admin/95/466/6409c177-6afd-4221-8975-e0b5d9f4fe85",
    id: 2,
    name: "Pure Cotton Striped Beige Midi Dress",
    price: 3099,
  },
  {
    link: "/",
    id: 3,
    image:
      "https://beabrand-public-uploads.s3.ap-south-1.amazonaws.com/admin/95/470/05c02a3a-330e-46a9-b930-4c54b8c1c8eb",
    name: "Viscose Moss Mustard Midi dress",
    price: 2099,
  },
  {
    link: "/",
    id: 4,
    image:
      "https://beabrand-public-uploads.s3.ap-south-1.amazonaws.com/admin/95/463/90a0c7c6-b24c-44d7-96e4-12965b92f9b6",
    name: "Printed Polyester Satin Button Through Shirt Dress",
    price: 1599,
  },
  {
    link: "/",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    id: 5,
    name: "Cotton Schiffli Tier Dress",
    price: 2199,
  },
  {
    link: "/",
    image:
      "https://beabrand-public-uploads.s3.ap-south-1.amazonaws.com/admin/95/466/6409c177-6afd-4221-8975-e0b5d9f4fe85",
    id: 6,
    name: "Pure Cotton Striped Beige Midi Dress",
    price: 3099,
  },
  {
    link: "/",
    id: 7,
    image:
      "https://beabrand-public-uploads.s3.ap-south-1.amazonaws.com/admin/95/470/05c02a3a-330e-46a9-b930-4c54b8c1c8eb",
    name: "Viscose Moss Mustard Midi dress",
    price: 2099,
  },
  {
    link: "/",
    id: 8,
    image:
      "https://beabrand-public-uploads.s3.ap-south-1.amazonaws.com/admin/95/463/90a0c7c6-b24c-44d7-96e4-12965b92f9b6",
    name: "Printed Polyester Satin Button Through Shirt Dress",
    price: 1599,
  },
];
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

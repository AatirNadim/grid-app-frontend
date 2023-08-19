import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import { GetProductsBySearch } from "../../lib/api";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authState";
const ProductsPage = () => {
  const { prompt } = useParams();
  const { sendRequest: GetSearchProducts } = useHttp(GetProductsBySearch);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    GetSearchProducts(
      (res) => {
        console.log(res);
      },
      () => {},
      { payload: { prompt: prompt }, accessToken: auth.accessToken }
    );
  }, [prompt]);
  return <div>ProductsPage</div>;
};

export default ProductsPage;

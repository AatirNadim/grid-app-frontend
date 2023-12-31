import axios from "axios";

const BASE_URL = "http://192.168.0.108:8000";

export const UserSignup = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/register/`, {
      ...payload,
    });
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

export const UserLogin = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/login/`, {
      ...payload,
    });
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const getALLProductsWithoutLogin = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/product/get/`);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

export const AddToWishList = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/product/createWishlist/`,
      {
        ...payload?.payload,
      },
      { headers: { Authorization: "Bearer " + payload.accessToken } }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

export const AddToCart = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/product/addtocart/`,
      {
        ...payload?.payload,
      },
      { headers: { Authorization: "Bearer " + payload.accessToken } }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

export const GetWishlistedProducts = async (payload) => {
  console.log(payload);
  try {
    const response = await axios.get(`${BASE_URL}/api/product/getWishlist/`, {
      headers: { Authorization: "Bearer " + payload.accessToken },
    });
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

export const GetCartProducts = async (payload) => {
  console.log(payload);
  try {
    const response = await axios.get(`${BASE_URL}/api/product/getCart/`, {
      headers: { Authorization: "Bearer " + payload.accessToken },
    });
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

export const GetProductById = async (payload) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/product/get/${payload?.id}/`
      // {
      //   headers: { Authorization: "Bearer " + payload.accessToken },
      // }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

export const SendLocationHistory = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/product/createHistory/`,
      {
        ...payload?.payload,
      },
      { headers: { Authorization: "Bearer " + payload.accessToken } }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

export const GetRecommendedProducts = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/product/searchInDb/`,
      {
        // ...payload?.payload,
      },
      { headers: { Authorization: "Bearer " + payload.accessToken } }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

export const GetProductsBySearch = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/product/trending/`,
      {
        ...payload?.payload,
      },
      { headers: { Authorization: "Bearer " + payload.accessToken } }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

export const GetProductsByLocation = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/product/searchbyLocation/`,
      {
        // ...payload?.payload,
      },
      { headers: { Authorization: "Bearer " + payload.accessToken } }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

export const GetOrders = async (payload) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/product/getOrder/`, {
      headers: { Authorization: "Bearer " + payload.accessToken },
    });
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

export const PlaceOrder = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/product/createOrder/`,
      { ...payload?.payload },
      {
        headers: { Authorization: "Bearer " + payload.accessToken },
      }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.error(error);
    throw error;
  }
};

export const GetImageWithPrompt = async(payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/product/generateImagetoImage/`, {
      ...payload?.payload,
    },
    { headers: { Authorization: "Bearer " + payload.accessToken } }
    )
    console.log('resposne from getimagewith prompt api', response)
    return response.data
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const RequestProduct = async(payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/product/requestProduct/`, {
      ...payload?.payload,
    },
    { headers: { Authorization: "Bearer " + payload.accessToken } }
    )
    return response.data
  } catch (err) {
    console.error(err);
    throw err;
  }
}
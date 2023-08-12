import axios from "axios";

const BASE_URL = "https://gridbackend.onrender.com";

export const UserSignup = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/register/`, {
      ...payload,
    });
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    console.log(error);
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
    console.log(error);
    throw error;
  }
};

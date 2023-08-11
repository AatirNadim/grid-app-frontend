import { useCallback, useState } from "react";

const useHttp = (requestFunction) => {
  const [error, setError] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const sendRequest = useCallback(
    async (successHandler, errorHandler, requestData) => {
      setIsloading(true);
      setError(null);
      setErrorCode(null);
      try {
        const responseData = await requestFunction(requestData);
        successHandler(responseData);
      } catch (error) {
        console.log(error);
        setErrorCode(error.code || 400);
        setError(error.message || "Something went wrong!");
        errorHandler(error);
      }
      setIsloading(false);
    },
    [requestFunction]
  );

  return {
    errorCode,
    error,
    isLoading,
    sendRequest,
    setError,
  };
};

export default useHttp;

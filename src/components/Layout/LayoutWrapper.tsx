/* eslint-disable @typescript-eslint/no-unused-vars */
import { Layout, ConfigProvider } from "antd";
import { useEffect } from "react";
// import Sidebar from "./Sidebar/Sidebar";
import TopNavigation from "./Header";
import { useSetRecoilState } from "recoil";
import { authState } from "../../atoms/authState";

const { Content } = Layout;

const LayoutWrapper = ({ children }) => {
  const setAuth = useSetRecoilState(authState)
  useEffect(() => {
    if(localStorage.getItem("accessToken")){
      setAuth(prev => {
        return {
          isLoggedIn: true,
          accessToken: localStorage.getItem("accessToken"),
          refreshToken: localStorage.getItem("refreshToken")
        }
      })
    }
  });
  return (
    <ConfigProvider
      theme={{
        token: {
          //   colorPrimary: "#D0BFFF",
          //   borderRadius: 4,
          //   colorBgContainer: "#f6ffed",
        },
      }}
    >
      <Layout hasSider>
        {/* <Sidebar /> */}
        <Layout className="site-layout" style={{}}>
          <TopNavigation />
          <Content
            style={{
              overflow: "initial",
              backgroundColor: "#fff",
            }}
          >
            <div
              style={{
                textAlign: "center",
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default LayoutWrapper;

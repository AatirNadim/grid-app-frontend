import { Layout, ConfigProvider } from "antd";
// import Sidebar from "./Sidebar/Sidebar";
import TopNavigation from "./Header";

const { Content } = Layout;

const LayoutWrapper = ({ children }) => {
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

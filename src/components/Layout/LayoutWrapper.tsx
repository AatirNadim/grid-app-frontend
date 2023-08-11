import { Layout } from "antd";
// import Sidebar from "./Sidebar/Sidebar";
import TopNavigation from "./Header";

const { Content } = Layout;

const LayoutWrapper = ({ children }) => {
  return (
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
  );
};
export default LayoutWrapper;

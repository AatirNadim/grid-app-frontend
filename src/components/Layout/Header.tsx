import {
  Layout,
  Grid,
} from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const { useBreakpoint } = Grid;

const TopNavigation = () => {
  // const navigate = useNavigate();
  const { sm } = useBreakpoint();
  // const logoutHandler = () => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  //   localStorage.removeItem("deviceToken");
  //   navigate("/");
  // };

  return (
    <Header
      style={{
        padding: `${sm ? "0 2rem" : "0 1rem"}`,
        position: "sticky",
        top: 0,
        backgroundColor: "#1a5173",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        // height: "8vh",
        display: "flex",
        zIndex: "10",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          marginRight: "1rem",
          // width: "50%",
        }}
      >
        <Link to="/home">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              cursor: "pointer",
            }}
          >
            <img
              src="/logo.svg"
              alt="logoimg"
              height={"50px"}
              width={"100px"}
            />
          </div>
        </Link>
      </div>
      <div>
        
      </div>
    </Header>
  );
};

export default TopNavigation;

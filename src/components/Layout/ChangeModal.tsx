import { Button, Col, ConfigProvider, Modal, Row, message, Input } from "antd";
import useHttp from "../../hooks/useHttp";
import React, { useEffect } from "react";
import { GetImageWithPrompt } from "../../lib/api";
import { authState } from "../../atoms/authState";
import { useRecoilValue } from "recoil";

interface ChangeProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: any;
}

const ChangeModal: React.FC<ChangeProps> = ({ open, setOpen, product }) => {
  const auth = useRecoilValue(authState);
  const [dispProduct, setDispProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [inpPrompt, setInpPrompt] = React.useState("");
  const [possFinal, setPossFinal] = React.useState(false);
  const { sendRequest: GenerateImage } = useHttp(GetImageWithPrompt);
  // post the call, get the result

  useEffect(() => {
    setDispProduct(product);
    // console.log(product)
  }, [product]);

  const handleFinalClick = () => {
    console.log('final click')

  };

  const handleClick = () => {
    if (loading) {
      msgInfo();
      return;
    }
    setPossFinal(true);
    setLoading(true);
    // return;
    GenerateImage(
      (res) => setDispProduct(res),
      (err) => console.error("error fecthing generated image\n\n", err),
      {
        payload: {
          url: dispProduct?.url,
          prompt: inpPrompt,
        },
        accessToken: auth?.accessToken,
      }
    ).catch((err) => {
      console.error("error in the call --> ", err);
    });
    // fetch();
    console.log("prompt -->\n\n", inpPrompt);
  };

  const msgInfo = () => {
    messageApi.info("Please wait while AI loads the image");
  };

  const handleClose = () => {
    if (loading) {
      msgInfo();
      return;
    }
    setOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FC7300",
          // colorPrimaryBg: "#e6f4ff",
          // colorPrimaryHover : '#08ac0a',
          borderRadius: 4,
        },
      }}
    >
      {contextHolder}
      <Modal
        open={open}
        destroyOnClose
        bodyStyle={{ height: "70vh", overflow: "auto", width: "50vw" }}
        style={{ top: 20, width: "60vw" }}
        width={"fit-content"}
        onCancel={handleClose}
        footer={<></>}
      >
        <Row>
          <Col span={12}>
            <img
              style={{
                borderRadius: 6,
                objectFit: "cover",
                objectPosition: "top",
                width: "100%",
              }}
              src={dispProduct?.image}
              alt="image not available"
            />
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingBottom: "1rem",
            }}
          >
            <Row
              style={{
                gap: "1rem",
                marginTop: "2rem",
                alignItems: "center",
              }}
            >
              <Col span={22} offset={2}>
                <Input.TextArea
                  placeholder="Enter prompt to change the attire.."
                  rows={5}
                  onChange={(e) => {
                    setInpPrompt(e.target.value);
                  }}
                ></Input.TextArea>
              </Col>
              <Col span={22} offset={2}>
                <Button
                  type="primary"
                  loading={loading}
                  disabled={loading || inpPrompt.length === 0}
                  style={{
                    marginLeft: "auto",
                  }}
                  onClick={handleClick}
                >
                  Generate Image
                </Button>
              </Col>
            </Row>
            <Row>
              <Col
                span={24}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  loading={loading}
                  type="primary"
                  onClick={handleFinalClick}
                  disabled={!possFinal || !loading}
                >
                  Request the product
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </ConfigProvider>
  );
};

export default ChangeModal;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, Modal } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import useHttp from "../../hooks/useHttp";
import { UserLogin } from "../../lib/api";

interface Values {
  email: string;
  password: string;
}

interface LoginProps {
  open: boolean;
  setOpen: any;
}

interface CollectionCreateFormProps {
  isLoading: boolean;
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  isLoading,
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Login To Your Account."
      okText="Login"
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={isLoading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="login_form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const LoginModal: React.FC<LoginProps> = ({ open, setOpen }) => {
  const { sendRequest, isLoading } = useHttp(UserLogin);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    const payload = {
      email: values.email,
      password: values.password,
      username: values.email,
    };
    sendRequest(
      (res) => {
        console.log(res);
        setOpen(false);
      },
      (err) => {
        console.log(err);
        setOpen(false);
      },
      payload
    );
  };

  return (
    <div>
      <CollectionCreateForm
        isLoading={isLoading}
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default LoginModal;

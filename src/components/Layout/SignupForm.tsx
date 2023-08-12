/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, Modal } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface SignupProps {
  open: boolean;
  setOpen: any;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create Your Account."
      okText="Signup"
      cancelText="Cancel"
      onCancel={onCancel}
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
        name="signup_form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please Enter your first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[
            {
              required: true,
              message: "Please Enter your last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
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

const SignupModal: React.FC<SignupProps> = ({ open, setOpen }) => {
  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  return (
    <div>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default SignupModal;

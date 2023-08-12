/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import useHttp from "../../hooks/useHttp";
import { UserSignup } from "../../lib/api";

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
      bodyStyle={{ padding: "5px", height: "80vh", overflow: "auto" }}
      style={{
        top: 20,
      }}
      confirmLoading={isLoading}
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
        style={{ scrollbarWidth: "none" }}
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
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please select your DOB!",
            },
          ]}
          name="dob"
          label="Date Of Birth"
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select your gender!",
            },
          ]}
        >
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please Enter your phone number!",
            },
          ]}
          name="mobile_no"
          label="Phone"
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: "Please Enter address!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const SignupModal: React.FC<SignupProps> = ({ open, setOpen }) => {
  const { sendRequest, isLoading } = useHttp(UserSignup);
  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    const payload = {
      email: values.email,
      password: values.password,
      username: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      dob: values.dob.$d.toISOString().split("T")[0],
      mobile_no: values.mobile_no,
      address: values.address,
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

export default SignupModal;

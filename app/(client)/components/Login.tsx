"use client";
import React, { useState } from "react";
import { Modal, Form, Input, Button, message, notification } from "antd";
import { loginUser } from "@/app/api/auth";

type Props = {
  visible: boolean;
  onClose: () => void;
  showRegisterModal : () => void;
};

const Login = ({ visible, onClose, showRegisterModal }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
        await loginUser(values);
        notification.success({
          message: 'Success',
          description: 'Đăng nhập thành công!',
        });
        setLoading(false);
        onClose();
      } catch (error : any) {
        console.error('Đăng nhập không thành công:', error);
        notification.error({
          message: 'Error',
          description: `Error: ${error.response?.data?.error || 'Something went wrong!'}`,
        });
        setLoading(false);
      }
  };

  return (
    <div>
      <Modal  visible={visible} onCancel={onClose} footer={null} >
        <h1 className="p-5 text-xl font-bold">Login</h1>
        <Form onFinish={handleLogin} className="p-5">
         
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="p-5">
            <p >Chưa có tài khoản? <span className="text-sm text-blue-500 cursor-pointer" onClick={showRegisterModal}>Đăng ký</span></p>
        </div>
      </Modal>
    </div>
  );
};

export default Login;

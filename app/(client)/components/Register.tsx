import React, { useState } from 'react';
import { Modal, Form, Input, Button, message, Upload, notification } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';
import { createUser } from '@/app/api/auth';
type Props = {
  visible: boolean;
  onClose: () => void;
  showLoginModal: () => void;
};

const Register = ({ visible, onClose, showLoginModal }: Props) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleRegister = async (values: any) => {
    setLoading(true);
   
    try {
      await createUser(values, fileList);
      notification.success({
        message: 'Success',
        description: 'Đăng thành công!',
      });
      setLoading(false);
      onClose();
    } catch (error : any) {
      console.error('Đăng ký không thành công:', error);
      notification.error({
        message: 'Error',
        description: `Error: ${error.response?.data?.error || 'Something went wrong!'}`,
      });
      setLoading(false);
    }
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const imgWindow = window.open(src);
    if (imgWindow) {
      imgWindow.document.write(`<img src="${src}" style="max-width: 100%; max-height: 100%;" />`);
    }
  };

 

  return (
    <Modal visible={visible} onCancel={onClose} footer={null}>
      <h1 className="p-5 text-xl font-bold">Đăng ký</h1>
      <Form onFinish={handleRegister} className="p-5">
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input placeholder="Họ tên" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập Email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <h1 className="font-semibold">Thêm ảnh</h1>
        <div className="my-3">
          <ImgCrop modalTitle="Chỉnh sửa ảnh">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </ImgCrop>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
      <div className="p-5">
            <p >Đã có tài khoản? <span className="text-sm text-blue-500 cursor-pointer" onClick={showLoginModal}>Đăng nhập</span></p>
        </div>
    </Modal>
  );
};

export default Register;

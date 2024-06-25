import React, { useEffect, useState } from "react";
import { Button, Modal, Tag, Input, Flex, Rate, Upload, message,notification  } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { createReview } from "@/app/api/review";

type Props = {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  movieId : number;
  refetch : any
};
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const ModalComment = ({ setIsModalOpen, isModalOpen, movieId, refetch }: Props) => {
  const [value, setValue] = useState(10);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [comment, setComment] = useState("");
  const { TextArea } = Input;
  const desc = [
    " Kén người mê",
    " Kén người mê",
    "Chưa ưng lắm",
    "Chưa ưng lắm",
    "Tạm ổn",
    "Tạm ổn",
    "Đáng xem",
    "Đáng xem",
    "Cực phẩm",
    "Cực phẩm",
  ];
  
  const handleOk = async () => {
   
    try {
      await createReview(value, comment, fileList, movieId)
      await refetch()
      notification.success({
        message: 'Success',
        description: 'Đăng thành công!',
      });
      setIsModalOpen(false);
      setFileList([])
      setComment("")
    } catch (error : any) {
      console.error("Error:", error);
      setIsModalOpen(false);
      setFileList([])
      setComment("")
      notification.error({
        message: 'Error',
        description: `Error: ${error.response?.data?.error || 'Something went wrong!'}`,
      });
      
    }
  };
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log("file",fileList)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className="">
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="w-[300px] rounded"
        //   closable={false}
        footer={null}
      >
        <div className="p-4">
          <h1 className="text-center font-semibold">Bình Luận</h1>
          <label htmlFor="" className="font-semibold my-2">
            Đánh giá
          </label>
          <Flex className="mt-2" gap="middle" vertical>
            <Rate
              tooltips={desc}
              onChange={setValue}
              value={value}
              count={10}
            />
            {value ? (
              <span className="text-sm font-semibold">{desc[value - 1]}</span>
            ) : null}
          </Flex>

          <label className="font-semibold mt-2" htmlFor="">
            Nội dung bình luận
          </label>
          <TextArea rows={4} value={comment} onChange={(e) => setComment(e.target.value)} />
          <h1 className="font-semibold mt-2">Thêm ảnh</h1>
          <div>
            <ImgCrop rotationSlider>
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="primary" onClick={handleOk}>
              Đăng
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalComment;

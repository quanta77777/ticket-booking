import React from 'react'
import { Button, Modal, Tag } from "antd";
type Props = {
    setIsModalOpen: (value: boolean) => void;
    isModalOpen: boolean;
}

const ModalComment = ({ setIsModalOpen, isModalOpen }: Props) => {
    const handleOk = () => {
        setIsModalOpen(false);
      };

      
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="overflow-auto !min-w-[500px] md:!w-[800px] no-scrollbar rounded"
          //   closable={false}
          footer={null}
        >
            <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eos esse rem vel nulla libero doloremque odit commodi beatae. Maiores molestias id culpa accusamus velit, sapiente sit eos eaque commodi?</div>
         
        </Modal>
       
      </div>
  )
}

export default ModalComment
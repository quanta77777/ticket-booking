"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal, Tag } from "antd";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { useGetProductWithBranchID } from "../../api/product";
import TicketInfo from "./TicketInfo";
type Props = {
  setIsProductModalOpen: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  isProductModalOpen: boolean;
  info: any;
  selectedSeats: any;
  setSelectedSeats: any
  totalPriceSeat: any;
  refetch : any
};

const ProductModal = ({
  setIsProductModalOpen,
  setIsModalOpen,
  isProductModalOpen,
  info,
  selectedSeats,
  setSelectedSeats,
  totalPriceSeat,
  refetch
}: Props) => {
  const [isTicketInfoModalOpen, setIsTicketInfoModalOpen] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const branchID = info?.branch_id;
  const { data } = useGetProductWithBranchID(branchID);
  // console.log("data", data);

  useEffect(() => {
    if (data) {
      const initializedProducts = data.map((product: any) => ({
        ...product,
        quantity: 0, // Khởi tạo quantity là 0
      }));
      setProducts(initializedProducts);
    }
  }, [data]);

  const handleIncreaseQuantity = (productId: number) => {
    setProducts(
      products.map((product: any) => {
        if (product.product_id === productId && product.quantity < 8) {
          const updatedProduct = { ...product, quantity: product.quantity + 1 };
          updateSelectedProducts(updatedProduct);
          return updatedProduct;
        }
        return product;
      })
    );
  };

  const handleDecreaseQuantity = (productId: number) => {
    setProducts(
      products.map((product: any) => {
        if (product.product_id === productId && product.quantity > 0) {
          const updatedProduct = { ...product, quantity: product.quantity - 1 };
          updateSelectedProducts(updatedProduct);
          return updatedProduct;
        }
        return product;
      })
    );
  };

  const updateSelectedProducts = (updatedProduct: any) => {
    setSelectedProducts((prevSelectedProducts: any) => {
      const existingProduct = prevSelectedProducts.find(
        (product: any) => product.product_id === updatedProduct.product_id
      );
      if (existingProduct) {
        if (updatedProduct.quantity === 0) {
          return prevSelectedProducts.filter(
            (product: any) => product.product_id !== updatedProduct.product_id
          );
        } else {
       
          return prevSelectedProducts.map((product: any) =>
            product.product_id === updatedProduct.product_id
              ? updatedProduct
              : product
          );
        }
      } else {
      
        return [...prevSelectedProducts, updatedProduct];
      }
    });
  };

  const totalPriceProduct = selectedProducts.reduce(
    (total: any, product: any) => total + product.price * product.quantity,
    0
  );

  const handleClick = () => {
    setIsTicketInfoModalOpen(true);
  };

  const showModal = () => {
    setIsProductModalOpen(true);
  };

  const handleOk = () => {
    setIsProductModalOpen(false);
  };
  const handleCancel = () => {
    setSelectedProducts([]);
    setProducts(products.map((product: any) => ({ ...product, quantity: 0 })));
    setIsProductModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={isProductModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="overflow-auto !md:w-auto md:p-5 no-scrollbar rounded mt-3"
        //   closable={false}
        footer={null}
      >
        <div className="w-full h-[400px] relative  overflow-auto bg-white  p-5 no-scrollbar">
          <div className="mt-5">
            {products?.map((item: any) => (
              <div
                className="flex items-center border-b-2 pb-4"
                key={item?.product_id}
              >
                <div className="mr-3">
                  <Image
                    height={110}
                    width={100}
                    src={item?.image_url}
                    alt=""
                  />
                </div>
                <div className="mt-2">
                  <h1 className="text-lg font-bold">
                    {item?.name} - {item?.price.toLocaleString("vi-VN")}đ
                  </h1>
                  <p>{item?.description}</p>
                  <div className="flex items-center">
                    <IconButton
                      color="primary"
                      aria-label="add an alarm"
                      onClick={() => handleDecreaseQuantity(item.product_id)}
                      disabled={item.quantity === 0}
                    >
                      <CiCircleMinus />
                    </IconButton>
                    <span className="w-7 h-7 border flex items-center justify-center rounded-md cursor-context-menu">
                      {item.quantity}
                    </span>
                    <IconButton
                      color="primary"
                      aria-label="add an alarm"
                      onClick={() => handleIncreaseQuantity(item.product_id)}
                      disabled={item.quantity === 8}
                    >
                      <CiCirclePlus />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" p-3">
          <div className="flex justify-between mb-2">
            <span>Tổng cộng</span>
            <h1 className="font-bold text-lg">
              {totalPriceProduct.toLocaleString("vi-VN")}đ
            </h1>
          </div>
          <Button
            className="bg-blue-500 w-full text-white p-6 flex items-center justify-center"
            onClick={handleClick}
          >
            Tiếp tục
          </Button>
        </div>
      </Modal>
      <TicketInfo
        isTicketInfoModalOpen={isTicketInfoModalOpen}
        setIsProductModalOpen={setIsProductModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsTicketInfoModalOpen={setIsTicketInfoModalOpen}
        info={info}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        selectedProducts={selectedProducts}
        totalPriceSeat={totalPriceSeat}
        totalPriceProduct={totalPriceProduct}
        refetch={refetch}
      />
    </div>
  );
};

export default ProductModal;

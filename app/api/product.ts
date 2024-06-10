import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const fetchSeatWithBranchId = async (id : any) => {
  try {
    const response = await axios.get(`${apiUrl}/product?branch-id=${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      
      console.error('Axios error:', error.response?.status, error.response?.data);
    } else {
    
      console.error('Unexpected error:', error);
    }
  
    throw error;
  }
};

const fetchNoOp = async () => {
    return null;
  };

export const useGetProductWithBranchID = (branchId : any) => {
    return useQuery({
        queryKey: ['product',branchId],
        queryFn: branchId === undefined ? fetchNoOp : () => fetchSeatWithBranchId(branchId),
        enabled: !!branchId,
      });
    
  };




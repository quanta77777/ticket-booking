import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchBranchDetails = async (branchId : any) => {
  try {
    const response = await axios.get(`${apiUrl}/branch/${branchId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch branch details');
  }
};

const useBranchDetails = (branchChainIds: any) => {

    const queries = branchChainIds.length
    ? branchChainIds.map((branchId: any) => ({
        queryKey: ['branch', branchId],
        queryFn: () => fetchBranchDetails(branchId),
        enabled: !!branchId
      }))
    : [{ queryKey: ['branch'], queryFn: () => Promise.resolve(null), enabled: false }];

  const branchQueries = useQueries({ queries });

  return branchQueries;
  };

 export const useBranchByID = (branchChainId: any) => {
    return useQuery({queryKey: ['branch', branchChainId],queryFn: () => fetchBranchDetails(branchChainId), enabled: !!branchChainId });
   
  };
  
  
  export default useBranchDetails;


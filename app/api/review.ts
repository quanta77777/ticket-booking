import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchAverageRating = async (id : any) => {
  try {
    const response = await axios.get(`${apiUrl}/movies/${id}/average_rating`);
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

export const fetchReview = async ({ pageParam = 1, queryKey }: any) => {
  try {
    const [_, movieId] = queryKey;
    const limit = 2; // Số lượng comment mỗi lần gọi
    const offset = (pageParam - 1) * limit;

    const response = await axios.get(`${apiUrl}/movies/${movieId}/reviews`, {
      params: { limit, offset }
    });

    const { reviews, nextPage } = response.data;

    // Kiểm tra reviews có phải là mảng và có độ dài khác 0 hay không
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return { reviews: [], nextPage: undefined };
    }

    return {
      reviews,
      nextPage: pageParam + 1,
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Network response was not ok');
  }
};

const fetchUserById = async (userId : any) => {
  try {
    const response = await axios.get(`${apiUrl}/users/${userId}`);
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

export const useGetAverageRating = (movieId : any) => {
    return useQuery({
        queryKey: ['average_rating',movieId],
        queryFn: movieId === undefined ? fetchNoOp : () => fetchAverageRating(movieId),
        enabled: !!movieId,
      });
    
  };

  export const useGetReview = (movieId : any) => {
    return useQuery({
        queryKey: ['reviews',movieId],
        queryFn: movieId === undefined ? fetchNoOp : () => fetchReview(movieId),
        enabled: !!movieId,
      });
    
  };

  export const useGetUser = (userId : any) => {
    return useQuery({
      queryKey: ['user', userId],
      queryFn: () => fetchUserById(userId),
      enabled: !!userId,
    });
  };

export  const createReview = async (value : number, comment : string, fileList : any, movieId : number) => {

    const userId = 4
    const formData = new FormData();
    formData.append("rating", value.toString());
    formData.append("comment", comment);
    formData.append("movie_id", movieId.toString());
    formData.append("user_id", userId.toString());

    if (fileList.length > 0) {
      fileList.forEach((file : any) => {
        formData.append("image", file.originFileObj as File);
      });
    }

    try {
      const response = await axios.post(`${apiUrl}/movies/review`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);
     
      
    } catch (error : any) {
      console.error("Error:", error);
      throw error;
    }
  };




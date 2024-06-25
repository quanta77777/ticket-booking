import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export  const createUser = async (value : any , fileList : any) => {

    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("email", value.email);
    formData.append("password", value.password);

    if (fileList.length > 0) {
        formData.append('image', fileList[0].originFileObj as File);
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/register`, formData, {
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
  export  const loginUser = async (values: any) => {

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email : values.email,
        password: values.password
    });
      console.log("Response:", response.data);
      const { access_token, access_tokenExpiry, refresh_token, refresh_tokenExpiry } = response.data;
    
    // Lưu AccessToken vào cookie với thời gian hết hạn
    Cookies.set('accessToken', access_token, {
      expires: new Date(access_tokenExpiry * 1000), // Chuyển đổi từ Unix timestamp thành milliseconds
      secure: true, // Đảm bảo sử dụng HTTPS khi deploy
      sameSite: 'strict', // Ngăn chặn các yêu cầu Cross-Site Request Forgery (CSRF)
    });

    // Lưu RefreshToken vào cookie với thời gian hết hạn
    Cookies.set('refreshToken', refresh_token, {
      expires: new Date(refresh_tokenExpiry * 1000), // Chuyển đổi từ Unix timestamp thành milliseconds
      secure: true, // Đảm bảo sử dụng HTTPS khi deploy
      sameSite: 'strict', // Ngăn chặn các yêu cầu Cross-Site Request Forgery (CSRF)
    });

    } catch (error : any) {
      console.error("Error:", error);
      throw error;
    }
  };
 
  export const getAuth = async () => {
    const accessToken = Cookies.get('accessToken'); 

    try {
      const response = await axios.get(`${apiUrl}/admin/dashboard`, {
        headers: {
            Authorization: `Bearer ${accessToken}` 
        }
      });
      console.log("Response admin:", response.data);
      
    } catch (error : any) {
      console.error("Error:", error);
      throw error;
    }
  };
import axiosInstance from '../axios.config';

export const Products = {
    fetchProducts: async () => {
        try {
            const response = await axiosInstance.get('/api/product');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
};
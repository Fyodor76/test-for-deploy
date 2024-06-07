
import axiosInstance from '../axios.config';

export const RecommendationsService = {
    fetchRecommendations: async () => {
        try {
            const response = await axiosInstance.get('/api/recommendation');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
};
import API from "./api";

const apiRequest = async (method, url, data = null, config = {}) => {
    try {
        const response = await API({
            method,
            url,
            data: data !== null ? data : undefined,
            ...config
        });
        return response.data;
    } catch (error) {
        console.log(`API Error, method: ${method}, URL: ${url}`, error);

        if (error.response) {
            console.error("Response Data:", error.response.data);
            console.error("Status:", error.response.status);
            console.error("Headers:", error.response.headers);
        }
        throw error;
    }
};

export default apiRequest; // Ispravna sintaksa

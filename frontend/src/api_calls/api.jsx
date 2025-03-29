import axios from 'axios'
const LAMBDA_URL = "https://ea4nstfdljcbmx6wtliy3rkl5q0foapb.lambda-url.us-east-1.on.aws/"

// // Axios instance for custom configuration
// const apiClient = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// Function to fetch player data
export const getPlayerData = async () => {
    // try {
    //     const response = await apiClient.get('/players');
    //     return response.data; // Return the data from the response
    // } catch (error) {
    //     console.error('Error fetching player data:', error);
    //     throw error; // Propagate the error for further handling
    // }
};

// Function to fetch player data
export const getDailyPlayerData = async () => {
    try {
        const response = await axios.get(LAMBDA_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching daily player data:', error);
        throw error; // Propagate the error for further handling
    }
    // try {
    //     const response = await apiClient.get('/dailyplayer');
    //     console.log(response.data);
    //     return response.data; // Return the data from the response
    // } catch (error) {
    //     console.error('Error fetching player data:', error);
    //     throw error; // Propagate the error for further handling
    // }
};
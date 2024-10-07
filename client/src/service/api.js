


// import axios from 'axios';
// import { API_Notiification_messae, SERVICE_URLS } from '../constants/config';

// const API_URL = 'http://localhost:8000';

// const axiosInstance = axios.create({
//     baseURL: API_URL,
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })

// axiosInstance.interceptors.request.use(
//     function (config) {
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//         }
// )

// axiosInstance.interceptors.response.use(
//     function(response){
//         //stop global loder here
//         return processResponse(response);
//     },
//     function (error) {
//         // stop global loder here
//         return Promise.reject(processError(error));
//     }
// )

// const processResponse = (response) =>{
//     if(response?.status === 200){
//         return { isSucess: true, data: response.data }
//     }
//     else{
//         return { 
//             isSucess: false, 
//             status: response?.status,
//             msg: response?.msg, 
//             code: response?.code
//         }
//     }
// }


// const processError = (error) => {

//     if (error.response) {
//         console.log('ERROR IN RESPONSE: ', error.toJSON());
//         return{
//             isError: true,
//             msg: API_Notiification_messae.responseFailure,
//             code: error.response.status
//         }

//     }
//     else if (error.request) {
//         console.log('ERROR IN REQUEST: ', error.toJSON());
//         return{
//             isError: true,
//             msg: API_Notiification_messae.requestFailure,
//             code: ""
//         }

//     }
//     else{
//         console.log('ERROR IN NETWORK: ', error.toJSON());
//         return{
//             isError: true,
//             msg: API_Notiification_messae.networkError,
//             code: ""
//         }

//     }
// }

// const API = {};

// for (const [key, value] of Object.entries(SERVICE_URLS)) {
//     API[key] = (body, showUploadProgress, showDownloadProgress) => {
//         axiosInstance({
//             method: value.method,
//             url: value.url,
//             data: body,
//             responseType: value.responseType,
//             onUploadProgress: function(progressEvent){
//                 if(showUploadProgress) {
//                     let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//                     showUploadProgress(percentageCompleted);
//                 }
//             },
//             onDownloadProgress: function(progressEvent){
//                 if(showDownloadProgress) {
//                     let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//                     showDownloadProgress(percentageCompleted);
//                 }
//             }

//         })
//     }
// }

// export { API };

import axios from 'axios';
import { API_Notiification_messae, SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:8000';

// Axios instance create karo with base URL and headers
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        // Start global loader here (if applicable)
        return config;
    },
    function (error) {
        // Stop global loader here (if applicable)
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    function(response) {
        // Stop global loader here (if applicable)
        return processResponse(response);
    },
    function (error) {
        // Stop global loader here (if applicable)
        return Promise.reject(processError(error));
    }
);

// Function to process the response
const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSucess: true, data: response.data };
    } else {
        return { 
            isSuccess: false, 
            status: response?.status || 'Error',  // Handle undefined status
            msg: response?.data?.msg || 'Unknown error',  // Handle undefined message
            code: response?.data?.code || 'N/A'  // Handle undefined code
        };
    }
};

// Function to process errors
const processError = (error) => {
    if (error.response) {
        // Server responded with a status other than 200 range
        console.log('ERROR IN RESPONSE: ', error.toJSON());
        return {
            isError: true,
            msg: API_Notiification_messae.responseFailure,
            code: error.response.status
        };

    } else if (error.request) {
        // Request was made but no response was received
        console.log('ERROR IN REQUEST: ', error.toJSON());
        return {
            isError: true,
            msg: API_Notiification_messae.requestFailure,
            code: ""
        };

    } else {
        // Something happened in setting up the request
        console.log('ERROR IN NETWORK: ', error.toJSON());
        return {
            isError: true,
            msg: API_Notiification_messae.networkError,
            code: ""
        };
    }
}

// API object to hold all API functions
const API = {};

// Loop through SERVICE_URLS and create functions for each API
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = async (body, showUploadProgress, showDownloadProgress) => {
        try {
            const response = await axiosInstance({
                method: value.method,
                url: value.url,
                data: body,
                responseType: value.responseType,
                onUploadProgress: function (progressEvent) {
                    if (showUploadProgress) {
                        let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        showUploadProgress(percentageCompleted);
                    }
                },
                onDownloadProgress: function (progressEvent) {
                    if (showDownloadProgress) {
                        let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        showDownloadProgress(percentageCompleted);
                    }
                }
            });
            return response;
        } catch (error) {
            return processError(error);
        }
    }
}

export { API };

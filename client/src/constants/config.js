//

export const API_Notiification_messae = {
    loading:{
        type: 'loading...',
        color: '#000000',
        icon: 'loading',
        message:'Data is loading'
    },
    succes: {
        type: 'success',
        color: '#00ff00',
        icon: 'check',
        message: 'Data is loaded'
    },
    responseFailure: {
        type: 'error',
        color: '#ff0000',
        icon: 'error',
        message: 'Data is not loaded'
    },
    requestFailure: {
        type: 'error',
        color: '#ff0000',
        icon: 'error',
        message: 'Request is failed'
    },
    networkError: {
        type: 'error',
        color: '#ff0000',
        icon: 'error',
        message: 'network is failed, please check your internet'
    }
}


export const SERVICE_URLS = {
    userSignup: {
        url: '/signup',
        method: 'POST'
    },
    userLogin: {
        url: '/login',
        method: 'POST'
    }
}
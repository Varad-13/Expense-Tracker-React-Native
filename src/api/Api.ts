import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getApiConfig } from './ApiConfig';

import DeviceInfo from 'react-native-device-info';


const getAndroidId = () => {
  const androidId = DeviceInfo.getUniqueId();
  if(androidId._j){
    console.log(androidId._j)
    return androidId._j;
  } else{
    return "7715cc2590cde8ba";
  }
};

// Function to make a GET request to apiUrl/auth with a custom header
export const getAuthData = async (): Promise<AxiosResponse | null> => {
  try {
    const androidId = getAndroidId();

    // Get API configuration
    const apiConfig = await getApiConfig();
    if (!apiConfig) {
      console.error('API configuration not found.');
      return null;
    }

    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      DEVICEID: androidId,
    };

    // Set up the request config
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiConfig.apiUrl}/auth/`,
      headers,
      timeout: 5000,
    };
    // Make the API call
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error making GET request:', error);
    return null;
  }
};

export const getLimits = async (): Promise<AxiosResponse | null> => {
  try {
    const androidId = getAndroidId();

    // Get API configuration
    const apiConfig = await getApiConfig();
    if (!apiConfig) {
      console.error('API configuration not found.');
      return null;
    }

    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      DEVICEID: androidId,
    };

    // Set up the request config
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiConfig.apiUrl}/get-limit/`,
      headers,
      timeout: 5000,
    };
    // Make the API call
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error making GET request:', error);
    return null;
  }
};

export const getCards = async (): Promise<AxiosResponse | null> => {
  try {
    const androidId = getAndroidId();

    // Get API configuration
    const apiConfig = await getApiConfig();
    if (!apiConfig) {
      console.error('API configuration not found.');
      return null;
    }

    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      DEVICEID: androidId,
    };

    // Set up the request config
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiConfig.apiUrl}/get-cards/`,
      headers,
      timeout: 5000,
    };
    // Make the API call
    
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error making GET request:', error);
    return null;
  }
};

export const getIncoming = async (): Promise<AxiosResponse | null> => {
  try {
    const androidId = getAndroidId();

    // Get API configuration
    const apiConfig = await getApiConfig();
    if (!apiConfig) {
      console.error('API configuration not found.');
      return null;
    }

    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      DEVICEID: androidId,
    };

    // Set up the request config
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiConfig.apiUrl}/get-transaction-credit/`,
      headers,
      timeout: 5000,
    };
    // Make the API call
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error making GET request:', error);
    return null;
  }
};

export const getOutgoing = async (): Promise<AxiosResponse | null> => {
  try {
    const androidId = getAndroidId();

    // Get API configuration
    const apiConfig = await getApiConfig();
    if (!apiConfig) {
      console.error('API configuration not found.');
      return null;
    }

    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      DEVICEID: androidId,
    };

    // Set up the request config
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiConfig.apiUrl}/get-transaction-debit/`,
      headers,
      timeout: 5000,
    };
    // Make the API call
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error making GET request:', error);
    return null;
  }
};

export const getTotalLimits = async (): Promise<AxiosResponse | null> => {
  try {
    const androidId = getAndroidId();

    // Get API configuration
    const apiConfig = await getApiConfig();
    if (!apiConfig) {
      console.error('API configuration not found.');
      return null;
    }

    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      DEVICEID: androidId,
    };

    // Set up the request config
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiConfig.apiUrl}/get-total-limit/`,
      headers,
      timeout: 5000,
    };
    // Make the API call
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error making GET request:', error);
    return null;
  }
};

export const postAddCard = async (data: any): Promise<AxiosResponse | null> => {
  try {
    const androidId = getAndroidId();

    // Get API configuration
    const apiConfig = await getApiConfig();
    if (!apiConfig) {
      console.error('API configuration not found.');
      return null;
    }

    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      DEVICEID: androidId,
    };

    // Set up the request body with the provided data
    const body = {
      nickname: data.nickname,
      holder_name: data.holder_name,
      card_type: data.card_type,
      card_provider: data.card_provider,
      bank_name: data.bank_name,
      validity: data.validity,
      card_number: data.card_number,
      cvv: data.cvv,
      limits: data.limits,
    };

    // Set up the request config
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${apiConfig.apiUrl}/add-card/`,
      headers,
      data: body, // Include the data in the request config
      timeout: 5000,
    };

    // Make the API call
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error making POST request:', error);
    return null;
  }
};

export const postAddTransaction = async (data: any): Promise<AxiosResponse | null> => {
  try {
    const androidId = getAndroidId();

    // Get API configuration
    const apiConfig = await getApiConfig();
    if (!apiConfig) {
      console.error('API configuration not found.');
      return null;
    }

    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      DEVICEID: androidId,
    };

    // Set up the request body with the provided data
    const body = {
      card_number: data.card_number,
      credit_debit: data.credit_debit,
      amount: parseInt(data.amount),
      category: data.category,
    };

    // Set up the request config
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${apiConfig.apiUrl}/add-transaction/`,
      headers,
      data: body, // Include the data in the request config
      timeout: 5000,
    };
    // Make the API call
    const response = await axios(config);
    
    return response;
  } catch (error) {
    console.error('Error making POST request:', error);
    return null;
  }
};

export const putCardLimit = async (data:any): Promise<AxiosResponse | null> => {
  try {
    const androidId = getAndroidId();

    // Get API configuration
    const apiConfig = await getApiConfig();
    if (!apiConfig) {
      console.error('API configuration not found.');
      return null;
    }

    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      DEVICEID: androidId,
    };

    // Set up the request body with the provided data
    const body = {
      card_number: data.card_number,
      limits: parseInt(data.limits)
    };

    // Set up the request config
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `${apiConfig.apiUrl}/update-limit/`,
      headers,
      data: body, // Include the data in the request config
      timeout: 5000,
    };
    // Make the API call
    const response = await axios(config);
    
    return response;
  } catch (error) {
    console.error('Error making POST request:', error);
    return null;
  }
};

export const getTransactions = async (): Promise<AxiosResponse | null> => {
  try {
    const androidId = getAndroidId();

    // Get API configuration
    const apiConfig = await getApiConfig();
    if (!apiConfig) {
      console.error('API configuration not found.');
      return null;
    }

    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      DEVICEID: androidId,
    };

    // Set up the request config
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiConfig.apiUrl}/get-transactions/`,
      headers,
      timeout: 5000,
    };
    // Make the API call
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error making GET request:', error);
    return null;
  }
};

export const getIncomingOutgoing = async (): Promise<AxiosResponse | null> => {
  try {
    const androidId = getAndroidId();

    // Get API configuration
    const apiConfig = await getApiConfig();
    if (!apiConfig) {
      console.error('API configuration not found.');
      return null;
    }

    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      DEVICEID: androidId,
    };

    // Set up the request config
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiConfig.apiUrl}/get-income-expense/`,
      headers,
      timeout: 5000,
    };
    // Make the API call
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error making GET request:', error);
    return null;
  }
};

export const deleteCard = async (data:any): Promise<AxiosResponse | null> => {
  try {
    const androidId = getAndroidId();

    // Get API configuration
    const apiConfig = await getApiConfig();
    if (!apiConfig) {
      console.error('API configuration not found.');
      return null;
    }

    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      DEVICEID: androidId,
    };

    const body = {
      card_number: data.card_number
    }

    // Set up the request config
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `${apiConfig.apiUrl}/delete-card/`,
      headers,
      data: body,
      timeout: 5000,
    };
    // Make the API call
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error making GET request:', error);
    return null;
  }
}
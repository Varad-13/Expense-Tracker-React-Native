import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getApiConfig } from './ApiConfig';

import DeviceInfo from 'react-native-device-info';


const getAndroidId = () => {
  const androidId = DeviceInfo.getUniqueId();
  if(androidId._j){
    return "1029239";
  } else{
    return "1029239";
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
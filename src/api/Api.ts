import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getApiConfig } from './ApiConfig';

import DeviceInfo from 'react-native-device-info';


const getAndroidId = () => {
  const androidId = DeviceInfo.getUniqueId();
  return androidId;
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
      url: `${apiConfig.apiUrl}/auth`,
      headers,
    };

    // Make the API call
    const response = await axios(config);
    console.log(response)
    return response;
  } catch (error) {
    console.error('Error making GET request:', error);
    return null;
  }
};


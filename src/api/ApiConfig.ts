import AsyncStorage from '@react-native-async-storage/async-storage';

interface ApiConfig {
  apiKey: string;
  apiUrl: string;
}

export const saveApiConfig = async (apiKey: string, apiUrl: string): Promise<void> => {
  const apiConfig: ApiConfig = { apiKey, apiUrl };
  try {
    await AsyncStorage.setItem('apiConfig', JSON.stringify(apiConfig));
    console.log('API Configuration saved successfully!');
  } catch (error) {
    console.error('Error saving API Configuration:', error);
  }
};

// Function to get API configuration
export const getApiConfig = async (): Promise<ApiConfig | null> => {
  try {
    const apiConfigString = await AsyncStorage.getItem('apiConfig');
    if (apiConfigString !== null) {
      const apiConfig: ApiConfig = JSON.parse(apiConfigString);
      return apiConfig;
    } else {
      console.log('API Configuration not found.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving API Configuration:', error);
    return null;
  }
};

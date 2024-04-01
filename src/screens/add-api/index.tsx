import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { saveApiConfig } from '../../api/ApiConfig';
import { useNavigate } from 'react-router-native';

const AddApi = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const navigate = useNavigate
  const handleSaveConfig = async () => {
    if (!apiKey || !apiUrl) {
      alert('Please enter API key and URL');
      return;
    }

    try {
      await saveApiConfig(apiKey, apiUrl);
      navigate("/index")
      // Optionally, navigate to another screen upon successful save
    } catch (error) {
      alert('Error saving API Configuration');
      console.error('Error saving API Configuration:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="API Key"
        value={apiKey}
        onChangeText={setApiKey}
        style={styles.input}
        keyboardType="default" // Ensure the correct keyboard type
      />
      <TextInput
        label="API URL"
        value={apiUrl}
        onChangeText={setApiUrl}
        style={styles.input}
        keyboardType="default" // Ensure the correct keyboard type
      />
      <Button mode="contained" onPress={handleSaveConfig} style={styles.button}>
        Save Configuration
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default AddApi;

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme, Appbar, IconButton } from 'react-native-paper';
import { saveApiConfig } from '../../api/ApiConfig';
import { useNavigate } from 'react-router-native';

const AddApi = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const navigate = useNavigate();

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    input: {
      marginBottom: 10,
    },
    button: {
      marginTop: 10,
    },
    title: {
      fontSize: 18,
      color: theme.colors.onSurfaceVariant,
      padding: 8,
    }
  });

  const handleSaveConfig = async () => {
    if (!apiKey || !apiUrl) {
      alert('Please enter API key and URL');
      return;
    }

    try {
      await saveApiConfig(apiKey, apiUrl);
      navigate("/index");
    } catch (error) {
      alert('Error saving API Configuration');
      console.error('Error saving API Configuration:', error);
    }
  };

  return (
    <View style={styles.container}>
     <Appbar.Header>
        <Appbar.BackAction onPress={() => navigate("/index")}/>
        <Appbar.Content title="API Setup" />
      </Appbar.Header>
      <Text style={styles.title}>Connection to backend server failed! Please setup API routes and API key</Text>
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



export default AddApi;

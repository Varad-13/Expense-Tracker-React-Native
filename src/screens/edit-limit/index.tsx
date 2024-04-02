import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button, IconButton, TextInput, useTheme } from 'react-native-paper';
import { putCardLimit } from '../../api/Api'; // Assuming your api.ts file is in the same directory
import { useNavigate, useParams } from 'react-router-native';

const EditCardLimit = () => {
  const theme = useTheme();
  const {cardNumber} = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    limits: '',
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleLimitChange = async () => {
    try {
      const response = await putCardLimit({
        ...formData,
        card_number: cardNumber, // Get card number from route params
      });
      if (response?.status === 200) {
        navigate("/index")
        // Optionally, you can navigate to another screen or show a success message
      } else {
        console.error('Failed to edit limit.');
      }
    } catch (error) {
      console.error('Error editing limit:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      rowGap: 12,
    },
    addButton: {
        marginVertical: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigate("/index")}/>
        <Appbar.Content title="Edit Limit" />
      </Appbar.Header>
      <ScrollView style={{padding:16}}>
        <View style={styles.container}>
          <TextInput
              label="New Limit"
              value={formData.limits}
              onChangeText={(text) => handleInputChange('limits', text)}
          />
          <Button mode="contained" onPress={handleLimitChange} style={styles.addButton}>
              Set New Limit
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditCardLimit;

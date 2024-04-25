import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button, IconButton, TextInput, useTheme } from 'react-native-paper';
import { putTransactionAmount } from '../../api/Api'; // Assuming your api.ts file is in the same directory
import { useNavigate, useParams } from 'react-router-native';

const EditTransactionAmount = () => {
  const theme = useTheme();
  const {id} = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleLimitChange = async () => {
    try {
      const response = await putTransactionAmount({
        ...formData,
        id: id, // Get card number from route params
      });
      if (response?.status === 200) {
        navigate("/index")
        // Optionally, you can navigate to another screen or show a success message
      } else {
        console.error('Failed to edit amount.');
      }
    } catch (error) {
      console.error('Error editing amount:', error);
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
        <Appbar.Content title="Edit Transaction" />
      </Appbar.Header>
      <ScrollView style={{padding:16}}>
        <View style={styles.container}>
          <TextInput
              label="New Amount"
              value={formData.amount}
              onChangeText={(text) => handleInputChange('amount', text)}
          />
          <Button mode="contained" onPress={handleLimitChange} style={styles.addButton}>
              Set New Limit
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditTransactionAmount;

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button, IconButton, TextInput, useTheme } from 'react-native-paper';
import { postAddTransaction } from '../../api/Api'; // Assuming your api.ts file is in the same directory
import { useNavigate, useParams } from 'react-router-native';

const AddCreditScreen = () => {
  const theme = useTheme();
  const {cardNumber} = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleAddCredit = async () => {
    try {
      const response = await postAddTransaction({
        ...formData,
        card_number: cardNumber, // Get card number from route params
        credit_debit: 'credit', // Indicate this is a credit transaction
      });
      if (response?.status === 200) {
        console.log('Credit added successfully!');
        navigate('/index')
        // Optionally, you can navigate to another screen or show a success message
      } else {
        console.error('Failed to add credit.');
      }
    } catch (error) {
      console.error('Error adding credit:', error);
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
        <Appbar.Content title="Add Repayment" />
      </Appbar.Header>
      <TextInput
        label="Amount"
        value={formData.amount}
        onChangeText={(text) => handleInputChange('amount', text)}
      />

      <TextInput
        label="Category"
        value={formData.category}
        onChangeText={(text) => handleInputChange('category', text)}
      />

      <Button mode="contained" onPress={handleAddCredit} style={styles.addButton}>
        Add Credit
      </Button>
    </View>
  );
};

export default AddCreditScreen;

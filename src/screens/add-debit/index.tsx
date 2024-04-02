import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button, IconButton, TextInput, useTheme } from 'react-native-paper';
import { postAddTransaction } from '../../api/Api'; // Assuming your api.ts file is in the same directory
import { useNavigate, useParams } from 'react-router-native';

const AddDebitScreen = () => {
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

  const handleAddDebit = async () => {
    try {
      const response = await postAddTransaction({
        ...formData,
        card_number: cardNumber, // Get card number from route params
        credit_debit: 'debit', // Indicate this is a debit transaction
      });
      if (response?.status === 200) {
        console.log('Debit added successfully!');
        navigate("/index")
        // Optionally, you can navigate to another screen or show a success message
      } else {
        console.error('Failed to add debit.');
      }
    } catch (error) {
      console.error('Error adding debit:', error);
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
        <Appbar.Content title="Add Payment" />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.container}>
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

          <Button mode="contained" onPress={handleAddDebit} style={styles.addButton}>
              Add Debit
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddDebitScreen;

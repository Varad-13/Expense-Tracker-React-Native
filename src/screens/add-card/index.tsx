import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button, IconButton, TextInput, useTheme } from 'react-native-paper';
import { postAddCard } from '../../api/Api'; // Assuming your api.ts file is in the same directory
import { useNavigate } from 'react-router-native';

const AddApiScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: '',
    holder_name: '',
    card_type: '',
    card_provider: '',
    bank_name: '',
    validity: '',
    card_number: '',
    cvv: '',
    limits: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleAddApi = async () => {
    try {
      const response = await postAddCard(formData);
      if (response?.status === 200) {
        console.log('Card added successfully!');
        navigate("/index");
        // Optionally, you can navigate to another screen or show a success message
      } else {
        console.error('Failed to add card.');
      }
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      rowGap: 12,
    },
  });

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigate("/index")}/>
        <Appbar.Content title="Work-in-Progress" />
      </Appbar.Header>
      <TextInput
        label="Nickname"
        value={formData.nickname}
        onChangeText={(text) => handleInputChange('nickname', text)}
      />

      <TextInput
        label="Holder Name"
        value={formData.holder_name}
        onChangeText={(text) => handleInputChange('holder_name', text)}
      />

      <TextInput
        label="Card Type"
        value={formData.card_type}
        onChangeText={(text) => handleInputChange('card_type', text)}
      />

      <TextInput
        label="Card Provider"
        value={formData.card_provider}
        onChangeText={(text) => handleInputChange('card_provider', text)}
      />

      <TextInput
        label="Bank Name"
        value={formData.bank_name}
        onChangeText={(text) => handleInputChange('bank_name', text)}
      />

      <TextInput
        label="Validity"
        value={formData.validity}
        onChangeText={(text) => handleInputChange('validity', text)}
      />

      <TextInput
        label="Card Number"
        value={formData.card_number}
        onChangeText={(text) => handleInputChange('card_number', text)}
      />

      <TextInput
        label="CVV"
        value={formData.cvv}
        onChangeText={(text) => handleInputChange('cvv', text)}
      />

      <TextInput
        label="Limits"
        value={formData.limits}
        onChangeText={(text) => handleInputChange('limits', text)}
      />

      <Button mode="contained" onPress={handleAddApi}>
        Add Card
      </Button>
    </View>
  );

};

export default AddApiScreen;

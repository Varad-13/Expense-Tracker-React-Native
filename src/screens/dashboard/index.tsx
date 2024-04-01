import {Appearance, View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import {IconButton, Avatar, Appbar, Button, Card, withTheme, useTheme } from 'react-native-paper';
import {useNavigate} from 'react-router-native';

import { Dimensions } from "react-native";
import { useEffect, useState } from 'react';
import { saveApiConfig, getApiConfig } from '../../api/ApiConfig';
import { getAuthData, getLimits, getCards } from '../../api/Api';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const [cardsData, setCardsData] = useState([{
    "nickname": "My Card",
    "holderName": "John Doe",
    "cardType": "Debit",
    "cardProvider": "Visa",
    "bankName": "XYZ Bank",
    "validity": "12/25",
    "cardNumber": "1234567890123456",
    "CVV": "123",
    "limits": 800000
  }]); 
  const [limitData, setLimitData] = useState([{
    "card": "My Card",
    "total_spent": 10000.0,
    "total_earnt": 10000.0,
    "percent_used": 0.0
  }]); 

  useEffect(() => {
    const checkApiConfigAndNavigate = async () => {
      try {
        // Check API configuration
        // Replace this with your actual logic to check if the API configuration exists
        const apiConfigExists = await getApiConfig();

        if (!apiConfigExists) {
          // Navigate to the AddAPI screen if API configuration doesn't exist
          navigate('/add-api');
        }
      } catch (error) {
        console.error('Error checking API configuration:', error);
      }
    };

    const checkConnectivity = async() => {
      try{
        const apiConnectivity = await getAuthData();
        if(!apiConnectivity){
          navigate('/add-api');
        }
      } catch (error) {
        console.error('Error checking API configuration:', error);
      }
    }

    const cards = async() => {
      try{
        const response  = await getCards();
        if (response && response.data) {
          // Set the fetched cards data in state
          setCardsData(response.data);
        }
      } catch (error) {
        console.error('Error checking API configuration:', error);
      }
    }

    const limits = async() => {
      try{
        const response  = await getLimits();
        if (response && response.data) {
          // Set the fetched cards data in state
          setLimitData(response.data);
        }
      } catch (error) {
        console.error('Error checking API configuration:', error);
      }
    }

    // Call the function to check API config and navigate
    checkApiConfigAndNavigate();
    checkConnectivity();
    cards();
    limits();
  }, []);

  const styles = StyleSheet.create({
    appBar: {
      backgroundColor: theme.colors.surfaceVariant,
      elevation: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    cardContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 10,
      alignSelf: 'center',
      columnGap: 8,
    },
    atmCard: {
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      padding: 16,
      marginTop: 8,
      width: screenWidth-32,
      elevation: 5, // Add elevation for shadow effect
      alignSelf: 'center',
      borderColor: theme.colors.primary,
      borderWidth: 3,
    },
    graphContainer: {
      backgroundColor: theme.colors.tertiaryContainer,
      borderRadius: 8,
      width: screenWidth-32,
      elevation: 5, // Add elevation for shadow effect
      flexShrink: 1,
      padding: 8,
      alignSelf: 'center',
      borderColor: theme.colors.outline,
      borderWidth: 2,
    },
    graphText: {
      fontSize: 18,
      color: theme.colors.onSurfaceVariant,
      padding: 8,
    },
    cardText: {
      fontSize: 18,
      marginBottom: 8,
      color: theme.colors.onSurfaceVariant,
    },
    cardNumber: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.colors.onSurface,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 6,
      marginTop: 8,
    },  
    addButton: {
      marginTop: 8,
      borderRadius: 8,
      backgroundColor: theme.colors.onPrimaryContainer,
    },
    addButtonText: {
      color: theme.colors.surface,
      fontWeight: 'bold',
    },
    expensesContainer: {
      backgroundColor: theme.colors.secondaryContainer,
      borderRadius: 8,
      width: screenWidth-32,
      elevation: 5,
      flexShrink: 1,
      padding: 8,
      alignSelf: 'center',
      borderColor: theme.colors.outline,
      borderWidth: 2,
      
    },
    expenseItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    expenseText: {
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
    },
  });

  const chartConfig = {
    backgroundGradientFrom: theme.colors.tertiaryContainer,
    backgroundGradientTo: theme.colors.tertiaryContainer,
    color: (opacity = 1) => {
      const colorOnSurface = Appearance.getColorScheme() === 'dark'
      ? `rgba(255, 220, 255, ${opacity})` 
      : `rgba(70, 10, 50, ${opacity})`; 
      return colorOnSurface
    },
  };

  // Extract accountHolder values from the data array
  const labels = limitData.map(item => item.card);
  
  // Hardcode data values as 0.6
  const dataValues = limitData.map(item => item.percent_used);
  
  // Create chartData object using extracted labels and hardcoded data values
  const chartData = {
    labels: labels,
    data: dataValues
  };

  const expenses = [
    { id: '1', category: 'Groceries', amount: '$50' },
    { id: '2', category: 'Gas', amount: '$30' },
    { id: '3', category: 'Dining Out', amount: '$80' },
    // Add more expenses as needed
  ];

  


  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Home" /> 
        <IconButton icon="bank-plus" onPress={() => navigate('/wip')}   />
        <Appbar.Action icon="bell-outline" onPress={() => navigate('/wip')} style={styles.icon} />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.cardContainer}>
            {cardsData.map((item) => (
              <Card key={item.cardNumber} style={styles.atmCard}>
                <Text style={styles.cardText}>{item.holderName}</Text>
                <Text style={styles.cardText}>Valid Thru: {item.validity}</Text>
                <Text style={styles.cardNumber}>{item.cardNumber}</Text>
                <Text style={styles.cardText}>Card Type: {item.cardProvider}</Text>
                <View style={styles.buttonContainer}>
                  <Button
                    mode="contained"
                    onPress={() => navigate('/wip')}
                    style={styles.addButton}
                  >
                    Add expense
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => console.log(item.cardNumber)}
                    style={styles.addButton}
                  >
                    Edit limits
                  </Button>
                </View>
              </Card>
            ))}
          </View>
          </ScrollView>
          
          
        </View>

        
        <View style={styles.cardContainer}>
            <View style={{alignSelf: 'center'}}>
              <View style={styles.graphContainer}>
                <Text style={styles.cardNumber}>Monthly Limits</Text>
                <ProgressChart
                  data={chartData}
                  width={screenWidth-48}
                  height={220}
                  strokeWidth={16}
                  radius={32}
                  chartConfig={chartConfig}
                  hideLegend={false}
                  style={styles.cardNumber}
                  />
                  <Text style={styles.graphText}>Limits: $1200/1800</Text>
              </View>
              
            </View>
          </View>
        
          
          <View style={styles.cardContainer}>
              <View style={styles.expensesContainer}>
                  <Text style={styles.cardNumber}>Recent Incomings</Text>
                  {expenses.map((expense) => (
                    <View key={expense.id} style={styles.expenseItem}>
                      <Text style={styles.expenseText}>{expense.category}</Text>
                      <Text style={styles.expenseText}>{expense.amount}</Text>
                    </View>
                  ))}
              </View>
              <View style={styles.expensesContainer}>
                  <Text style={styles.cardNumber}>Recent Outgoings</Text>
                  {expenses.map((expense) => (
                    <View key={expense.id} style={styles.expenseItem}>
                      <Text style={styles.expenseText}>{expense.category}</Text>
                      <Text style={styles.expenseText}>{expense.amount}</Text>
                    </View>
                  ))}
              </View>
            </View>
      </ScrollView>
    </View>
  );
};
  
export default withTheme(Dashboard) ;
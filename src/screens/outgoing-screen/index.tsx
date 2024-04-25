import {Appearance, View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import {IconButton, Avatar, Button, Appbar, Card, withTheme, useTheme, ActivityIndicator } from 'react-native-paper';
import {useNavigate} from 'react-router-native';

import { Dimensions } from "react-native";
import { useEffect, useState } from 'react';
import { deleteTransaction, getOutgoing, getTransactions } from '../../api/Api';

const OutgoingList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const [expenses, addExpenses] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const expensesResponse = await getOutgoing();
      if(expensesResponse && expensesResponse.data){
        addExpenses(expensesResponse.data)
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {    
    fetchData()
  }, []);

  const handleDeleteTransaction = async (id) => {
    try {

      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this transaction?',
        [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            onPress: async () => {
              const data = {
                id: id,
              };
              setLoading(true);
              await deleteTransaction(data);
              // After successful deletion, update the state to reflect the changes
              fetchData();
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error('Error deleting card:', error);
      // Handle error if needed
    }
  };

  const styles = StyleSheet.create({
    appBar: {
      backgroundColor: theme.colors.surfaceVariant,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface
    },
    friend: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    profilePicture: {
      marginRight: 8,
    },
    cardContainer: {
      padding: 16,
      alignSelf: 'center'
    },
    atmCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      padding: 16,
      width: 350,
      elevation: 5, // Add elevation for shadow effect
      flexShrink: 1,
      marginBottom: 16,
      borderColor: theme.colors.outline,
      borderWidth: 2,
    },
    graphContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      marginBottom: 8,
      borderRadius: 8,
      width: 350,
      elevation: 5, // Add elevation for shadow effect
      flexShrink: 1,
      padding: 8,
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
      flex: 1,
      justifyContent: "space-between",
      gap: 6,
      marginTop: 8,
    },  
    addButton: {
      marginTop: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.onPrimaryContainer,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      color: theme.colors.surface,
      fontWeight: 'bold',
    },
    expensesContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 8,
      width: 350,
      elevation: 5,
      flexShrink: 1,
      padding: 8,
    },
    expenseItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    expenseText: {
      fontFamily:"sans-serif-condensed",
      fontWeight:"100",
      fontSize: 25,
      color: theme.colors.onSurfaceVariant,
    },
    expenseTitle: {
      fontFamily:"sans-serif-light",
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
    },
    expenseAmount: {
      fontFamily:"monospace",
      fontSize: 18,
      color: theme.colors.onSurfaceVariant,
    },
  });

  const renderContent = () => {
    if(loading){
      return(
        <View style={styles.container}>
          <Appbar.Header style={styles.appBar}>
            <Appbar.BackAction onPress={() => navigate("/")}></Appbar.BackAction>
            <Appbar.Content title="Expenses" /> 
          </Appbar.Header>
          <ActivityIndicator animating={true} style={{marginTop:60}}/>
        </View>
      ) 
    }
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appBar}>
          <Appbar.BackAction onPress={() => navigate("/")}></Appbar.BackAction>
          <Appbar.Content title="Expenses" />
        </Appbar.Header>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {expenses && expenses.length > 0 ? (
                <View style={styles.cardContainer}>
                  {expenses.map((expense) => (
                    <View key={expense.id} style={styles.atmCard}>
                      <View style={styles.expenseItem}>
                        <Text style={styles.expenseText}>{expense.category}</Text>
                        <Text style={styles.expenseTitle}>{expense.card}</Text>
                      </View>
                      <View style={styles.buttonContainer}>
                        <View>
                          <Text style={styles.expenseTitle}>Date: {new Date(expense.timestamp).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                          })}</Text>
                          <Text style={styles.expenseAmount}>{expense.credit_debit}</Text>
                          <Text style={styles.expenseAmount}>₹{expense.amount}</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                          <IconButton
                            icon="delete"
                            iconColor={theme.colors.error}
                            size={20}
                            onPress={() => handleDeleteTransaction(expense.id)}
                          />
                          <IconButton
                            icon="pencil"
                            iconColor={theme.colors.secondary}
                            size={20}
                            onPress={() => navigate(`/edit-transaction/${expense.id}`)}
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ) : null}
          </View>
        </ScrollView>
      </View>
    );
  };

  return(renderContent())
};
  
export default withTheme(OutgoingList) ;
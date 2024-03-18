import {Appearance, View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import {IconButton, Avatar, Button, Appbar, Card, withTheme, useTheme } from 'react-native-paper';
import {useNavigate} from 'react-router-native';

import { Dimensions } from "react-native";

const ExpenseList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;

  const styles = StyleSheet.create({
    appBar: {
      backgroundColor: theme.colors.surfaceVariant,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.backdrop
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
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 8,
      padding: 16,
      width: 350,
      elevation: 5, // Add elevation for shadow effect
      flexShrink: 1,
      marginBottom: 16,
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
      justifyContent: 'flex-end',
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
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
    },
  });

  
  const expenses = [
    { id: '1', title: 'Groceries', amount: '$50' },
    { id: '2', title: 'Gas', amount: '$30' },
    { id: '3', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    { id: '4', title: 'Dining Out', amount: '$80' },
    // Add more expenses as needed
  ];


  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Expenses" />
        <IconButton icon="bank-plus" onPress={() => {}}   />
        <Appbar.Action icon="bell-outline" onPress={() => {}} style={styles.icon} />
        <Appbar.Action icon="account-outline" onPress={() => {console.log(theme.mode)}} style={styles.icon} />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.cardContainer}>
              {expenses.map((expense) => (
                <View style={styles.atmCard}>
                    <View key={expense.id} style={styles.expenseItem}>
                        <Text style={styles.expenseText}>{expense.title}</Text>
                        <Text style={styles.expenseText}>{expense.amount}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <IconButton
                            icon="delete"
                            iconColor={theme.colors.error}
                            size={20}
                            onPress={() => console.log('Pressed')}
                        />
                        <IconButton
                            icon="pencil"
                            iconColor={theme.colors.secondary}
                            size={20}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
  
export default withTheme(ExpenseList) ;
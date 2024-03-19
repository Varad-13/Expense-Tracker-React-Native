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

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;

  const styles = StyleSheet.create({
    appBar: {
      backgroundColor: theme.colors.surfaceVariant,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.backdrop,
    },
    cardContainer: {
      flexDirection: 'row',
      padding: 16,
      alignSelf: 'center'
    },
    atmCard: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 8,
      padding: 16,
      marginRight: 16,
      width: screenWidth-32,
      elevation: 5, // Add elevation for shadow effect
      alignSelf: 'center'
    },
    graphContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      marginBottom: 8,
      borderRadius: 8,
      width: screenWidth-32,
      elevation: 5, // Add elevation for shadow effect
      flexShrink: 1,
      padding: 8,
      alignSelf: 'center'
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
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.onSurfaceVariant
    },
    addButtonText: {
      color: theme.colors.surface,
      fontWeight: 'bold',
    },
    expensesContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 8,
      width: screenWidth-32,
      elevation: 5,
      flexShrink: 1,
      padding: 8,
      alignSelf: 'center'
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
    backgroundGradientFrom: theme.colors.surfaceVariant,
    backgroundGradientTo: theme.colors.surfaceVariant,
    color: (opacity = 1) => {
      const colorOnSurface = Appearance.getColorScheme() === 'dark'
      ? `rgba(220, 184, 255, ${opacity})` 
      : `rgba(120, 69, 172, ${opacity})`; 
      return colorOnSurface
    },
  };

  const data = [
    { id: '1', accountHolder: 'Savings', validThru: '12/28', cardNumber: '**** **** **** 1234', cardType: 'VISA' },
    { id: '2', accountHolder: 'Salary', validThru: '14/26', cardNumber: '**** **** **** 5678', cardType: 'Mastercard' },
    { id: '3', accountHolder: 'Joint', validThru: '14/26', cardNumber: '**** **** **** 5678', cardType: 'Mastercard' },
    // Add more card data as needed
  ];
  
  // Extract accountHolder values from the data array
  const labels = data.map(item => item.accountHolder);
  
  // Hardcode data values as 0.6
  const dataValues = Array(labels.length).fill(0.6);
  
  // Create chartData object using extracted labels and hardcoded data values
  const chartData = {
    labels: labels,
    data: dataValues
  };

  const expenses = [
    { id: '1', title: 'Groceries', amount: '$50' },
    { id: '2', title: 'Gas', amount: '$30' },
    { id: '3', title: 'Dining Out', amount: '$80' },
    // Add more expenses as needed
  ];


  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Home" /> 
        <IconButton icon="bank-plus" onPress={() => navigate('/wip')}   />
        <Appbar.Action icon="bell-outline" onPress={() => navigate('/wip')} style={styles.icon} />
        <Appbar.Action icon="account-outline" onPress={() => navigate('/wip')} style={styles.icon} />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.cardContainer}>
            {data.map((item) => (
              <Card key={item.id} style={styles.atmCard}>
                <Text style={styles.cardText}>{item.accountHolder}</Text>
                <Text style={styles.cardText}>Valid Thru: {item.validThru}</Text>
                <Text style={styles.cardNumber}>{item.cardNumber}</Text>
                <Text style={styles.cardText}>Card Type: {item.cardType}</Text>

                <View style={styles.buttonContainer}>
                  <Button
                    mode="contained"
                    onPress={() => console.log(item.id)}
                    style={styles.addButton}
                    contentStyle={{ height: 40 }} // Adjust height as needed
                  >
                    Add expense
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => console.log(item.id)}
                    style={styles.addButton}
                    contentStyle={{ height: 40 }} // Adjust height as needed
                  >
                    Edit limits
                  </Button>
                </View>
              </Card>
            ))}
          </View>
          </ScrollView>
          
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
              <Text style={styles.cardNumber}>Recent Transactions</Text>
              {expenses.map((expense) => (
                <View key={expense.id} style={styles.expenseItem}>
                  <Text style={styles.expenseText}>{expense.title}</Text>
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
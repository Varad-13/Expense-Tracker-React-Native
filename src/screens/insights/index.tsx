import {Appearance, View, Text, StyleSheet, Pressable, ScrollView,  } from 'react-native';

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
import { getIncoming, getLimits, getOutgoing } from '../../api/Api';

const InsightsScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width - 30;
  const [limitData, addLimits] = useState(null);
  const [incomingTransactions, setIncomingTransactions] = useState(null); 
  const [outgoingTransactions, setOutgoingTransactions] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {    
    const fetchData = async () => {
      try {
        const incomingResponse = await getIncoming();
        const outgoingResponse = await getOutgoing();
        if (incomingResponse && incomingResponse.data) {
          const slicedIncoming = incomingResponse.data.slice(0, 15);
          setIncomingTransactions(slicedIncoming)
        }
        if (outgoingResponse && outgoingResponse.data) {  
          const slicedOutgoing = outgoingResponse.data.slice(0, 15);
          setOutgoingTransactions(slicedOutgoing)
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData()
  }, []);

  const expensesConfig = {
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    color: (opacity = 1) => {
      const colorOnSurface = Appearance.getColorScheme() === 'dark'
      ? `rgba(255, 150, 150, ${opacity*2})` 
      : `rgba(150, 0, 0, ${opacity*2})`; 
      return colorOnSurface
    },
    propsForLabels: { 
      fontSize : 12,
      fontFamily: "sans-serif-condensed"
    }
  };
  const repaymentsConfig = {
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    color: (opacity = 1) => {
      const colorOnSurface = Appearance.getColorScheme() === 'dark'
      ? `rgba(150, 255, 150, ${opacity*2})` 
      : `rgba(0, 150, 0, ${opacity*2})`; 
      return colorOnSurface
    },
    propsForLabels: { 
      fontSize : 12,
      fontFamily: "sans-serif-condensed"
    }
  };
  const expenseData = outgoingTransactions ? outgoingTransactions.map(item => item.amount): [];
  const repaymentData = incomingTransactions ? incomingTransactions.map(item => item.amount): [];
  const expenses = {
    datasets: [{
      data: expenseData,
      color: (opacity = 1) => {
        const colorOnSurface = Appearance.getColorScheme() === 'dark'
        ? `rgba(255, 150, 150, ${opacity*2})` 
        : `rgba(150, 0, 0, ${opacity*2})`; 
        return colorOnSurface
      },
    }]
  }
  const repayments = {
    datasets: [{
      data: repaymentData,
      color: (opacity = 1) => {
        const colorOnSurface = Appearance.getColorScheme() === 'dark'
        ? `rgba(0, 150, 0, ${opacity*2})` 
        : `rgba(0, 150, 0, ${opacity*2})`; 
        return colorOnSurface
      },
    }]
  }

  const styles = StyleSheet.create({
    appBar: {
      backgroundColor: theme.colors.surfaceVariant,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface
    },
    graphContainer: {
      backgroundColor: theme.colors.tertiaryContainer,
      marginBottom: 8,
      borderRadius: 8,
      width: 350,
      elevation: 5, // Add elevation for shadow effect
      flexShrink: 1,
    },
    graphText: {
      fontSize: 18,
      color: theme.colors.onSurfaceVariant,
      padding: 8,
    },
    cardContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 10,
      alignSelf: 'center',
      columnGap: 8,
    },
    expensesContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 8,
      width: screenWidth-32,
      elevation: 5,
      flexShrink: 1,
      padding: 8,
      alignSelf: 'center',
      borderColor: theme.colors.outline,
      borderWidth: 2,
    },
    expensesTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.colors.onSurface,
    },
    expenseItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    expenseText: {
      fontFamily: 'sans-serif-condensed',
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
    },
  });

  const renderContent = () => {
    if(loading){
        return(
          <View style={styles.container}>
            <Appbar.Header style={styles.appBar}>
              <Appbar.Content title="Analytics" /> 
            </Appbar.Header>
            <ActivityIndicator animating={true} style={{marginTop:60}}/>
          </View>
        ) 
      }
    return (
        <View style={styles.container}>
          <Appbar.Header style={styles.appBar}>
            <Appbar.Content title="Analytics" /> 
          </Appbar.Header>
          <View style={{flex:1, justifyContent:"center", padding:8, marginTop:20, gap:8}}>
              <ScrollView>
                <View style={{flex:1, alignSelf: 'center', gap: 8}}>
                  <LineChart
                  data={repayments}
                  width={screenWidth}
                  height={120}
                  chartConfig={repaymentsConfig}
                  style = {{flexShrink:1, alignSelf: 'center'}}
                  />
                  <Text style={{alignSelf:"center", color:theme.colors.onSurface}}>Income</Text>
                  <LineChart
                  data={expenses}
                  width={screenWidth}
                  height={120}
                  chartConfig={expensesConfig}
                  style = {{flexShrink:1, alignSelf: 'center'}}
                  bezier
                  />
                  <Text style={{alignSelf:"center", color:theme.colors.onSurface}}>Expenses</Text>
                  <Pressable onPress={() => navigate('/incoming')}>
                    <View style={styles.expensesContainer}>
                      <Text style={styles.expensesTitle}>Recent Incomings</Text>
                      {incomingTransactions.map((expense) => (
                        <View key={expense.id} style={styles.expenseItem}>
                          <Text style={styles.expenseText}>{expense.category}</Text>
                          <Text style={styles.expenseText}>₹{expense.amount}</Text>
                        </View>
                      ))}
                    </View>
                  </Pressable>
                  <Pressable onPress={() => navigate('/outgoing')}>
                    <View style={styles.expensesContainer}>
                        <Text style={styles.expensesTitle}>Recent Outgoings</Text>
                        {outgoingTransactions.map((expense) => (
                          <View key={expense.id} style={styles.expenseItem}>
                            <Text style={styles.expenseText}>{expense.category}</Text>
                            <Text style={styles.expenseText}>₹{expense.amount}</Text>
                          </View>
                        ))}
                    </View>
                  </Pressable>
                </View>
              </ScrollView>
          </View>
        </View>
    );
  }

  return(renderContent())
};
  
export default withTheme(InsightsScreen) ;
import {Appearance, View, Text, StyleSheet, Pressable, ScrollView,  } from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import {ActivityIndicator, IconButton, Avatar, Appbar, Button, Card, withTheme, useTheme } from 'react-native-paper';
import {useNavigate} from 'react-router-native';

import { Dimensions } from "react-native";
import { useEffect, useState } from 'react';
import { saveApiConfig, getApiConfig } from '../../api/ApiConfig';
import { getAuthData, getLimits, getCards, getIncoming, getOutgoing, getTotalLimits } from '../../api/Api';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const [cardsData, setCardsData] = useState(null); 
  const [limitData, setLimitData] = useState(null); 
  const [incomingTransactions, setIncomingTransactions] = useState(null); 
  const [outgoingTransactions, setOutgoingTransactions] = useState(null); 
  const [totalLimits, setTotalLimits] = useState({"expense":"0","limit":"0","percentage":"0"}); 
  const [loading, setLoading] = useState(true);

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
    
    const fetchData = async () => {
      try {
        const cardsResponse = await getCards();
        const limitsResponse = await getLimits();
        const incomingResponse = await getIncoming();
        const outgoingResponse = await getOutgoing();
        const totalLimitResponse = await getTotalLimits();

        if (cardsResponse && cardsResponse.data) {
          setCardsData(cardsResponse.data);
        }

        if (limitsResponse && limitsResponse.data) {
          setLimitData(limitsResponse.data);
        }

        if (incomingResponse && incomingResponse.data) {
          setIncomingTransactions(incomingResponse.data)
        }

        if (outgoingResponse && outgoingResponse.data) {
          setOutgoingTransactions(outgoingResponse.data)
        }
        
        if (totalLimitResponse && totalLimitResponse.data) {
          setTotalLimits(totalLimitResponse.data)
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    // Call the function to check API config and navigate
    checkApiConfigAndNavigate();
    checkConnectivity();
    fetchData();
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
    editButton: {
      position: 'absolute',
      top: 4,
      right: 4,
      color: theme.colors.onSurfaceVariant,
      elevation: 4,
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
  const labels = limitData ? limitData.map(item => item.card) : [];
    
  // Hardcode data values as 0.6 if limitData is not null, otherwise set to an empty array
  const dataValues = limitData ? limitData.map(item => item.fractional_percent) : [];
    
  // Create chartData object using extracted labels and data values
  const chartData = {
    labels: labels,
    data: dataValues
  };  

  const renderContent = () => {
    while(loading){
      if(loading){
        return(
          <View style={styles.container}>
            <Appbar.Header style={styles.appBar}>
              <Appbar.Content title="Home" /> 
            </Appbar.Header>
            <ActivityIndicator animating={true} size={150} style={{marginTop:60}}/>
          </View>
        ) 
      }
    }
    return (    
      <View style={styles.container}>
        <Appbar.Header style={styles.appBar}>
          <Appbar.Content title="Home" /> 
        </Appbar.Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cardsData && cardsData.length > 0 ? (
              <View style={styles.cardContainer}>
                {cardsData.map((item) => (
                  <Card key={item.cardNumber} style={styles.atmCard}>
                    <IconButton
                      icon="pencil"
                      size={24}
                      onPress={() => {
                        navigate(`/edit-limit/${item.cardNumber}`)
                      }}
                      style={styles.editButton}
                    />
                    <Text style={styles.cardText}>{item.holderName}</Text>
                    <Text style={styles.cardText}>Valid Thru: {item.validity}</Text>
                    <Text style={styles.cardNumber}>{item.cardNumber}</Text>
                    <Text style={styles.cardText}>Card Type: {item.cardProvider}</Text>
                    <Text style={styles.cardText}>Limit: ₹{item.limits}</Text>
                    <View style={styles.buttonContainer}>
                      <Button
                        mode="contained"
                        onPress={() => navigate(`/add-debit/${item.cardNumber}`)}
                        style={styles.addButton}
                      >
                        Add expense
                      </Button>
                      <Button
                        mode="contained"
                        onPress={() => navigate(`/add-credit/${item.cardNumber}`)}
                        style={styles.addButton}
                      >
                        Add repayment
                      </Button>
                    </View>
                  </Card>
                ))}
                <Card style={styles.atmCard}>
                  <View style={{flex:1}}>
                    <IconButton
                      icon="plus"
                      size={140}
                      onPress={() => navigate('/add-card')}
                      style={{alignSelf:"center"}}
                    />
                  </View>
                </Card>
              </View>
            ) : 
            <View style={styles.cardContainer}>
              <Card style={styles.atmCard}>
              <View style={{flex:1}}>
                <IconButton
                  icon="plus"
                  size={140}
                  onPress={() => navigate('/add-card')}
                  style={{alignSelf:"center"}}
                />
              </View>
            </Card>
            </View>
            }
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
                    <Text style={styles.graphText}>Limits: ₹{totalLimits.expense}/{totalLimits.limit}</Text>
                    <Text style={styles.graphText}>Total Usage: {totalLimits.percentage}%</Text>
                </View>
                
              </View>
            </View>
          
            
            <View style={styles.cardContainer}>
                <View style={styles.expensesContainer}>
                    <Text style={styles.cardNumber}>Recent Incomings</Text>
                    {incomingTransactions.map((expense) => (
                      <View key={expense.id} style={styles.expenseItem}>
                        <Text style={styles.expenseText}>{expense.category}</Text>
                        <Text style={styles.expenseText}>₹{expense.amount}</Text>
                      </View>
                    ))}
                </View>
                <View style={styles.expensesContainer}>
                    <Text style={styles.cardNumber}>Recent Outgoings</Text>
                    {outgoingTransactions.map((expense) => (
                      <View key={expense.id} style={styles.expenseItem}>
                        <Text style={styles.expenseText}>{expense.category}</Text>
                        <Text style={styles.expenseText}>₹{expense.amount}</Text>
                      </View>
                    ))}
                </View>
              </View>
        </ScrollView>
      </View>
    );
  }
  return(renderContent());

  
};
  
export default withTheme(Dashboard) ;
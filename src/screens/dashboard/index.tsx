import {Appearance, View, Text, StyleSheet, Pressable, ScrollView,  } from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import {ActivityIndicator, IconButton, Avatar, Appbar, Button, Card, withTheme, useTheme, MD3Colors } from 'react-native-paper';
import {useNavigate} from 'react-router-native';

import { Dimensions } from "react-native";
import { useEffect, useState } from 'react';
import { saveApiConfig, getApiConfig } from '../../api/ApiConfig';
import { getAuthData, getLimits, getCards, getIncoming, getOutgoing, getTotalLimits, getIncomingOutgoing } from '../../api/Api';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const [cardsData, setCardsData] = useState(null); 
  const [limitData, setLimitData] = useState(null); 
  const [incomeExpenses, setIncomeExpense] = useState(null);
  const [totalLimits, setTotalLimits] = useState(null);
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
        const totalLimitResponse = await getTotalLimits();
        const incomeExpense = await getIncomingOutgoing();

        if (cardsResponse && cardsResponse.data) {
          setCardsData(cardsResponse.data);
        }

        if (limitsResponse && limitsResponse.data) {
          setLimitData(limitsResponse.data);
        }

        if (totalLimitResponse && totalLimitResponse.data) {
          setTotalLimits(totalLimitResponse.data)
        }

        if (incomeExpense && incomeExpense.data) {
          setIncomeExpense(incomeExpense.data)
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
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      padding: 16,
      marginTop: 8,
      width: screenWidth-32,
      alignSelf: 'center',
      borderColor: theme.colors.primary,
      borderWidth: 3,
    },
    graphContainer: {
      backgroundColor: theme.colors.secondaryContainer,
      borderRadius: 8,
      width: screenWidth-32,
      elevation: 5, // Add elevation for shadow effect
      flexShrink: 1,
      flex:1,
      padding: 8,
      alignSelf: 'center',
      borderColor: theme.colors.secondary,
      borderWidth: 2,
    },
    graphText: {
      fontFamily: 'sans-serif',
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
      padding: 8,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.colors.onSurface,
    },
    cardText: {
      fontFamily: "roboto",
      fontWeight: "100",
      fontSize: 13,
      marginBottom: 8,
      color: theme.colors.onSurfaceVariant,
    },
    cardNumber: {
      fontFamily: "monospace",
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
    incomeContainer: {
      backgroundColor:  'rgba(100,255,100, 0.2)',
      borderRadius: 8,
      width: screenWidth-32,
      flexShrink: 1,
      padding: 8,
      alignSelf: 'center',
      borderColor: 'rgba(0,200,0, 1)',
      borderWidth: 2,
    },
    outgoingContainer: {
      backgroundColor: 'rgba(255,100,100, 0.2)',
      borderRadius: 8,
      width: screenWidth-32,
      flexShrink: 1,
      padding: 8,
      alignSelf: 'center',
      borderColor: 'rgba(200,0,0, 1)',
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
    editButton: {
      flex: 1,
      flexDirection: "row",
      position: 'absolute',
      top: 4,
      right: 4,
      color: theme.colors.onSurfaceVariant,
      elevation: 4,
    },  
  });

  const chartConfig = {
    backgroundGradientFrom: theme.colors.secondaryContainer,
    backgroundGradientTo: theme.colors.secondaryContainer,
    color: (opacity = 1) => {
      const colorOnSurface = Appearance.getColorScheme() === 'dark'
      ? `rgba(255, 255, 255, ${opacity})` 
      : `rgba(0, 0, 0, ${opacity / 1.2})`; 
      return colorOnSurface
    },
    propsForLabels: { 
      fontSize : 12,
      fontFamily: "sans-serif-condensed"
    }
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
            <ActivityIndicator animating={true} style={{marginTop:60}}/>
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
                    <View style={styles.editButton}>
                      <IconButton
                        icon="pencil"
                        size={20}
                        onPress={() => {
                          navigate(`/edit-limit/${item.cardNumber}`)
                        }}
                        style={{alignSelf:"center"}}
                      />
                    </View>
                    <Text style={styles.cardTitle}>{item.nickname}</Text>
                    <Text style={styles.cardText}>Valid Thru: {item.validity}</Text>
                    <Text style={styles.cardNumber}>**** **** **** {item.cardNumber.slice(12,16)}</Text>
                    <Text style={styles.cardText}>{item.cardProvider}</Text>
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
                        Add balance
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
                <Text style={styles.expensesTitle}>Monthly Limits</Text>
                <ProgressChart
                  data={chartData}
                  width={screenWidth-80}
                  height={150}
                  strokeWidth={12}
                  radius={32}
                  chartConfig={chartConfig}
                  style = {{flexShrink:1, alignSelf:"stretch"}}
                />
                <View style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>
                  <Text style={styles.graphText}>Limits: ₹{totalLimits.expense}/{totalLimits.limit}</Text>
                  <Text style={styles.graphText}>Total Usage: {totalLimits.percentage}%</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.cardContainer}>
            <View style={styles.incomeContainer}>
                <Text style={styles.expensesTitle}>Total Income</Text>
                <View style={{flex:1,flexDirection: 'row',justifyContent: "space-between"}}>
                  <Text style={styles.expensesTitle}>₹{incomeExpenses.incoming}</Text>
                  <IconButton
                    icon="chevron-right"
                    color="#000"
                    size={20}
                    onPress={() => {
                      console.log('Arrow icon pressed');
                    }}
                  />
                </View>    
            </View>
            <View style={styles.outgoingContainer}>
                <Text style={styles.expensesTitle}>Total Expense</Text>
                <View style={{flex:1,flexDirection: 'row',justifyContent: "space-between"}}>
                  <Text style={styles.expensesTitle}>₹{incomeExpenses.expense}</Text>
                  <IconButton
                    icon="chevron-right"
                    color="#000"
                    size={20}
                    onPress={() => {
                      console.log('Arrow icon pressed');
                    }}
                  />
                </View>
            </View>
          </View>


            
        </ScrollView>
      </View>
    );
  }
  return(renderContent());

  
};
  
export default withTheme(Dashboard) ;
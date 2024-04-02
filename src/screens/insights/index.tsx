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
import { getOutgoing } from '../../api/Api';

const InsightsScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const [expenses, addExpenses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {    
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

    fetchData()
  }, []);


  const styles = StyleSheet.create({
    appBar: {
      backgroundColor: theme.colors.surfaceVariant,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface
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
  });

  const renderContent = () => {
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
    return (
        <View style={styles.container}>
          <Appbar.Header style={styles.appBar}>
            <Appbar.Content title="Insights" /> 
          </Appbar.Header>
          <View style={{flex:1, justifyContent:"center"}}>
              <Text style={{alignSelf:'center', color:theme.colors.onSurface}}>Oops! Looks like you reached the end</Text>
          </View>
        </View>
    );
  }

  return(renderContent())
};
  
export default withTheme(InsightsScreen) ;
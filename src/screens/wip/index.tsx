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

const WipScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const screenWidth = Dimensions.get("window").width;

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

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => navigate("/index")}/>
        <Appbar.Content title="Work-in-Progress" />
      </Appbar.Header>
      <View style={{flex:1, justifyContent:"center"}}>
        <Text style={{alignSelf:'center', color:theme.colors.onSurface}}>Oops! Looks like you reached the end</Text>
      </View>
    </View>
  );
};
  
export default withTheme(WipScreen) ;
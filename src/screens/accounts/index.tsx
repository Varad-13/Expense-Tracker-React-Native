import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable, Alert } from 'react-native';
import { IconButton, Card, withTheme, useTheme, ActivityIndicator, Appbar,  } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { getCards, deleteCard } from '../../api/Api';

const AccountsScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const screenWidth = Dimensions.get("window").width;

  const fetchData = async () => {
    try {
      const cardsResponse = await getCards();

      if (cardsResponse && cardsResponse.data) {
        setCardsData(cardsResponse.data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    

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
      flexDirection: 'column',
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
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
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

  const toggleCardVisibility = (cardNumber) => {
    setExpandedCard((prevCard) => (prevCard === cardNumber ? null : cardNumber));
  };

  const handleDeleteCard = async (cardNumber) => {
    try {
      // Call the deleteCard API passing the cardNumber
      const data = {
        card_number: cardNumber,
      };
      await deleteCard(data);
      // After successful deletion, update the state to reflect the changes
      fetchData();
    } catch (error) {
      console.error('Error deleting card:', error);
      // Handle error if needed
    }
  };  

  const renderContent = () => {
    if (loading) {
      return(
          <View style={styles.container}>
            <Appbar.Header style={styles.appBar}>
              <Appbar.Content title="Cards" /> 
            </Appbar.Header>
            <ActivityIndicator animating={true} style={{marginTop:60}}/>
          </View>
        ) 
    }

    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appBar}>
          <Appbar.Content title="Cards" /> 
        </Appbar.Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardContainer}>
            {cardsData.map((item) => (
              <Card style={styles.atmCard} key={item.cardNumber}>
                <View style={{flex:1,   flexDirection:"row", alignItems:"baseline", justifyContent:"space-between", marginTop:"1"}}>
                  <Text style={styles.cardTitle}>{item.nickname}</Text>
                  <IconButton
                      icon="delete"
                      size={20}
                      iconColor={theme.colors.error}
                      onPress={() => handleDeleteCard(item.cardNumber)}
                    />
                </View>
                <Text style={styles.cardText}>{item.holderName}</Text>
                <Text style={styles.cardText}>Valid Thru: {item.validity}</Text>
                <View style={{flex:1,   flexDirection:"row", alignItems:"baseline", justifyContent:"space-between"}}>
                  <Text style={styles.cardNumber}>
                    {expandedCard === item.cardNumber
                      ? item.cardNumber.replace(/\d{4}(?=.)/g, '$& ')
                      : `**** **** **** ${item.cardNumber.slice(-4)}`}
                  </Text>
                  <IconButton
                    icon="credit-card-chip"
                    size={20}
                    iconColor={theme.colors.onPrimaryContainer}
                    onPress={() => {
                      toggleCardVisibility(item.cardNumber);
                    }}
                  />
                </View>
                <Text style={styles.cardText}>{item.cardProvider}</Text>
                <View style={{flex:1,   flexDirection:"row", alignItems:"baseline", }}>
                  <Text style={styles.cardText}>Limit: ₹{item.limits}</Text>
                  <IconButton
                    icon="pencil"
                    size={20}
                    iconColor={theme.colors.onSurface}
                    onPress={() => handleDeleteCard(item.cardNumber)}
                  />
                  <IconButton
                    icon="file-document-multiple-outline"
                    size={20}
                    iconColor={theme.colors.onSurface}
                    onPress={() => handleDeleteCard(item.cardNumber)}
                  />
                </View>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return renderContent();
};

export default withTheme(AccountsScreen);

  
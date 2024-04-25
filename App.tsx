import * as React from 'react';
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  BottomNavigation as Screens,
  Text,
} from 'react-native-paper';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import {NativeRouter, Route, Routes, useNavigate} from 'react-router-native';
import Dashboard from './src/screens/dashboard';
import ExpensesList from './src/screens/expenses';
import WipScreen from './src/screens/wip';
import AddAPI from './src/screens/add-api';
import AddCard from './src/screens/add-card';
import AddCreditScreen from './src/screens/add-credit';
import AddDebitScreen from './src/screens/add-debit';
import EditCardLimit from './src/screens/edit-limit';
import AccountsScreen from './src/screens/accounts';
import InsightsScreen from './src/screens/insights';
import IncomingScreen from './src/screens/incoming-screen';
import OutgoingScreen from './src/screens/outgoing-screen';
import EditTransactionAmount from './src/screens/edit-transaction';
import CardTransaction from './src/screens/card-transaction';

interface NavRoutes {
  key: string;
  title: string;
  focusedIcon: string;
}

function App(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [routes] = useState<NavRoutes[]>([
    {key: 'dashboard', title: 'Home', unfocusedIcon:'home-outline', focusedIcon: 'home'},
    {key: 'cards', title: 'Cards', unfocusedIcon: 'credit-card-outline', focusedIcon: 'credit-card-multiple'},
    {key: 'analytics', title: 'Analytics', focusedIcon: 'chart-donut-variant'},
    {key: 'expenses', title: 'Transactions', unfocusedIcon: 'file-document-outline', focusedIcon: 'file-document'},
  ]);

  const renderScene = Screens.SceneMap({
    dashboard: () => <Dashboard/>,
    cards: () => <AccountsScreen/>,
    analytics: () => <InsightsScreen/>,
    expenses: () => <ExpensesList/>,
  });

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NativeRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Screens
                  navigationState={{index, routes}}
                  onIndexChange={setIndex}
                  renderScene={renderScene}
                />
              }
            />
            <Route
              path="/index"
              element={ 
                <Screens
                  navigationState={{index, routes}}
                  onIndexChange={setIndex}
                  renderScene={renderScene}
                />
              }
            />
            <Route
              path="/expenseList"
              element={ 
                <ExpensesList/>
              }
            />
            <Route
              path="/add-api"
              element={ 
                <AddAPI/>
              }
            />
            <Route
              path="/add-card"
              element={ 
                <AddCard/>
              }
            />
            <Route
              path="/add-credit/:cardNumber"
              element={ 
                <AddCreditScreen/>
              }
            />
            <Route
              path="/add-debit/:cardNumber"
              element={ 
                <AddDebitScreen/>
              }
            />
            <Route
              path="/edit-limit/:cardNumber"
              element={ 
                <EditCardLimit/>
              }
            />
            <Route
              path="/accounts"
              element={ 
                <AccountsScreen/>
              }
            />
            <Route
              path="/insights"
              element={ 
                <InsightsScreen/>
              }
            />
            <Route
              path="/wip"
              element={ 
                <WipScreen/>
              }
            />
            <Route
              path="/incoming"
              element={ 
                <IncomingScreen/>
              }
            />
            <Route
              path="/outgoing"
              element={ 
                <OutgoingScreen/>
              }
            />
            <Route
              path="/edit-transaction/:id"
              element={ 
                <EditTransactionAmount/>
              }
            />
            <Route
              path="/card-transaction/:cardNumber"
              element={ 
                <CardTransaction/>
              }
            />
          </Routes>
        </NativeRouter>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
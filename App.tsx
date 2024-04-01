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


interface NavRoutes {
  key: string;
  title: string;
  focusedIcon: string;
}

function App(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [routes] = useState<NavRoutes[]>([
    {key: 'dashboard', title: 'Home', unfocusedIcon:'home-outline', focusedIcon: 'home'},
    {key: 'calendar', title: 'Accounts', unfocusedIcon: 'credit-card-chip-outline', focusedIcon: 'credit-card'},
    {key: 'analytics', title: 'Insights', focusedIcon: 'google-analytics'},
    {key: 'expenses', title: 'Expenses', unfocusedIcon: 'file-document-outline', focusedIcon: 'file-document'},
  ]);

  const renderScene = Screens.SceneMap({
    dashboard: () => <Dashboard/>,
    cards: () => <WipScreen/>,
    calendar: () => <WipScreen/>,
    analytics: () => <WipScreen/>,
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
              path="/wip"
              element={ 
                <WipScreen/>
              }
            />
          </Routes>
        </NativeRouter>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
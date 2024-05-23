import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import Borrow from './Screens/Borrow';
import Expense from './Screens/Expense';
import Notes from './Screens/Notes';
import Wallet from './Screens/Wallet';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
         <Stack.Screen name='Home' component={Home}/>
         <Stack.Screen name='Borrow' component={Borrow}/>
         <Stack.Screen name='Expense' component={Expense}/>
         <Stack.Screen name='Wallet' component={Wallet}/>
         <Stack.Screen name='Notes' component={Notes}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
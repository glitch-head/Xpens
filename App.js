import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import Borrow from './Screens/Borrow';
import Expense from './Screens/Expense';
import Notes from './Screens/Notes';
import Wallet from './Screens/Wallet';
import BorrowAdd from './Screens/BorrowAdd';
import AddExpense from './Screens/AddExpense';
import AddSavings from './Screens/AddSavings';

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
         <Stack.Screen name='BorrowAdd' component={BorrowAdd} />
         <Stack.Screen name='Add Expense' component={AddExpense} />
         <Stack.Screen name='Add Savings' component={AddSavings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Borrow from './Screens/Borrow';
import Expense from './Screens/Expense';
import Wallet from './Screens/Wallet';
import BorrowAdd from './Screens/BorrowAdd';
import AddExpense from './Screens/AddExpense';
import MonthlyExpense from './Screens/MonthlyExpense';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { SQLiteProvider } from 'expo-sqlite/next';
import { ActivityIndicator } from 'react-native';

const Stack = createStackNavigator()

const loadDatabase = async() => {
  const dbName = 'XpenseDB.db';
  const dbAsset = require('./assets/XpenseDB.db');
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if(!fileInfo.exists){
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }

}

export default function App() {

  const [dbLoad, setDbLoad] = React.useState(false);

  React.useEffect(() => {
    loadDatabase()
    .then(()=> setDbLoad(true))
    .catch((error) => console.log(error) )
  },[]);

  if(!dbLoad){
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
          <ActivityIndicator size={'large'}/>
          <Text>Loading...</Text>
        </View>
    )
  }

  return (
    <React.Suspense
      fallback = {
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
          <ActivityIndicator size={'large'}/>
          <Text>Loading.....</Text>
        </View>
      }
    >
      <SQLiteProvider 
        databaseName='XpenseDB.db'
        useSuspense
      >
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Wallet'>
         <Stack.Screen name='Borrow' component={Borrow}/>
         <Stack.Screen name='Expense' component={Expense}/>
         <Stack.Screen name='Wallet' component={Wallet}/>
         <Stack.Screen name='Monthly Expense' component={MonthlyExpense} />
         <Stack.Screen name='BorrowAdd' component={BorrowAdd} />
         <Stack.Screen name='Add Expense' component={AddExpense} />
      </Stack.Navigator>
    </NavigationContainer>
      </SQLiteProvider>
    </React.Suspense>
  );
}
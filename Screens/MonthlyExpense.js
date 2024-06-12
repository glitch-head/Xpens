import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import ExpenseCard from '../components/ExpenseCard';
import { ScrollView } from 'react-native-gesture-handler';

const MonthlyExpense = ({route}) => {
    // Table name - MonthlyExpense 

    const {month,year} = route.params

    const db = useSQLiteContext()
    const sample = [{'ID':0, 'Amount': 100, 'Cash':0, 'Date': '20-JAN-2021', 'Reason':'sample Data' }]
    const [data,setData] = useState(sample)
    const [empty,setEmpty] = useState(false)

    const getData = async() => {
        await db.withTransactionAsync(async() => {
            const result = await db.getAllAsync(
                `SELECT * FROM ExpenseTB WHERE Date LIKE "%-${month}-${year}%"`,
            )
            if(result.length == 0){
                console.log('no expense this month')
                setEmpty(true)
            }
            setData(result)
        })
    }
    useEffect(()=>{
        getData()
    },[db])
    
    return (
        <View style={{backgroundColor: '#403D39',flex:1}} >
            {
            empty ? <View style={{alignItems: 'center', justifyContent:'center'}} >
                    <Text style={{fontSize: 45  }} >No Expenses this month</Text>
            </View>
            :
            <ScrollView >
                {
                data.map(d => (
                    <View key={d.ID} >
                        <ExpenseCard expense={d.Reason} money={d.Amount} date={d.Date} />
                    </View>
                ))
                }
            </ScrollView>
            }
        </View>
    )
}

export default MonthlyExpense

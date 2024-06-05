import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ExpenseCard from "../components/ExpenseCard";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";


function Expense(){

    const db = useSQLiteContext()
    const [expenses,setExpenses] = useState([])

    async function getData(){
        const result = await db.getAllAsync(
            'SELECT * FROM ExpenseTB;'
        )
        setExpenses(result)
        console.log(`Expense : ${result}`)
    }
    useEffect( () => {
        getData()
    },[db] )

    return(
        <View style={styles.container} >
            <View style={styles.topSection} >
                <Text style={styles.text} >Sort options</Text>
            </View>
            <ScrollView  >  
                <View style={{height: 20}} />
                <View>
                {
                    expenses.map(exp => (
                        <View key={exp.ID}>
                            <ExpenseCard expense={exp.Reason} money={exp.Amount} date={exp.Date}/>
                        </View>
                    ))
                }
                </View>
                <View style={{height: 20}} />  
            </ScrollView>
        </View>
    )
}
export default Expense

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#403D39',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    text : {
        color: '#ffffff',
        fontSize: 20
    },
    topSection:{
        width: 395,
        height: 100,
        gap: 10,
        backgroundColor: '#6f6e6d',
        marginTop: 10,
        alignItems: 'center'
    }
})
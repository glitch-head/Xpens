import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ExpenseCard from "../components/ExpenseCard";

function Expense(){

    const Expenses = [
        { expense: "Hershe chocolate", money: 400,  date:'02-JAN-2021' },
        { expense: "Supply registration", money: 210, date:'12-OCT-2023' },
        { expense: "T-Shirt", money: 600,  date:'12-NOV-2023' },
        { expense: "Necklace", money: 400,    date:'26-FEB-2024' },
        { expense: "Hershe chocolate", money: 400,  date:'02-JAN-2021' },
        { expense: "Supply registration", money: 210, date:'12-OCT-2023' },
        { expense: "T-Shirt", money: 600,  date:'12-NOV-2023' },
        { expense: "Necklace", money: 400,    date:'26-FEB-2024' },
      ];

    return(
        <View style={styles.container} >
            <View style={styles.topSection} >
                <Text style={styles.text} >Sort options</Text>
            </View>
            <ScrollView  >  
                <View style={{height: 20}} />
                <View>
                {
                    Expenses.map(exp => (
                        <ExpenseCard expense={exp.expense} money={exp.money} date={exp.date} />
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
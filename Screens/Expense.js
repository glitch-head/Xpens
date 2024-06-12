import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { useSQLiteContext } from "expo-sqlite/next";
import { useEffect, useState } from "react";
import searchIcon from '../assets/glass.png'
import MonthCard from "../components/monthCard";
import { useNavigation } from "@react-navigation/native";

const Months =[
    'JAN','FEB','MAR',
    'APR','MAY','JUN',
    'JUL','AUG','SEP',
    'OCT','NOV','DEC'
]

function Expense(){
    const navigation = useNavigation()
    const db = useSQLiteContext()
    const [totExpense,setTotExpense] = useState(0)
    const [months,setMonths] = useState([])
    const [year,setYear] = useState()

    async function getData(year){
        let result
        if(!year){
            result = await db.getAllAsync(
                'SELECT * FROM MonthlyExpense WHERE YEAR = (SELECT MAX(YEAR) FROM MonthlyExpense)'
            )
        }else{
            result = await db.getAllAsync(
                `SELECT * FROM MonthlyExpense WHERE YEAR = ${year}`
            )
        }
        setYear(result[0]['YEAR'])
        setTotExpense(result[0]['TOTAL'])
        setMonths(result[0])
        console.log(result[0])
    }

    const getInput = () => {
        console.log(`year : ${year}`)
        db.withTransactionAsync(async()=>{
            getData(year) 
        })
    }

    useEffect( () => {
        db.withTransactionAsync( async() => {
            await getData()
        } )
    },[db] )

    return(
        <View style={styles.container} >
            <View style={styles.topSection} >
                    <View>
                        <Text style={{color:'#fff'}} >Total {year} Expense :</Text>
                        <Text style={{color:'#fff', fontSize: 20}} >${totExpense}</Text>
                    </View>
                    <TextInput
                        placeholder="Year"
                        style={styles.yearStyle}
                        value={year}
                        onChangeText={setYear}
                        inputMode="numeric"
                    />
                    <TouchableOpacity onPress={getInput} >
                        <View style={styles.searchStyle}>
                            <Image source={searchIcon} style={{height: 32, width: 32}} />
                        </View>
                    </TouchableOpacity>
            </View>
            <View style={{height:20}} />
            <View style={styles.monthWrap}>{
                Months.map(m => (
                    <TouchableOpacity key={m}  
                    onPress={() => {navigation.navigate('Monthly Expense',{month: m, year: year})}} >
                    <View key={m} style={styles.monthItem} >
                        <MonthCard month={m} spend={months[m]}/>
                    </View>
                        </TouchableOpacity>
                ))}
            </View>
            <View style={{height: 20}} />  
        </View>
    )
}
export default Expense

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#403D39',
        alignItems: 'center',
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
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    topLeft:{
        flexDirection: 'row'
    },
    topRight:{
        flexDirection: 'row'
    },
    yearStyle:{
        backgroundColor: '#ffffff',
        width: 85,
        height: 50,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        fontSize: 20,
    },
    searchStyle:{
        backgroundColor: '#fff',
        height: 50,
        width: 50,
        borderRadius: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    monthWrap: {
        width: 350, 
        flexDirection:'row', 
        flexWrap:'wrap',
        justifyContent: 'space-between'
    },
    monthItem: {
        width:100,
        alignItems:'center',
        justifyContent: 'center',
    }
})
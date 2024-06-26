import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list'
import { useSQLiteContext } from 'expo-sqlite';

const Months = [
    {key:'1', value:'JAN'}, {key:'2', value:'FEB'},
    {key:'3', value:'MAR'}, {key:'4', value:'APR'},
    {key:'5', value:'MAY'}, {key:'6', value:'JUN'},
    {key:'7', value:'JUL'}, {key:'8', value:'AUG'},
    {key:'9', value:'SEP'}, {key:'10',value:'OCT'},
    {key:'11',value:'NOV'}, {key:'12',value:'DEC'},
]

const AddExpense = () => {

    const db = useSQLiteContext()

    const types = ['upi','cash']
    const [pay,setPay] = useState('')
    const [month, setMonth] = useState("");
    const [day,setDay] = useState()
    const [year,setYear] = useState()
    const [amount,setAmount] = useState()
    const [exp,setExp] = useState('')
    const [change,setChange] = useState(0)

    const addData = async() => {
        
        const dt = `${day}-${month}-${year}`
        const cash = pay === 'cash'

        db.withTransactionAsync(async()=>{

            await db.runAsync(
                'INSERT INTO ExpenseTB (Cash, Amount, Date, Reason) VALUES (?,?,?,?);',
                [cash,amount,dt,exp]
            )
            const result  = await db.getAllAsync(
                'SELECT Amount FROM WalletTB WHERE UPI = ?',
                [!cash]
            )
            console.log(result)
            const total = +result[0]['Amount'] - +amount
            console.log(`amount : ${total}`)
            await db.runAsync(
                'UPDATE WalletTB SET Amount = ? WHERE UPI = ?',
                [total, !cash]
            )
            const row = await db.getAllAsync(
                'SELECT TOTAL FROM MonthlyExpense WHERE YEAR = ?',
                [year]
            )
            if(row.length == 0){
                console.log(`no records available on year: ${year}`)
                await db.runAsync(
                    'INSERT INTO MonthlyExpense'+
                    '(JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC,YEAR,TOTAL)'+
                    'VALUES'+
                    '(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    [0,0,0,0,0,0,0,0,0,0,0,0,year,0]
                )
            }

            const prev = await db.getAllAsync(
                `SELECT TOTAL,${month} FROM MonthlyExpense WHERE YEAR = ${year}`,
            )
            console.log('previous values: ')
            console.log(prev)
            const prevAmount = +prev[0][month]
            const prevTOTAL = +prev[0]['TOTAL']
            console.log(`amount: ${prevAmount} TOTAL: ${prevTOTAL}`)

            await db.runAsync(
                `UPDATE MonthlyExpense SET ${month} = ${prevAmount+ +amount},`+
                `TOTAL = ${prevTOTAL + +amount} WHERE YEAR=${year}`
            )
            const test = await db.getAllAsync(
                'SELECT * FROM MonthlyExpense'
            ) 
            console.log(test)
        })
        setChange(!change)
    }

    useEffect(()=> {
        setDay()
        // setMonth()
        setYear()
        setAmount()
        setExp()
        setPay()
    },[change])

    return (
        <View style={styles.container} >
            <View style={styles.ReasonCard} >
                <Text style={styles.Text} > Expense: </Text>
                <TextInput 
                    multiline={true} 
                    style={styles.ReasonInputArea} placeholder=''
                    onChangeText={setExp} value={exp}
                />
            </View>
           
            <View style={styles.DateCard} >
                    <Text style={styles.Text} > Date: </Text>
                    <TextInput style={styles.day} placeholder='Day'
                        value={day} onChangeText={setDay} inputMode='numeric'
                    />
                    <SelectList 
                        placeholder='Month'
                        setSelected={(val) => setMonth(val)}
                        data={Months}
                        save='value'
                        inputStyles={{color:'#000'}}
                        dropdownTextStyles={{color:'#fff'}}
                        boxStyles={{width:85, backgroundColor: '#fff'}}
                        disabledItemStyles={{display:'none'}}
                        searchicon={<Text></Text>}
                        searchPlaceholder=''
                        closeicon={<Text></Text>}
                    />
                    <TextInput style={styles.year} placeholder='Year'
                        value={year} onChangeText={setYear} inputMode='numeric'
                    />
            </View>
            <View style={styles.AmountCard} >
                <Text style={styles.Text} > Amount: </Text>
                <TextInput style={styles.AmountInputArea} 
                    value={amount} onChangeText={setAmount}
                    inputMode='numeric'
                />
            </View>
            <View style={styles.SelectCard}>
                <Text style={styles.Text}>Payment: </Text>
                {
                    types.map(item => (
                        <View key={item} style={styles.btnText}>
                            <Text style={styles.Text} >{item}</Text>
                            <TouchableOpacity
                                style={styles.outter}
                                onPress={() => {setPay(item)}}
                            >
                                {item === pay && <View style={styles.inner}/> }
                            </TouchableOpacity>
                        </View>
                    ))
                }

            </View>
            <TouchableOpacity onPress={addData} >
                <View style={styles.AddCard} >
                    <Text style={styles.AddText} >  Add </Text>
                </View>
            </TouchableOpacity>

        </View>
    );
}


export default AddExpense;

const styles = StyleSheet.create({
    day : {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 45,
        width: 60,
        alignItems:'center',
        justifyContent:'center',
        padding: 10
    },
    year: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 45,
        width: 80,
        alignItems:'center',
        justifyContent:'center',
        padding: 10
    },
    container:{
        flex: 1,
        backgroundColor: '#403D39',
        alignItems: 'center',
    },
    ReasonCard:{
        height: 180,
        width: 350,
        backgroundColor: '#000000',
        borderRadius: 20,
        justifyContent: 'center',
        justifyContent: 'space-between',
        padding: 20,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    AmountCard:{
        height: 70,
        width: 350,
        backgroundColor: '#000000',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    SelectCard:{
        height: 80,
        width: 350,
        backgroundColor: '#000000',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingHorizontal: 35,
        marginTop: 20,
    },
    AddCard:{
        height: 100,
        width: 350,
        backgroundColor: '#000000',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    DateCard:{
        height: 100,
        width: 350,
        backgroundColor: '#000000',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 20,
        gap: 20
    },
    InputArea:{
        backgroundColor: '#fff',
        width: 255,
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10
    },
    ReasonInputArea:{
        backgroundColor: '#fff',
        width: 310,
        paddingHorizontal: 10,
        borderRadius: 10,
        height: 100,
        display: 'grid'
    },
    btnText:{
        flexDirection: 'row',
        gap: 10,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    AmountInputArea:{
        width: 240,
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#fff',
        color: '#fff'
    },
    inner: {
        height: 15,
        width: 15,
        borderRadius: 20,
        backgroundColor: '#0099ff',
    },
    outter:{
        height: 21,
        width: 21,
        borderWidth: 2,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    ToggleText:{
        color: '#ffff',
        fontSize: 20,
    },
    Text: {
        color: '#ffff',
    },
    AddText: {
        color: '#ffff',
        fontSize: 40,
        fontWeight: 'bold',
    },
})
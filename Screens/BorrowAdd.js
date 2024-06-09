import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSQLiteContext } from 'expo-sqlite';

const BorrowAdd = () => {
    
    const db = useSQLiteContext()

    const [value, setValue] = useState('')
    const [name, setName] = useState('')
    const [amount, setAmount] = useState()
    const [reason, setReason] = useState('')
    const [payment,setPayment] = useState()

    const addData = async() => {

        const toGive = value === 'Borrowed'
        const upi = payment === 'upi'

        console.log(`name : ${name}`)
        console.log(`amount: ${amount}`)
        console.log(`value: ${value} [${toGive}]`)
        console.log(`reason: ${reason}`)
        console.log(`payment: ${payment} [${upi}]`)

        db.withTransactionAsync(async() => {
            await db.runAsync(
                'INSERT INTO BorrowTB (Name , Amount, ToGive, Reason) VALUES(?,?,?,?);',
                [name, amount, toGive, reason]
            )
            
            const sum = await db.getAllAsync(
                'SELECT Amount FROM WalletTB WHERE UPI = ?',
                [upi]
            )
            const upiSum = +sum[0]['Amount'] + +amount
            const upiDif = +sum[0]['Amount'] - +amount
            console.log(`upi sum : ${upiSum} ${typeof(upiSum)}`)
            console.log(`upi dif : ${upiDif} ${typeof(upiDif)}`)
            
            if(toGive){
                await db.runAsync(
                    'UPDATE WalletTB SET Amount = ? WHERE UPI = ?',
                    [upiSum , upi]
                )
            }else{
                await db.runAsync(
                    'UPDATE WalletTB SET Amount = ? WHERE UPI = ?',
                    [upiDif , upi]
                )
            }

            setAmount()
            setName()
            setReason()
            setValue()
        })
    }

    return (
        <View style={styles.container} >

            <View style={styles.NameCard} >
                <Text style={styles.Text} > Name </Text>
                <TextInput style={styles.InputArea} placeholder='Name'
                value={name} onChangeText={setName}
                />
            </View>
            
            <View style={styles.SelectCard} >
                {
                    ['I Gave','Borrowed'].map(val => (
                        <View key={val} style={styles.btnText} >
                            <Text style={styles.ToggleText} >{ val }</Text> 
                            <TouchableOpacity
                            style={styles.outter} 
                            onPress={() => setValue(val)} >
                                {val === value && <View style={styles.inner} /> }
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
            
            <View style={styles.AmountCard} >

                <View>
                    <Text style={styles.Text} > Amount: </Text>
                    <TextInput style={styles.AmountInputArea} value={amount} onChangeText={setAmount} inputMode='numeric' />
                </View>
                
                <View style={styles.paymentCard} >
                {
                    ['upi','cash'].map(val => (
                        <View key={val} style={styles.btnText} >
                            <Text style={styles.ToggleText} >{ val }</Text> 
                            <TouchableOpacity
                                style={styles.outter} 
                                onPress={() => setPayment(val)} 
                            >
                                {val === payment && <View style={styles.inner} /> }
                            </TouchableOpacity>
                        </View>
                    ))
                }
                </View>               
            </View>

            <View style={styles.ReasonCard} >
                <Text style={styles.Text} > Reason: </Text>
                <TextInput multiline={true} style={styles.ReasonInputArea} placeholder=''
                    value={reason} onChangeText={setReason}
                />
            </View>
            
            <TouchableOpacity onPress={addData} >
                <View style={styles.AddCard} >
                    <Text style={styles.AddText} >  Add </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
export default BorrowAdd;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#403D39',
    },
    NameCard:{
        height: 100,
        width: 350,
        backgroundColor: '#000000',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
        gap: 5,
        alignItems:'center'
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
    paymentCard:{
        height: 60,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 35,
        paddingHorizontal:10,
        marginLeft: 10
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
    Text: {
        color: '#ffff',
    },
    AddText: {
        color: '#ffff',
        fontSize: 40,
        fontWeight: 'bold',
    },
    InputArea:{
        backgroundColor: '#fff',
        width: 255,
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10
    },
    AmountInputArea:{
        width: 80,
        height: 40,
        paddingHorizontal: 10,
        // paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        marginLeft: 5,
        marginBottom: 5
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
    TogglePay:{
        color: '#ffff',
        fontSize: 12,
    },

})


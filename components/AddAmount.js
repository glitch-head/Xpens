import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native';
import dollars from '../assets/dollars.png'
import smartphone from '../assets/smartphone.png'
import { useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

const AddAmount = (props) => {

    const db = useSQLiteContext()
    const [medium, setMedium] = useState('upi')
    const [upi,setUpi] = useState(true)

    const handleMedium = (val) => {
        console.log(val)
        setMedium(val)
        setUpi( val === 'upi' ? true : false )
    }
    const [value,setValue] = useState()
    const [change,setChange] = useState(0)

    const addData = async(id) => {
        console.log('id : '+id)
        console.log('Amount : '+value)
        db.withTransactionAsync( async() => {
            await db.runAsync('INSERT INTO WalletTB(UPI,Amount) VALUES(?,?);',
            [ upi, value])
            // await db.runAsync('commit;')
            const result = await db.getAllAsync('SELECT * FROM WalletTB')
            console.log(result)
            }
        )
    }
    

    const addValue = () => {
        console.log(`value inserted $${value}`)
        addData()
        setChange( change? 0 : 1 )
    }
    useEffect(()=>{
        setValue()
    },[change])

    return (
        <View>
            <View style={styles.walletCardleft}>
                <View style={styles.topCard} >
                    <TouchableOpacity onPress={() => handleMedium('upi')}>
                        <View style={styles.cardBtn}>
                            <Image source={smartphone} style={{height: 45, width: 45, opacity: medium  === 'upi'? 1 : .2}}  />  
                            <Text>UPI</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleMedium('cash')}>
                        <View style={styles.cardBtn} >
                            <Image source={dollars} style={{height: 45, width: 45, opacity: medium  === 'cash'? 1 : .2}}/>  
                            <Text>Cash</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.bottomCard} >
                    <Text style={{color:'#ffffff',fontSize: 25 }}> Amount ({medium}):</Text>
                    <View style={{flexDirection: 'row', gap: 20}} >
                    <TextInput style={styles.AmountInputArea} value={value} onChangeText={setValue} inputMode='numeric'/>
                        <TouchableOpacity onPress={addValue}>
                    <View style={styles.Addamount}>
                        <Text style={{color:'#fff' , fontSize: 20 }} >ADD</Text>
                    </View>
                        </TouchableOpacity>
                    </View>
                    {/* <Text style={{color:'#ffffff',fontSize: 45 }}> {props.showAmount} </Text> */}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    walletCardleft: {
        backgroundColor: '#000000',
        width: 240,
        height: 250,
        borderRadius: 25,
        padding: 25,

    },
    container:{
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#403D39'
    },
    cardBtn:{
        height: 70,
        width: 100,
        backgroundColor: '#FFFCF2',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topCard:{
        flexDirection: 'row',
        gap: 10
    },
    add:{
        height: 70,
        width: 70,
        backgroundColor: '#FFFCF2',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 15
    },
    bottomCard:{
        marginTop: 35,
        gap: 7,
        marginLeft: 10
    },
    AmountInputArea:{
        width: 150,
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        marginLeft: 10
    },
    Addamount:{
        width: 120,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10
    }
})

export default AddAmount;

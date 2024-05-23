import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import walletimg from '../assets/wallet.png'
import paymentIcon from '../assets/payment.png'
import downarrow from '../assets/downtrend.png'
import noteIcon from '../assets/sticky-notes.png'
import bankIcon from '../assets/bank.png'
import borrowIcon from '../assets/borrow.png'
import { useNavigation } from '@react-navigation/native'

function Home(){

    const navigation = useNavigation()

    return (
        <View style={styles.main}>

            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.navigate('Borrow')}>
                    <View style={styles.borrow}>
                        <Image source={borrowIcon} style={{height: 70, width: 70}}/>   
                        <Text>Borrow </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
                    <View style={styles.wallet}>
                        <Image source={walletimg} style={{height: 70, width: 70}} />
                        {/* <Text>Wallet</Text> */}
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.expense}>
                <TouchableOpacity onPress={() => navigation.navigate('Expense')}>
                    <View style={styles.payment}>
                        <Text>Expense</Text>
                        <Image source={paymentIcon}/>
                    </View>
                </TouchableOpacity>
                <Image source={downarrow}/>
            </View>


            <View style={styles.report}>
                <View style={styles.reportContent}><Text style={{color:'#FFFCF2'}} >Total borrowed this month : </Text></View>
                <View style={styles.reportContent}><Text style={{color:'#FFFCF2'}} >Total Expenses this month : </Text></View>
                <View style={styles.reportContent}><Text style={{color:'#FFFCF2'}} >Total Savings this month  : </Text></View>
            </View>

            <View style={styles.bottom}>
            <TouchableOpacity onPress={() => navigation.navigate('Borrow')}>
                <View style={styles.savings}>
                    <Image source={bankIcon} style={{height: 70, width: 70}} />   
                    <Text>Savings</Text>
                </View> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notes')}>
                <View style={styles.notes}>
                    <Image source={noteIcon} style={{height: 70, width: 70}} />   
                </View> 
            </TouchableOpacity>
            </View> 
        </View>
    );
}

export default Home

const styles = StyleSheet.create({
    main:{
        backgroundColor: '#EB5E28',
        flex: 1,
        padding:20,
        gap: 20
    },
    top:{
      flexDirection:'row',
      gap: 15  
    },
    borrow:{
        height: 120,
        width: 220,
        backgroundColor: '#FFFCF2',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wallet:{
        height: 120,
        width: 120,
        backgroundColor: '#FFFCF2',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    expense:{
        height: 120,
        width: 355,
        backgroundColor: '#FFFCF2',
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingRight:45
    },
    report:{
        height: 310,
        width: 355,
        backgroundColor: '#FFFCF2',
        borderRadius: 30,
        alignItems: 'center',
        paddingTop: 5

    },
    reportContent:{
        width: 340,
        height: 90,
        backgroundColor: '#403D39',
        borderRadius: 20,
        margin: 5,
        padding: 15
    },
    bottom:{
        flexDirection:'row',
        gap: 15  
    },
    savings:{
        height: 120,
        width: 220,
        backgroundColor: '#FFFCF2',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: 'row'
    },
    notes:{
        height: 120,
        width: 120,
        backgroundColor: '#FFFCF2',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    payment: {
        flexDirection: 'row', 
        backgroundColor: '#CCC5B9', 
        height: 100, 
        width: 150, 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 10, 
        borderRadius: 15,
    }
})
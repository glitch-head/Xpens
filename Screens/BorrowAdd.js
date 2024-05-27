import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const BorrowAdd = () => {
    return (
        <View style={styles.container} >
            <View style={styles.NameCard} >
                <Text style={styles.Text} > Name </Text>
                <TextInput></TextInput>
            </View>
            <View style={styles.SelectCard} >
                <Text style={styles.Text} > Borrow or Given </Text>
            </View>
            <View style={styles.AmountCard} >
                <Text style={styles.Text} > Add Amount </Text>
            </View>
            <View style={styles.ReasonCard} >
                <Text style={styles.Text} > Add Reason </Text>
            </View>
            <View style={styles.NameCard} >
                <Text style={styles.Text} >  Add </Text>
            </View>
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingHorizontal: 35,
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
        paddingHorizontal: 35,
        marginTop: 20,
    },
    ReasonCard:{
        height: 280,
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
    Text: {
        color: '#ffff',
    }
})


import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Rbtn from '../components/Rbtn';



const AddExpense = () => {

    const pays = ['upi','cash']
    const [pay,setPay] = useState('')
    return (
        <View style={styles.container} >
            <View style={styles.ReasonCard} >
                <Text style={styles.Text} > Expense: </Text>
                <TextInput multiline={true} style={styles.ReasonInputArea} placeholder=''/>
            </View>
            <View style={styles.SelectCard}>
                <Text style={styles.Text}>Payment: </Text>
                {/* {
                    pays.map(item => (
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
                } */}

                <Rbtn items={pays} h={80} w={300} />

            </View>
            <View style={styles.AmountCard} >
                <Text style={styles.Text} > Amount: </Text>
                <TextInput style={styles.AmountInputArea} />
            </View>
            <TouchableOpacity>
                <View style={styles.AddCard} >
                    <Text style={styles.AddText} >  Add </Text>
                </View>
            </TouchableOpacity>

        </View>
    );
}


export default AddExpense;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#403D39',
        alignItems: 'center',
        // justifyContent: 'center'
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
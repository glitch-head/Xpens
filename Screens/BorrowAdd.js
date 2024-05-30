import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const BorrowAdd = () => {

    const [value, setValue] = useState('')
    function valHandle(val,value){
        setValue(val)
        console.log(val , value)
        console.log(val === value)
    }

    return (
        <View style={styles.container} >
            <View style={styles.NameCard} >
                <Text style={styles.Text} > Name </Text>
                <TextInput style={styles.InputArea} placeholder='Name'/>
            </View>
            <View style={styles.SelectCard} >
                {
                    ['Given','Borrow'].map(val => (
                        <View key={val} style={styles.btnText} >
                            <Text style={styles.ToggleText} >{ val }</Text> 
                            <TouchableOpacity
                            style={styles.outter} 
                            onPress={() => valHandle(val,value)} >
                                {val === value && <View style={styles.inner} /> }
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
            <View style={styles.AmountCard} >
                <Text style={styles.Text} > Amount: </Text>
                <TextInput style={styles.AmountInputArea} />
            </View>

            <View style={styles.ReasonCard} >
                <Text style={styles.Text} > Reason: </Text>
                <TextInput multiline={true} style={styles.ReasonInputArea} placeholder=''/>
            </View>
            
            <TouchableOpacity>
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
        // paddingBottom: 15,
        // paddingTop: 10,
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
        width: 240,
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#fff',
        color: '#fff'
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

})


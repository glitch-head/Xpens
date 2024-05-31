import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity,Image } from 'react-native';
import { useState } from 'react';
import editFile from '../assets/edit-file.png'

const ExpenseCard = (props) => {

    // const expense= "Hershe chocolate", money= 400,  date='02-JAN-2021'

    return (
        <View style={styles.Card} >
            <View style={styles.left}>
                <Text style={styles.EText} > {props.expense}</Text>
                <View>
                    <Text style={styles.Text} >Price: {props.money}</Text>
                    <Text style={styles.Text} >Date: {props.date}</Text>
                </View>
            </View>
            <View style={{justifyContent: 'center'}} >
            <TouchableOpacity>
            <View style={styles.right} >
                <Image source={editFile} style={{height:64 , width: 64}} />
            </View>
            </TouchableOpacity>
            </View>
        </View>
    );
}


export default ExpenseCard;

const styles = StyleSheet.create({
    Card:{
        backgroundColor: '#fff',
        // alignItems: 'space-between',
        justifyContent: 'space-between',
        height: 120,
        width: 355,
        borderRadius: 20,
        paddingLeft: 20,
        // paddingTop: 10,
        paddingRight: 20,
        flexDirection: 'row',
        margin: 17
    },
    Text: {
        color: '#000',
    },
    EText: {
        color: '#000',
        fontSize: 22,
    },
    left:{
        gap: 7,
        justifyContent: 'space-around'
    },
    right:{
        backgroundColor: '#fff',
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    }
})
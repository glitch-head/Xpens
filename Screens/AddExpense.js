import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const AddExpense = () => {
    return (
        <View style={styles.container} >
            <Text> Add Expense</Text>
        </View>
    );
}


export default AddExpense;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#403D39',
        alignItems: 'center',
        justifyContent: 'center'
    },
})
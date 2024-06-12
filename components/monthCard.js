import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MonthCard = (props) => {
    
    return (
        <View style={styles.container} >
        <Text style={{fontSize: 22}} >{props.month}</Text>
        <Text>Expense: ${props.spend}</Text>
        </View>
    );
}

export default MonthCard;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 100,
        width: 100,
        margin: 15,
        padding: 15
    }
})
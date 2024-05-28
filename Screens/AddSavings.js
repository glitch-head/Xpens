import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const AddSavings = () => {
    return (
        <View style={styles.container} >
            <Text> Add Savings </Text>
        </View>
    );
}


export default AddSavings;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#403D39',
        alignItems: 'center',
        justifyContent: 'center'
    },
})
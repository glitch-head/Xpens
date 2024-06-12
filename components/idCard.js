import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import deleteIcon from '../assets/delete.png'

const IdCard = () => {
    return (
        <View style={styles.card}>
            <Image source={deleteIcon} style={{height:32, width:32}} />
        </View>
    );
}

export default IdCard;

const styles = StyleSheet.create({
    card:{
        height: 80,
        width: 55,
        backgroundColor: '#FFFCF2',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin:10
    }
})
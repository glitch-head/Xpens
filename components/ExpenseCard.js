import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

const ExpenseCard = (props) => {

    return (
        <View style={styles.Card} >
            <View style={styles.left}>
                <Text style={styles.EText} > {props.expense}</Text>
            <View>        
        </View>
        </View>
            <View style={{alignItems: 'center',flexDirection:'row',gap:5}} >
            <View style={styles.vLine} />
                <View style={styles.right} >
                    <Text style={{fontSize:16}} >${props.money}</Text>
                    <Text style={styles.Text} >{props.date}</Text>
                </View>
            </View>
        </View>
    );
}

export default ExpenseCard;

const styles = StyleSheet.create({
    Card:{
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        height: 120,
        width: 355,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        margin: 17
    },
    Text: {
        color: '#000',
    },
    vLine:{
        height:120,
        borderWidth:.5,
        borderColor:'#000',
        width: .5
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
        width: 85,
        justifyContent: 'center',
    }
})
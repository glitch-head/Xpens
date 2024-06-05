import { View, Text, StyleSheet } from "react-native";

function Card(props){

    const price = props.price
    const name = props.name
    const borrow = props.borrow
    const reason = props.reason

    return(
        <View style
        ={styles.card}>
            <View>
            <Text style={{ fontSize: 22}}>{borrow? 'From ': 'To '} {name} </Text>
            <Text>{reason}</Text>
            </View>
            <Text style={{ fontSize: 25}}>{price}$</Text>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card:{
        height: 120,
        width: 355,
        backgroundColor: '#FFFCF2',
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingRight:45,
        margin: 17
    }
})
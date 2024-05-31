import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import dollars from "../assets/dollars.png";
import smartphone from "../assets/smartphone.png";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AddAmount from "../components/AddAmount";
import Amount from "../components/Amount";
import noteIcon from '../assets/sticky-notes.png'


function Wallet() {
    const navigation = useNavigation();

    let upi = 7000,
        cash = 5000;
    let amount = upi + cash;
    const [wallet, setWallet] = useState("Amount");

    const handleWallet = () => {
        setWallet(wallet === "Amount" ? "AddAmount" : "Amount");
    };

    return (
        <View style={styles.container}>
        <View style={styles.walletCard}>
            {wallet === "Amount" ? <Amount /> : <AddAmount />}
            {/* <AddAmount/> */}
            <TouchableOpacity style={{ paddingTop: 25 }} onPress={handleWallet}>
            <View style={styles.add}>
                <Text>+</Text>
            </View>
            </TouchableOpacity>
        </View>

        <View style={styles.features}>
            <View style={styles.featCard}>
                <TouchableOpacity onPress={() => navigation.navigate('Borrow')} >
            <View style={styles.textWrap}>
                <Text style={styles.titleText} >Borrow: </Text>
                <Text>${amount}</Text>
            </View>
                </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                navigation.navigate("BorrowAdd");
                }}
            >
                <View style={styles.featAdd}>
                <Text>+</Text>
                </View>
            </TouchableOpacity>
            </View>
            <View style={styles.featCard}>
                <TouchableOpacity onPress={() => navigation.navigate('Expense')} >
            <View style={styles.textWrap}>
                <Text style={styles.titleText} >Expense: </Text>
                <Text>${amount}</Text>
            </View>
                </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                navigation.navigate("Add Expense");
                }}
            >
                <View style={styles.featAdd}>
                <Text>+</Text>
                </View>
            </TouchableOpacity>
            </View>
            <View style={styles.featCard}>
            <TouchableOpacity onPress={() => navigation.navigate('Add Savings')} >
            <View style={styles.textWrap}>
                <Text style={styles.titleText} >Savings: </Text>
                <Text>${amount}</Text>
            </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Notes')} style={styles.noteBtn} >
                <View style={styles.notes}>
                    <Image source={noteIcon} style={{height: 64, width: 64}} />   
                </View> 
            </TouchableOpacity>
            </View>
        </View>
        </View>
    );
}
export default Wallet;

const styles = StyleSheet.create({
    walletCard: {
        backgroundColor: "#000000",
        width: 350,
        height: 250,
        marginTop: 20,
        borderRadius: 25,
        // padding: 25,
        flexDirection: "row",
    },
    // walletCardright:{
    //     paddingTop: 25
    // },
    container: {
        alignItems: "center",
        flex: 1,
        backgroundColor: "#403D39",
    },
    cardBtn: {
        height: 70,
        width: 100,
        backgroundColor: "#FFFCF2",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    topCard: {
        flexDirection: "row",
        gap: 10,
    },
    add: {
        height: 70,
        width: 70,
        backgroundColor: "#FFFCF2",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginStart: 15,
    },
    bottomCard: {
        marginTop: 35,
        gap: 7,
    },
    featCard: {
        height: 100,
        width: 350,
        backgroundColor: "#FFFCF2",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        paddingHorizontal: 20,
    },
    features: {
        gap: 20,
        marginTop: 30,
    },
    featAdd: {
        height: 70,
        width: 70,
        backgroundColor: "#EB5E28",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginStart: 15,
    },
    textWrap:{
        // backgroundColor: '#0000f0',
        height:70,
        width: 170,
        padding: 10,
        borderRadius:10,
        borderWidth:1
    },
    titleText:{
        fontSize:22
    },
    noteBtn:{
        // backgroundColor:'#0000f0',
        borderWidth:1,
        width: 80,
        height: 70,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

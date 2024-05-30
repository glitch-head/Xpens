import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import dollars from "../assets/dollars.png";
import smartphone from "../assets/smartphone.png";
import { useState } from "react";

const Amount = (props) => {

    let upi = 7000, cash = 5000
    let amount = upi + cash
    const [showAmount, setShowAmount] = useState(amount)

    return (
        <View>
        <View style={styles.walletCardleft}>
            <View style={styles.topCard}>
            <TouchableOpacity
                onPress={() => {
                showAmount == upi ? setShowAmount(amount) : setShowAmount(upi);
                }}
            >
                <View style={styles.cardBtn}>
                <Image source={smartphone} style={{ height: 45, width: 45 }} />
                <Text>UPI</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                showAmount == cash ? setShowAmount(amount) : setShowAmount(cash);
                }}
            >
                <View style={styles.cardBtn}>
                <Image source={dollars} style={{ height: 45, width: 45 }} />
                <Text>Cash</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.add}>
                <Text>+</Text>
                </View>
            </TouchableOpacity>
            </View>
            <View style={styles.bottomCard}>
            <Text style={{ color: "#ffffff", fontSize: 25 }}>
                {" "}
                Total Amount:{" "}
            </Text>
            <Text style={{ color: "#ffffff", fontSize: 45 }}> {showAmount} </Text>
            </View>
        </View>
        </View>
    );
};

export default Amount;


const styles = StyleSheet.create({
  walletCardleft: {
    backgroundColor: "#000000",
    width: 240,
    height: 250,
    borderRadius: 25,
    padding: 25,
  },
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
    marginLeft: 10,
  },
  AmountInputArea: {
    width: 230,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    marginLeft: 10,
  },
});


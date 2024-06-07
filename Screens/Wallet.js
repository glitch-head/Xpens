import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AddAmount from "../components/AddAmount";
import Amount from "../components/Amount";
import noteIcon from "../assets/sticky-notes.png";
import addIcon from "../assets/add.png";
import refreshIcon from '../assets/refresh.png'
import { useSQLiteContext } from "expo-sqlite/next";

function Wallet() {
  const navigation = useNavigation();
  const db = useSQLiteContext();

  const [walletTb, setWalletTb] = useState([]);
  const [borrow, setBorrow] = useState();
  const [expns, setExpns] = useState();
  const [savings, setSavings] = useState();
  const [refresh, setRefresh] = useState(false)

  async function getData() {
    const result  = await db.getAllAsync("SELECT * FROM WalletTB");
    const brw     = await db.getAllAsync("SELECT SUM(Amount) FROM BorrowTB WHERE ToGive = 1");
    const exps    = await db.getAllAsync("SELECT SUM(Amount) FROM ExpenseTB");
    const tot     = await db.getAllAsync("SELECT SUM(Amount) FROM WalletTB");
    console.log(result)
    // console.log(brw[0]["SUM(Amount)"]);
    // console.log(tot);
    setWalletTb(result);
    setBorrow(brw[0]["SUM(Amount)"]);
    setExpns(exps[0]["SUM(Amount)"]);
    setSavings(tot[0]["SUM(Amount)"] - exps[0]["SUM(Amount)"]);
  }

  let upi = 0,
      cash = 0;

  for (let i = 0; i < walletTb.length; i++) {
    if (walletTb[i].UPI) upi += walletTb[i].Amount;
    else cash += walletTb[i].Amount;
  }

  const [wallet, setWallet] = useState("Amount");

  useEffect(
    () => {
      db.withTransactionAsync(async () => {
        await getData();
        // await db.runAsync('DELETE TABLE WalletTB')
      });
    },
    [db, wallet, refresh]
  );
  console.log("updated");

  const handleWallet = () => {
    setWallet(wallet === "Amount" ? "AddAmount" : "Amount");
  };

  return (
    <View style={styles.container}>
      <View style={styles.walletCard}>
        {wallet === "Amount" ? <Amount upi={upi} cash={cash} /> : <AddAmount />}
        <View style={styles.add}>
          <TouchableOpacity onPress={handleWallet}>
            <Image source={addIcon} style={{ height: 64, width: 64 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRefresh(!refresh)} style={{ 
            display : wallet === 'Amount' ? 'flex' : 'none' 
          }} >
            <Image source={refreshIcon} style={{height:64, width:64}}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.features}>
        <View style={styles.featCard}>
          <TouchableOpacity onPress={() => navigation.navigate("Borrow")}>
            <View style={styles.textWrap}>
              <Text style={styles.titleText}>Borrow: </Text>
              <Text>
                ${borrow}
              </Text>
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
          <TouchableOpacity onPress={() => navigation.navigate("Expense")}>
            <View style={styles.textWrap}>
              <Text style={styles.titleText}>Expense: </Text>
              <Text>
                ${expns}
              </Text>
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
          <TouchableOpacity 
            onPress={() => navigation.navigate("Add Savings")}
          >
            <View style={styles.textWrap}>
              <Text style={styles.titleText}>Savings: </Text>
              <Text>
                ${savings}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notes")}
            style={styles.noteBtn}
          >
            <View style={styles.notes}>
              <Image source={noteIcon} style={{ height: 64, width: 64 }} />
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
    flexDirection: "row",
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
    height: 150,
    width: 70,
    // gap: 50,
    // backgroundColor: "#FFFCF2",
    // backgroundColor: '#00f112',
    borderRadius: 50,
    alignItems: "center",
    justifyContent: 'space-between',
    marginTop: 28,
    marginLeft: 20,
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
  textWrap: {
    // backgroundColor: '#0000f0',
    height: 70,
    width: 170,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  titleText: {
    fontSize: 22,
  },
  noteBtn: {
    // backgroundColor:'#0000f0',
    borderWidth: 1,
    width: 80,
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

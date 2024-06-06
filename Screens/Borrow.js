import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Card from "../components/Card";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite/next";

function Borrow() {

  const db = useSQLiteContext()
  const [all,setAll] = useState([])
  const [toggle, setToggle] = useState("All");
  const [display, setDisplay] = useState(all);
  const [change, setChange] = useState(0)

  async function getData() {
    const result = await db.getAllAsync('SELECT * FROM BorrowTB;')
    setAll(result)
    console.log(`Borrow:`)
  }

  useEffect( () => {
    db.withTransactionAsync(async() => {
      await getData()
    })
    console.log('all updated')
  },[db,change])

  const toGive = all.filter((br) => !br.toGive);
  const toGet  = all.filter((br) => br.toGive);

  function showList(value) {
    setToggle(value);
    if (value === "To Give") setDisplay(toGive);
    else if (value === "To Get") setDisplay(toGet);
    else setDisplay(all);
  }

  let totalGive = 0;
  let totalGet = 0;
  all.forEach((element) => {
    if (!element.toGive) {
      totalGive += element.Amount;
    } else {
      totalGet += element.Amount;
    }
  });

  return (
    <View style={styles.main}>
      <View style={styles.topbar}>
        <View style={{ gap: 10 }}>
          <Text style={{ color: "#FFFCF2" }}>Total to give : {totalGive}</Text>
          <Text style={{ color: "#FFFCF2" }}>Total to get : {totalGet}</Text>
        </View>
        <View style={styles.toggles}>
          <View>
            {["All", "To Get", "To Give"].map((value) => (
              <View key={value} style={styles.btnText}>
                <TouchableOpacity
                  style={styles.outter}
                  onPress={() => showList(value)}
                >
                  {toggle === value && <View style={styles.inner} />}
                </TouchableOpacity>
                <Text style={{ color: "#fff" }}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.cards}></View>
          {display.map(br => (
        <View key={br.ID}>
            <Card key={br.ID} name={br.Name} price={br.Amount} borrow={br.toGive} reason={br.Reason} />
        </View>
          ))}
        <View style={styles.cards}></View>
      </ScrollView>
    </View>
  );
}

export default Borrow;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#403D39",
    flex: 1,
    alignItems: "center",
  },
  topbar: {
    backgroundColor: "#6f6e6d",
    height: 120,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    width: 395,
  },
  cards: {
    height: 20,
  },
  outter: {
    height: 21,
    width: 21,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  inner: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#0099ff",
  },
  toggles: {
    width: 100,
  },
  btnText: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 5,
  },
});

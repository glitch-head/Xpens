import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Card from "../components/Card";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite/next";
import IdCard from "../components/idCard";

function Borrow() {
	const db = useSQLiteContext();

	const [all, setAll] = useState([]);
	const [toggle, setToggle] = useState("All");
	const [display, setDisplay] = useState(all);
	const [change, setChange] = useState(true);

	async function getData() {
		const result = await db.getAllAsync("SELECT * FROM BorrowTB;");
		console.log(result);
		setAll(result);
		setDisplay(result);
	}

  	async function delData(id) {
		db.withTransactionAsync(async () => {
			const dataAmount = await db.getAllAsync(
			`SELECT Amount,ToGive FROM BorrowTB WHERE ID = ${id}`
    	);

		const delAmount = +dataAmount[0]["Amount"];
		const Diff = +dataAmount[0]["ToGive"];

		await db.runAsync(`DELETE FROM BorrowTB WHERE ID = ${id}`);
		
		if (Diff) {
			const walletAmount = await db.getAllAsync(
				"SELECT * FROM WalletTB WHERE Amount = (SELECT MAX(Amount) FROM WalletTB);"
			);
			const paymode 	= +walletAmount[0]["UPI"];
			const totAmount = +walletAmount[0]["Amount"] - delAmount;
			await db.runAsync("UPDATE WalletTB SET Amount = ? WHERE UPI = ?", [
				totAmount,
				paymode
			]);
		} else {
			const walletAmount = await db.getAllAsync(
				"SELECT * FROM WalletTB WHERE Amount = (SELECT MIN(Amount) FROM WalletTB);"
			);
			const paymode 	= +walletAmount[0]["UPI"];
			const totAmount = +walletAmount[0]["Amount"] + delAmount;
			await db.runAsync("UPDATE WalletTB SET Amount = ? WHERE UPI = ?", [
				totAmount,
				paymode
			]);
		}
		setChange(!change);	
    });
    console.log("deleted");
	}

	function showList(value) {
		setToggle(value);
		if (value === "To Give") setDisplay(toGive);
		else if (value === "To Get") setDisplay(toGet);
		else setDisplay(all);
	}

	useEffect(
		() => {
		db.withTransactionAsync(async () => {
			await getData();
		});
		showList("All");
		},
		[db, change]
	);

	const toGive = all.filter(br => br.ToGive);
	const toGet = all.filter(br => !br.ToGive);

	let totalGive = 0;
	let totalGet = 0;
	all.forEach(element => {
		if (element.ToGive) {
		totalGive += element.Amount;
		} else {
		totalGet += element.Amount;
		}
	});				
	return (
		<View style={styles.main}>
		<View style={styles.topbar}>
			<View style={{ gap: 10 }}>
			<Text style={{ color: "#FFFCF2" }}>
				Total to give : {totalGive}
			</Text>
			<Text style={{ color: "#FFFCF2" }}>
				Total to get : {totalGet}
			</Text>
			</View>
			<View style={styles.toggles}>
			<View>
				{
					["All", "To Get", "To Give"].map(value =>
						<View key={value} style={styles.btnText}>
							<TouchableOpacity
								style={styles.outter}
								onPress={() => showList(value)}
							>
								{toggle === value && <View style={styles.inner} />}
							</TouchableOpacity>
							<Text style={{ color: "#fff" }}>
								{value}
							</Text>
						</View>
					)
				}
			</View>
			</View>
		</View>
		<ScrollView>
			<View style={styles.cards} />
			{display.map(br =>
			<View key={br.ID} style={{ flexDirection: "row" }}>
				<Card
				key={br.ID}
				name={br.Name}
				price={br.Amount}
				borrow={br.ToGive}
				reason={br.Reason}
				/>
				<TouchableOpacity
				style={{ alignItems: "center", justifyContent: "center" }}
				onPress={() => delData(br.ID)}
				>
				<IdCard key={br.ID} />
				</TouchableOpacity>
			</View>
			)}
			<View style={styles.cards} />
		</ScrollView>
		</View>
	);
	}

	export default Borrow;

	const styles = StyleSheet.create({
	main: {
		backgroundColor: "#403D39",
		flex: 1
	},
	topbar: {
		backgroundColor: "#6f6e6d",
		height: 120,
		marginTop: 30,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		width: 395
	},
	cards: {
		height: 20
	},
	outter: {
		height: 21,
		width: 21,
		borderWidth: 1,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff"
	},
	inner: {
		height: 15,
		width: 15,
		borderWidth: 1,
		borderRadius: 20,
		backgroundColor: "#0099ff"
	},
	toggles: {
		width: 100
	},
	btnText: {
		flexDirection: "row",
		gap: 10,
		marginVertical: 5
	}
	}
);
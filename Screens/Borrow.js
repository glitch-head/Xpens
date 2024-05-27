import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Card from "../components/Card";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";

function Borrow(){

    const all = [
        {name: 'sreebi', money:700 , toMe:true},
        {name: 'muhsin', money:2500, toMe:false},
        {name: 'jasim' , money:1000, toMe:false},
        {name: 'abhi'  , money:200 , toMe:true}
    ]
    const toGive = all.filter((people,_) => (!people.toMe))
    const toGet = all.filter((people,_) => (people.toMe))

    const [toggle,setToggle] = useState('All')
    const [display,setDisplay] = useState(all)

    function showList(value){
        setToggle(value)
        if(value === 'To Give') setDisplay(toGive)
        else if(value === 'To Get') setDisplay(toGet)
        else setDisplay(all)
    }

    let totalGive = 0
    let totalGet = 0
    all.forEach(element => {
        if(!element.toMe){
            totalGive+= element.money
        }
        else{
            totalGet+=element.money
        }
    });

    return(
        <View style={styles.main}>
            <View style={styles.topbar}>
                <View style={{gap : 10}}>
                    <Text style={{color: '#FFFCF2'}}>Total to give : {totalGive}</Text>
                    <Text style={{color: '#FFFCF2'}}>Total to get : {totalGet}</Text>
                </View>
                <View style={styles.toggles}>
                    <View>
                        {['All','To Get','To Give'].map(value => (
                            <View key={value} style={styles.btnText}>
                                <TouchableOpacity
                                style={styles.outter}
                                onPress={() => showList(value)}>
                                    { toggle === value && <View style={styles.inner}/> }
                                </TouchableOpacity>
                                <Text style={{color: '#fff'}} >{value}</Text>
                            </View>
                        ) )
                        }
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={styles.cards}>
                    {
                        display.map((people,index) => (
                            <Card key={index} name={people.name} price={people.money}/>
                        ))
                    }
                </View>
            </ScrollView>
                
        </View>
    )
}

export default Borrow

const styles = StyleSheet.create({
    main:{
        backgroundColor: '#EB5E28',
        flex: 1,
    },
    topbar: {
        backgroundColor: '#403D39',
        height: 120,
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    cards: {
        gap: 10,
    },
    outter:{
        height: 21,
        width: 21,
        borderWidth: 2,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    inner: {
        height: 15,
        width: 15,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#0099ff',
    },
    toggles:{
        width: 100,
        
    },
    btnText:{
        flexDirection: 'row',
        gap: 10,
        marginVertical: 5,
    }
})
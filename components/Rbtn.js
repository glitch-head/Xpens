import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";

const Rbtn = (props) => {

  const [state,setState] = useState('')

  return (
    <View>
      <View style={{height:props.h, width:props.w , flexDirection: 'row',justifyContent: 'space-evenly'}} >
        {props.items.map((item) => (
          <View key={item} style={styles.btnText}>
            <Text style={styles.Text}>{item}</Text>
            <TouchableOpacity
              style={styles.outter}
              onPress={() => {
                setState(item);
              }}
            >
              {item === state && <View style={styles.inner} />}
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Rbtn;

const styles = StyleSheet.create({
    SelectCard:{
        height: 80,
        width: 350,
        backgroundColor: '#000000',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingHorizontal: 35,
        marginTop: 20,
    },
    inner: {
        height: 15,
        width: 15,
        borderRadius: 20,
        backgroundColor: '#0099ff',
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
    Text: {
        color: '#ffff',
    },
    btnText:{
        flexDirection: 'row',
        gap: 10,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
});



import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MarketList = ({ navigation }) => {
  const [marketList, setMarketList] = useState([]);
  const [text, onChangeText] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const listValues = await AsyncStorage.getAllKeys();
      setMarketList(listValues);
    } catch (err) {}
  };

  const addMarket = async (market) => {
    try {
      onChangeText("");
      if (!marketList.includes(market) || market === "") {
        await AsyncStorage.setItem(market, "");
        return getData();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.containerAdd}>
        <TouchableOpacity
          onPress={() => addMarket(text)}
          disabled={text.length < 1}
        >
          <Text style={styles.appButtonText}>+ Añadir</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholderTextColor="#ECD5E6"
          placeholder="Escribe el nombre del mercado"
          value={text}
        />
      </SafeAreaView>
      <FlatList
        data={marketList}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate("Lista", {
                market: item,
              });
            }}
          >
            <Text style={styles.marketButton}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#aaa",
  },
  containerAdd: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#6957E7",
  },
  input: {
    color: "#fff",
    height: 40,
    width: 220,
    borderColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },
  appButtonText: {
    color: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    marginRight: 10,
  },
  addButton: {
    width: 10,
  },
  marketButton: {
    backgroundColor: "#6957E7",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    textAlign: "center",
    fontSize: 17,
    color: "#fff",
  },
  item: {
    padding: 5,
    fontSize: 20,
  },
});
export default MarketList;

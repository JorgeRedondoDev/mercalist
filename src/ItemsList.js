import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ItemList = ({ route, navigation }) => {
  const [values, setValues] = useState(false);
  const [showBuyList, setShowBuyList] = useState(true);
  const [itemsList, setItemsList] = useState([]);
  const [itemsToBuyList, setItemsToBuyList] = useState([]);
  const [text, onChangeText] = useState("");
  const market = route.params.market;

  useEffect(() => {
    getData();
    navigation.setOptions({
      title: market,
    });
  }, []);

  const getData = async () => {
    onChangeText("");
    try {
      const listValues = await AsyncStorage.getItem(market);

      if (listValues !== null) {
        const parseada = JSON.parse(listValues);
        setValues(parseada);
        const falseItems = [];
        const trueItems = [];

        Object.entries(parseada).map((item) => {
          if (item[1] === true) trueItems.push(item[0]);
          if (item[1] === false) falseItems.push(item[0]);
        });
        setItemsList(falseItems);
        setItemsToBuyList(trueItems);
      }
    } catch (err) {}
  };

  const addItem = async (item) => {
    onChangeText("");
    try {
      const newValues = { ...values, ...{ [item]: false } };
      const parse = JSON.stringify(newValues);
      await AsyncStorage.setItem(market, parse);
      return getData();
    } catch (err) {
      alert(err);
    }
  };

  const changeState = async (item) => {
    try {
      const newValues = { ...values, [item]: !values[item] };
      const parse = JSON.stringify(newValues);
      await AsyncStorage.setItem(market, parse);
      return getData();
    } catch {}
  };

  const deleteItem = async (item) => {
    try {
      const newValues = { ...values, [item]: "undefined" };
      const parse = JSON.stringify(newValues);
      await AsyncStorage.setItem(market, parse);
      return getData();
    } catch {}
  };

  const findItem = (text) => {
    const trueItems = [];

    itemsList.map((item) => {
      if (item.includes(text)) trueItems.push(item);
    });
    setItemsList(trueItems);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={
            showBuyList ? styles.buttonContainerActive : styles.buttonContainer
          }
          onPress={() => setShowBuyList(true)}
        >
          <Text style={styles.buttonSelectList}>Comprar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            showBuyList ? styles.buttonContainer : styles.buttonContainerActive
          }
          onPress={() => setShowBuyList(false)}
        >
          <Text style={styles.buttonSelectList}>Lista</Text>
        </TouchableOpacity>
      </View>
      {showBuyList ? (
        <FlatList
          data={itemsToBuyList}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              style={styles.containerBuy}
              onPress={() => changeState(item)}
            >
              <Text style={styles.item}>{item}</Text>
            </Pressable>
          )}
        />
      ) : (
        <>
          <SafeAreaView style={styles.containerAdd}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              placeholderTextColor="#ECD5E6"
              placeholder="Escriba el producto"
              value={text}
            />
            <Pressable onPress={() => addItem(text)} disabled={text.length < 1}>
              <Text style={styles.appButtonText}>+ Añadir</Text>
            </Pressable>
            <Pressable onPress={() => findItem(text)}>
              <Text style={styles.appButtonText}>Buscar</Text>
            </Pressable>
            <Pressable onPress={() => getData()}>
              <Text style={styles.appButtonText}>Limpiar</Text>
            </Pressable>
          </SafeAreaView>
          <FlatList
            data={itemsList}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <Pressable
                key={index}
                style={styles.containerList}
                onPress={() => changeState(item)}
              >
                <Text style={styles.item}>{item}</Text>
                <Pressable onPress={() => deleteItem(item)}>
                  <Text style={styles.buttonDelete}>Borrar</Text>
                </Pressable>
              </Pressable>
            )}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    padding: 4,
    backgroundColor: "#3A2D80",
  },
  buttonContainerActive: {
    flex: 1,
    padding: 4,
    backgroundColor: "#6957E7",
  },
  containerBuy: {
    backgroundColor: "#6957E7",
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#3A2D80",
  },
  buttonSelectList: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  containerList: {
    backgroundColor: "#6957E7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  buttonDelete: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    color: "#fff",
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
    width: 150,
    borderColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
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
  item: {
    color: "#fff",
  },
});

export default ItemList;
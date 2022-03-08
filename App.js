import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ItemList from "./src/ItemsList";
import MarketList from "./src/MarketsList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            headerStyle: { backgroundColor: "3A2D80" },
          }}
        >
          <Stack.Screen name="Mercados" component={MarketList} />
          <Stack.Screen name="Lista" component={ItemList} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
backgroundColor: "#3A2D80",
backgroundColor: "#6957E7",
backgroundColor: "#A763FG",
*/

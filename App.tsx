import { StatusBar, StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screen/login";
import Register from "./screen/register";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useEffect, useState } from "react";
import { UserTrello } from "./context/context";
import { getAuth, User } from "firebase/auth";
import PageTrello from "./screen/pagesTrello";
import AddColonne from "./screen/AddColone";
import EditColonne from "./screen/editColonne";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState({} as User);
  const [connected, setConnected] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <NativeBaseProvider>
      <UserTrello.Provider value={{ user, setUser }}>
        {user && connected ? (
          <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <Tab.Navigator
              activeColor="#e91e63"
              barStyle={{ backgroundColor: "tomato" }}
            >
              <Tab.Screen name="login" component={Login} />
              <Tab.Screen name="Register" component={Register} />
              <Tab.Screen name="Trello" component={PageTrello} />
              <Tab.Screen name={"addColone"} component={AddColonne} />
            </Tab.Navigator>
            <Stack.Screen name="EditColone" component={EditColonne} />
          </NavigationContainer>
        ) : (
          <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <Tab.Navigator>
              <Tab.Screen name="Home" component={Login} />
              <Tab.Screen name="Register" component={Register} />
            </Tab.Navigator>
          </NavigationContainer>
        )}
      </UserTrello.Provider>
    </NativeBaseProvider>
  );
}

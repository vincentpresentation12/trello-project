import { StatusBar, StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screen/login";
import Register from "./screen/register";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useState } from "react";
import { UserTrello } from "./context/context";
import { getAuth, User } from "firebase/auth";
import PageTrello from "./screen/pagesTrello";
import { Icon } from "@rneui/themed";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState({} as User);

  const connected = getAuth().currentUser;
  console.log(connected);
  return (
    <NativeBaseProvider>
      <UserTrello.Provider value={{ user, setUser }}>
        {user ? (
          <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <Tab.Navigator labeled={false}>
              <Tab.Screen name="login" component={Login} />
              <Tab.Screen name="Register" component={Register} />
              <Tab.Screen name={"Trello"} component={PageTrello} />
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={Login} />
            </Tab.Navigator>
          </NavigationContainer>
        )}
      </UserTrello.Provider>
    </NativeBaseProvider>
  );
}

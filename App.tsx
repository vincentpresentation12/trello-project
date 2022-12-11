import { StatusBar, StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screen/login";
import Register from "./screen/register";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { useEffect, useState } from "react";
import { UserTrello } from "./context/context";
import { getAuth, User } from "firebase/auth";
import PageTrello from "./screen/pagesTrello";
import AddColonne from "./screen/AddColone";
import TaskAjout from "./screen/taskAjoutEdit";
import ajoutPicture from "./screen/ajoutPicture";

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
  const MyTabs = () => {
    return (
      <Tab.Navigator>
        {/*<Tab.Screen*/}
        {/*  options={{ title: "login", tabBarIcon: "home" }}*/}
        {/*  name="login"*/}
        {/*  component={Login}*/}
        {/*/>*/}
        {/*<Tab.Screen*/}
        {/*  options={{ title: "register", tabBarIcon: "login" }}*/}
        {/*  name="Register"*/}
        {/*  component={Register}*/}
        {/*/>*/}
        <Tab.Screen
          options={{ title: "home", tabBarIcon: "home" }}
          name="Trello"
          component={PageTrello}
        />
        <Tab.Screen
          options={{ title: "ajout", tabBarIcon: "login" }}
          name={"addColone"}
          component={AddColonne}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NativeBaseProvider>
      <UserTrello.Provider value={{ user, setUser }}>
        {user && connected ? (
          <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                headerTitle: "My Trello",
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: "#f4511e",
                },
              }}
            >
              <Stack.Screen name="First" component={MyTabs} />
              <Stack.Screen
                options={{
                  headerShown: true,
                  headerTitle: "Ajouter une task",
                  headerTitleAlign: "center",
                }}
                name="Ajout task"
                component={TaskAjout}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                  headerTitle: "Supprimer une task",
                  headerTitleAlign: "center",
                }}
                name={"ajoutPicture"}
                component={ajoutPicture}
              />
            </Stack.Navigator>
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

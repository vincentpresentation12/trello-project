import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Link,
  Stack,
} from "native-base";
import { signIn, signOut } from "../api/userApi";
import { Icon } from "@rneui/themed";
import { getAuth, User } from "firebase/auth";

const Login = ({ navigation }) => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signIn(email, password).then((user) => {
      if (user) {
        navigation.navigate("Trello");
      }
    });
  };

  const handleLogout = () => {
    signOut().then(() => {
      navigation.navigate("Home");
    });
  };
  return (
    <>
      {auth.currentUser ? (
        <Flex right={0} width={"full"} backgroundColor={"blue.100"}>
          <Icon
            onPress={handleLogout}
            name={"logout"}
            size={40}
            color={"#517fa4"}
          ></Icon>
        </Flex>
      ) : null}
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Stack space={4} w="100%">
          <FormControl isRequired>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Email
            </FormControl.Label>
            <Input
              keyboardType={"email-address"}
              onChange={(e) => setEmail(e.nativeEvent.text)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Password
            </FormControl.Label>
            <Input
              onChange={(e) => setPassword(e.nativeEvent.text)}
              type="password"
            />
          </FormControl>
          <Button onPress={handleLogin}>Se connecter</Button>
        </Stack>
      </Box>
    </>
  );
};

export default Login;

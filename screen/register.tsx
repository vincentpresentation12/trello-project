import React, { useContext, useState } from "react";
import { Box, Button, FormControl, Input, Link, Stack } from "native-base";
import { UserTrello } from "../context/context";
import { createUser } from "../api/userApi";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserTrello);
  const handleRegister = () => {
    createUser(email, password).then((user) => {
      setUser(user);
      navigation.navigate("login");
    });
  };

  return (
    <Box safeArea flex={1} p={2} w="90%" mx="auto">
      <Stack space={4} w="100%">
        <FormControl isRequired>
          <FormControl.Label
            _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
          >
            Email
          </FormControl.Label>
          <Input onChange={(e) => setEmail(e.nativeEvent.text)} />
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
        <Button onPress={handleRegister}>S'enregister</Button>
      </Stack>
    </Box>
  );
};

export default Register;

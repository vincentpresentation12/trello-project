import React from "react";
import { Box, Button } from "native-base";
import { getAuth } from "firebase/auth";
import { Text } from "react-native";

const PageTrello = () => {
  const user = getAuth().currentUser;
  return (
    <Box>
      <Button>Page Trello</Button>
      <Text>{user?.email}</Text>
      <Text>{user?.uid}</Text>
    </Box>
  );
};

export default PageTrello;

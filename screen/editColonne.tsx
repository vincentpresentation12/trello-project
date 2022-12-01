import React from "react";
import { Box } from "native-base";
import { Text } from "react-native";
import { Icon } from "@rneui/themed";

const EditColonne = ({ navigation }) => {
  return (
    <Box>
      <Icon name={"back"} size={40} color={"#517fa4"}></Icon>
      <Text>Edit Colonne</Text>
    </Box>
  );
};

export default EditColonne;

import React from "react";
import { Box, HStack } from "native-base";
import { Text } from "react-native";
import { Icon } from "@rneui/themed";

const AffichageColonne = ({
  item,
  DeleteColone,
  setIsOpenEdit,
  setOneItem,
}) => {
  return (
    <>
      {item.map((item: any, idx) => (
        <Box
          key={idx}
          alignItems={"center"}
          rounded={"lg"}
          width={"full"}
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          marginBottom={2}
        >
          <HStack key={idx} space={5} justifyContent={"center"}>
            <Text>{item.name}</Text>
            <Icon
              name="trash"
              type={"font-awesome"}
              size={15}
              color={"red"}
              onPress={() => DeleteColone(item.id)}
            />
            <Icon
              name="edit"
              type={"font-awesome"}
              size={15}
              color={"orange"}
              onPress={() => (setIsOpenEdit(true), setOneItem(item))}
            />
          </HStack>
        </Box>
      ))}
    </>
  );
};

export default AffichageColonne;

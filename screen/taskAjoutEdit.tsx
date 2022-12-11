import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { Box, Center, HStack, Input, PresenceTransition } from "native-base";
import {
  AddCardToColoneTrello,
  GetCardByColoneTrello,
  GetColoneTrello,
} from "../api/coloneTrello";
import { getAuth } from "firebase/auth";
import { Icon } from "@rneui/themed";
import AddTaskInput from "../component/addTask";
import { uuidv4 } from "@firebase/util";

const TaskAjout = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [oneItem, setOneItem] = useState({});
  const user = getAuth().currentUser;

  useEffect(() => {
    GetColoneTrello(user.uid).then((data: []) => {
      return setData(data);
    });
  }, []);

  const addTask = (id: string, name: string) => {
    AddCardToColoneTrello(id, {
      id: uuidv4(),
      name: name,
    }).then(() => {
      return setIsOpen(false);
    });
  };

  return (
    <Box>
      <Text>TaskAjout</Text>
      {data.map((item: any, idx) => (
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
              name="add"
              type={"Ionicons"}
              size={15}
              color={"red"}
              onPress={() => (setIsOpen(!isOpen), setOneItem(item))}
            />
          </HStack>
        </Box>
      ))}
      <AddTaskInput isOpen={isOpen} item={oneItem} addTask={addTask} />
    </Box>
  );
};

export default TaskAjout;

import React, { useEffect, useState } from "react";

import { Text } from "react-native";
import AddTask from "../component/addTask";
import {
  AddColoneTrello,
  DeleteColoneTrello,
  EditColoneTrello,
  GetColoneTrello,
} from "../api/coloneTrello";
import { getAuth } from "firebase/auth";
import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  PresenceTransition,
} from "native-base";
import { Icon } from "@rneui/themed";

const AddColonne = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [dataColone, setDataColone] = useState([]);
  const [name, setName] = React.useState("");
  const [picture, setPicture] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  //isopen for edit by id
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  const user = getAuth().currentUser;

  useEffect(() => {
    GetColoneTrello(user.uid).then((data: []) => {
      return setData(data);
    });
  }, [dataColone]);

  const addColone = () => {
    AddColoneTrello({
      name: name,
      picture: picture,
      cards: [],
      userId: user.uid,
    }).then((data: []) => {
      return setDataColone(data), setIsOpen(false);
    });
  };

  const DeleteColone = (id: string) => {
    DeleteColoneTrello(id).then((data: []) => {
      return setDataColone(data);
    });
  };

  const EditColone = (id: string) => {
    setIsOpenEdit(true);
    EditColoneTrello(id, {
      name: name,
      picture: picture,
    }).then((data: []) => {
      return setDataColone(data);
    });
  };

  return (
    <>
      <Text>Vos colonne</Text>
      {data.map((item: any, idx) => {
        return (
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
                onPress={() =>
                  navigation.navigate("EditColone", { id: item.id })
                }
              />
            </HStack>
          </Box>
        );
      })}
      <Button
        marginTop={20}
        onPress={() => setIsOpen(!isOpen)}
        colorScheme={"blue"}
      >
        {isOpen ? "Annuler" : "Ajouter une colonne"}
      </Button>
      <PresenceTransition
        visible={isOpen}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 250,
          },
        }}
      >
        <Center rounded="md">
          <Input
            type={"text"}
            onChangeText={setName}
            placeholder={"Titre..."}
          />
          <Button onPress={addColone}>Ajouter</Button>
        </Center>
      </PresenceTransition>
      <PresenceTransition
        visible={isOpenEdit}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 250,
          },
        }}
      >
        <Center rounded="md">
          <Input
            type={"text"}
            onChangeText={setName}
            placeholder={"Modiifer le titre"}
          />
          <Button>Modifier</Button>
        </Center>
      </PresenceTransition>
      {/*<TouchableOpacity onPress={addColone}>*/}
      {/*  <Text>Add Colonne</Text>*/}
      {/*</TouchableOpacity>*/}
      <AddTask />
    </>
  );
};

export default AddColonne;

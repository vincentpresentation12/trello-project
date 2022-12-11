import React, { useEffect, useState } from "react";
import {
  DeleteCardInColoneTrello,
  EditCardInColoneTrello,
  GetColoneTrelloWithCard,
} from "../api/coloneTrello";
import { getAuth } from "firebase/auth";
import { Text } from "react-native";
import { Box, HStack } from "native-base";
import { Icon } from "@rneui/themed";
import ModalEditColonne from "../component/ModalEditColonne";
import ModalEditTask from "../component/modalEditTask";

const AddPicture = () => {
  const user = getAuth().currentUser;
  const [data, setData] = useState([]);
  const [effect, setEffect] = useState(false);
  const [oneItem, setOneItem] = React.useState({});
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);

  useEffect(() => {
    GetColoneTrelloWithCard(user.uid).then((data: []) => {
      return setData(data);
    });
  }, []);

  const DeleteCard = (id: string, cardId: string) => {
    DeleteCardInColoneTrello(id, cardId).then(() => {
      return setEffect(!effect);
    });
  };

  const EditCard = (id: any, card: any) => {
    EditCardInColoneTrello(data[0].id, card).then(() => {
      return setEffect(!effect);
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
            {item && item.cards && item.cards.length > 0 ? (
              <>
                <Text>{item.cards.map((item: any) => item.name)}</Text>
                <Icon
                  name="trash"
                  type={"font-awesome"}
                  size={15}
                  color={"red"}
                  onPress={() => DeleteCard(item.id, item.cards[0].id)}
                />
                <Icon
                  name="edit"
                  type={"font-awesome"}
                  size={15}
                  color={"orange"}
                  onPress={() => (
                    setIsOpenEdit(!isOpenEdit),
                    setOneItem(item.cards.map((item: any) => item))
                  )}
                />
              </>
            ) : (
              <Text>no task</Text>
            )}
          </HStack>
        </Box>
      ))}
      <ModalEditTask
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        item={oneItem}
        EditColone={EditCard}
      />
    </Box>
  );
};

export default AddPicture;

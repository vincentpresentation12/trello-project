import React, { useEffect, useState } from "react";
import { Button, Center, Input, PresenceTransition } from "native-base";
import { Image } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import { AddPictureToCard, UploadFile } from "../api/picture";
import { uuidv4 } from "@firebase/util";
import { GetCardByColoneTrello } from "../api/coloneTrello";

const AddTaskInput = ({ isOpen, item, addTask }) => {
  const [name, setName] = React.useState("");
  const [image, setImage] = useState(null);

  const uplaod = async (id: string, cardId: string) => {
    let file = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!file.cancelled) {
      setImage(file.uri);
    }
  };
  console.log(image);
  const AddPictureToCard = (id: string, cardId: string, image: any) => {
    UploadFile(image, image.fileName).then((data) => {
      AddPictureToCard(id, cardId, {
        id: uuidv4(),
        url: data,
      });
    });
  };
  return (
    <Center>
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
        <Center width={"350"} h="300" mt="7" bg="gray.200" rounded="md">
          <Input
            type={"text"}
            placeholder={"titre de la task"}
            onChangeText={setName}
            value={name}
          />
          <Button marginTop={5} onPress={() => uplaod(item.id, item.id)}>
            chercher une image
            <Image source={{ uri: image }} />
          </Button>
          <Button
            marginTop={5}
            onPress={() => AddPictureToCard(item.id, item.id, image)}
          >
            ajouter une image(ne fonctionne pas)
            <Image source={{ uri: image }} />
          </Button>
          <Button marginTop={5} onPress={() => addTask(item.id, name)}>
            ajouter votre tache
          </Button>
        </Center>
      </PresenceTransition>
    </Center>
  );
};

export default AddTaskInput;

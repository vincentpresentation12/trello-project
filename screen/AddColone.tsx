import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import {
  AddColoneTrello,
  DeleteColoneTrello,
  EditColoneTrello,
  GetColoneTrello,
} from "../api/coloneTrello";
import { getAuth } from "firebase/auth";
import { Button } from "native-base";
import AddColonneComponent from "../component/addColonne";
import ModalEditColonne from "../component/ModalEditColonne";
import AffichageColonne from "../component/affichageColonne";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TaskAjout from "./taskAjoutEdit";

const AddColonne = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [dataColone, setDataColone] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteColone, setDeleteColone] = useState(false);
  const [name, setName] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [oneItem, setOneItem] = React.useState({});
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  const user = getAuth().currentUser;
  const Stack = createStackNavigator();
  useEffect(() => {
    GetColoneTrello(user.uid).then((data: []) => {
      return setData(data);
    });
  }, [dataColone, edit, deleteColone]);

  const addColone = () => {
    AddColoneTrello({
      name: name,
      cards: [],
      userId: user.uid,
    }).then(() => {
      return setDataColone(!dataColone), setIsOpen(false);
    });
  };

  const DeleteColone = (id: string) => {
    DeleteColoneTrello(id).then(() => {
      return setDeleteColone(!deleteColone);
    });
  };

  const EditColone = (id: string, name: string) => {
    EditColoneTrello(id, {
      name: name,
      cards: [],
      userId: user.uid,
    }).then(() => {
      return setEdit(!edit);
    });
  };

  return (
    <>
      <Text>Vos colonne</Text>
      <AffichageColonne
        item={data}
        setIsOpenEdit={setIsOpenEdit}
        DeleteColone={DeleteColone}
        setOneItem={setOneItem}
      />
      <Button
        marginTop={20}
        onPress={() => setIsOpen(!isOpen)}
        colorScheme={"blue"}
      >
        {isOpen ? "Annuler" : "Ajouter une colonne"}
      </Button>
      <AddColonneComponent
        isOpen={isOpen}
        addColone={addColone}
        setName={setName}
      />
      <ModalEditColonne
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        item={oneItem}
        EditColone={EditColone}
      />
      <Button onPress={() => navigation.navigate("Ajout task")}>task</Button>
    </>
  );
};

export default AddColonne;

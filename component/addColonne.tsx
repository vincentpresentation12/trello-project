import React, { useEffect, useState } from "react";
import { Box, Button, Center, Input, PresenceTransition } from "native-base";
import { getAuth } from "firebase/auth";

const AddColonneComponent = ({ isOpen, setName, addColone }) => {
  const [data, setData] = useState([]);

  const user = getAuth().currentUser;

  return (
    <Box>
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
    </Box>
  );
};

export default AddColonneComponent;

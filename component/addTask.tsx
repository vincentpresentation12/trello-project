import React from "react";
import { Button, Center, Input, PresenceTransition } from "native-base";

const AddTaskInput = ({ isOpen, item, addTask }) => {
  const [name, setName] = React.useState("");
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
          <Button onPress={() => addTask(item.id, name)}></Button>
        </Center>
      </PresenceTransition>
    </Center>
  );
};

export default AddTaskInput;

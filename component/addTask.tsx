import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  CheckIcon,
  FormControl,
  Select,
  WarningOutlineIcon,
} from "native-base";
import { Text } from "react-native";
import { GetColoneTrello } from "../api/coloneTrello";
import { getAuth } from "firebase/auth";

const AddTask = () => {
  const [data, setData] = useState([]);

  const user = getAuth().currentUser;

  return (
    <Box>
      <Text>Add Task</Text>
    </Box>
  );
};

export default AddTask;

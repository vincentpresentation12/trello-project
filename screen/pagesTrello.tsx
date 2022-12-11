import React, { useEffect } from "react";
import { Box, Button, Flex, HStack } from "native-base";
import { getAuth } from "firebase/auth";
import { Text, View } from "react-native";
import { signOut } from "../api/userApi";
import { Icon } from "@rneui/themed";
import { GetColoneTrelloWithCard } from "../api/coloneTrello";

const PageTrello = ({ navigation }) => {
  const user = getAuth().currentUser;
  const [data, setData] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [time, setTime] = React.useState(Date.now());

  useEffect(() => {
    GetColoneTrelloWithCard(user.uid).then((data: []) => {
      return setData(data);
    });
    const interval = setInterval(() => setTime(Date.now()), 5000);
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {}, []);

  const handleLogout = () => {
    signOut().then(() => {
      navigation.navigate("Home");
    });
  };
  return (
    <View>
      <Box>
        {user ? (
          <HStack right={0} width={"full"}>
            <Text>se deconnecter</Text>
            <Box>
              <Icon
                onPress={handleLogout}
                name={"logout"}
                size={30}
                color={"#517fa4"}
              ></Icon>
            </Box>
          </HStack>
        ) : null}
        {data.map((item: any, idx) => (
          <Box
            key={idx}
            alignItems={"center"}
            rounded={"lg"}
            width={"full"}
            borderColor="black"
            borderWidth="1"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            marginBottom={2}
          >
            <HStack key={idx} space={5} justifyContent={"center"}>
              <Text>{item.name}</Text>
              {item.cards ? (
                <>
                  <Icon
                    name="chevron-small-down"
                    type={"entypo"}
                    onPress={() => setShow(!show)}
                  />
                  {show ? (
                    <Text>{item.cards.map((item: any) => item.name)}</Text>
                  ) : null}
                </>
              ) : null}
            </HStack>
          </Box>
        ))}
      </Box>
    </View>
  );
};

export default PageTrello;

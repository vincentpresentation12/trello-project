// import React, { useEffect, useState } from "react";
// import { Box } from "native-base";
// import { Text } from "react-native";
// import { GetAllColone } from "../api/coloneTrello";
//
// const AddColonne = () => {
//   const [data, setData] = useState<object>([]);
//
//   useEffect(() => {
//     const data = () => {
//       GetAllColone().then((data: object) => {
//         return setData(data);
//       });
//     };
//   }, [data]);
//
//   console.log(data);
//
//   return (
//     <Box>
//       <Text>Add Task</Text>
//     </Box>
//   );
// };
//
// export default AddColonne;

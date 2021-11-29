import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Dimensions, Text } from "react-native";
import { useChatContext } from "stream-chat-expo";
import { TextInput, Title, Button } from 'react-native-paper'


import { View } from "../components/Themed";
import UserListItem from "../components/UserListItem";

const { width, height } = Dimensions.get('screen');

export default function UsersScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchUser, setSearchUser] = useState("");

  const { client } = useChatContext();

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await client.queryUsers({});
    setUsers(response.users);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //Search for user
  const HandleSearch = (searchUser: string) => {
    const filters ={members:{ 
      $in: [searchUser]}
    }
    return filters
  }

  return (
    <View style={styles.container}>
      
      <FlatList
          data={users}
          renderItem={({ item }) => <UserListItem user={item} />}
          refreshing={isLoading}
          onRefresh={fetchUsers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  input:{
    marginTop: 10,
    marginBottom: 10,
    width: width /1.5 ,
    height:"100%"
  },
  button: {
      marginTop: 10,
      backgroundColor:"#2D4DF4",
      color:"white"
  },
  buttonContainer: {
      width: 20,
      height:30,
      color:"white"
  },
});

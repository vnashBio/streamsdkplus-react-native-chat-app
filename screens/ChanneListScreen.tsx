import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ChannelList } from 'stream-chat-expo';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import AuthContext from '../contexts/Authentication';
import { RootTabScreenProps } from '../types';

export default function ChanneListScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
   //The onChannelPressed Func to fire when we click on a channel
   const onChannelPressed = (channel) => {
    navigation.navigate("Channel", { channelId: channel.id });
  };
  
  const { userId } = React.useContext(AuthContext);

  //seach a channel where the users is a member
  const filters ={members:{ 
                    $in: [userId]}
                  }

  return (
    <ChannelList onSelect={onChannelPressed}
      filters={filters}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

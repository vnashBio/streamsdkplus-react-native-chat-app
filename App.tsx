import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState, useContext} from 'react'
import { useColorScheme, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StreamChat } from 'stream-chat';
import { 
  OverlayProvider, 
  Chat, 
  ChannelList, 
  Channel, 
  MessageList,
  MessageInput } from 'stream-chat-expo';

import AuthContext from "./contexts/Authentication";  
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";


// Register with stream and get your API_KEY
const API_KEY = 'r4q6bevrfzfc';
const client = StreamChat.getInstance(API_KEY);

export default function App(){
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  const [userId, setUserId] = useState('');

  //connect user to the stream chat database Or in other terms register user
  useEffect(() => {
    return () => client.disconnectUser();
  }, [])

  if(!isLoadingComplete){
    return null;
  }else{
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{userId, setUserId}}>
          <OverlayProvider>
            <Chat client={client}>
              <Navigation colorScheme="light"/>
              {/* <Chat client={client}>

                {selectedChannel ? (
                  <Channel channel={selectedChannel}>

                    <MessageList />
                    <MessageInput />

                  <Text style={{margin:50}} onPress={() => setSelectedChannel(null)}>Go back</Text>
                  </Channel>
                  ): (
                    <ChannelList onSelect={onChannelPressed}/>
                  )}
                
              </Chat> */}
            </Chat>
          </OverlayProvider>
          <StatusBar />
        </AuthContext.Provider>
      </SafeAreaProvider>
    )
  }
}

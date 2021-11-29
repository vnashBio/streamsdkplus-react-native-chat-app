import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChatContext} from 'stream-chat-expo';
import AuthContext from '../contexts/Authentication';
import { Button } from 'react-native-paper';
import { TextInput, Title } from 'react-native-paper'
import { color } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

export default function SignUpScreen() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const { setUserId } = useContext(AuthContext);

    const { client } = useChatContext();

    const connectUser = async (username: string, email: string, phone: string, password:string) => {
        await client.connectUser(
            {
                id: username,
                name: email,
                phone:phone,
                password:password
                // image: "https://i.imgur.com/fR9Jz14.png",
            },
            client.devToken(username)
        );

        // // Create a channel
        // const channel = client.channel("messaging", "public", {
        //     name:'Public Chat Room',
        // });
        // await channel.watch();

        setUserId(username)
    };

    const signUp = () =>{
        // sign user with backend

        connectUser(username, email, phone, password);
        alert("Loging you In")
    };

    return (
        <SafeAreaView style={styles.root}>
                <Text style={{color:"#2D4DF4", fontSize:40, marginBottom:10}}>AppiChat.</Text>
                <TextInput 
                    label="Username" 
                    style={styles.input} 
                    numberOfLines={1} 
                    onChangeText={setUserName} 
                />

                <TextInput 
                    label="Email" 
                    style={styles.input} 
                    numberOfLines={1} 
                    onChangeText={setEmail} 
                />

                <TextInput 
                    label="Phone" 
                    style={styles.input} 
                    numberOfLines={1} 
                    onChangeText={setPhone} 
                />
                <TextInput 
                    label="Password" 
                    style={styles.input} 
                    numberOfLines={1} 
                    onChangeText={setPassword} 
                />

                <Button 
                    modeValue='contained' 
                    style={styles.button} 
                    contentStyle={styles.buttonContainer}
                    onPress={signUp}
                >
                    <Text style={{color:"white"}}>Sign Up</Text>
                </Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        margin:"auto"
    },
    inputContainer:{
        backgroundColor:"white",
        padding:10
    },
    input:{
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15
    },
    button: {
        marginTop: 10,
        backgroundColor:"#2D4DF4",
        color:"white"
    },
    buttonContainer: {
        width: width / 1.5,
        height: height / 15,
        color:"white"
    },
})


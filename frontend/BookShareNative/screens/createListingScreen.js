import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import AuthContext from "../context/auth-context";


const CreateListingScreen = ({ navigation }) => {

    const ctx = useContext(AuthContext);
    const onLogoutPress = () => {
        AsyncStorageLib.setItem('user', "");
        ctx.setState({
            ...ctx.state,
            isLoggedIn: false,
            user: null
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.userName}>{ctx.state.user.name}</Text>
            </View>
            <Button title="Logout" style={styles.action_button} onPress={onLogoutPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    action_button: {
        flex: 1,
    },
    userName: {
        margin: 10,
        fontSize: 25
    },
    container: {
        flexDirection: 'column', // inner items will be added vertically
        flexGrow: 1,            // all the available vertical space will be occupied by it
        justifyContent: 'space-between' // will create the gutter between body and footer
    },
});

export default CreateListingScreen
import React from "react";
import { View, Text, Button } from 'react-native';
import AuthContext from "../context/auth-context";


const ProfileScreen = ({ navigation }) => {

    const onNavigatePress = () => {
        navigation.navigate("Auth")
    }

    return (
        <AuthContext.Consumer>
            {(ctx) => {
                return (
                    <View>
                        <Text>
                            <Button title="Mi" onPress={onNavigatePress}>

                            </Button>
                        </Text>
                    </View>
                )
            }}
        </AuthContext.Consumer>
    )
}

export default ProfileScreen
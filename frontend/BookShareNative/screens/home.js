import React from "react";
import { View, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "../routes/bottomStack";


const Home = ({ navigation }) => {
    const sessionToken = navigation.getParam("sessionToken")
    return (
        <NavigationContainer>
            <Tabs/>
        </NavigationContainer>
    )
}

export default Home
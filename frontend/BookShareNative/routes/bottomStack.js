import React, {useContext} from "react";
import AuthContext from "../context/auth-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/profileScreen";
import ExporeScreen from "../screens/exploreScreen";
import { ProfileTabNavigator } from './customNavigation'
import AuthScreen from "../screens/auth";


const Tab = createBottomTabNavigator()

const Tabs = () => {
    const {state } = useContext(AuthContext)
    console.log(state)
    return(
        <Tab.Navigator>
            { state.isLoggedIn ? <Tab.Screen name="Profile" component={ProfileScreen} /> : <Tab.Screen name="Auth" component={AuthScreen} />}
            <Tab.Screen name="Explore" component={ExporeScreen} />
        </Tab.Navigator>
    );
}

export default Tabs
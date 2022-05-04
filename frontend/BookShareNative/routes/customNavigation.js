import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/profileScreen";
import AuthScreen from "../screens/auth";


const Stack = createStackNavigator();  // creates object for Stack Navigator

const ProfileTabNavigator = () => {
  return (
    <Stack.Navigator >    // contains all child component screens within a stack. 
       <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
       <Stack.Screen
        name="Auth"
        component={AuthScreen}
      />
    </Stack.Navigator>
  );
}

export {ProfileTabNavigator}; // Stack-Navigator for Screen 1 Tab
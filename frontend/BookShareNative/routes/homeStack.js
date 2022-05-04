import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";
import AuthScreen from "../screens/auth";

const screens = {
    Auth: {
        screen: AuthScreen,
        
    },
    Home : {
        screen: Home,
        navigationOptions: {
            headerLeft: ()=> null,
        }
    }
}

const homeStack = createStackNavigator(screens)

export default createAppContainer(homeStack)
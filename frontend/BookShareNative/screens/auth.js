import React, { useContext} from "react";
import { Button, View, TextInput, StyleSheet } from 'react-native';
import { signUp } from '../src/api/signUp';
import { signIn } from '../src/api/signIn';
import AuthContext from "../context/auth-context";


var email
const onEmailType = (text) => {
    email = text
}

var password
const onPasswordType = (text) => {
    password = text
}

const AuthScreen = ({ route }) => {
    const ctx = useContext(AuthContext);
    

    const onSignUpPress = async () => {
        const data = await signUp(email, password)
        if (data.success) {
            ctx.setState({
                isLoggedIn : true
              })
        }
    }

    const onSignInPress = async () => {
        const data = await signIn(email, password)
        console.log(data)
        if (data.success) {
            ctx.setState({
                isLoggedIn : true
              })
        }
    }

    return (
        <View>
            <TextInput
                style={{ padding: 10, borderWidth: 1, marginHorizontal: 20, marginVertical: 10 }}
                placeholder={"Email"}
                onChangeText={onEmailType}
            />
            <TextInput
                style={{ padding: 10, borderWidth: 1, marginHorizontal: 20, marginVertical: 10 }}
                placeholder={"Password"}
                onChangeText={onPasswordType}
                secureTextEntry={true}
            />
            <View style={styles.action_button}>
                <Button
                    title={"Sign In"}
                    onPress={onSignInPress}
                />
            </View>
            <View style={styles.action_button}>
                <Button
                    title={"Sign Up"}
                    onPress={onSignUpPress}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    action_button: {
        marginHorizontal: 20,
        marginTop: 10
    },
});

export default AuthScreen
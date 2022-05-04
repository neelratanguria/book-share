import React from "react";
import { Button, View, TextInput, StyleSheet } from 'react-native';

var mEmail
const onEmailType = (text) => {
    mEmail = text
}

var mPassword
const onPasswordType = (text) => {
    mPassword = text
}

const AuthForm = (props) => {

    const onSignUpPress = () => {
        props.onSignUpPress(mEmail, mPassword)
    }

    const onSignInPress = () => {
        props.onSignInPress(mEmail, mPassword)
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

export default AuthForm
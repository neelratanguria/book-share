import React, { useContext, useEffect, useState } from "react";
import { Button, View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { signUp } from '../src/api/signUp';
import { signIn } from '../src/api/signIn';
import AuthContext from "../context/auth-context";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import Loader from "../components/LoaderComponent";


var email
const onEmailType = (text) => {
    email = text
}

var password
const onPasswordType = (text) => {
    password = text
}

var name
const onNameType = (text) => {
    name = text
}

const AuthScreen = ({ route }) => {
    const ctx = useContext(AuthContext);

    const [isLoading, setLoading] = useState(true);
    const [isSignIn, setsignIn] = useState(true);

    useEffect(() => {
        AsyncStorageLib.getItem('user').then((user) => {
            user = JSON.parse(user)
            if (user) {
                ctx.setState({
                    ...ctx.state,
                    isLoggedIn: true,
                    user: user
                })
            } else {
                setLoading(false)
            }

        }).catch((err) => {
            console.log(err)
        });
    }, []);

    const onSignUpPress = async () => {
        const data = await signUp(email, password, name)
        if (data.success) {
            AsyncStorageLib.setItem('user', JSON.stringify(data.user));
            ctx.setState({
                ...ctx.state,
                isLoggedIn: true,
                user: data.user
            })
        }
    }

    const onSignInPress = async () => {
        const data = await signIn(email, password)
        if (data.success) {
            AsyncStorageLib.setItem('user', JSON.stringify(data.user));
            ctx.setState({
                ...ctx.state,
                isLoggedIn: true,
                user: data.user
            })
        }
    }

    const authView = (
        <View>
            {isSignIn ? <></> : <TextInput
                style={{ padding: 10, borderWidth: 1, marginHorizontal: 20, marginVertical: 10 }}
                placeholder={"Name"}
                onChangeText={onNameType}
            />}
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
                    title={isSignIn ? "Sign In" : "Sign Up"}
                    onPress={isSignIn ? onSignInPress : onSignUpPress}
                />
            </View>
            <View style={styles.action_button}>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0, 0.01)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 40,
                        backgroundColor: '#fff',
                        borderRadius: 5,
                    }}
                    onPress={() => {
                        setsignIn(!isSignIn)
                    }}
                >
                    <Text style={{ color: "#00f" }}>{isSignIn ? "Create an account" : "Sign in instead"}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )

    return (<>
        {isLoading ? <Loader /> : { ...authView }}
    </>
    )
}

const styles = StyleSheet.create({
    action_button: {
        marginHorizontal: 20,
        marginTop: 10
    },
});

export default AuthScreen
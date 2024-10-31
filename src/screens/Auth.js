import React, { Component } from "react"
import {
    ImageBackground, Text, StyleSheet,
    View, TouchableOpacity, Alert
} from "react-native"

import axios from 'axios'

import backgroundImg from '../../assets/imgs/login.jpg'
import commonStyles from "../commonStyles"
import AuthInput from "../components/AuthInput"
import { server, showError, showSuccess } from "../common"

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false
}

export default class Auth extends Component {

    state = { ...initialState }

    signinOrSignup = () => {
        this.state.stageNew ? this.signup() : this.signin()
    }

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })
            showSuccess('Usuário cadastrado!')
            this.setState({ ...initialState })
        } catch (error) {
            showError(error)
        }
    }

    signin = async () => {
        try {
            const response = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })

            let authHeader = axios.defaults.headers.common['Authorization']
            authHeader = `bearer ${response.data.token}`

            this.props.navigation.navigate('Home')
        } catch (error) {
            showError(error)
        }
    }

    render() {
        return (
            <ImageBackground
                source={backgroundImg}
                style={styles.background}>
                <Text style={styles.title}>
                    quefazer
                </Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&
                        <AuthInput
                            placeholder="Nome"
                            value={this.state.name}
                            style={styles.input}
                            onChangeText={name => this.setState({ name })}
                            icon='user'>
                        </AuthInput>
                    }
                    <AuthInput
                        placeholder="E-mail"
                        value={this.state.email}
                        style={styles.input}
                        onChangeText={email => this.setState({ email })}
                        icon='at'>
                    </AuthInput>
                    <AuthInput
                        placeholder="Senha"
                        value={this.state.password}
                        style={styles.input}
                        onChangeText={
                            password => this.setState({ password })
                        }
                        secureTextEntry={true}
                        icon='lock'>
                    </AuthInput>
                    {this.state.stageNew &&
                        <AuthInput
                            placeholder="Confirmar senha"
                            value={this.state.confirmPassword}
                            style={styles.input}
                            onChangeText={
                                confirmPassword => this.setState({ confirmPassword })
                            }
                            secureTextEntry={true}
                            icon='asterisk'>
                        </AuthInput>
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={
                        () => this.setState({ stageNew: !this.state.stageNew })
                    }>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                    </Text>
                </TouchableOpacity>
            </ImageBackground >
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF'
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20
    }
})
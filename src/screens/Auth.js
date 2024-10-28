import React, { Component } from "react"
import {
    ImageBackground, Text, StyleSheet,
    View, TextInput, TouchableOpacity,
    Platform, Alert
} from "react-native"

import backgroundImg from '../../assets/imgs/login.jpg'
import commonStyles from "../commonStyles"

export default class Auth extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        stageNew: false
    }

    signinOrSignup = () => {
        this.state.stageNew ? Alert.alert('Sucesso', 'Criar conta') : Alert.alert('Sucesso', 'Logar')
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
                        <TextInput
                            placeholder="Nome"
                            value={this.state.name}
                            style={styles.input}
                            onChangeText={name => this.setState({ name })}>
                        </TextInput>
                    }
                    <TextInput
                        placeholder="E-mail"
                        value={this.state.email}
                        style={styles.input}
                        onChangeText={email => this.setState({ email })}>
                    </TextInput>
                    <TextInput
                        placeholder="Senha"
                        value={this.state.password}
                        style={styles.input}
                        onChangeText={
                            password => this.setState({ password })
                        }
                        secureTextEntry={true} >
                    </TextInput>
                    {this.state.stageNew &&
                        <TextInput
                            placeholder="Confirmar senha"
                            value={this.state.confirmPassword}
                            style={styles.input}
                            onChangeText={
                                confirmPassword => this.setState({ confirmPassword })
                            }
                            secureTextEntry={true}>
                        </TextInput>
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
        backgroundColor: '#FFF',
        padding: Platform.OS == 'ios' ? 15 : 10
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20
    }
})
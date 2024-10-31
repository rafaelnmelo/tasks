import {
    Platform,
    Alert
} from "react-native"

const server = Platform.OS === 'ios'
    ? 'http://localhost:3000' : 'http://10.0.2.2:3000'

function showError(error) {
    Alert.alert('Ops! ocorreu um problema', `Mensagem: ${error}`)
}

function showSuccess(message) {
    Alert.alert('Sucesso', msg)
}

export { server, showError, showSuccess }
import {
    Platform,
    Alert
} from "react-native"

const server = Platform.OS === 'ios'
    ? 'http://localhost:3000' : 'http://10.0.2.2:3000'

function showError(error) {
    if (error.response && error.response.data) {
        Alert.alert('Ops! ocorreu um problema', `Mensagem: ${error.response.data}`)
    } else {
        Alert.alert('Ops! ocorreu um problema', `Mensagem: ${error}`)
    }
}

function showSuccess(message) {
    Alert.alert('Sucesso', message)
}

export { server, showError, showSuccess }
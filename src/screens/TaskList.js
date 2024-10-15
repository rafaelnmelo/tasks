import React, { Component } from "react"
import {
    View, Text, ImageBackground,
    StyleSheet, FlatList
} from "react-native"

import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'

import moment from 'moment'
import 'moment/locale/pt-br'

import Task from "../components/Task"
import commonStyles from "../commonStyles"

export default class TaskList extends Component {

    state = {
        tasks: [{
            id: Math.random(),
            desc: 'Comprar livro de React Native',
            estimateAt: new Date(),
            doneAt: new Date()
        }, {
            id: Math.random(),
            desc: 'Ler livro de React Native',
            estimateAt: new Date(),
            doneAt: null
        }]
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>
                            Hoje
                        </Text>
                        <Text style={styles.subtitle}>
                            {today}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.tasks} //lista pura de objetos chave/valor
                        keyExtractor={item => `${item.id}`} //pegando o id para renderização
                        renderItem={({ item }) => <Task {...item} //desestrutura o item de dentro do obj
                        //utiliza o spread para passar cada atributo para Task
                        />} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
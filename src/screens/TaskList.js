import React, { Component } from "react"
import {
    View, Text, ImageBackground,
    StyleSheet, FlatList, TouchableOpacity,
    Platform, Alert
} from "react-native"

import Icon from 'react-native-vector-icons/FontAwesome'

import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'

import moment from 'moment'
import 'moment/locale/pt-br'

import Task from "../components/Task"
import commonStyles from "../commonStyles"
import AddTask from "./AddTask"

export default class TaskList extends Component {
    state = {
        showDoneTasks: true,
        showAddTask: false,
        visibleTasks: [],
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

    componentDidMount = () => {
        this.filterTasks()
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks }, this.filterTasks)
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks },
            this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null

        if (this.state.showDoneTasks) {
            visibleTasks = [ ...this.state.tasks ]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks })
    }

    addTask = newTask => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return
        }

        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })

        this.setState({ tasks, showAddTask: false }, this.filterTasks)
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTask} />
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon
                                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20} color={commonStyles.colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks} //lista pura de objetos chave/valor
                        keyExtractor={item => `${item.id}`} //pegando o id para renderização
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} //desestrutura o item de dentro do obj
                        //utiliza o spread para passar cada atributo para Task
                        />} />
                </View>
                <TouchableOpacity style={styles.addButton}
                    onPress={() => this.setState({ showAddTask: true })}
                    activeOpacity={0.7}>
                    <Icon
                        name='plus' size={20}
                        color={commonStyles.colors.secondary}
                    />
                </TouchableOpacity>
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
        backgroundColor: commonStyles.colors.today,
        alignItems: 'center'
    }
})
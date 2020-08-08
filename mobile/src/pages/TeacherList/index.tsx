import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';

import styles from './styles';
import api from '../../services/api';

function TeacherList() {

    const [teacher, setTeacher] = useState([]);
    const [favorites, setFavorites] = useState<Number[]>([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then( response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map( (teacher: Teacher) => {
                    return teacher.id
                });

                setFavorites(favoritedTeachersIds);
            }
        })
    };



    async function handleFiltersSubmit() {

        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setIsFiltersVisible(false);
        setTeacher(response.data);
    }

    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={30} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Qual a matéria"
                            placeholderTextColor="#C1BCCC"
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#C1BCCC"
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                />
                            </View>
                            
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    style={styles.input}
                                    placeholder="Qual o horário?"
                                    placeholderTextColor="#C1BCCC"
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>
                                Filtrar
                            </Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teacher.map((teacher: Teacher) => {
                    return(
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher} 
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList;
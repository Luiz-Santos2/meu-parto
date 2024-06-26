import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, SectionList } from 'react-native';
import bg from './../../imgs/background.png';
import { AppHeader } from '../../components/header';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

export interface HomescreenProps {
    navigation: any;
}

export function HomeScreen(props: HomescreenProps) {

    const [sound, setSound] = useState<Audio.Sound>();


    const jsonData = [
        {
            data: [{ type: 'PERÍODOS E FASES DO PARTO', type_id: 'periodoFases' }],
        },
        {
            data: [{ type: 'COMO ALIVIAR A DOR NA HORA DO PARTO SEM MEDICAMENTOS', type_id: 'aliviarDor',}],
        },
        {
            data: [{ type: 'POSIÇÕES PARA PARIR', type_id: 'posicaoParir' }],
        },
        {
            data: [{ type: 'CUIDADOS NO INÍCIO DO PÓS-PARTO', type_id: 'cuidadosPosParto' }],
        },
        {
            data: [{ type: 'MAMADAS INICIAIS', type_id: 'mamadasIniciais' }],
        },
    ];

    async function Reproduzir() {
        const { sound } = await Audio.Sound.createAsync(require('../../audios/vamos começar.mp3')
        );
        setSound(sound);

        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppHeader />
            <View style={styles.container}>
                <Text style={styles.text}>Vamos começar?</Text>
                <TouchableOpacity onPress={Reproduzir}>
                    <View style={styles.containerIcon}>
                        <MaterialIcons name="play-circle" style={styles.icon} />
                        <Text style={styles.textButton}>Áudio</Text>
                    </View>
                </TouchableOpacity>
                <SectionList
                    sections={jsonData}
                    keyExtractor={(item) => item.type}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => props.navigation.navigate(item.type_id)}>
                            <View style={styles.buttonHome}>
                                <Text style={styles.buttontext}>{item.type}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <View style={styles.TextObsposition}>
                    <Text style={styles.TextObs}>Atenção: as orientações a seguir não pretendem substituir o acompanhamento
                        obstétrico personalizado.</Text>
                </View>
            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    text: {
        alignSelf: 'center',
        fontSize: 24,
        textAlign: 'center',
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    icon: {
        fontSize: 35,
        marginLeft: 10,
        color: '#5F5F5F'
    },
    textButton: {
        marginLeft: 5,
        fontWeight: 'bold',
    },
    buttonHome: {
        marginHorizontal: 37,
        margin: 10,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        borderRadius: 9,
        padding: 15,
    },
    buttontext: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    TextObs: {
        color: '#5F5F5F',
        fontSize: 20,
        textAlign: 'justify',
        width: 320,

    },
    TextObsposition: {
        marginVertical: 50,
        alignItems: 'center',
    },
});
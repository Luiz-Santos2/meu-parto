import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SectionList } from 'react-native';
import bg from './../../imgs/background.png';
import { AppHeader } from '../../components/header';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export interface HomescreenProps {
    navigation: any;
}

export function HomeScreen(props: HomescreenProps) {

    const [sound, setSound] = useState<Audio.Sound>();
    const [jsonData, setJsonData] = useState<{ data: { type: string, type_id: string }[] }[]>([]);
    const [observationText, setObservationText] = useState('');
    const [titulo, setTitulo] = useState('');
    const [audio, setAudio] = useState<any>(null);

    const buscarDados = async () => {
        const todosOsDados = await getDoc(doc(db, 'forms', '2')).then(snap => snap.data()) as any;
        const jsonData = [
            {
                data: [{ type: todosOsDados.menu1, type_id: 'periodoFases' }],
            },
            {
                data: [{ type: todosOsDados.menu2, type_id: 'aliviarDor', }],
            },
            {
                data: [{ type: todosOsDados.menu3, type_id: 'posicaoParir' }],
            },
            {
                data: [{ type: todosOsDados.menu4, type_id: 'cuidadosPosParto' }],
            },
            {
                data: [{ type: todosOsDados.menu5, type_id: 'mamadasIniciais' }],
            },
        ];

        setObservationText(todosOsDados.texto);
        setTitulo(todosOsDados.titulo);
        setAudio({ uri: todosOsDados.audio });
        setJsonData(jsonData);

    }

    async function Reproduzir() {
        const { sound } = await Audio.Sound.createAsync(audio);
        setSound(sound);

        await sound.playAsync();
    }

    useEffect(() => {
        (async () => {
            await buscarDados();
        })()

    }, [])

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound, jsonData]);

    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppHeader />
            {jsonData.length > 0 && <View style={styles.container}>
                <Text style={styles.text}>{titulo}</Text>
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
                    <Text style={styles.TextObs}>{observationText}</Text>
                </View>
            </View>}
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
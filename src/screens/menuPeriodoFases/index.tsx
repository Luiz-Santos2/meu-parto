import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons';
import { AppSecundario } from '../../components/secundario';
import { Audio } from 'expo-av';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export interface PeriodoFasesScreenProps {
    navigation: any;
};

export function PeriodoFasesScreen(props: PeriodoFasesScreenProps) {

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [text, setText] = useState('');
    const [jsonData, setJsonData] = useState<{ id: string, period: string, audio: any, fases: { id: string, title: string, audio: any }[] }[]>([]);

    const buscarDados = async () => {
        const todosOsDados = await getDoc(doc(db, 'forms', '3')).then(snap => snap.data()) as any;
        const jsonData = [
            {
                id: '1',
                period: todosOsDados.textoTitulo1,
                audio: { uri: todosOsDados.audioTitulo1 },
                fases: [
                    { id: '1', title: todosOsDados.textoSubtitulo1, screen: 'DetalhesPeriodoFases', audio: { uri: todosOsDados.audioSubtitulo1 } },
                    { id: '2', title: todosOsDados.textoSubtitulo2, screen: 'DetalhesPeriodoFases', audio: { uri: todosOsDados.audioSubtitulo2 } },
                ]
            },
            {
                id: '2',
                period: todosOsDados.textoTitulo2,
                audio: { uri: todosOsDados.audioTitulo2 },
                fases: [
                    { id: '3', title: todosOsDados.textoSubtitulo3, screen: 'DetalhesPeriodoFases', audio: { uri: todosOsDados.audioSubtitulo3 } },
                    { id: '4', title: todosOsDados.textoSubtitulo4, screen: 'DetalhesPeriodoFases', audio: { uri: todosOsDados.audioSubtitulo4 } },
                ]
            },
            {
                id: '3',
                period: todosOsDados.textoTitulo3,
                audio: { uri: todosOsDados.audioTitulo3 },
                fases: [
                    { id: '5', title: todosOsDados.textoSubtitulo5, screen: 'DetalhesPeriodoFases', audio: { uri: todosOsDados.audioSubtitulo5 } },
                ]
            },
        ];
        setJsonData(jsonData);
        setText(todosOsDados.tituloPrincipal);
    };

    useEffect(() => {
        (async () => {
            await buscarDados();
        })()

    }, []);

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            };
        };
    }, [sound, jsonData]);

    const reproduzirAudio = async (audio: any) => {
        try {
            if (sound) {
                await sound.unloadAsync();
            };
            const { sound: newSound } = await Audio.Sound.createAsync(audio);
            setSound(newSound);
            await newSound.replayAsync();
        } catch (error) {
            console.error("Erro ao reproduzir o áudio:", error);
        };
    };

    useEffect(() => {
        const stop = props.navigation.addListener('blur', () => {
            if (sound) {
                sound.stopAsync();
            };
        });

        return () => {
            stop();
        };
    }, [sound, props.navigation]);

    const renderFase = ({ item }: { item: any }) => (
        <View style={{ marginBottom: 40 }}>
            <View style={{ marginBottom: 30 }}>
                <TouchableOpacity onPress={() => reproduzirAudio(item.audio)}>
                    <View style={styles.containerIcon1}>
                        <MaterialIcons name="play-circle" style={styles.icon1} />
                        <Text style={styles.textButton}>Áudio</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.period}>{item.period}</Text>
            </View>
            <View style={styles.ajuste}>
                {item.fases.map((fase: any, index: number) => (
                    <View key={"fase" + index}>
                        <TouchableOpacity onPress={() => reproduzirAudio(fase.audio)}>
                            <View style={styles.containerIcon}>
                                <MaterialIcons name="play-circle" style={styles.icon} />
                                <Text style={styles.textButton}>Áudio</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate(fase.screen, { item_id: fase.id })}>
                            <View style={styles.button}>
                                <Text style={styles.text}>{fase.title}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppSecundario />
            <View style={styles.container}>
                <Text style={styles.title}>{text}</Text>
                <FlatList
                    initialNumToRender={4}
                    renderItem={renderFase}
                    keyExtractor={(item) => item.id}
                    data={jsonData}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    title: {
        width: 323,
        marginTop: -20,
        marginVertical: 50,
        left: 34,
        fontSize: 20,
        textAlign: 'center',
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 25,
        color: '#5F5F5F'
    },
    containerIcon1: {
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center',
    },
    icon1: {
        fontSize: 25,
        color: '#5F5F5F',
    },
    textButton: {
        fontWeight: 'bold',
    },
    period: {
        paddingTop: -10,
        color: '#000000',
        textAlign: 'left',
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 16,
    },
    button: {
        backgroundColor: 'rgba(247, 99, 110, 1)',
        alignItems: 'center',
        padding: 10,
        borderRadius: 9,
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        paddingHorizontal: 25

    },
    ajuste: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },
});
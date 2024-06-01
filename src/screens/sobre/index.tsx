import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import bg from './../../imgs/background.png';
import { AppHeader } from '../../components/header';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { getDoc, doc } from '@firebase/firestore';
import { db } from '../../config/firebase-config';
import { useUsuarioContext } from '../../providers/usuario-provider';

export interface SobrescreenProps {
    navigation: any;
};

export function SobreScreen(props: SobrescreenProps) {

    const { usuario } = useUsuarioContext();
    const [index, setIndex] = useState(0);
    const [sound, setSound] = useState<Audio.Sound>();
    const [data, setData] = useState<{ texto: string, audio: any, imagem: any }[]>([]);

    const substituirVariaveis = (texto: string) => {
        return texto.replace('{nome}', usuario.nome);
    };

    const buscarDados = useCallback(async () => {
        const docSnap = await getDoc(doc(db, 'forms', '1'));
        if (docSnap.exists()) {
            const todosOsDados = docSnap.data();
            const data = [
                {
                    texto: substituirVariaveis(todosOsDados.texto1),
                    audio: { uri: todosOsDados.audio1 },
                    imagem: { uri: todosOsDados.imagem },
                },
                {
                    texto: substituirVariaveis(todosOsDados.texto2),
                    audio: { uri: todosOsDados.audio2 },
                    imagem: { uri: todosOsDados.imagem },
                },
            ];
            setData(data);
        };
    }, [usuario.nome]);

    const nextItem = useCallback(async () => {
        if (sound) sound.stopAsync();
                
        if (index < data.length - 1) {
            setIndex((prevIndex) => prevIndex + 1);
        } else {
            props.navigation.navigate('home');
        }
    }, [index, data.length, props.navigation, sound]);

    useEffect(() => {
        buscarDados();
    }, [buscarDados]);

    useEffect(() => {
        if (data.length > 0) {
            const reproduzir = async () => {
                const { sound } = await Audio.Sound.createAsync(data[index].audio);
                setSound(sound);
            };
            reproduzir();
        };
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [index, data]);

    const reproduzir = async () => {
        if (sound) {
            await sound.replayAsync();
        };
    };

    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppHeader />
            {data.length > 0 && <View style={styles.container}>
                <TouchableOpacity onPress={reproduzir}>
                    <View style={styles.containerIcon}>
                        <MaterialIcons name="play-circle" style={styles.icon} />
                        <Text style={styles.textButton}>Áudio</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>{data[index].texto}</Text>
                <TouchableOpacity onPress={nextItem}>
                    <View style={styles.buttonInput}>
                        <Text style={styles.Buttontext}>Continuar</Text>
                    </View>
                </TouchableOpacity>
                <Image source={data[index].imagem} style={styles.image} />
            </View>}
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
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
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
    text: {
        width: 340,
        height: 450,
        top: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20,
        textAlign: 'justify',
        color: '#5F5F5F',
    },
    buttonInput: {
        marginHorizontal: 37,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        borderRadius: 9,

    },
    Buttontext: {
        padding: 10,
        textAlign: 'center',
        color: 'white'
    },
    image: {
        width: 90,
        height: 90,
        alignSelf: 'center',
        marginTop: 20,
        objectFit: 'contain'

    },
});
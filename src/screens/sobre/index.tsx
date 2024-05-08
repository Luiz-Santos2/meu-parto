import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import bg from './../../imgs/background.png';
import lg from './../../imgs/logo.png';
import { AppHeader } from '../../components/header';
import { MaterialIcons } from '@expo/vector-icons'
import { Audio } from 'expo-av';

export interface SobrescreenProps {
    navigation: any;
}

export function SobreScreen(props: SobrescreenProps) {

    const [index, setIndex] = useState(0);
    const [sound, setSound] = useState<Audio.Sound>();

    const jsonData = [
        {
            nome: "Bem-vinda, mamãe! Este aplicativo é seu aliado na jornada da maternidade, oferecendo informações confiáveis e apoio durante a fase inicial. Estamos aqui para ajudá-la a vivenciar essa experiência com mais segurança e tranquilidade.",
            audio: require('../../audios/Bem-vinda mamãe.mp3')
        },
        {
            nome: "Este aplicativo é produto de dissertação do programa de pós-graduação em Biotecnologia em Saúde Humana e Animal (PPGBIOTEC) vinculado à Universidade Estadual do Ceará (UECE), onde o Centro Universitário Cesmac é instituição associada. O aplicativo foi desenvolvido em parceria com o Núcleo de Robótica do Centro Universitário Cesmac.",
            audio: require('../../audios/Este aplicativo é.mp3')
        },
    ];

    const nextItem = async () => {
        if (index < jsonData.length - 1) {
            setIndex(prevIndex => prevIndex + 1);
        } else {
            props.navigation.navigate('home')
        }
    };

    useEffect(() => {

        const reproduzir = async () => {
            const { sound } = await Audio.Sound.createAsync(jsonData[index].audio);
            setSound(sound);
        };

        reproduzir();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [index]);

    const reproduzir = async () => {
        if (sound) {
            await sound.replayAsync();
        }
    };

    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppHeader />
            <View style={styles.container}>
                <TouchableOpacity onPress={reproduzir}>
                    <View style={styles.containerIcon}>
                        <MaterialIcons name="play-circle" style={styles.icon} />
                        <Text style={styles.textButton}>Áudio</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>{jsonData[index].nome}</Text>
                <TouchableOpacity onPress={nextItem}>
                    <View style={styles.buttonInput}>
                        <Text style={styles.Buttontext}>Continuar</Text>
                    </View>
                </TouchableOpacity>
                <Image source={lg} style={styles.image} />
            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {

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
        height: 280,
        top: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20,
        textAlign: 'justify',
        color: '#5F5F5F',
    },
    buttonInput: {
        marginHorizontal: 37,
        margin: 10,
        marginTop: 100,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        borderRadius: 9,

    },
    Buttontext: {
        padding: 10,
        textAlign: 'center',
        color: 'white'
    },
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 20,
        objectFit: 'contain'

    }
});
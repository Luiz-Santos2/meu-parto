import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, SafeAreaView, FlatList, Button } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import { RouteProp } from '@react-navigation/native';
import { PeriodoFaseParams } from '../../navigations/periodoFases';
import { Video, ResizeMode, Audio } from 'expo-av';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export interface PeriodoFasesSecundariaScreenProps {
    navigation: any;
    route: RouteProp<PeriodoFaseParams, "DetalhesPeriodoFases">;
}

export function PeriodoFasesSecundariaScreen(props: PeriodoFasesSecundariaScreenProps) {

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [getItems, setGetItems] = useState<ItemData[]>([]);
    const [text, setText] = useState('');

    //@ts-ignore
    const { item_id } = props.route.params

    type ItemData = {
        id: string;
        audio: any;
        title: string;
        titulo_secundario: string;
        text: string;
        video: any;
        item_id: any;
    };

    const buscarDados = async () => {
        const todosOsDados = await getDoc(doc(db, 'forms', '4')).then(snap => snap.data()) as any;
        const getItems = [
            {
                id: Math.random().toString(12).substring(0),
                audio: { uri: todosOsDados.audio1 },
                title: todosOsDados.titulo1,
                titulo_secundario: todosOsDados.subtitulo1,
                text: todosOsDados.texto1,
                video:
                    <View style={styles.posicaoVideo}>
                        <Video
                            source={{ uri: todosOsDados.video1 }}
                            style={{ width: 257, height: 437 }}
                            useNativeControls={true}
                            resizeMode={ResizeMode.COVER}
                        />
                        <Text style={styles.autor}>{todosOsDados.autor1}</Text>
                    </View>,
                item_id: 1,
            },
            {
                id: Math.random().toString(12).substring(0),
                audio: { uri: todosOsDados.audio2 },
                title: todosOsDados.titulo2,
                titulo_secundario: todosOsDados.subtitulo2,
                text: todosOsDados.texto2,
                video: <View style={styles.posicaoVideo}>
                    <Video
                        source={{ uri: todosOsDados.video2 }}
                        style={{ width: 257, height: 437 }}
                        useNativeControls={true}
                        resizeMode={ResizeMode.COVER}
                    />
                    <Text style={styles.autor}>{todosOsDados.autor2}</Text>
                </View>,
                item_id: 2,
            },
            {
                id: Math.random().toString(12).substring(0),
                audio: { uri: todosOsDados.audio3 },
                title: todosOsDados.titulo3,
                titulo_secundario: todosOsDados.subtitulo3,
                text: todosOsDados.texto3,
                video: null,
                item_id: 3,
            },
            {
                id: Math.random().toString(12).substring(0),
                audio: { uri: todosOsDados.audio4 },
                title: todosOsDados.titulo4,
                titulo_secundario: todosOsDados.subtitulo4,
                text: todosOsDados.texto4,
                video: <View style={styles.posicaoVideo}>
                    <Video
                        source={{ uri: todosOsDados.video4 }}
                        style={{ width: 332, height: 191 }}
                        useNativeControls={true}
                        resizeMode={ResizeMode.COVER}
                    />
                    <Text style={styles.autor}>{todosOsDados.autor4}</Text>
                </View>,
                item_id: 4,
            },
            {
                id: Math.random().toString(12).substring(0),
                audio: { uri: todosOsDados.audio5 },
                title: todosOsDados.titulo5,
                titulo_secundario: todosOsDados.subtitulo5,
                text: todosOsDados.texto5,
                video: <View style={styles.posicaoVideo}>
                    <Video
                        source={{ uri: todosOsDados.video5 }}
                        style={{ width: 332, height: 191 }}
                        useNativeControls={true}
                        resizeMode={ResizeMode.COVER}
                    />
                    <Text style={styles.autor}>{todosOsDados.autor5}</Text>
                </View>,
                item_id: 5,
            },
        ];
        setGetItems(getItems)
        setText(todosOsDados.tituloPrincipal)
    }

    useEffect(() => {
        (async () => {
            await buscarDados();
        })()

    }, [])

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound, getItems]);

    const reproduzir = async (audio: any) => {
        try {
            if (sound) {
                await sound.unloadAsync();
            }
            const { sound: newSound } = await Audio.Sound.createAsync(audio);
            setSound(newSound);
            await newSound.playAsync();
        } catch (error) {
            console.error("Erro ao reproduzir o áudio:", error);
        }
    };

    type ItemProps = {
        dados: ItemData
    };

    const Item = ({ dados }: ItemProps) => (
        <View>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.tagText}>{dados.title}</Text>
            <TouchableOpacity onPress={() => reproduzir(dados.audio)}>
                <View style={styles.containerIcon}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.tagButtonSecundario}>
                <Text style={styles.tagTextSecundario}>{dados.titulo_secundario}</Text>
            </View>
            <Text style={styles.textInfo}>{dados.text}</Text>
            {dados.video}
        </View>
    )

    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppSecundario />
            <View style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        initialNumToRender={4}
                        renderItem={({ item }) => <Item dados={item} />}
                        keyExtractor={item => item.id}
                        data={getItems.filter(item => item.item_id == item_id)}
                    />
                </SafeAreaView>
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    icon: {
        fontSize: 25,
        color: '#5F5F5F'
    },
    text: {
        marginTop: 0,
        marginVertical: 30,
        fontSize: 20,
        textAlign: 'center',
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 50
    },
    textButton: {
        fontWeight: 'bold',
    },
    tagText: {
        marginVertical: 30,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tagTextSecundario: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tagButtonSecundario: {
        borderRadius: 9,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        padding: 10,
        marginHorizontal: 40,
        alignItems: 'center'
    },
    textInfo: {
        marginVertical: 30,
        width: 320,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F',
    },
    posicaoVideo: {
        alignItems: 'center',
        marginVertical: 20
    },
    autor: {
        fontSize: 12,
        alignSelf: 'center',
        marginTop: 10
    },

});




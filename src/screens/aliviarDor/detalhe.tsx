import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons';
import { AppSecundario } from '../../components/secundario';
import { RouteProp } from '@react-navigation/native';
import { AliviarDorParams } from '../../navigations/aliviarDor';
import { Video, ResizeMode, Audio } from 'expo-av';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export interface AliviarDorSecundariaScreenProps {
    navigation: any;
    route: RouteProp<AliviarDorParams, "DetalhesAliviarDor">;
};

export function AliviarDorSecundariaScreen(props: AliviarDorSecundariaScreenProps) {

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [getItems, setGetItems] = useState<ItemData[]>([]);
    const [text, setText] = useState('');

    //@ts-ignore
    const { item_id } = props.route.params

    type ItemData = {
        id: string;
        audio: any;
        title: string;
        text: string;
        video: any;
        foto: any;
        item_id: number;
    };

    const buscarDados = async () => {
        const todosOsDados = await getDoc(doc(db, 'forms', '6')).then(snap => snap.data()) as any;
        const getItems = [
            {
                id: Math.random().toString(12).substring(0),
                audio: { uri: todosOsDados.audio1 },
                title: todosOsDados.titulo1,
                text: todosOsDados.texto1,
                video: { uri: todosOsDados.video1 },
                foto: { uri: todosOsDados.imagem1 },
                item_id: 1,
            },
            {
                id: Math.random().toString(12).substring(0),
                audio: { uri: todosOsDados.audio2 },
                title: todosOsDados.titulo2,
                text: todosOsDados.texto2,
                video: { uri: todosOsDados.video2 },
                foto: { uri: todosOsDados.imagem2 },
                item_id: 2,
            },
            {
                id: Math.random().toString(12).substring(0),
                audio: { uri: todosOsDados.audio3 },
                title: todosOsDados.titulo3,
                text: todosOsDados.texto3,
                video: { uri: todosOsDados.video3 },
                foto: { uri: todosOsDados.imagem3 },
                item_id: 3,
            },
            {
                id: Math.random().toString(12).substring(0),
                audio: { uri: todosOsDados.audio4 },
                title: todosOsDados.titulo4,
                text: todosOsDados.texto4,
                video: { uri: todosOsDados.video4 },
                foto: null,
                item_id: 4,
            },
            {
                id: Math.random().toString(12).substring(0),
                audio: { uri: todosOsDados.audio5 },
                title: todosOsDados.titulo5,
                text: todosOsDados.texto5,
                video: null,
                foto: null,
                item_id: 5,

            },
            {
                id: Math.random().toString(12).substring(0),
                audio: { uri: todosOsDados.audio6 },
                title: todosOsDados.titulo6,
                text: todosOsDados.texto6,
                video: null,
                foto: null,
                item_id: 6,
            },
        ];
        setGetItems(getItems);
        setText(todosOsDados.tituloPrincipal);
    };

    useEffect(() => {
        (async () => {
            await buscarDados();
        })()

    }, []);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
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

    useEffect(() => {
        const stop = props.navigation.addListener('blur', () => {
            if (sound) {
                sound.stopAsync();
            }
        });

        return () => {
            stop();
        };
    }, [sound, props.navigation]);

    type ItemProps = {
        dados: ItemData
    };

    const Item = ({ dados }: ItemProps) => (
        <View>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity onPress={() => reproduzir(dados.audio)}>
                <View style={styles.containerIcon}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.tagButton}>
                <Text style={styles.tagText}>{dados.title}</Text>
            </View>
            {dados.text && <Text style={styles.textInfo}>{dados.text}</Text>}
            {dados.video && <View style={styles.posicaoVideo}>
                <Video
                    source={dados.video}
                    style={styles.video}
                    useNativeControls={true}
                    resizeMode={ResizeMode.COVER}
                />
            </View>}
            {dados.foto && <Image style={styles.img} source={dados.foto} />}
        </View>
    );

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
    );
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
        width: 320,
        marginTop: -5,
        marginVertical: 30,
        left: 34,
        fontSize: 20,
        textAlign: 'center',
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 40
    },
    textButton: {
        fontWeight: 'bold',
    },
    tagText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tagButton: {
        borderRadius: 9,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        marginHorizontal: 30,
        padding: 10,
        alignItems: 'center'
    },
    textInfo: {
        marginVertical: 30,
        width: 310,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F'
    },
    img: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        objectFit: 'contain'
    },
    posicaoVideo: {
        alignItems: 'center',
        marginVertical: 40
    },
    video: {
        width: 332,
        height: 450
    },
});
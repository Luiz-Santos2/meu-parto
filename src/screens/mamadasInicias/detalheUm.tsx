import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons';
import { AppSecundario } from '../../components/secundario';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { MamadasIniciaisParams } from '../../navigations/mamadasIniciais';
import { Audio } from 'expo-av';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export interface DetalheUmMamadasIniciaisScreenScreenProps {
    navigation: any;
    route: RouteProp<MamadasIniciaisParams, "DetalheUmMamadasIniciais">;
};

export function DetalheUmMamadasIniciaisScreen(props: DetalheUmMamadasIniciaisScreenScreenProps) {

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [jsonData, setJsonData] = useState<ItemData[]>([]);

    //@ts-ignore
    const { item_id } = props.route.params

    type ItemData = {
        id: any;
        title: any;
        button_title: any;
        title_Secundario: any;
        button: any;
        title_Terciario: any;
        img: any;
        first: any;
        textObs: any;
        item_id: number;
    };

    const buscarDados = async () => {
        const todosOsDados = await getDoc(doc(db, 'forms', '9')).then(snap => snap.data()) as any;
        const jsonData = [
            {
                id: Math.random().toString(12).substring(0),
                title: todosOsDados.tituloPrincipal,
                button_title: { uri: todosOsDados.audio1 },
                title_Secundario: todosOsDados.titulo,
                button: { uri: todosOsDados.audio2 },
                title_Terciario: todosOsDados.subtítulo1,
                img: <Image style={styles.img} source={{ uri: todosOsDados.imagem1 }} />,
                first: todosOsDados.texto1,
                textObs: null,
                item_id: 0
            },
            {
                id: Math.random().toString(12).substring(0),
                title: null,
                button_title: null,
                title_Secundario: null,
                button: { uri: todosOsDados.audio3 },
                title_Terciario: todosOsDados.subtítulo2,
                img: <Image style={styles.img} source={{ uri: todosOsDados.imagem2 }} />,
                first: todosOsDados.texto2,
                textObs: null,
                item_id: 0
            },
            {
                id: Math.random().toString(12).substring(0),
                title: null,
                button_title: null,
                title_Secundario: null,
                button: { uri: todosOsDados.audio4 },
                title_Terciario: todosOsDados.subtítulo3,
                img: <Image style={styles.img} source={{ uri: todosOsDados.imagem3 }} />,
                first: todosOsDados.texto3,
                textObs: null,
                item_id: 0
            },
            {
                id: Math.random().toString(12).substring(0),
                title: null,
                button_title: null,
                title_Secundario: null,
                button: { uri: todosOsDados.audio5 },
                title_Terciario: todosOsDados.subtítulo4,
                img: <Image style={styles.img} source={{ uri: todosOsDados.imagem4 }} />,
                first: todosOsDados.texto4,
                textObs: null,
                item_id: 0
            },
            {
                id: Math.random().toString(12).substring(0),
                title: null,
                button_title: null,
                title_Secundario: null,
                button: { uri: todosOsDados.audio6 },
                title_Terciario: todosOsDados.subtítulo5,
                img: <Image style={styles.img} source={{ uri: todosOsDados.imagem5 }} />,
                first: todosOsDados.texto5,
                textObs: todosOsDados.observacao,
                item_id: 0
            },
        ];
        setJsonData(jsonData);
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
    }, [sound, jsonData]);

    const reproduzir = async (audio: any) => {
        try {
            if (sound) {
                await sound.unloadAsync();
            };
            const { sound: newSound } = await Audio.Sound.createAsync(audio);
            setSound(newSound);
            await newSound.playAsync();
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

    type ItemProps = {
        dados: ItemData
    };

    const Item = ({ dados }: ItemProps) => (
        <View>
            {dados.title && <Text style={styles.text}>{dados.title}</Text>}
            {dados.button_title && (
                <TouchableOpacity onPress={() => reproduzir(dados.button_title)}>
                    <View style={styles.containerIcon}>
                        <MaterialIcons name="play-circle" style={styles.icon} />
                        <Text style={styles.textButton}>Áudio</Text>
                    </View>
                </TouchableOpacity>
            )}
            {dados.title_Secundario && (
                <View style={styles.tagButton}>
                    <Text style={styles.tagText}>{dados.title_Secundario}</Text>
                </View>
            )}
            {dados.button && (
                <TouchableOpacity onPress={() => reproduzir(dados.button)}>
                    <View style={styles.containerIcon1}>
                        <MaterialIcons name="play-circle" style={styles.icon1} />
                        <Text style={styles.textButton}>Áudio</Text>
                    </View>
                </TouchableOpacity>
            )}
            {dados.title_Terciario && <Text style={styles.title}>{dados.title_Terciario}</Text>}
            {dados.img && dados.img}
            {dados.first && <Text style={styles.textInfo}>{dados.first}</Text>}
            {dados.textObs && <Text style={styles.textObsInfo}>{dados.textObs}</Text>}
        </View>
    );

    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppSecundario />
            <SafeAreaView style={styles.container}>
                <FlatList
                    initialNumToRender={4}
                    renderItem={({ item }) => <Item dados={item} />}
                    keyExtractor={item => item.id}
                    data={jsonData.filter(item => item.item_id == item_id)}
                />
            </SafeAreaView>
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
        width: 300,
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
        padding: 5,
        marginHorizontal: 30,
        alignItems: 'center'
    },
    textInfo: {
        marginTop: 30,
        width: 330,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F'
    },
    img: {
        marginTop: 20,
        width: 250,
        height: 250,
        alignSelf: 'center',
        objectFit: 'contain'

    },
    title: {
        width: 330,
        color: '#F7636E',
        fontWeight: 'bold',
        fontSize: 18,
        left: 20,
        textAlign: 'auto'

    },
    containerIcon1: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        left: 20
    },
    icon1: {
        fontSize: 18,
        color: '#5F5F5F'
    },
    textObsInfo: {
        alignSelf: 'center',
        color: '#5F5F5F',
        marginVertical: 20,
        fontSize: 18,
        width: 330,
        textAlign: 'justify',
        fontWeight: 'bold',
    },
});
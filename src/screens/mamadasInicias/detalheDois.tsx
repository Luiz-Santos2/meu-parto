import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { MamadasIniciaisParams } from '../../navigations/mamadasIniciais';
import { Video, ResizeMode, Audio } from 'expo-av';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export interface DetalheDoisMamadasIniciaisScreenScreenProps {
    navigation: any;
    route: RouteProp<MamadasIniciaisParams, "DetalheDoisMamadasIniciais">;
}

export function DetalheDoisMamadasIniciaisScreen(props: DetalheDoisMamadasIniciaisScreenScreenProps) {

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [jsonData, setJsonData] = useState<ItemData[]>([]);

    //@ts-ignore
    const { item_id } = props.route.params

    type ItemData = {
        id: string;
        title: string;
        button_title: any;
        title_Secundario: string;
        button_Secundario: any;
        text_first: string;
        video1: any;
        button_textLast: any;
        text_last: string;
        textInfo: string;
        video2: any;
        item_id: number;
    };

    const buscarDados = async () => {
        const todosOsDados = await getDoc(doc(db, 'forms', '10')).then(snap => snap.data()) as any;
        const jsonData: any[] = [
            {
                id: Math.random().toString(12).substring(0),
                title: todosOsDados.tituloPrincipal,
                button_title: { uri: todosOsDados.audio1 },
                title_Secundario: todosOsDados.titulo1,
                button_Secundario: null,
                text_first: todosOsDados.texto1,
                video1: <View style={styles.posicaoVideo}>
                    <Video
                        source={{ uri: todosOsDados.video1 }}
                        style={{ width: 351, height: 189 }}
                        useNativeControls={true}
                        resizeMode={ResizeMode.COVER}
                    />
                    <Text style={styles.autor}>{todosOsDados.autor1}</Text>
                </View>,
                button_textLast: { uri: todosOsDados.audio2 },
                text_last: todosOsDados.texto2,
                video2: null,
                textInfo: null,
                item_id: 1
            },
            {
                id: Math.random().toString(12).substring(0),
                title: todosOsDados.tituloPrincipal,
                button_title: { uri: todosOsDados.audio3 },
                title_Secundario: todosOsDados.titulo2,
                button_Secundario: null,
                text_first: todosOsDados.texto3,
                video1: null,
                button_textLast: null,
                text_last: null,
                textInfo: null,
                video2: null,
                item_id: 2
            },
            {
                id: Math.random().toString(12).substring(0),
                title: null,
                button_title: null,
                title_Secundario: null,
                button_Secundario: todosOsDados.titulo3,
                text_first: todosOsDados.texto4,
                button_textLast: null,
                text_last: null,
                textInfo: todosOsDados.observacao,
                video2: <View style={styles.posicaoVideo}>
                    <Video
                        source={{ uri: todosOsDados.video2 }}
                        style={{ width: 351, height: 200 }}
                        useNativeControls={true}
                        resizeMode={ResizeMode.COVER}
                    />
                    <Text style={styles.autor}>{todosOsDados.autor2}</Text>
                </View>,
                item_id: 2
            },

        ];

        setJsonData(jsonData);
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
            {dados.button_Secundario && (
                <TouchableOpacity onPress={() => props.navigation.navigate('DetalheDoisMamadasIniciais', { item_id: 1 })}>
                    <View style={styles.tagButton}>
                        <Text style={styles.tagText}>{dados.button_Secundario}</Text>
                    </View>
                </TouchableOpacity>
            )}
            {dados.text_first && <Text style={styles.textInfo}>{dados.text_first}</Text>}
            {dados.video1 && dados.video1}
            {dados.button_textLast && (
                <TouchableOpacity onPress={() => reproduzir(dados.button_textLast)}>
                    <View style={styles.containerIcon}>
                        <MaterialIcons name="play-circle" style={styles.icon} />
                        <Text style={styles.textButton}>Áudio</Text>
                    </View>
                </TouchableOpacity>
            )}
            {dados.text_last && <Text style={styles.textInfoLast}>{dados.text_last}</Text>}
            {dados.textInfo && <Text style={styles.textInfoVideo}>{dados.textInfo}</Text>}
            {dados.video2 && dados.video2}
        </View>
    );

    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppSecundario />
            <SafeAreaView style={styles.container}>
                <FlatList
                    initialNumToRender={1}
                    renderItem={({ item }) => <Item dados={item} />}
                    keyExtractor={item => item.id}
                    data={jsonData.filter(item => item.item_id == item_id)}
                />
            </SafeAreaView>
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
        width: 300,
        marginTop: -5,
        marginVertical: 10,
        left: 34,
        fontSize: 20,
        textAlign: 'center',
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    containerIcon: {
        marginTop: 20,
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
        marginHorizontal: 40,
        alignItems: 'center',
        marginVertical: 20
    },
    textInfo: {
        marginTop: 10,
        width: 330,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F'
    },
    title: {
        width: 330,
        marginTop: 10,
        color: '#F7636E',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center'

    },
    containerIconText: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 40
    },
    textInfoLast: {
        marginTop: 10,
        width: 330,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    textInfoVideo: {
        width: 330,
        marginVertical: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'justify',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    autor: {
        fontSize: 12,
        alignSelf: 'center',
        marginTop: 10
    },
    posicaoVideo: {
        alignItems: 'center',
        marginVertical: 20
    },

});
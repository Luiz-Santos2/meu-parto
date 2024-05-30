import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export interface PosicaoParirScreenScreenProps {

}

export function PosicaoParirScreen(props: PosicaoParirScreenScreenProps) {

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [jsonData, setJsonData] = useState<ItemData[]>([]);

    type ItemData = {
        id: any;
        title: any;
        button_title: any;
        title_Secundario: any;
        title_Terciario: any;
        img: any;
        first: any;
    };

    const buscarDados = async () => {
        const todosOsDados = await getDoc(doc(db, 'forms', '7')).then(snap => snap.data()) as any;
        const jsonData = [
            {
                id: Math.random().toString(12).substring(0),
                title: todosOsDados.tituloPrincipal,
                button_title: { uri: todosOsDados.audio },
                title_Secundario: todosOsDados.titulo,
                first: todosOsDados.texto,
                title_Terciario: todosOsDados.subtítulo1,
                img: <Image style={styles.img} source={{ uri: todosOsDados.imagem1 }} />,
            },
            {
                id: Math.random().toString(12).substring(0),
                title_Terciario: todosOsDados.subtítulo2,
                img: <Image style={styles.img} source={{ uri: todosOsDados.imagem2 }} />,
                title_Secundario: null,
                title: null,
                first: null,
                button_title: null,
            },
            {
                id: Math.random().toString(12).substring(0),
                title_Terciario: todosOsDados.subtítulo3,
                img: <Image style={styles.img} source={{ uri: todosOsDados.imagem3 }} />,
                title: null,
                first: null,
                button_title: null,
                title_Secundario: null,
            },
            {
                id: Math.random().toString(12).substring(0),
                title_Terciario: todosOsDados.subtítulo4,
                img: <Image style={styles.img} source={{ uri: todosOsDados.imagem4 }} />,
                title: null,
                first: null,
                button_title: null,
                title_Secundario: null,
            },
            {
                id: Math.random().toString(12).substring(0),
                title_Terciario: todosOsDados.subtítulo5,
                img: <Image style={styles.img} source={{ uri: todosOsDados.imagem5 }} />,
                title: null,
                first: null,
                button_title: null,
                title_Secundario: null,
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
            {dados.first && <Text style={styles.textInfo}>{dados.first}</Text>}
            {dados.title_Terciario && <Text style={styles.title}>{dados.title_Terciario}</Text>}
            {dados.img && dados.img}
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
                    data={jsonData}
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
        alignItems: 'center',
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
        padding: 10,
        paddingHorizontal: 70,
        alignSelf: 'center'
    },
    textInfo: {
        marginVertical: 40,
        width: 310,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F',
    },
    img: {
        marginVertical: 20,
        width: 300,
        height: 300,
        alignSelf: 'center',
        objectFit: 'contain'

    },
    title: {
        marginTop: 20,
        color: '#F7636E',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center'

    },
});

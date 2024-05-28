import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, SafeAreaView, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { CuidadosPosPartoParams } from '../../navigations/cuidadosPosParto';
import { Audio } from 'expo-av';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export interface DetalheDoisPosPartoScreenScreenProps {
    navigation: any;
    route: RouteProp<CuidadosPosPartoParams, "DetalheDoisCuidadosPosParto">;
}

export function DetalheDoisPosPartoScreen(props: DetalheDoisPosPartoScreenScreenProps) {

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [jsonData, setJsonData] = useState<ItemData[]>([]);


    //@ts-ignore
    const { item_id } = props.route.params

    type ItemData = {
        id: any;
        title: any;
        button_title: any;
        title_Secundario: any;
        button_text: any;
        title_Terciario: any;
        text_first: any;
        button_textLast: any;
        text_last: any;
        item_id: number;
        obs: any,
    };

    const buscarDados = async () => {
        const todosOsDados = await getDoc(doc(db, 'forms', '13')).then(snap => snap.data()) as any;
        const jsonData: any[] = [
            {
                id: Math.random().toString(12).substring(0),
                title: todosOsDados.tituloPrincipal,
                button_title: { uri: todosOsDados.audio1 },
                title_Secundario: todosOsDados.titulo1,
                button_text: { uri: todosOsDados.audio2 },
                text_first: todosOsDados.texto1,
                title_Terciario: todosOsDados.titulo2,
                button_textLast: null,
                text_last: todosOsDados.texto2,
                obs: null,
                item_id: 1
            },
            {
                id: Math.random().toString(12).substring(0),
                title: todosOsDados.tituloPrincipal,
                button_title: { uri: todosOsDados.audio3 },
                title_Secundario: todosOsDados.titulo3,
                button_text: null,
                text_first: null,
                title_Terciario: null,
                button_textLast: { uri: todosOsDados.audio4 },
                text_last: todosOsDados.texto3,
                obs: null,
                item_id: 2
            },
            {
                id: Math.random().toString(12).substring(0),
                title: todosOsDados.tituloPrincipal,
                button_title: { uri: todosOsDados.audio5 },
                title_Secundario: todosOsDados.titulo4,
                button_text: null,
                text_first: null,
                title_Terciario: null,
                button_textLast: { uri: todosOsDados.audio6 },
                text_last: todosOsDados.texto4,
                obs: todosOsDados.texto5,
                item_id: 3
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
            {dados.button_text && (
                <TouchableOpacity onPress={() => reproduzir(dados.button_text)}>
                    <View style={styles.containerIconText}>
                        <MaterialIcons name="play-circle" style={styles.icon} />
                        <Text style={styles.textButton}>Áudio</Text>
                    </View>
                </TouchableOpacity>
            )}
            {dados.text_first && <Text style={styles.textInfo}>{dados.text_first}</Text>}
            {dados.title_Terciario && <Text style={styles.title}>{dados.title_Terciario}</Text>}
            {dados.button_textLast && (
                <TouchableOpacity onPress={() => reproduzir(dados.button_textLast)}>
                    <View style={styles.containerIconText}>
                        <MaterialIcons name="play-circle" style={styles.icon} />
                        <Text style={styles.textButton}>Áudio</Text>
                    </View>
                </TouchableOpacity>
            )}
            {dados.text_last && <Text style={styles.textInfoLast}>{dados.text_last}</Text>}
            {dados.obs && <Text style={styles.textInfo}>{dados.obs}</Text>}
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
        marginTop: 0,
        marginVertical: 10,
        left: 34,
        fontSize: 20,
        textAlign: 'center',
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    containerIcon: {
        marginVertical: 10,
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
        marginHorizontal: 30,
        alignSelf: 'center'
    },
    textInfo: {
        marginTop: 10,
        width: 330,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    img: {
        marginTop: 20,
        width: 400,
        height: 400,
        alignSelf: 'center',
        objectFit: 'contain'

    },
    title: {
        width: 330,
        marginTop: 20,
        color: '#5F5F5F',
        fontSize: 18,
        textAlign: 'justify',
        left: 15,

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
        marginVertical: 10
    },
});

import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert, SafeAreaView, SectionList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export interface CuidadosPosPartoscreenProps {
    navigation: any;
}

export function CuidadosPosPartoScreen(props: CuidadosPosPartoscreenProps) {

    const [sound, setSound] = useState<Audio.Sound>();
    const [texto, setTexto] = useState('');
    const [audio, setAudio] = useState<any>(null);
    const [imagem, setImagem] = useState<any>(null);
    const [jsonData, setJsonData] = useState<{ data: { type: string, tela: string, type_id: number }[] }[]>([]);

    const buscarDados = async () => {
        const todosOsDados = await getDoc(doc(db, 'forms', '11')).then(snap => snap.data()) as any;
        const jsonData = [
            {
                data: [{ type: todosOsDados.menu1, tela: 'DetalheUmCuidadosPosParto', type_id: 0 }],
            },
            {
                data: [{ type: todosOsDados.menu2, tela: 'DetalheDoisCuidadosPosParto', type_id: 1 }],
            },
            {
                data: [{ type: todosOsDados.menu3, tela: 'DetalheDoisCuidadosPosParto', type_id: 2 }],
            },
            {
                data: [{ type: todosOsDados.menu4, tela: 'DetalheDoisCuidadosPosParto', type_id: 3 }],
            },
        ];

        setAudio({ uri: todosOsDados.audio });
        setImagem({ uri: todosOsDados.imagem });
        setTexto(todosOsDados.titulo)
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

    async function reproduzir() {
        const { sound } = await Audio.Sound.createAsync(audio)
        setSound(sound);

        await sound.playAsync();
    }

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

    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppSecundario />
            <View style={styles.container}>
                <TouchableOpacity onPress={reproduzir}>
                    <View style={styles.containerIcon}>
                        <MaterialIcons name="play-circle" style={styles.icon} />
                        <Text style={styles.textButton}>Áudio</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>{texto}</Text>
                <SectionList
                    sections={jsonData}
                    keyExtractor={(item) => item.type}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => props.navigation.navigate(item.tela, { item_id: item.type_id })}>
                            <View style={styles.buttonHome}>
                                <Text style={styles.buttontext}>{item.type}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <Image style={styles.img} source={imagem} />
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
        left: 30,
        width: 290,
        fontSize: 20,
        textAlign: 'left',
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    containerIcon: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        left: 30,
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
        margin: 15,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        borderRadius: 9,
        padding: 15,
    },
    buttontext: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    img: {
        width: 150,
        height: 150,
        alignSelf: 'flex-end',
        objectFit: 'contain'
    },
});
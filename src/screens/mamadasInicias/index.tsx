import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, SectionList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons';
import { AppSecundario } from '../../components/secundario';
import { RouteProp } from '@react-navigation/native';
import { MamadasIniciaisParams } from '../../navigations/mamadasIniciais';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export interface MamadasIniciaisScreenscreenProps {
    navigation: any;
    route: RouteProp<MamadasIniciaisParams, "MamadasIniciais">;
};

export function MamadasIniciaisScreen(props: MamadasIniciaisScreenscreenProps) {

    const [sound, setSound] = useState<Audio.Sound>();
    const [texto, setTexto] = useState('');
    const [titulo, setTitulo] = useState('');
    const [audio, setAudio] = useState<any>(null);
    const [imagem, setImagem] = useState<any>(null);
    const [jsonData, setJsonData] = useState<{ data: { type: string, tela: string, type_id: number }[] }[]>([]);

    const buscarDados = async () => {
        const todosOsDados = await getDoc(doc(db, 'forms', '8')).then(snap => snap.data()) as any;
        const jsonData = [
            {
                data: [{ type: todosOsDados.menu1, tela: 'DetalheUmMamadasIniciais', type_id: 0 }],
            },
            {
                data: [{ type: todosOsDados.menu2, tela: 'DetalheDoisMamadasIniciais', type_id: 1 }],
            },
            {
                data: [{ type: todosOsDados.menu3, tela: 'DetalheDoisMamadasIniciais', type_id: 2 }],
            },
        ];
        setAudio({ uri: todosOsDados.audio });
        setImagem({ uri: todosOsDados.imagem });
        setTexto(todosOsDados.texto);
        setTitulo(todosOsDados.titulo);
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

    async function reproduzir() {
        const { sound } = await Audio.Sound.createAsync(audio);
        setSound(sound);

        await sound.playAsync();
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
                <Text style={styles.text}>{titulo}</Text>
                <Text style={styles.TextObs}>{texto}</Text>
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
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    text: {
        fontSize: 20,
        textAlign: 'left',
        left: 30,
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    containerIcon: {
        marginTop: -20,
        flexDirection: 'row',
        alignItems: 'center',
        left: 20,
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
        marginTop: 15,
        marginHorizontal: 30,
        margin: 10,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        borderRadius: 9,
        padding: 15,
    },
    buttontext: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    TextObs: {
        marginTop: 20,
        color: '#5F5F5F',
        fontSize: 18,
        textAlign: 'justify',
        width: 330,
        alignSelf: 'center'
    },
    img: {
        width: 220,
        height: 220,
        alignSelf: 'center',
        objectFit: 'contain'
    },
});
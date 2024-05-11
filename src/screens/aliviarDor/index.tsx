import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert, SafeAreaView, SectionList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export interface AliviarDorscreenProps {
    navigation: any;
}

export function AliviarDorScreen(props: AliviarDorscreenProps) {

    const [jsonData, setJsonData] = useState<{ data: { type: string, type_id: number }[] }[]>([]);
    const [sound, setSound] = useState<Audio.Sound>();
    const [audio, setAudio] = useState<any>(null);
    const [imagem, setImagem] = useState<any>(null);
    const [texto, setTexto] = useState('');

    const buscarDados = async () => {
        const todosOsDados = await getDoc(doc(db, 'forms', '5')).then(snap => snap.data()) as any;
        const jsonData = [
            {
                data: [{ type: todosOsDados.menu1, type_id: 1 }],
            },
            {
                data: [{ type: todosOsDados.menu2, type_id: 2 }],
            },
            {
                data: [{ type: todosOsDados.menu3, type_id: 3 }],
            },
            {
                data: [{ type: todosOsDados.menu4, type_id: 4 }],
            },
            {
                data: [{ type: todosOsDados.menu5, type_id: 5 }],
            },
            {
                data: [{ type: todosOsDados.menu6, type_id: 6 }],
            },
        ];

        setAudio({ uri: todosOsDados.audio  });
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
                        <TouchableOpacity onPress={() => props.navigation.navigate('DetalhesAliviarDor', { item_id: item.type_id })}>
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
        width: 330,
        fontSize: 20,
        textAlign: 'center',
        color: '#5F5F5F',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    containerIcon: {
        marginTop: -20,
        flexDirection: 'row',
        alignItems: 'center',
        left: 45,
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
        marginTop: 20,
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
        width: 170,
        height: 170,
        objectFit: 'contain'
    },
});
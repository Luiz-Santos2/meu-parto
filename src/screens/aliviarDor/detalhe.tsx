import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import { RouteProp } from '@react-navigation/native';
import { AliviarDorParams } from '../../navigations/aliviarDor';
import { Video, ResizeMode, Audio } from 'expo-av';


export interface AliviarDorSecundariaScreenProps {
    navigation: any;
    route: RouteProp<AliviarDorParams, "DetalhesAliviarDor">;
}

export function AliviarDorSecundariaScreen(props: AliviarDorSecundariaScreenProps) {

    const [sound, setSound] = useState<Audio.Sound | null>(null);

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

    //@ts-ignore
    const { item_id } = props.route.params

    type ItemData = {
        id: string;
        audio: any;
        title: string;
        text: string;
        video: any;
        foto: any;
    };

    const getItems = [
        {
            id: Math.random().toString(12).substring(0),
            audio: require('../../audios/exercicios para a pelve e perinio.mp3'),
            title: 'EXERCÍCIOS PARA A PELVE E PERÍNEO',
            text: '',
            video: <View style={styles.posicaoVideo}>
                <Video
                    source={require('../../videos/exercícios para a pelve e perÍneo.mp4')}
                    style={{ width: 332, height: 187 }}
                    useNativeControls={true}
                    resizeMode={ResizeMode.COVER}
                />
                <Text style={styles.autor}>Fonte: AUTORES, 2023.</Text>
            </View>,
            foto: <Image style={styles.img} source={require('./../../imgs/pelvePerineo.png')} />,
            item_id: 1,
        },
        {
            id: Math.random().toString(12).substring(0),
            audio: require('../../audios/as massagens podem ser.mp3'),
            title: 'TÉCNICAS DE MASSAGEM',
            text: 'As massagens podem ser realizadas em posições que deixem as costas livres, como sentada, em pé ou de quatro apoios.',
            video: <View style={styles.posicaoVideo}>
                <Video
                    source={require('../../videos/tecnicas de massagem.mp4')}
                    style={{ width: 332, height: 187 }}
                    useNativeControls={true}
                    resizeMode={ResizeMode.COVER}
                />
                <Text style={styles.autor}>Fonte: AUTORES, 2023.</Text>
            </View>,
            foto: <Image style={styles.img} source={require('./../../imgs/tecnicaMassagem.png')} />,
            item_id: 2,
        },
        {
            id: Math.random().toString(12).substring(0),
            audio: require('../../audios/tecnicas de respiração.mp3'),
            title: 'TÉCNICA DE RESPIRAÇÃO',
            text: '',
            video: <View style={styles.posicaoVideo}>
                <Video
                    source={require('../../videos/tecnica de respiração.mp4')}
                    style={{ width: 332, height: 187 }}
                    useNativeControls={true}
                    resizeMode={ResizeMode.COVER}
                />
                <Text style={styles.autor}>Fonte: AUTORES, 2023.</Text>
            </View>,
            foto: <Image style={styles.img} source={require('./../../imgs/tecnicaRespiracao.png')} />,
            item_id: 3,
        },
        {
            id: Math.random().toString(12).substring(0),
            audio: require('../../audios/Posições q podem ajudar.mp3'),
            title: 'POSIÇÕES QUE PODEM AJUDAR',
            text: '',
            video: <View style={styles.posicaoVideo}>
                <Video
                    source={require('../../videos/Posições que podem ajudar.mp4')}
                    style={{ width: 332, height: 187 }}
                    useNativeControls={true}
                    resizeMode={ResizeMode.COVER}
                />
                <Text style={styles.autor}>Fonte: AUTORES, 2023.</Text>
            </View>,
            foto: null,
            item_id: 4,
        },
        {
            id: Math.random().toString(12).substring(0),
            audio: require('../../audios/O banho morno.mp3'),
            title: 'BANHO MORNO',
            text: 'O banho morno pode ser realizado no chuveiro, na posição que a mulher escolher (em pé, de cócoras, sentada na cadeira ou na bola suíça) ou, se disponíveis, banheiras ou piscinas podem ser usadas.',
            video: '',
            foto: null,
            item_id: 5,

        },
        {
            id: Math.random().toString(12).substring(0),
            audio: require('../../audios/ouvir musicas das suas preferencias.mp3'),
            title: 'MÚSICAS DE ESCOLHA DA MULHER',
            text: 'Ouvir músicas da sua preferência durante qualquer fase do trabalho de parto pode diminuir os sintomas de dor e ansiedade e proporcionar uma experiência de parto mais leve e feliz.',
            video: '',
            foto: null,
            item_id: 6,

        },
    ];

    type ItemProps = {
        dados: ItemData
    };

    const Item = ({ dados }: ItemProps) => (
        <View>
            <Text style={styles.text}>COMO ALIVIAR A DOR NA HORA DO PARTO SEM MEDICAMENTOS</Text>
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
            {dados.video && dados.video}
            {dados.foto && dados.foto}
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
    autor: {
        fontSize: 12,
        alignSelf: 'center',
        marginTop: 10
    },
    posicaoVideo: {
        alignItems: 'center',
        marginVertical: 40
    },
});
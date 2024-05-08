import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, SafeAreaView, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { MamadasIniciaisParams } from '../../navigations/mamadasIniciais';
import { Video, ResizeMode, Audio } from 'expo-av';

export interface DetalheDoisMamadasIniciaisScreenScreenProps {
    navigation: any;
    route: RouteProp<MamadasIniciaisParams, "DetalheDoisMamadasIniciais">;
}

export function DetalheDoisMamadasIniciaisScreen(props: DetalheDoisMamadasIniciaisScreenScreenProps) {

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
    console.log('item_id:', item_id)

    type ItemData = {
        id: any;
        title: any;
        button_title: any;
        title_Secundario: any;
        text_first: any;
        video1: any;
        button_textLast: any;
        text_last: any;
        textInfo: any;
        video2: any;
    };

    const jsonData = [
        {
            id: Math.random().toString(12).substring(0),
            title: 'MAMADAS INICIAIS',
            button_title: require('../../audios/A pega cprreta é a forma mais adequada.mp3'),
            title_Secundario: 'MEU BEBÊ ESTÁ FAZENDO A PEGA NA MAMA DA FORMA CORRETA?',
            text_first: 'A pega correta é a forma mais adequada da boca do seu bebê abocanhar sua mama. O posicionamento do seu corpinho e sua cabeça em relação a mama e a forma dele sugar o leite.',
            video1: <View style={styles.posicaoVideo}>
                <Video
                    source={require('../../videos/pega correta.mp4')}
                    style={{ width: 351, height: 189 }}
                    useNativeControls={true}
                    resizeMode={ResizeMode.COVER}
                />
                <Text style={styles.autor}>Fonte: AUTORES, 2023.</Text>
            </View>,
            button_textLast: require('../../audios/Nesse momento, após assistir ao vídeo.mp3'),
            text_last: 'Nesse momento, após assistir o vídeo, você pode tentar aplicar o que aprendeu com o seu bebê. Se não conseguiu na primeira tentativa, não se desespere, nem sempre é simples, persistam, tentem de novo. Você não está só!',
            video2: null,
            textInfo: null,
            item_id: 1
        },
        {
            id: Math.random().toString(12).substring(0),
            title: 'MAMADAS INICIAIS',
            button_title: require('../../audios/Após o banho seque seus seios suavemente.....mp3'),
            title_Secundario: 'CUIDANDO DAS RACHADURAS NA MAMA',
            text_first: '1 - Após o banho seque seus seios suavemente, pois assim a lubrificação natural de proteção do mamilo será preservada.\n\n2 - Utilizar sutiãs de tecido de algodão e adequados ao tamanho dos seios.\n\n3 - Não, aplicar hidratantes ou substancias não orientadas no mamilo.\n\n4 - Se as rachaduras (fissuras) já estiverem presente, após amamentar, pressione com delicadeza o bico do peito e passe o leite sobre o bico.\n\n5 - Pega do bebê: ATENÇÃO! Quando não está correta é um dos maiores causadores de rachaduras mamilares. Você lembra que já viu aqui como é a pega correta? Se esqueceu, veja como é novamente:',
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
            title_Secundario: 'MEU BEBÊ ESTÁ FAZENDO A PEGA NA MAMA DA FORMA CORRETA?',
            text_first: '6 - Quando os mamilos estiverem machucados podem ser usados os rolinhos de fraldas ou rosquinhas de amamentação para protegê-los e evitar que entrem em contato com o sutiã.',
            video1: null,
            button_textLast: null,
            text_last: null,
            textInfo: 'Como fazer os rolinhos de fralda que são semelhantes às rosquinhas de amamentação?\n\nVEJA O VÍDEO!',
            video2: <View style={styles.posicaoVideo}>
                <Video
                    source={require('../../videos/Rosquinha de amamentação.mp4')}
                    style={{ width: 351, height: 200 }}
                    useNativeControls={true}
                    resizeMode={ResizeMode.COVER}
                />
                <Text style={styles.autor}>Fonte: AUTORES, 2023.</Text>
            </View>,
            item_id: 2
        },


    ];

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
        color: '#F7636E',
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
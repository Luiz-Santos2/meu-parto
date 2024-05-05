import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, Image, SafeAreaView, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { MamadasIniciaisParams } from '../../navigations/mamadasIniciais';
import { Audio } from 'expo-av';

export interface DetalheUmMamadasIniciaisScreenScreenProps {
    navigation: any;
    route: RouteProp<MamadasIniciaisParams, "DetalheUmMamadasIniciais">;
}

export function DetalheUmMamadasIniciaisScreen(props: DetalheUmMamadasIniciaisScreenScreenProps) {

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
        button: any;
        title_Terciario: any;
        img: any;
        first: any;
        textObs: any;
    };

    const jsonData = [
        {
            id: Math.random().toString(12).substring(0),
            title: 'MAMADAS INICIAIS',
            button_title: require('../../audios/a melhor posição para parir.mp3'),
            title_Secundario: <View style={styles.tagButton}>
                <Text style={styles.tagText}>POSIÇÕES PARA AMAMENTAR</Text>
            </View>,
            button: require('../../audios/a melhor posição para parir.mp3'),
            title_Terciario: 'EM PÉ:',
            img: <Image style={styles.img} source={require('./../../imgs/emPe.png')} />,
            first: 'O bebê é colocado no colo da mãe e apoiado com uma das mãos da mãe.',
            textObs: null,
            item_id: 0
        },
        {
            id: Math.random().toString(12).substring(0),
            title: null,
            button_title: null,
            title_Secundario: null,
            button: require('../../audios/a melhor posição para parir.mp3'),
            title_Terciario: 'SENTADA (TRADICIONAL):',
            img: <Image style={styles.img} source={require('./../../imgs/sentadaTradicional.png')} />,
            first: 'O bebê fica com a barriguinha encostada na mãe, enquanto é segurado por baixo do seu corpo com os dois braços materno.',
            textObs: null,
            item_id: 0
        },
        {
            id: Math.random().toString(12).substring(0),
            title: null,
            button_title: null,
            title_Secundario: null,
            button: require('../../audios/a melhor posição para parir.mp3'),
            title_Terciario: 'DEITADA:',
            img: <Image style={styles.img} source={require('./../../imgs/DEITADA.png')} />,
            first: 'A mulher fica de lado, podendo apoiar sua cabeça no braço ou numa almofada. Deve-se oferecer a mama que está mais próxima do colchão.\n\nEsta posição é confortável para mãe e bebê, sendo útil quando você está cansada e no pós parto. Mas muito cuidado para não dormir por cima do bebê evitando acidentes!',
            textObs: null,
            item_id: 0
        },
        {
            id: Math.random().toString(12).substring(0),
            title: null,
            button_title: null,
            title_Secundario: null,
            button: require('../../audios/a melhor posição para parir.mp3'),
            title_Terciario: 'POSIÇÃO DO JOGADOR DE FUTEBOL AMERICANO:',
            img: <Image style={styles.img} source={require('./../../imgs/futebolAmericano.png')} />,
            first: 'O bebê é colocado debaixo do braço da mãe com as suas pernas para trás, na lateral do corpo da mãe. Muito útil para gêmeos (um de cada lado).',
            textObs: null,
            item_id: 0
        },
        {
            id: Math.random().toString(12).substring(0),
            title: null,
            button_title: null,
            title_Secundario: null,
            button: require('../../audios/a melhor posição para parir.mp3'),
            title_Terciario: 'POSIÇÃO SENTTADA EM POSIÇÃO DE CAVALINHO:',
            img: <Image style={styles.img} source={require('./../../imgs/cavalinho.png')} />,
            first: 'O bebê fica sentado numa das coxas de frente pra mama e a mãe o segura apoiando suas costas. Esta posição é ideal para bebês com mais de 3 meses que já seguram bem a cabeça e para aqueles que apresentam refluxo.',
            textObs: 'Não existe uma regra para qual posição você e seu bebê devem ficar! A melhor escolha é aquela mais confortável para os dois, onde ocorre a pega correta! Mas o que é a pega correta?\n\nVeja no próximo tópico!',
            item_id: 0
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
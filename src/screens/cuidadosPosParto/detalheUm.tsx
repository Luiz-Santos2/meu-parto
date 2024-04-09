import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, Image, SafeAreaView, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { CuidadosPosPartoParams } from '../../navigations/cuidadosPosParto';
export interface DetalheUmPosPartoScreenScreenProps {
    navigation: any;
    route: RouteProp<CuidadosPosPartoParams, "DetalheUmCuidadosPosParto">;
}

export function DetalheUmPosPartoScreen(props: DetalheUmPosPartoScreenScreenProps) {

    const reproduzir = async () => {
        Alert.alert('Reproduz o áudio')
    }

    //@ts-ignore
    const { item_id } = props.route.params
    console.log('item_id:', item_id)

    type ItemData = {
        id: any;
        title: any;
        button_title: any;
        title_Secundario: any;
        button1: any;
        text: any;
        button: any;
        title_Terciario: any;
        title_Quartenario: any;
        img: any;
        img2: any;
        first: any;
        textObs: any;
    };

    const jsonData = [
        {
            id: Math.random().toString(12).substring(0),
            title: 'CUIDADOS NO PÓS-PARTO',
            button_title: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            title_Secundario: <View style={styles.tagButton}>
                <Text style={styles.tagText}>SANGRAMENTO PÓS-PARTO - ATÉ QUANDO É NORMAL?</Text>
            </View>,
            button1: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon1}>
                    <MaterialIcons name="play-circle" style={styles.icon1} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            text: 'Você sabia que o sangramento da mulher imediatamente após o parto e nos dias seguintes são chamados de lóquios ou loquiações? De agora em diante, você não vai chamá-lo de menstruação, como muita gente acha que é.',
            button: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon1}>
                    <MaterialIcons name="play-circle" style={styles.icon1} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            title_Terciario: 'Os lóquios ou loquiações podem ser:',
            title_Quartenario: 'Vermelhos ou sanguinolentos',
            img: <Image style={styles.img} source={require('./../../imgs/33.png')} />,
            img2: null,
            first: 'O bebê é colocado no colo da mãe e apoiado com uma das mãos da mãe.',
            textObs: null,
            item_id: 0
        },
        {
            id: Math.random().toString(12).substring(0),
            title: null,
            button_title: null,
            title_Secundario: null,
            button1: null,
            text: null,
            button: null,
            title_Terciario: null,
            title_Quartenario: 'Serosanguinolentos',
            img: null,
            img2: <Image style={styles.img} source={require('./../../imgs/22.png')} />,
            first: 'O bebê fica com a barriguinha encostada na mãe, enquanto é segurado por baixo do seu corpo com os dois braços materno.',
            textObs: null,
            item_id: 0
        },
        {
            id: Math.random().toString(12).substring(0),
            title: null,
            button_title: null,
            title_Secundario: null,
            button1: null,
            text: null,
            button: null,
            title_Terciario: null,
            title_Quartenario: 'Serosos',
            img: <Image style={styles.img} source={require('./../../imgs/11.png')} />,
            img2: null,
            first: 'O bebê fica sentado numa das coxas de frente pra mama e a mãe o segura apoiando suas costas. Esta posição é ideal para bebês com mais de 3 meses que já seguram bem a cabeça e para aqueles que apresentam refluxo.',
            textObs: 'Atenção: nem sempre a mudança da cor dos lóquios seguem esses períodos descritos. Isso pode variar em cada mulher.',
            item_id: 0
        },
    ];

    type ItemProps = {
        dados: ItemData
    };

    const Item = ({ dados }: ItemProps) => (
        <View>
            <Text style={styles.text}>{dados.title}</Text>
            {dados.button_title}
            {dados.title_Secundario}
            {dados.button1}
            <Text style={styles.text2}>{dados.text}</Text>
            {dados.button}
            <Text style={styles.title}>{dados.title_Terciario}</Text>
            <Text style={styles.title_Quartenario}>{dados.title_Quartenario}</Text>
            <View style={styles.ajuste1}>
                {dados.img2}
                <Text style={styles.textInfo}>{dados.first}</Text>
                {dados.img}
            </View>
            <Text style={styles.textObsInfo}>{dados.textObs}</Text>
        </View>
    )

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
    text2: {
        marginTop: 30,
        width: 350,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F'
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
        width: 300,
        alignSelf: 'center'
    },
    textInfo: {
        marginTop: 30,
        width: 260,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F'
    },
    img: {
        marginTop: 20,
        width: 100,
        height: 180,
        alignSelf: 'center',
        backgroundColor: 'black',

    },
    title: {
        width: 350,
        color: '#F7636E',
        fontWeight: 'bold',
        fontSize: 18,
        left: 20,

    },
    containerIcon1: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        left: 20
    },
    icon1: {
        fontSize: 18,
        color: '#5F5F5F'
    },
    textObsInfo: {
        marginTop: 10,
        fontSize: 18,
        textAlign: 'justify',
        fontWeight: 'bold',
    },
    title_Quartenario: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'justify',
        alignSelf: 'center',
        marginVertical: 10,

    },
    ajuste1: {
        flexDirection: 'row'
    },
});
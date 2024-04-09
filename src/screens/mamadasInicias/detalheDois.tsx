import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, SafeAreaView, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { MamadasIniciaisParams } from '../../navigations/mamadasIniciais';

export interface DetalheDoisMamadasIniciaisScreenScreenProps {
    navigation: any;
    route: RouteProp<MamadasIniciaisParams, "DetalheDoisMamadasIniciais">;
}

export function DetalheDoisMamadasIniciaisScreen(props: DetalheDoisMamadasIniciaisScreenScreenProps) {

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
            button_title: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            title_Secundario: <View style={styles.tagButton}>
                <Text style={styles.tagText}>PEGA CORRETA</Text>
            </View>,
            text_first: 'A pega correta é a forma mais adequada da boca do seu bebê abocanhar sua mama. O posicionamento do seu corpinho e sua cabeça em relação a mama e a forma dele sugar o leite.',
            video1: null,
            button_textLast: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIconText}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            text_last: 'Nesse momento, após assistir o vídeo, você pode tentar aplicar o que aprendeu com o seu bebê. Se não conseguiu na primeira tentativa, não se desespere, nem sempre é simples, persistam, tentem de novo. Você não está só!',
            video2: null,
            textInfo: null,
            item_id: 1
        },
        {
            id: Math.random().toString(12).substring(0),
            title: 'MAMADAS INICIAIS',
            button_title: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            title_Secundario: <View style={styles.tagButton}>
                <Text style={styles.tagText}>CUIDANDO DAS RACHADURAS NA MAMA</Text>
            </View>,
            text_first: '1 - Após o banho seque seus seios suavemente, pois assim a lubrificação natural de proteção do mamilo será preservada. 2 - Utilizar sutiãs de tecido de algodão e adequados ao tamanho dos seios. 3 - Não, aplicar hidratantes ou substancias não orientadas no mamilo. 4 - Se as rachaduras (fissuras) já estiverem presente, após amamentar, pressione com delicadeza o bico do peito e passe o leite sobre o bico.5 - Pega do bebê: ATENÇÃO! Quando não está correta é um dos maiores causadores de rachaduras mamilares. Você lembra que já viu aqui como é a pega correta? Se esqueceu, veja como é novamente:',
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
            button_title: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            title_Secundario: <View style={styles.tagButton}>
                <Text style={styles.tagText}>PEGA CORRETA</Text>
            </View>,
            text_first: '6 - Quando os mamilos estiverem machucados podem ser usados os rolinhos de fraldas ou rosquinhas de amamentação para protegê-los e evitar que entrem em contato com o sutiã.',
            video1: null,
            button_textLast: null,
            text_last: null,
            textInfo: 'Como fazer os rolinhos de fralda que são semelhantes às rosquinhas de amamentação? VEJA O VÍDEO!',
            video2: null,
            item_id: 2
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
            <Text style={styles.textInfo}>{dados.text_first}</Text>
            {dados.video1}
            {dados.button_textLast}
            <Text style={styles.textInfoLast}>{dados.text_last}</Text>
            <Text style={styles.textInfoVideo}>{dados.textInfo}</Text>
            {dados.video2}
        </View>
    )

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
        width: 200,
        alignSelf: 'center'
    },
    textInfo: {
        marginTop: 10,
        width: 360,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F'
    },
    img: {
        marginTop: 20,
        width: 400,
        height: 400,
        alignSelf: 'center',
        backgroundColor: 'black',

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
        width: 360,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    textInfoVideo: {
        marginTop: 20,
        color: '#F7636E',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center'
    },
});
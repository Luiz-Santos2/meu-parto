import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, Image, SafeAreaView, SectionList, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import React from 'react';

export interface PosicaoParirScreenScreenProps {

}

export function PosicaoParirScreen(props: PosicaoParirScreenScreenProps) {

    const reproduzir = async () => {
        Alert.alert('Reproduz o áudio')
    }
    type ItemData = {
        id: any;
        title: any;
        button_title: any;
        title_Secundario: any;
        title_Terciario: any;
        img: any;
        first: any;
        last: any;
    };

    const jsonData = [
        {
            id: Math.random().toString(12).substring(0),
            title: 'COMO ALIVIAR A DOR NA HORA DO PARTO SEM MEDICAMENTOS',
            button_title: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            title_Secundario: <View style={styles.tagButton}>
                <Text style={styles.tagText}>POSIÇÕES PARA PARIR</Text>
            </View>,
            first: 'A melhor posição para parir é a de escolha da mulher, se tudo estiver ocorrendo bem! Algumas das posições que podem ser adotadas para parir são:',
            title_Terciario: 'DE CÓCORAS',
            img: <Image style={styles.img} source={require('./../../imgs/DE CÓCORAS.png')} />,
            last: null,
        },
        {
            id: Math.random().toString(12).substring(0),
            title_Terciario: 'SENTADA',
            img: <Image style={styles.img} source={require('./../../imgs/SENTADA.png')} />,
            title_Secundario: null,
            title: null,
            first: null,
            last: null,
            button_title: null,
        },
        {
            id: Math.random().toString(12).substring(0),
            title_Terciario: 'QUATRO APOIOS',
            img: <Image style={styles.img} source={require('./../../imgs/QUATRO APOIOS.png')} />,
            title: null,
            first: null,
            last: null,
            button_title: null,
            title_Secundario: null,
        },
        {
            id: Math.random().toString(12).substring(0),
            title_Terciario: 'SEMISSENTADA E LATERALIZADA',
            img: <Image style={styles.img} source={require('./../../imgs/SEMISSENTADA E LATERALIZADA.png')} />,
            title: null,
            first: null,
            last: null,
            button_title: null,
            title_Secundario: null,
        },
        {
            id: Math.random().toString(12).substring(0),
            title_Terciario: 'EM PÉ',
            img: <Image style={styles.img} source={require('./../../imgs/EM PÉ.png')} />,
            last: 'As posições em pé, de cócoras e sentada deixam a mulher mais verticalizada e isso pode ajudar na descida do bebê pelo canal de parto  e exigir menos esforço materno. As posições lateralizada e de quatro apoios podem diminuir a chance de ocorrer lacerações.',
            title: null,
            first: null,
            button_title: null,
            title_Secundario: null,
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
            <Text style={styles.textInfo}>{dados.first}</Text>
            <Text style={styles.title}>{dados.title_Terciario}</Text>
            {dados.img}
            <Text style={styles.textInfo}>{dados.last}</Text>
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
        padding: 10,
        width: 300,
        alignSelf: 'center'
    },
    textInfo: {
        marginTop: 30,
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
        marginTop: 20,
        color: '#F7636E',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center'

    },
});

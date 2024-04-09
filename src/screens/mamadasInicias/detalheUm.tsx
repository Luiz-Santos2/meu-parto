import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, Image, SafeAreaView, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { MamadasIniciaisParams } from '../../navigations/mamadasIniciais';

export interface DetalheUmMamadasIniciaisScreenScreenProps {
    navigation: any;
    route: RouteProp<MamadasIniciaisParams, "DetalheUmMamadasIniciais">;
}

export function DetalheUmMamadasIniciaisScreen(props: DetalheUmMamadasIniciaisScreenScreenProps) {

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
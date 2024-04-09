import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, SafeAreaView, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { CuidadosPosPartoParams } from '../../navigations/cuidadosPosParto';

export interface DetalheDoisPosPartoScreenScreenProps {
    navigation: any;
    route: RouteProp<CuidadosPosPartoParams, "DetalheDoisCuidadosPosParto">;
}

export function DetalheDoisPosPartoScreen(props: DetalheDoisPosPartoScreenScreenProps) {

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
        button_text: any;
        title_Terciario: any;
        text_first: any;
        button_textLast: any;
        text_last: any;
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
                <Text style={styles.tagText}>CUIDADOS COM OS PONTOS (SUTURA) DO PARTO NORMAL</Text>
            </View>,
            button_text: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIconText}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            text_first: 'A passagem do bebê pelo canal do parto e pela vulva pode provocar lacerações, que são semelhantes a cortes. Quando as lacerações são mais profundas ou permanecem sangrando é necessário dar pontos, ou seja, suturá-las.',
            title_Terciario: 'Alguns cuidados que devem ser tomados são:',
            button_textLast: null,
            text_last: 'Lave a região da vulva com água e sabonete líquido ou em barra, sem esfregar ou usar buchas. Prefira lavar a usar papel higiênico. Compressas geladas no local podem ajudar a diminuir a dor e o inchaço local. Seque bem com uma toalha limpa e macia, sem esfregar. Evite usar roupas apertadas ou que causem atrito com os pontos. Prefira roupas íntimas de algodão e calças largas e confortáveis. Observe os sinais de alerta como vermelhidão, inchaço, secreção amarela, secreção esverdeada ou febre. Se você apresentar algum desses sintomas, procure um serviço de saúde para atendimento. Lembre-se que o seu corpo precisa de tempo e cuidado para se recuperar do parto. Respeite o seu ritmo.',
            item_id: 1
        },
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
                <Text style={styles.tagText}>CUIDADOS COM OS PONTOS (SUTURA) DA CESARIANA</Text>
            </View>,
            button_text: null,
            text_first: '',
            title_Terciario: '',
            button_textLast: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIconText}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            text_last: 'Lave a região da vulva com água e sabonete líquido ou em barra, sem esfregar ou usar buchas. Prefira lavar a usar papel higiênico. Compressas geladas no local podem ajudar a diminuir a dor e o inchaço local. Seque bem com uma toalha limpa e macia, sem esfregar. Evite usar roupas apertadas ou que causem atrito com os pontos. Prefira roupas íntimas de algodão e calças largas e confortáveis. Observe os sinais de alerta como vermelhidão, inchaço, secreção amarela, secreção esverdeada ou febre. Se você apresentar algum desses sintomas, procure um serviço de saúde para atendimento. Lembre-se que o seu corpo precisa de tempo e cuidado para se recuperar do parto. Respeite o seu ritmo.',
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
            {dados.button_text}
            <Text style={styles.textInfo}>{dados.text_first}</Text>
            <Text style={styles.title}>{dados.title_Terciario}</Text>
            {dados.button_textLast}
            <Text style={styles.textInfoLast}>{dados.text_last}</Text>
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
        width: 250,
        alignSelf: 'center'
    },
    textInfo: {
        marginTop: 10,
        width: 360,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F',
        fontWeight: 'bold',
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
        color: '#5F5F5F'
    },
});

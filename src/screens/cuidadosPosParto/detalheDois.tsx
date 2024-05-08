import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, SafeAreaView, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { CuidadosPosPartoParams } from '../../navigations/cuidadosPosParto';
import { Audio } from 'expo-av';

export interface DetalheDoisPosPartoScreenScreenProps {
    navigation: any;
    route: RouteProp<CuidadosPosPartoParams, "DetalheDoisCuidadosPosParto">;
}

export function DetalheDoisPosPartoScreen(props: DetalheDoisPosPartoScreenScreenProps) {

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
            button_title: require('../../audios/cuidados com os pontos sutura do parto normal.mp3'),
            title_Secundario: 'CUIDADOS COM OS PONTOS (SUTURA) DO PARTO NORMAL',
            button_text: require('../../audios/A passagem do bebê pelo canal do parto e pela vulva.mp3'),
            text_first: 'A passagem do bebê pelo canal do parto e pela vulva pode provocar lacerações, que são semelhantes a cortes. Quando as lacerações são mais profundas ou permanecem sangrando é necessário dar pontos, ou seja, suturá-las.',
            title_Terciario: 'Alguns cuidados que devem ser tomados são:',
            button_textLast: null,
            text_last: '- Lave a região da vulva com água e sabonete líquido ou em barra, sem esfregar ou usar buchas. Prefira lavar a usar papel higiênico.\n\n- Compressas geladas no local podem ajudar a diminuir a dor e o inchaço local.\n\n- Seque bem com uma toalha limpa e macia, sem esfregar.\n\n- Evite usar roupas apertadas ou que causem atrito com os pontos.\n\n- Prefira roupas íntimas de algodão e calças largas e confortáveis.\n\n- Observe os sinais de alerta como vermelhidão, inchaço, secreção amarela, secreção esverdeada ou febre. Se você apresentar algum desses sintomas, procure um serviço de saúde para atendimento.\n\n- Lembre-se que o seu corpo precisa de tempo e cuidado para se recuperar do parto. Respeite o seu ritmo.',
            item_id: 1
        },
        {
            id: Math.random().toString(12).substring(0),
            title: 'CUIDADOS NO PÓS-PARTO',
            button_title: require('../../audios/cuidados com os pontos sutura da cesariana.mp3'),
            title_Secundario: 'CUIDADOS COM OS PONTOS (SUTURA) DA CESARIANA',
            button_text: null,
            text_first: '',
            title_Terciario: '',
            button_textLast: require('../../audios/Lave a região da cicatriz com água e sabonete neutro, sem esfregar ou usar buchas..mp3'),
            text_last: '- Lave a região da cicatriz com água e sabonete neutro, sem esfregar ou usar buchas.\n\n- Seque bem com uma toalha limpa e macia, sem esfregar.\n\n- Evite usar roupas apertadas ou que causem atrito com os pontos.\n\n- Procure levantar da cama com ajuda ou virando para o lado primeiro para depois levantar-se, caso não a tenha ajuda.\n\n- Prefira roupas íntimas de algodão e calças largas e confortáveis.\n\n- Observe os sinais de alerta, como vermelhidão, inchaço, secreção amarela, secreção esverdeada ou febre. Se você apresentar algum desses sintomas, procure um serviço de saúde para atendimento.\n\n- Lembre-se que o seu corpo precisa de tempo e cuidado para se recuperar do parto. Respeite o seu ritmo.',
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
            {dados.button_text && (
                <TouchableOpacity onPress={() => reproduzir(dados.button_text)}>
                    <View style={styles.containerIconText}>
                        <MaterialIcons name="play-circle" style={styles.icon} />
                        <Text style={styles.textButton}>Áudio</Text>
                    </View>
                </TouchableOpacity>
            )}
            {dados.text_first && <Text style={styles.textInfo}>{dados.text_first}</Text>}
            {dados.title_Terciario && <Text style={styles.title}>{dados.title_Terciario}</Text>}
            {dados.button_textLast && (
                <TouchableOpacity onPress={() => reproduzir(dados.button_textLast)}>
                    <View style={styles.containerIconText}>
                        <MaterialIcons name="play-circle" style={styles.icon} />
                        <Text style={styles.textButton}>Áudio</Text>
                    </View>
                </TouchableOpacity>
            )}
            {dados.text_last && <Text style={styles.textInfoLast}>{dados.text_last}</Text>}
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
        marginHorizontal: 30,
        alignSelf: 'center'
    },
    textInfo: {
        marginTop: 10,
        width: 330,
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
        objectFit: 'contain'

    },
    title: {
        width: 330,
        marginTop: 20,
        color: '#F7636E',
        fontSize: 18,
        textAlign: 'justify',
        left: 15,

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
        marginVertical: 10
    },
});

import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert, SafeAreaView, SectionList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export interface CuidadosPosPartoscreenProps {
    navigation: any;
}

export function CuidadosPosPartoScreen(props: CuidadosPosPartoscreenProps) {

    const [sound, setSound] = useState<Audio.Sound>();

    async function reproduzir() {
        const { sound } = await Audio.Sound.createAsync(require('../../audios/Cuidados no inicio do pós parto.mp3')
        );
        setSound(sound);

        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const jsonData = [
        {
            data: [{ type: 'SANGRAMENTO PÓS-PARTO - ATÉ QUANDO É NORMAL?', tela: 'DetalheUmCuidadosPosParto', type_id: 0 }],
        },
        {
            data: [{ type: 'CUIDADOS COM OS PONTOS (SUTURA) DO PARTO NORMAL', tela: 'DetalheDoisCuidadosPosParto', type_id: 1 }],
        },
        {
            data: [{ type: 'CUIDADOS COM OS PONTOS (SUTURA) DA CESARIANA', tela: 'DetalheDoisCuidadosPosParto', type_id: 2 }],
        },
    ];
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
                <Text style={styles.text}>CUIDADOS NO INICIO DO PÓS-PARTO</Text>
                <SectionList
                    sections={jsonData}
                    keyExtractor={(item) => item.type}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => props.navigation.navigate(item.tela, { item_id: item.type_id })}>
                            <View style={styles.buttonHome}>
                                <Text style={styles.buttontext}>{item.type}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <Image style={styles.img} source={require('./../../imgs/menuCuidados.png')} />
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
        left: 30,
        width: 290,
        fontSize: 20,
        textAlign: 'left',
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    containerIcon: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        left: 30,
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
        margin: 15,
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
        width: 250,
        height: 250,
        alignSelf: 'flex-end',
        objectFit: 'contain'
    },
});
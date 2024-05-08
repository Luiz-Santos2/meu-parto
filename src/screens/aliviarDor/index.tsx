import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert, SafeAreaView, SectionList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export interface AliviarDorscreenProps {
    navigation: any;
}

export function AliviarDorScreen(props: AliviarDorscreenProps) {

    const [sound, setSound] = useState<Audio.Sound>();

    async function reproduzir() {
        const { sound } = await Audio.Sound.createAsync(require('../../audios/Como aliviar a dor na hora do parto sem medicamentos.mp3')
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
            data: [{ type: 'EXERCÍCIOS PARA A PELVE E PERÍNEO', type_id: 1 }],
        },
        {
            data: [{ type: 'TÉCNICAS DE MASSAGEM', type_id: 2 }],
        },
        {
            data: [{ type: 'TÉCNICA DE RESPIRAÇÃO', type_id: 3 }],
        },
        {
            data: [{ type: 'POSIÇÕES QUE PODEM AJUDAR', type_id: 4 }],
        },
        {
            data: [{ type: 'BANHO MORNO', type_id: 5 }],
        },
        {
            data: [{ type: 'MÚSICAS DE ESCOLHA DA MULHER', type_id: 6 }],
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
                <Text style={styles.text}>COMO ALIVIAR A DOR NA HORA DO PARTO SEM MEDICAMENTOS</Text>
                <SectionList
                    sections={jsonData}
                    keyExtractor={(item) => item.type}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => props.navigation.navigate('DetalhesAliviarDor', { item_id: item.type_id })}>
                            <View style={styles.buttonHome}>
                                <Text style={styles.buttontext}>{item.type}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <Image style={styles.img} source={require('./../../imgs/menuGestante.png')} />
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
        width: 330,
        fontSize: 20,
        textAlign: 'center',
        color: '#5F5F5F',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    containerIcon: {
        marginTop: -20,
        flexDirection: 'row',
        alignItems: 'center',
        left: 45,
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
        marginTop: 20,
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
        width: 170,
        height: 170,
        objectFit: 'contain'
    },
});
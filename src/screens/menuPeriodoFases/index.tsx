import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';

export interface PeriodoFasesScreenProps {
    navigation: any;
}

export function PeriodoFasesScreen(props: PeriodoFasesScreenProps) {

    const reproduzir = async () => {
        Alert.alert('Reproduz o áudio')
    }

    type ItemData = {
        id: any;
        title: any;
        period: any;
        screen: any;
        audio: any;
        fases: any[]


    };

    const jsonData = [
        {
            id: '1',
            title: 'FASE LATENTE',
            period: '1º Período do Trabalho de Parto',
            screen: 'DetalhesPeriodoFases',
            audio: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon1}>
                    <MaterialIcons name="play-circle" style={styles.icon1} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            fases: [
                { id: '1', title: "FASE LATENTE", screen: 'DetalhesPeriodoFases' },
                { id: '2', title: "FASE ATIVA", screen: 'DetalhesPeriodoFases' },
            ]

        },
        {
            id: '2',
            title: 'FASE PASSIVA',
            period: '2º Período do Trabalho de Parto',
            screen: 'DetalhesPeriodoFases',
            audio: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon1}>
                    <MaterialIcons name="play-circle" style={styles.icon1} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            fases: [
                { id: '3', title: "FASE PASSIVA", screen: 'DetalhesPeriodoFases' },
                { id: '4', title: "FASE ATIVA", screen: 'DetalhesPeriodoFases' },
            ]

        },

        {
            id: '3',
            title: 'DESPRENDIMENTO E SAÍDA DA PLACENTA',
            period: '3º Período do Trabalho de Parto',
            screen: 'DetalhesPeriodoFases',
            audio: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon1}>
                    <MaterialIcons name="play-circle" style={styles.icon1} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            fases: [
                {id: '5',  title: "DESPRENDIMENTO E SAÍDA DA PLACENTA", screen: 'DetalhesPeriodoFases' },
            ]
        },
    ];

    type ItemProps = {
        dados: ItemData
    };

    const Item = ({ dados }: ItemProps) => (
        <View style={{ marginBottom: 40 }}>
            <View style={{ marginBottom: 30 }}>
                {dados.audio && (
                    <TouchableOpacity onPress={reproduzir}>
                        <View style={styles.containerIcon1}>
                            <MaterialIcons name="play-circle" style={styles.icon1} />
                            <Text style={styles.textButton}>Áudio</Text>
                        </View>
                    </TouchableOpacity>
                )}
                {dados.period && (
                    <Text style={styles.period}>{dados.period}</Text>
                )}
            </View>
            <View style={styles.ajuste}>
                {dados.fases.map((fase, index) => (
                    <View key={"fase" + index}  >
                        <TouchableOpacity onPress={reproduzir}>
                            <View style={styles.containerIcon}>
                                <MaterialIcons name="play-circle" style={styles.icon} />
                                <Text style={styles.textButton}>Áudio</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate(fase.screen, { item_id: fase.id })}>
                            <View style={styles.button}>
                                <Text style={styles.text}>{fase.title}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppSecundario />
            <View style={styles.container}>
                <Text style={styles.title}>PERÍODOS E FASES DO PARTO</Text>
                <FlatList
                    initialNumToRender={4}
                    renderItem={({ item }) => <Item dados={item} />}
                    keyExtractor={item => item.id}
                    data={jsonData}
                />
            </View>
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
    title: {
        width: 323,
        marginTop: -20,
        marginVertical: 50,
        left: 34,
        fontSize: 20,
        textAlign: 'center',
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 25,
        color: '#5F5F5F'
    },
    containerIcon1: {
        flexDirection: 'row',
        marginLeft: 20
    },
    icon1: {
        fontSize: 25,
        color: '#5F5F5F'
    },
    textButton: {
        fontWeight: 'bold',
    },
    period: {
        paddingTop: -10,
        color: '#000000',
        textAlign: 'left',
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 16,
    },
    button: {
        backgroundColor: 'rgba(247, 99, 110, 1)',
        alignItems: 'center',
        padding: 10,
        borderRadius: 9,
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        color: 'white',
        paddingHorizontal: 25

    },
    ajuste:{
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginVertical: 10
    },
});
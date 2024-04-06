import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert, SafeAreaView, SectionList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';

export interface AliviarDorscreenProps {
    navigation: any;
}

export function AliviarDorScreen(props: AliviarDorscreenProps) {

    const reproduzir = async () => {
        Alert.alert('Reproduz o áudio')
    }
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
                <Text style={styles.text}>COMO ALIVIAR A DOR NA HORA DO PARTO SEM MEDICAMENTOS</Text>
                <TouchableOpacity onPress={reproduzir}>
                    <View style={styles.containerIcon}>
                        <MaterialIcons name="play-circle" style={styles.icon} />
                        <Text style={styles.textButton}>Áudio - Descrição</Text>
                    </View>
                </TouchableOpacity>
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
        marginTop: -20,
        width: 300,
        left: 34,
        fontSize: 20,
        textAlign: 'center',
        color: '#5F5F5F',
        fontWeight: 'bold',
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
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
        margin: 10,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        borderRadius: 9,
        padding: 15,
    },
    buttontext: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    TextObs: {
        color: '#5F5F5F',
        fontSize: 20,
        textAlign: 'justify',
    },
});
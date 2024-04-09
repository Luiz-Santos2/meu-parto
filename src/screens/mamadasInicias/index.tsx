import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert, SafeAreaView, SectionList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import { RouteProp } from '@react-navigation/native';
import { MamadasIniciaisParams } from '../../navigations/mamadasIniciais';


export interface MamadasIniciaisScreenscreenProps {
    navigation: any;
    route: RouteProp<MamadasIniciaisParams, "MamadasIniciais">;
}

export function MamadasIniciaisScreen(props: MamadasIniciaisScreenscreenProps) {

    const reproduzir = async () => {
        Alert.alert('Reproduz o áudio')
    }
    const jsonData = [
        {
            data: [{ type: 'POSIÇÕES PARA AMAMENTAR', tela: 'DetalheUmMamadasIniciais',  type_id: 0 }],
        },
        {
            data: [{ type: 'MEU BEBÊ ESTÁ FAZENDO A PEGA NA MAMA DA FORMA CORRETA?', tela: 'DetalheDoisMamadasIniciais', type_id: 1 }],
        },
        {
            data: [{ type: 'CUIDANDO DAS RACHADURAS NA MAMA', tela: 'DetalheDoisMamadasIniciais',  type_id: 2 }],
        },
    ];
    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppSecundario />
            <View style={styles.container}>
                <TouchableOpacity onPress={reproduzir}>
                    <View style={styles.containerIcon}>
                        <MaterialIcons name="play-circle" style={styles.icon} />
                        <Text style={styles.textButton}>Áudio - Descrição</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>MAMADAS INICIAIS</Text>
                <Text style={styles.TextObs}>Essas primeiras mamadas podem não ser tão fáceis como parecem, mas vamos lá, fique tranquila e
                    veja algumas dicas que podem te ajudar nesse período!</Text>
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
            <Image style={styles.img} source={require('./../../imgs/menuPos.png')} />
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
        alignSelf: 'center',
    },
    containerIcon: {
        marginTop: -25,
        margin: 10,
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
        margin: 20,
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
        fontSize: 18,
        textAlign: 'justify',
        width: 350,
        alignSelf: 'center'
    },
    img: {
        width: 220,
        height: 220,
        alignSelf: 'center'
    },
});
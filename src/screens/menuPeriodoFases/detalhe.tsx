import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, SafeAreaView, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import { RouteProp } from '@react-navigation/native';
import { PeriodoFaseParams } from '../../navigations/periodoFases';

export interface PeriodoFasesSecundariaScreenProps {
    navigation: any;
    route: RouteProp<PeriodoFaseParams, "DetalhesPeriodoFases">;
}

export function PeriodoFasesSecundariaScreen(props: PeriodoFasesSecundariaScreenProps) {

    const reproduzir = async () => {
        Alert.alert('Reproduz o áudio')
    }

    //@ts-ignore
    const { item_id } = props.route.params
    console.log('item_id:', item_id)

    type ItemData = {
        id: string;
        audio: any;
        title: string;
        titulo_secundario: string;
        text: string;
        video: any;
    };

    const getItems = [
        {
            id: Math.random().toString(12).substring(0),
            audio: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            title: '1º Período do Trabalho de Parto',
            titulo_secundario: 'FASE LATENTE',
            text: 'Nesse momento, você pode achar que já deve ir à maternidade, mas calma!\n\nEssa fase pode demorar um tempo muito variável, as contrações uterinas são dolorosas, mas podem estar com duração e intervalos entre elas ainda irregulares e a dilatação do colo do útero chega até 4 cm.',
            video: '',
            item_id: 1,
        },
        {
            id: Math.random().toString(12).substring(0),
            audio: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            title: '1º Período do Trabalho de Parto',
            titulo_secundario: 'FASE ATIVA',
            text: ' Agora sim, podemos dizer que começou o trabalho de parto!\n\nAs contrações uterinas são regulares, aparecem num intervalo semelhante entre elas, e há dilatação do colo do útero progressiva a partir dos 4 cm até os 10 cm.\n\nNas mães de primeira viagem dura em média 8 horas e é pouco provável que dure mais que 18 horas; nas mulheres que já pariram dura em média 5 horas e é pouco provável que dure mais que 12 horas.',
            video: '',
            item_id: 2,
        },
        {
            id: Math.random().toString(12).substring(0),
            audio: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            title: '2º Período do Trabalho de Parto',
            titulo_secundario: 'FASE PASSIVA',
            text: 'Ufa! Já estamos com os tão sonhados 10 cm, que é a dilatação total do colo, mas sem sensação de vontade de fazer força para expulsar o bebê.\n\nSeu corpo está se preparando para que o bebê comece a descer pelo canal do parto.\n\nAté o momento não falamos em que período a bolsa das águas (membrana amniótica) rompe no trabalho de parto. Vamos lá! A bolsa pode romper antes das contrações iniciarem, porém, o mais comum é que isso aconteça após o início delas e até no momento do nascimento. Alguns bebês podem nascer sem que a bolsa rompa e chamamos esse parto de empelicado.',
            video: '',
            item_id: 3,
        },
        {
            id: Math.random().toString(12).substring(0),
            audio: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            title: '2º Período do Trabalho de Parto',
            titulo_secundario: 'FASE ATIVA',
            text: 'O colo do útero tem dilatação total (10 cm), as contrações do útero e a vontade de empurrar da mamãe fazem com que o bebê desça pelo canal do parto e tornam a cabeça do bebê visível na vulva, se ele estiver com a cabeça pra baixo. Isso é o que chamamos de coroar! Em seguida, sai todo o corpo do bebê!',
            video: '',
            item_id: 4,
        },
        {
            id: Math.random().toString(12).substring(0),
            audio: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            title: '3º Período do Parto',
            titulo_secundario: 'DESPRENDIMENTO E SAÍDA DA PLACENTA',
            text: 'Nesse momento, ocorre o desprendimento da placenta do útero e sua saída pelo canal do parto. Esse processo pode durar até uma hora.',
            video: '',
            item_id: 5,

        },
    ];

    type ItemProps = {
        dados: ItemData
    };

    const Item = ({ dados }: ItemProps) => (
        <View>
            <Text style={styles.text}>PERÍODOS E FASES DO PARTO</Text>
            <Text style={styles.tagText}>{dados.title}</Text>
            {dados.audio}
            <View style={styles.tagButtonSecundario}>
                <Text style={styles.tagTextSecundario}>{dados.titulo_secundario}</Text>
            </View>
            <Text style={styles.textInfo}>{dados.text}</Text>
            {dados.video}
        </View>
    )

    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppSecundario />
            <View style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        initialNumToRender={4}
                        renderItem={({ item }) => <Item dados={item} />}
                        keyExtractor={item => item.id}
                        data={getItems.filter(item => item.item_id == item_id)}
                    />
                </SafeAreaView>
            </View>
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
        width: 330,
        marginTop: -5,
        marginVertical: 30,
        left: 34,
        fontSize: 20,
        textAlign: 'justify',
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
        marginVertical: 30,
        marginHorizontal: 20,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tagTextSecundario: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tagButtonSecundario: {
        borderRadius: 9,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        padding: 10,
        width: 300,
        alignSelf: 'center'
    },
    textInfo: {
        marginVertical: 30,
        width: 340,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F'
    },

});
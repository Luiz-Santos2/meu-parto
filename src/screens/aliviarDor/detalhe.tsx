import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, SafeAreaView, FlatList } from 'react-native';
import bg from './../../imgs/background.png';
import { MaterialIcons } from '@expo/vector-icons'
import { AppSecundario } from '../../components/secundario';
import { RouteProp } from '@react-navigation/native';
import { AliviarDorParams } from '../../navigations/aliviarDor';

export interface AliviarDorSecundariaScreenProps {
    navigation: any;
    route: RouteProp<AliviarDorParams, "DetalhesAliviarDor">;
}

export function AliviarDorSecundariaScreen(props: AliviarDorSecundariaScreenProps) {

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
        text: string;
        video: any;
        foto: any;
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
            title: 'EXERCÍCIOS PARA A PELVE E PERÍNEO',
            text: '',
            video: '',
            foto: '',
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
            title: 'TÉCNICAS DE MASSAGEM',
            text: 'As massagens podem ser realizadas em posições que deixem as costas livres, como sentada, em pé ou de quatro apoios.',
            video: '',
            foto: '',
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
            title: 'TÉCNICA DE RESPIRAÇÃO',
            text: '',
            video: '',
            foto: '',
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
            title: 'POSIÇÕES QUE PODEM AJUDAR',
            text: '',
            video: '',
            foto: '',
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
            title: 'BANHO MORNO',
            text: 'O banho morno pode ser realizado no chuveiro, na posição que a mulher escolher (em pé, de cócoras, sentada na cadeira ou na bola suíça) ou, se disponível, pode-se usar banheira ou piscina.',
            video: '',
            foto: '',
            item_id: 5,

        },
        {
            id: Math.random().toString(12).substring(0),
            audio: <TouchableOpacity onPress={reproduzir}>
                <View style={styles.containerIcon}>
                    <MaterialIcons name="play-circle" style={styles.icon} />
                    <Text style={styles.textButton}>Áudio</Text>
                </View>
            </TouchableOpacity>,
            title: 'MÚSICAS DE ESCOLHA DA MULHER',
            text: 'Ouvir músicas da sua preferência durante qualquer fase do trabalho de parto pode diminuir os sintomas de dor e ansiedade e proporcionar uma experiência de parto mais leve e feliz.',
            video: '',
            foto: '',
            item_id: 6,

        },
    ];

    type ItemProps = {
        dados: ItemData
    };

    const Item = ({ dados }: ItemProps) => (
        <View>
            <Text style={styles.text}>COMO ALIVIAR A DOR NA HORA DO PARTO SEM MEDICAMENTOS</Text>
            {dados.audio}
            <View style={styles.tagButton}>
                <Text style={styles.tagText}>{dados.title}</Text>
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
        marginVertical: 30,
        width: 360,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F'
    },

});
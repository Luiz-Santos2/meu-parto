import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
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
    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppSecundario />
            <View style={styles.container}>
                <Text style={styles.text}>PERÍODOS E FASES DO PARTO</Text>
                <>
                    <TouchableOpacity onPress={reproduzir}>
                        <View style={styles.containerIcon1}>
                            <MaterialIcons name="play-circle" style={styles.icon1} />
                            <Text style={styles.textButton}>Áudio</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.tagText}>1º Período do Trabalho de Parto</Text>
                </>
                <View style={styles.ajust}>
                    <View style={styles.ajuste}>
                        <TouchableOpacity onPress={reproduzir}>
                            <View style={styles.containerIcon}>
                                <MaterialIcons name="play-circle" style={styles.icon} />
                                <Text style={styles.textButton}>Áudio</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('DetalhesPeriodoFases', { item_id: 1 })}>
                            <View style={styles.buttonlatente}>
                                <Text style={styles.textperiodoFase}>FASE LATENTE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ajuste}>
                        <TouchableOpacity onPress={reproduzir}>
                            <View style={styles.containerIcon}>
                                <MaterialIcons name="play-circle" style={styles.icon} />
                                <Text style={styles.textButton}>Áudio</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('DetalhesPeriodoFases', { item_id: 2 })}>
                            <View style={styles.buttonlatente}>
                                <Text style={styles.textperiodoFase}>FASE ATIVA</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <>
                    <TouchableOpacity onPress={reproduzir}>
                        <View style={styles.containerIcon1}>
                            <MaterialIcons name="play-circle" style={styles.icon1} />
                            <Text style={styles.textButton}>Áudio</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.tagText}>2º Período do Trabalho de Parto</Text>
                </>
                <View style={styles.ajust}>
                    <View style={styles.ajuste}>
                        <TouchableOpacity onPress={reproduzir}>
                            <View style={styles.containerIcon}>
                                <MaterialIcons name="play-circle" style={styles.icon} />
                                <Text style={styles.textButton}>Áudio</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('DetalhesPeriodoFases', { item_id: 3 })}>
                            <View style={styles.buttonlatente}>
                                <Text style={styles.textperiodoFase}>FASE PASSIVA</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ajuste}>
                        <TouchableOpacity onPress={reproduzir}>
                            <View style={styles.containerIcon}>
                                <MaterialIcons name="play-circle" style={styles.icon} />
                                <Text style={styles.textButton}>Áudio</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('DetalhesPeriodoFases', { item_id: 4 })}>
                            <View style={styles.buttonlatente}>
                                <Text style={styles.textperiodoFase}>FASE ATIVA</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <>
                    <TouchableOpacity onPress={reproduzir}>
                        <View style={styles.containerIcon1}>
                            <MaterialIcons name="play-circle" style={styles.icon1} />
                            <Text style={styles.textButton}>Áudio</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.tagText}>3º Período do Trabalho de Parto</Text>
                </>
                <View style={styles.ajust}>
                    <View style={styles.ajuste}>
                        <TouchableOpacity onPress={reproduzir}>
                            <View style={styles.containerIcon}>
                                <MaterialIcons name="play-circle" style={styles.icon} />
                                <Text style={styles.textButton}>Áudio</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('DetalhesPeriodoFases', { item_id: 5 })}>
                            <View style={styles.buttonlatente}>
                                <Text style={styles.textperiodoFase}>DESPRENDIMENTO E SAÍDA DA PLACENTA</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground >
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    icon1: {
        fontSize: 25,
        color: '#5F5F5F'
    },
    text: {
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
    textButton: {
        fontWeight: 'bold',
    },
    tagText: {
        paddingTop: -10,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonlatente: {
        flexDirection: 'row',
        backgroundColor: 'rgba(247, 99, 110, 1)',
        alignItems: 'center',
        padding: 10,
        borderRadius: 9,
        justifyContent: 'center'
    },
    textperiodoFase: {
        textAlign: 'center',
        color: 'white',
        paddingHorizontal: 25

    },
    ajust: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    ajuste: {
        marginLeft: 10,
        marginVertical: 40,
        marginHorizontal: 'auto'

    },
    containerIcon1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 80
    },
});
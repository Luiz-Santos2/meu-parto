import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert, SafeAreaView, SectionList } from 'react-native';
import bg from './../../imgs/background.png';
import { AppHeader } from '../../components/header';
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
                    <Text style={styles.tagtext}>1º Período do Trabalho de Parto</Text>
                </>
                <View style={styles.ajust}>
                    <View style={styles.ajuste}>
                        <TouchableOpacity onPress={reproduzir}>
                            <View style={styles.containerIcon}>
                                <MaterialIcons name="play-circle" style={styles.icon} />
                                <Text style={styles.textButton}>Áudio</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('')}>
                            <View style={styles.buttonlatente}>
                                <Text style={styles.textperiodoFase}>Fase Latente</Text>
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
                        <TouchableOpacity onPress={() => props.navigation.navigate('')}>
                            <View style={styles.buttonlatente}>
                                <Text style={styles.textperiodoFase}>Fase Ativa</Text>
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
                    <Text style={styles.tagtext}>2º Período do Trabalho de Parto</Text>
                </>
                <View style={styles.ajust}>
                    <View style={styles.ajuste}>
                        <TouchableOpacity onPress={reproduzir}>
                            <View style={styles.containerIcon}>
                                <MaterialIcons name="play-circle" style={styles.icon} />
                                <Text style={styles.textButton}>Áudio</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('')}>
                            <View style={styles.buttonlatente}>
                                <Text style={styles.textperiodoFase}>Fase Passiva</Text>
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
                        <TouchableOpacity onPress={() => props.navigation.navigate('')}>
                            <View style={styles.buttonlatente}>
                                <Text style={styles.textperiodoFase}>Fase Ativa</Text>
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
                    <Text style={styles.tagtext}>3º Período do Trabalho de Parto</Text>
                </>
                <View style={styles.ajust}>
                    <View style={styles.ajuste}>
                        <TouchableOpacity onPress={reproduzir}>
                            <View style={styles.containerIcon}>
                                <MaterialIcons name="play-circle" style={styles.icon} />
                                <Text style={styles.textButton}>Áudio</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('')}>
                            <View style={styles.buttonlatente}>
                                <Text style={styles.textperiodoFase}>DESPRENDIMENTO E saída da placenta</Text>
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
    tagtext: {
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
    },
    textperiodoFase: {
        textAlign: 'center',
        color: 'white',
        paddingHorizontal: 40

    },
    ajust: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    ajuste: {
        marginLeft: 10,
        marginVertical: 40

    },
    containerIcon1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 80
    },
});
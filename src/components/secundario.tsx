import * as React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useUsuarioContext } from '../providers/usuario-provider';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

export interface AppsecundarioProps {
    showName?: boolean;
}

export function AppSecundario(props: AppsecundarioProps) {

    const { usuario } = useUsuarioContext();

    const navigation = useNavigation();
    // =========================================================================
    return (
        <View style={styles.container}>
            <Image source={{ uri: usuario.imagem }} style={styles.imagem} />
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.button}>
                    <MaterialIcons name="arrow-back-ios" style={styles.icon} />
                    <Text style={styles.textButton}>Voltar</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
// =========================================================================
const styles = StyleSheet.create({
    container: {
        padding: 50,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imagem: {
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 50
    },
    textButton: {
        fontSize: 18,
        color: 'rgba(247, 99, 110, 1)',
        fontWeight: 'bold',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 20,
        color: 'rgba(247, 99, 110, 1)',
        fontWeight: 'bold',
    },
});

AppSecundario.defaultProps = {
    showName: true
}
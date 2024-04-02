import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useUsuarioContext } from '../providers/usuario-provider';

export interface AppHeaderProps {
    showName?: boolean;
}

export function AppHeader (props: AppHeaderProps) {

    const { usuario } = useUsuarioContext();
    // ====================================
    return (
      <View style={styles.container}>
            <Image source={{uri: usuario.imagem }} style={styles.imagem} />
            <Text style={styles.nome}>{ usuario.nome }</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        width: 50,
        height: 50,
        borderRadius: 50
    }, 
    nome: {
        color: '#f7636e',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 20
    }
});


AppHeader.defaultProps = {
    showName: true 
}
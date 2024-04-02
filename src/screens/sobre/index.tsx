import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import bg from './../../imgs/background.png';
import profile from './../../imgs/profile.png';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppHeader } from '../../components/header';


export interface SobrescreenProps {
    navigation: any;
}

export function SobreScreen(props: SobrescreenProps) {
    return (
        <ImageBackground source={bg} style={styles.background}>
            <AppHeader />
            <View style={{flex: 1}}>

            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        paddingTop: 80,
    },
    foto: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },

});
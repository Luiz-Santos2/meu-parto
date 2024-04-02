import React, { useRef, useState } from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, Image, Alert, TouchableOpacity } from 'react-native';
import bg from './../../imgs/background.png';
import profile from './../../imgs/profile.png';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from "formik";
import * as Yup from 'yup';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { Input } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface InicioscreenProps {
    navigation: any;
}

export function InicioScreen(props: InicioscreenProps) {

    const modal = useRef<Modalize>();

    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    const [imagem, setImagem] = useState< null | string >(null)

    const abrir = () => {
        try {
            modal.current?.open();
        } catch (erro) {
            console.log(erro)
        }
    }
    const abrirCamera = async () => {
        // Avalia se tem permissão
        if (!status?.granted) {
            // Solicita permissão
            const resposta = await requestPermission();
            if (!resposta.granted) {
                return; // Permissão não foi dada
            }
        }
        const foto = await ImagePicker.launchCameraAsync({
            base64: true,
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1],
            allowsMultipleSelection: false,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (!foto.canceled)
            setImagem('data:image/jpg;base64,' + foto.assets[0].base64)
    }
    modal.current?.close();

    const abrirGaleria = async () => {
        // Avalia se tem permissão
        if (!status?.granted) {
            // Solicita permissão
            const resposta = await requestPermission();
            if (!resposta.granted) {
                return; // Permissão não foi dada
            }
        }
        const foto = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1],
            allowsMultipleSelection: false,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (!foto.canceled)
            setImagem('data:image/jpg;base64,' + foto.assets[0].base64)
    }
    modal.current?.close();

    const saveData = async (values: { nome: string; imagem: string; }) => {
        try {
            // Salvando os dados no AsyncStorage
            const imageData = {
                nome: values.nome, // Adicionando o nome ao objeto
                imagem: imagem, // Adicionando a imagem ao objeto
            };
            await AsyncStorage.setItem('dados', JSON.stringify(imageData));
            console.log('Dados salvos com sucesso!');
            console.log(imageData)
        } catch (error) {
            console.log('Erro ao salvar dados:', error);
        }
    };

    return (
        <ImageBackground source={bg} style={styles.background}>
            <GestureHandlerRootView style={styles.container}>
                <View style={styles.image}>
                    <Text style={styles.textFoto}>INSIRA SUA FOTO</Text>

                    <View style={styles.buttonFoto}>
                        <TouchableOpacity onPress={abrir}>
                            {imagem ? (
                                <Image source={{ uri: imagem }} style={styles.foto} />
                            ) : (
                                <Image source={profile} style={styles.foto} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <Formik
                    initialValues={{ nome: '', imagem: '' }}
                    onSubmit={(values) => saveData(values)}
                    validationSchema={Yup.object({
                        nome: Yup.string().required('O campo nome precisa ser informado'),
                        imagem: Yup.string()
                    })}
                >
                    {({ handleChange, errors, touched, handleBlur, isSubmitting, handleSubmit, values }) => (
                        <View style={styles.TextInput}>
                            <Input leftIcon={{ name: 'person', color: 'rgba(247, 99, 110, 1)' }} placeholder='DIGITE SEU NOME'
                                onChangeText={handleChange('nome')} onBlur={handleBlur('nome')}
                                value={values.nome} style={styles.input} />
                            {touched.nome && errors.nome && <Text style={styles.erro}>{errors.nome}</Text>}
                            <TouchableOpacity onPress={() => handleSubmit()} disabled={isSubmitting}>
                                <View style={styles.buttonInput}>
                                    <Text style={styles.textButton}>Pular</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                <Modalize
                    ref={modal}
                    adjustToContentHeight
                    childrenStyle={{ height: 180 }}
                >
                    <View style={styles.modal}>
                        <View style={styles.buttonModal}>
                            <Button title='Câmera' onPress={abrirCamera} />
                            <Button title='Galeria' onPress={abrirGaleria} />
                        </View>
                        <Button title="Cancelar" color="tomato" onPress={() => {
                            Alert.alert('Cancelar', 'Deseja realmente cancelar?', [
                                { text: 'Sim', onPress: () => modal.current?.close() },
                                { text: 'Não' }
                            ])
                        }} />
                    </View>
                </Modalize>
            </GestureHandlerRootView>
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
    buttonFoto: {
        alignItems: 'center',
        padding: 10,
    },
    btnFoto: {
        padding: 7,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        textAlign: 'center',
        borderRadius: 9,
        color: 'white'
    },
    input: {
        color: 'gray',
        textAlign: 'center',
    },
    buttonModal: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',

    },
    textButton: {
        padding: 10,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        textAlign: 'center',
        borderRadius: 9,
        color: 'white'
    },
    erro: {
        color: 'red',
        textAlign: 'center',
    },
    modal: {
        justifyContent: 'center',
        margin: 60,
    },
    textFoto: {
        color: 'gray',
        textAlign: 'center',
    },
    TextInput: {
        padding: 10,
    },
    buttonInput: {
        marginHorizontal: 37,
        margin: 10,
        paddingTop: 150
    },
    image: {
        padding: 40,
        borderRadius: 9,
    },
})
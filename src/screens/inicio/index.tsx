import React, { useEffect, useRef, useState } from 'react';
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
import { avatarBase64 } from '../../imgs/profile';
import { useUsuarioContext } from '../../providers/usuario-provider';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export interface InicioscreenProps {
    navigation: any;
};

export function InicioScreen(props: InicioscreenProps) {

    const modal = useRef<Modalize>();
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [imagem, setImagem] = useState<null | string>(null)
    const { setUsuario } = useUsuarioContext();
    const [texto, setTexto] = useState('');

    const buscarDados = async () => {
        const todosOsDados = await getDoc(doc(db, 'forms', '14')).then(snap => snap.data()) as any;
        setTexto(todosOsDados.texto)
    };

    useEffect(() => {
        (async () => {
            await buscarDados();
        })()

    }, []);
    // ====================================================================================
    const abrir = () => {
        try {
            modal.current?.open();
        } catch (erro) {
            console.log(erro);
        }
    };
    // ------------------------------------------------------------------------------------
    const abrirCamera = async () => {
        // Avalia se tem permissão
        if (!status?.granted) {
            // Solicita permissão
            const resposta = await requestPermission();
            if (!resposta.granted) {
                return; // Permissão não foi dada
            };
        };
        const foto = await ImagePicker.launchCameraAsync({
            base64: true,
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1],
            allowsMultipleSelection: false,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (!foto.canceled)
            setImagem('data:image/jpg;base64,' + foto.assets[0].base64);
        modal.current?.close();
    };
    // ------------------------------------------------------------------------------------
    const abrirGaleria = async () => {
        // Avalia se tem permissão
        if (!status?.granted) {
            // Solicita permissão
            const resposta = await requestPermission();
            if (!resposta.granted) {
                return; // Permissão não foi dada
            };
        };
        const foto = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1],
            allowsMultipleSelection: false,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (!foto.canceled)
            setImagem('data:image/jpg;base64,' + foto.assets[0].base64);
        modal.current?.close();
    };
    // ------------------------------------------------------------------------------------
    const saveData = async ({ nome }: { nome: string; }) => {
        try {
            // Salvando os dados no AsyncStorage
            const imageData = {
                nome, // Adicionando o nome ao objeto
                imagem: (imagem ? imagem : avatarBase64), // Adicionando a imagem ao objeto
            };
            await AsyncStorage.setItem('dados', JSON.stringify(imageData));
            setUsuario(imageData);
            props.navigation.navigate('sobre');
        } catch (error) {
            console.log('Erro ao salvar dados:', error);
        };
    };
    // ====================================================================================
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
                    initialValues={{ nome: '' }}
                    onSubmit={(values) => saveData(values)}
                    validationSchema={Yup.object({
                        nome: Yup.string(),
                    })}
                >
                    {({ handleChange, errors, touched, handleBlur, isSubmitting, handleSubmit, values }) => (
                        <View style={styles.TextInput}>
                            <Input leftIcon={{ name: 'person', color: 'rgba(247, 99, 110, 1)' }} placeholder='DIGITE SEU NOME'
                                onChangeText={handleChange('nome')} onBlur={handleBlur('nome')}
                                inputContainerStyle={{ borderBottomColor: 'rgba(247, 99, 110, 1)' }}
                                value={values.nome} style={styles.input} />
                            {touched.nome && errors.nome && <Text style={styles.erro}>{errors.nome}</Text>}
                            <TouchableOpacity onPress={() => handleSubmit()} disabled={isSubmitting}>
                                <View style={styles.buttonInput}>
                                    <Text style={styles.textButton}>Pular</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.text}>{texto}</Text>
                        </View>
                    )}
                </Formik>
                <Modalize
                    ref={modal}
                    adjustToContentHeight
                    childrenStyle={{ height: 200 }}
                >
                    <View style={styles.buttonModal}>
                        <TouchableOpacity onPress={abrirCamera}>
                            <View style={styles.button}>
                                <Text style={styles.textButtonModal}>  Tirar foto  </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={abrirGaleria}>
                            <View style={styles.button}>
                                <Text style={styles.textButtonModal}>Escolher foto</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cancel}>
                        <Button title="Cancelar" color="rgba(247, 99, 110, 1)" onPress={() => {
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
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
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
        padding: 20,
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
        textAlign: 'center',
        color: 'white'
    },
    erro: {
        color: 'red',
        textAlign: 'center',
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
        marginTop: 150,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        borderRadius: 9,

    },
    image: {
        padding: 40,
        borderRadius: 9,
    },
    button: {
        backgroundColor: 'rgba(247, 99, 110, 1)',
        padding: 20,
        marginTop: 30,
        marginLeft: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    textButtonModal: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    cancel: {
        alignItems: 'center',
        paddingTop: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    text: {
        color: '#5F5F5F',
        textAlign: 'center',
        paddingTop: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
});
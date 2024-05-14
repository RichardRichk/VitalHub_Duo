import { Camera, CameraType } from 'expo-camera'
import { Container } from '../Container/Style'
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import { FontAwesome, FontAwesome6, AntDesign } from '@expo/vector-icons';
import { ButtonReturnCamera, LastPhoto, ReturnCamera } from './Style'


export const CameraComp = ({navigation, visible, setShowCamera, setUriCameraCapture, getMediaLibrary = false, ...rest }) => {

    const cameraRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.front);
    const [lastPhoto, setLastPhoto] = useState(null);
    const [albums, setAlbums] = useState(null);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();

            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
        })();
    }, [])

    useEffect(() => {
        setPhoto(null)

        if (getMediaLibrary) {
            GetLastPhoto();
        }
    }, [visible])

    async function SelectImageGallery() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);

            setOpenModal(true)
        }
    }

    async function fecharCamera() {
        try {
            setShowCamera(false); 
        } catch (error) {
            console.error('Erro ao fechar camera', error);
        }
    }

    async function CapturePhoto() {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
            await setPhoto(photo.uri)

            setOpenModal(true)
        }
    }

    async function SendFormPhoto() {
        await setUriCameraCapture(photo)

        setShowCamera(false)
    }

    async function ClearPhoto() {
        setPhoto(null)

        setOpenModal(false)
        setShowCamera(false)
    }
    

    async function GetLastPhoto() {
        const {assets} = await MediaLibrary.getAssetsAsync({ sortBy: [[MediaLibrary.SortBy.creationTime, false]], first: 1 })
        console.log('assets')
        console.log(assets);

        if (assets.length > 0) {
            const infoAssets = await MediaLibrary.getAssetInfoAsync(assets[0].id)
            console.log('infoAssets')
            console.log(infoAssets)
            setLastPhoto(infoAssets.localUri)
            
        //     setLastPhoto(assets[0].uri)
            //Nova atualizacao
            //const infoAssets = await MediaLibrary.getAssetInfoAsync(assets[0].id)
            //setLastPhoto(infoAssets.localUri)
            // setLastPhoto(assets[0].uri)

            
        }

    }

    async function SavePhoto() {
        if (photo) {
            await MediaLibrary.createAssetAsync(photo)
                .then(() => {
                    Alert.alert('Sucesso')
                }).catch(error => {
                    alert("Erro")
                })
        }

        setOpenModal(false)
        setShowCamera(false)

    }


    return (


        <Modal
            visible={visible}
        >
            <Container>

                {console.log("teste lastfoto", lastPhoto)}

                <Camera
                    ref={cameraRef}

                    type={tipoCamera}
                    style={styles.camera}
                    ratio={'16:9'}
                    autoFocus={Camera.Constants.AutoFocus.on}
                />

                <ButtonReturnCamera
                    onPress={fecharCamera}
                >
                    <ReturnCamera
                        source={require('../../assets/Images/Icon_Back.png')}
                    />
                </ButtonReturnCamera>

                <View style={styles.viewFlip}>


                    <TouchableOpacity style={styles.btnGallery} onPress={SelectImageGallery}>
                        {
                            lastPhoto != null ? (
                                <LastPhoto
                                    source={{ uri: lastPhoto }}
                                />
                            ) : (
                                <AntDesign name="picture" size={30} color={'#fff'} />
                            )
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnTake} onPress={() => CapturePhoto()}>
                        <FontAwesome name="camera" size={30} color={'#fff'} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnFlip} onPress={() => setTipoCamera(tipoCamera == CameraType.front ? CameraType.back : CameraType.front)}>
                        <FontAwesome6 name="camera-rotate" size={30} color={'#fff'} />
                    </TouchableOpacity>

                </View>

                <Modal animationType='slide' transparent={false} visible={openModal}>

                    <View style={styles.viewModal}>

                        <Image style={styles.imgModal} source={{ uri: photo }} />

                    </View>

                    <View style={styles.viewBtnModal}>

                        <TouchableOpacity style={styles.btnCancel} onPress={() => ClearPhoto()}>
                            <FontAwesome name="trash" size={23} color={'#ff0000'} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnUpload} onPress={() => { SavePhoto(); SendFormPhoto(); setOpenModal(false) }}>
                            <FontAwesome name="save" size={23} color={'#121212'} />
                        </TouchableOpacity>

                    </View>

                </Modal>
            </Container>
        </Modal>
    )
    
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        height: "80%",
        width: "100%",
    },
    viewFlip: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    viewModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    btnFlip: {
        margin: 20,
        padding: 20,
        borderRadius: 15,
        backgroundColor: "#121212",

        alignItems: 'center',

        justifyContent: 'center',
    },
    btnTake: {
        margin: 20,
        padding: 20,
        borderRadius: 15,
        backgroundColor: "#121212",

        alignItems: 'center',

        justifyContent: 'center',
    },
    btnGallery: {
        // margin: 20,
        padding: 22,
        borderRadius: 15,
        // backgroundColor: "#121212",

        alignItems: 'center',

        justifyContent: 'center'
    },
    btnCancel: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: "transparent",

        alignItems: 'center',

        justifyContent: 'center'
    },
    btnUpload: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: "transparent",

        alignItems: 'center',

        justifyContent: 'center'
    },
    imgModal: {
        width: '100%',
        height: 500,
        borderRadius: 10,
    },
    viewBtnModal: {
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'center'
    },
})
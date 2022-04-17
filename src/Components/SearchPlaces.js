import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Modal} from 'react-native'
import {autoComplete} from '../routes/autoComplete'

import InpTxtValue from './InpTxtValue';
import ItemView from './ItemView';
import { Ionicons } from '@expo/vector-icons';


export default function ({info = 'Digite e selecione o bairro', onSelected, onClose, isVisible}){

    const [state, setState] = useState([])
    



    


    return (

        <Modal transparent={false} visible={isVisible} onRequestClose={onClose} animationType='slide' >
            <View style={styles.container} >

                <View style={styles.header} >
                    <TouchableOpacity style={styles.close} onPress={onClose} >
                        <Ionicons name='close-outline' size={48} color='white' />
                    </TouchableOpacity>

                    {
                        info != ''? <Text style={styles.info} >{info}</Text>:null
                    }

                </View>
                <InpTxtValue info='Bairro' onChangeText={(texto) => { 
                        autoComplete(texto)
                        .then((data) => setState(data.predictions.map((prediction) => {
                            return prediction.description
                        })))
                        .catch((error) => console.log(error))
                        .finally(() => console.log('terminou'))
                                        
                }} />
                <FlatList 
                
                keyExtractor={() => Math.random().toString()}
                data={state}
                renderItem={({item}) => <ItemView text={item} onClick={onSelected}/> }

                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#101C1F'
    },
    header:{
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },  
    info:{
        fontSize: 20,
        color: 'white',
        paddingHorizontal: 10,
    }
})
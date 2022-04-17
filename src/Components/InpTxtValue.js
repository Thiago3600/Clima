import React, { useState, Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native'


export default ({info, onChangeText, style = null, flex = 0, value = null}) => {

    const estilo = [styles.container]

    if(style){
        estilo.push(style)
    }

    const [valueText, setValueText] = useState([{
        texto: null
    }])

    const placeholder = "Digite qual ".concat(info || '')

    const handleChangeText = (text) => setValueText((prevSte) => ({...prevSte, texto: text}))

    // setState(prevState => ({...prevState, [name]: value}));

    return (
        <View style={estilo} >
            <Text style={styles.info} >{info}</Text>
            <View style={styles.line} >
                <TextInput 
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    valueText={value || valueText.texto}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        maxWidth: '100%',
        alignItems: 'center',
        marginVertical: '3%',
        marginHorizontal: '1%',
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 2,
        paddingHorizontal: 5,
        borderColor: '#0DADFF'
    },
    info:{
        color:'#0DADFF'
    },
    line: {
        flex: 0,
        flexDirection: 'row',
        
        minWidth: '100%',
    },
    input: {
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#EEE',
        borderRadius: 10,
        color: '#000',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 3,
    }
})
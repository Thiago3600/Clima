import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'


export default function ({text = '', onClick, onClose}) {




    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onClick(text)} >
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width - 60,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#17272B',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: '#0DADFF'

    },
    text:{
        fontSize: 18,
        padding: 10,
        color: 'white',
    }
})
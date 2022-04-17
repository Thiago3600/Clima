import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native'
import IconWeather from './IconWeather'


export default function ({type = null, info = '', style = null, reversed = false, sizeIcon = 'small'}){

    const estilo = [{flex: 0, flexDirection: 'row',}]

    style?estilo.push(style):estilo.push(styles.container)
    

    //console.log(type, "Type")

    return (
        <View style={estilo}>
          <IconWeather reversed={reversed} sizeIcon={sizeIcon} condSlug={type} />
          <Text style={styles.fonte}>{info}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    fonte:{
        marginHorizontal: 5,
    }
  });
import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';


export default function ({currently = 'dia'}){

    
    const dia = require("../../assets/background/skyDayClear.jpg")
    const noite = require("../../assets/background/noite.jpg")
    let image = dia

    if(currently === 'noite')image = noite


    return(
        <>
        <ImageBackground source={image} resizeMode="cover" 
                        style={{
                                flex: 1, 
                                width: '100%', 
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <LinearGradient
                                        // Background Linear Gradient
                                        colors={['transparent','rgba(255,255,255,0.9)', 'rgba(255,255,255,1)']}
                                        style={styles.background}
                                    />
                        <Text style={styles.h1}>Clima</Text>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: "center"
      },
      h1:{
        fontSize: 48,
        alignItems: 'center',
        paddingVertical: 100,
      },

      background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
      },  
    })
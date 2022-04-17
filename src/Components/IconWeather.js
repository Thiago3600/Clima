import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import LottieView from 'lottie-react-native'
import LottieAnim from './LottieAnim'


export default function ({conditionId = null, currently = 'dia', condSlug = null, sizeIcon = null, reversed = false}){

    const size = [styles.lottieIcon]


    if(sizeIcon === 'small')size.push(styles.small)
    if(sizeIcon === 'medium')size.push(styles.medium)
    if(sizeIcon === 'large')size.push(styles.large)




    
    const getIconWeather = (id, day) => {
        switch (id) {
            case 'storm':
                if(day === 'dia'){
                    return require('../../assets/lottie/weather/4792-weather-stormshowersday.json')
                }else{
                    return require('../../assets/lottie/weather/4803-weather-storm.json')
                }
            case 'snow':
            case 'hail':
                if(day === 'dia'){
                    return require('../../assets/lottie/weather/4802-weather-snow-sunny.json')
                }else{
                    return require('../../assets/lottie/weather/4798-weather-snownight.json')
                }
            case 'rain':
                if(day === 'dia'){
                    return require('../../assets/lottie/weather/4801-weather-partly-shower.json')
                }else{
                    return require('../../assets/lottie/weather/4797-weather-rainynight.json')
                }
            case 'fog':
                if(day === 'dia'){
                    return require('../../assets/lottie/weather/4791-foggy.json')
                }else{
                    return require('../../assets/lottie/weather/4795-weather-mist.json')
                }
            case 'cloud':
                return require('../../assets/lottie/weather/4806-weather-windy.json')
            case 'cloudly_night':
                return require('../../assets/lottie/weather/4796-weather-cloudynight.json')
            case 'cloudly_day':
                return require('../../assets/lottie/weather/4800-weather-partly-cloudy.json')
            case 'clear_day':
                return require('../../assets/lottie/weather/4804-weather-sunny.json')
            case 'clear_night':
               return require('../../assets/lottie/weather/4799-weather-night.json')                
            case 'VEL_VENTO':
                return require('../../assets/lottie/weather/67359-windblow.json')
            case 'UMIDADE':
                return require('../../assets/lottie/weather/74931-humidly.json')
            case 'NASCER_SOL':
                return require('../../assets/lottie/cicleDay/76711-sunrise-horizont.json')
            case 'POR_SOL':
                return require('../../assets/lottie/cicleDay/76712-sunset-horizont.json')
            default:
                return require('../../assets/lottie/util/9619-loading-dots-in-yellow.json')
        }
     }




    

    return (
        <View style={[styles.container, size]}>
            <LottieAnim 
                start={true}
                styles={[styles.container, size]}
                reversed={reversed}
                src={getIconWeather(condSlug, currently)}
            />                          
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 0,
    },
    lottieIcon: {
      flex: 0,
      
  },
    spaceIcon:{
      marginHorizontal: 5,
      padding: 30
    },
    small: {
      width: 30,
      height: 30,
    },
    medium: {
      width: 120,
      height: 120,
    },
    large: {
      width: '100%',
      height: '100%',
    },
    logo: {
      width: '100%',
      height: '100%',
      
    },
  });
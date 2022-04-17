import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import IconWeather from './IconWeather';

const width = Dimensions.get('window').width * 0.8

export default function ({data = {
    condition: "rain",
    date: "02/10",
    description: "Chuvas esparsas",
    max: 25,
    min: 17,
    weekday: "Sáb",
}}) {

    // console.log(" Dentro de prevWeekday ",data)


    // console.log(Dimensions.get('window').width)

    return(
        <View style={styles.container}>
            <View style={styles.containerRowWeekday}>
                <Text style={styles.textTitle} >{`${data.date}  ${data.weekday}`}</Text>
            </View>
            <View style={styles.containerRow}>
                <View style={styles.containerColumn}>
                    <Text style={styles.textTemp}>{`Max: ${data.max}º`}</Text>
                    <Text style={styles.textTemp}>{`Min: ${data.min}º`}</Text>
                </View>
                <View style={styles.containerColumn}>
                    <IconWeather sizeIcon='medium' condSlug={data.condition} />
                    <Text>{`${data.description}`}</Text>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    container:{
        flex: 0,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        width: width - 40,
        // width: Dimensions.get('screen').width -30,
        // height: 200,
        marginVertical: 30,
        marginHorizontal: 20,

        // borderWidth: 1,
        
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        
        elevation: 9,
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    containerRowWeekday: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerColumn:{
        alignSelf: 'center',
    },
    textTitle:{
        fontSize: 18,
    },
    textTemp:{
        fontSize: 20,
    }
})

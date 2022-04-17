import React , { useState, useEffect }from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import {saveObjData, getWeather} from '../data/data'
import {getData} from '../routes/rotas'
import {getByGeocoding} from '../routes/geocoding'
import IconWithInfo from '../Components/IconWithInfo';
import SearchPlaces from '../Components/SearchPlaces';
import LottieAnim from '../Components/LottieAnim';
import PrevWeekday from '../Components/PrevWeekday'
import BackgroundHeader from '../Components/BackgroundHeader';



import moment from 'moment'
import 'moment/locale/pt-br'



const width = Dimensions.get('window').width * 0.8

export default function ViewHome(){

    


    const weather = 'weather'
    const condition_slug = 'CONDICAO_SLUG'
    const humidity = 'UMIDADE'    
    const wind_speedy = 'VEL_VENTO'    
    const description = 'DESCRICAO'
    const currently = 'DIA_NOITE'
    const sunrise = 'NASCER_SOL'
    const sunset = 'POR_SOL'

    const [location, setLocation] = useState({});
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM, hh:mm a')
    const [errorMsg, setErrorMsg] = useState(null);
    const [visible, setVisible] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const [data, setData] = useState({
        lockGet: false,
        ready: false
    });
    
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            // requestLocationPermission()
            setErrorMsg('not found');
            return;
          }          
        })();

        if(temperature == '?'){
            getLocation().then(() => setAtualClima(location))
            
            //console.log(location)
        }

        setAtualClima(location)
        console.log(data)

      }, [isRefresh, location, data]);


    const setAtualClima = (location = {}) => {
        if(location.hasOwnProperty('lat') && location.hasOwnProperty('lon') ){
                if(!data.lockGet){
                    getData(location.lat, location.lon)
                            .then((data) => {
                                
                                setData({ ...data, lockGet: true, ready: true });
                                return data
                            })
                          .then((data) => saveObjData(data, weather))
                          .then(() => {
                                setIsLocating(false)
                                setIsRefresh(false)
                            })
                          .catch((error) => console.log(error.message))
                        }else{
                    console.log('Não foi possivel atualizar')
                }
            
        }
    }

    

    const getProps = (props) => data.hasOwnProperty('CIDADE') ? data[`${props}`] : null;
 

    const getLocation = async () => {
        return await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Lowest}).then(({coords}) =>{ 
            setLocation({lat: coords.latitude, lon: coords.longitude})
            return {
                lat:  coords.latitude, lon: coords.longitude
            }
        }).catch((error) => console.warn(error))
    }
   
    
      
      let local = '...';
      let temperature = '...';
      if (errorMsg) {
        local = errorMsg;
      } else if (location) {

        if(!getWeather('weather')){
            setAtualClima(location)
        }


        if(data.hasOwnProperty('CIDADE')){
            local = data.CIDADE
            temperature = data.TEMP
        }else{
            local = 'Localizando'
            temperature = '?'
        }
      }

    

    const insertLocation = (lat, lon) => setLocation({lat: lat, lon: lon})
    const getlocationByAddress = (adress) => {
        getByGeocoding(adress)
                .then((data) => insertLocation(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng ))
                .then(() => setIsRefresh(true))
                .then(() => setVisible(false))
                .finally(() => setData((prevData) => ({...prevData, lockGet: false, ready: true })))
    }
    


    return(
        <View style={styles.mainContainer}>
            <ScrollView
                contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
                <View style={styles.scrollViewContainer}>
                {/* {position: 'absolute', right: 10, top: 10, zindex: 1} */}
                <View style={{  flex: 0,
                                position: 'absolute',
                                right: 10,
                                top: 10,
                                zIndex: 100,
                                }}> 
                    <TouchableOpacity style={{
                        padding: 5,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        borderRadius: 10,
                    }}  onPress={() => setVisible(true)} >
                        <Ionicons name='add-outline' size={36} color='black' />
                    </TouchableOpacity>
                </View>


                    <SearchPlaces isVisible={visible} onClose={() => setVisible(false)  } onSelected={(txt) => getlocationByAddress(txt) }/>
                
                    <View style={styles.container}>
                        <BackgroundHeader currently={getProps(currently)} />                        
                        <View style={styles.box} >
                            
                            
                            <View style={styles.containerLocation}>
                                <LottieAnim 
                                    start={isLocating}
                                    onPress={() => { 
                                        setIsLocating(true)
                                        getLocation().then(() => {
                                            setData((prevData) => ({...prevData, lockGet: false, ready: true }))
                                        })
                                        }
                                    }
                                    styles={[styles.refresh]}  
                                    src={require('../../assets/lottie/util/71363-location-pin.json')}
                                />
                            
                                <View style={styles.locationIcon} >
                                    <View style={styles.location}>
                                        <Text style={styles.location}>{local}</Text>
                                    </View>
                                    <Text >{today}</Text>
                                </View>

                                <LottieAnim 
                                    start={isRefresh}
                                    onPress={() => { 
                                        setIsRefresh(true)
                                        // getLocation().then(() => {
                                            setData((prevData) => ({...prevData, lockGet: false, ready: true }))
                                        // })
                                    }}
                                    styles={[styles.refresh]}  
                                    src={require('../../assets/lottie/util/lf30_editor_rxovcrqs.json')}
                                />
                            </View>

                            <View style={styles.temperature} >
                                <Text style={styles.textTemp}>{temperature} Cº</Text>
                                <View style={styles.image}>
                                    <IconWithInfo sizeIcon='medium' currently={getProps(currently)} type={getProps(condition_slug)} />
                                    <Text>{getProps(description)}</Text>
                                </View>
                            </View>
                            <View style={styles.aditionalInfo} >
                                <IconWithInfo type={wind_speedy} info={getProps(wind_speedy)} />
                            </View>
                        </View>

                        <FlatList 

                            keyExtractor={() => Math.random().toString()}
                            snapToAlignment={'normal'}
                            snapToOffsets={[...Array(10)].map((elem, index) => {
                                return index * (width - 40) + (index - 1) * 40
                            })}
                            scrollEventThrottle={16}
                            decelerationRate="fast"
                            data={JSON.parse(getProps('SEMANA'))}
                            horizontal={true}
                            renderItem={({item}) => <PrevWeekday data={item} /> }
                        />

                    <View style={styles.box} >
                        <IconWithInfo type={humidity} info={`Umidade a ${getProps(humidity)} %`} style={styles.iconList} />
                        <IconWithInfo type={sunrise} info={`Nascer do sol as ${getProps(sunrise)}`} style={styles.iconList} />
                        <IconWithInfo type={sunset} reversed={true} info={`Por do sol as ${getProps(sunset)}`} style={styles.iconList} />
                    </View>


                    </View>



                </View>
            </ScrollView>
        </View> 

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
    },
    containerLocation: {
        flex: 1, 

        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    locationIcon:{
        flexDirection: 'column', 

        alignItems: 'flex-start', 
        justifyContent: 'space-around', 
        margin: 15
    },
    iconList:{
        flex: 0,
        width:'90%', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    refresh: {
        flex: 0,
        position: 'relative',
        
        width: 60,
        height: 60,
    },
    aditionalInfo:{
        flex: 0,
        width: '100%',
        paddingVertical: 10, 
    },
    textTemp:{
        fontSize: 45,
        margin: 15,
    },
    imageBackground: {
      flex: 1,
      justifyContent: "center"
    },
    temperature: {
        flex: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    box:{
        flex: 0,
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width - 30,
        marginVertical: 0,
        
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        
        elevation: 9,
    },
    image:{
        width: 120,
        height: 120,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
      },  
    h1:{
        fontSize: 48,
        alignItems: 'center',
        paddingVertical: 100,
    },
    location: {
        fontSize: 24,
        flexDirection: 'row', 
        alignItems: 'center',
    },
    scrollView : {
        height : Dimensions.get('window').height, 
    }, 
    mainContainer : {
        flex : 1 
    }, 
    scrollViewContainer : { 

    }
})
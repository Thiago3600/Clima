import {getWeather} from '../data/data'
import Toast from 'react-native-simple-toast';



export const getData = async (lat = 0, lon = 0) => {

    const URL = `http://tnsoft.ddns.net:39999/weather/lat=${lat}&lon=${lon}`

    //console.log(URL)


    try {
      const result = await fetch(URL).then((response) => {
         // console.log(response)
          if(response.status == 200){
              console.log("Servidor online\n")
              return response.text()
          }else{
          //return undefined
          throw new Error("Something is wrong")
          }
      }).then((responseText) => {
        //console.log(responseText)
        return responseText;
      }).catch((error) =>{
          console.log("erro aqui")


          Toast.show('Servidor indisponivel', Toast.LONG);

          return getWeather('weather').then(response => JSON.stringify(response))
          //console.error(error.message)
      }).then(response => response)

      //console.log(JSON.parse(result))

      return JSON.parse(result)
      } catch (error) {
          console.error(error.message)
      }
  }
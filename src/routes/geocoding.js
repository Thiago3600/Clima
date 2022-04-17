import {keyApiGoogle} from '../data/config'

const key = keyApiGoogle

const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='

const components = 'components=country:BR'



export const getByGeocoding = async (string = 'Jose Mariano') => {


        const address = url.concat(string.replace(' ', '+'),'&',components,'&','key=',key)
        //const address = 'Jose+Mariano&components=country:BR&key=AIzaSyDakaCo0XGpfUMqo_y-fnlXcyDqXwLt5lM'

        //console.log(address)
        try {
          const result = await fetch(address).then((response) => {
              console.log(`response, ${response}`)
              if(response.status == 200){
                  return response.text()
              }else{
              //return undefined
              throw new Error("Something is wrong")
              }
           }).then((responseText) => {
              return responseText
          }).catch((error) =>{
              console.error(error.message)
          })
    
          return JSON.parse(result)
          } catch (error) {
              console.error(error.message)
          }
    
  }
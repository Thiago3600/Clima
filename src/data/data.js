import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveObjData = async (obj = {}, name = 'temp') => {
    try {
      const jsonValue = JSON.stringify(obj)
      await AsyncStorage.setItem(`@${name}`, jsonValue)
      return true
    } catch (e) {
      // saving error
      console.log(e);
      return false;
    }
  }


  
export const getWeather = async (name = 'temp') => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${name}`)
      return jsonValue != null ? JSON.parse(jsonValue) : false;
    } catch(e) {
      // error reading value
      console.log(e);
      return false;
    }
  }
  




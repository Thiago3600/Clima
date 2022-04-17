import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import LottieView from 'lottie-react-native'


export default function ({start = false, onPress, styles = {flex: 0, width: '100%'}, src, reversed = false}) {
    

  //console.log('start', start)
  let direction = 1
  if(reversed === true)direction = -1

    useEffect(() => {
      if(start){
        animation.current.play();
      }else{
        animation.current.reset();
      }
      }, [animation, start]);

      //require('../../assets/lottie/util/71363-location-pin.json')


  const animation = React.useRef(null)

    return(
        <View style={styles.container}>
          <TouchableOpacity style={styles}   onPress={onPress} >
                                    <LottieView
                                            ref={animation}  
                                            autoplay={start}
                                            loop={start}
                                            speed={direction}
                                            progress={0.1}                                            
                                            source={src}  />
                            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
   
    }
})
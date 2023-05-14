import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from "../../constants/Colors";
import Lottie from "lottie-react-native";
import loadingAnim from "../../../assets/animations/Lottie Lego.json";

const Initializing = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

          <Lottie
              style={{height: 300, width: 300, alignSelf: 'center', marginTop: 5}}
              source={loadingAnim}
              autoPlay
              loop
          />
            <Text style={styles.text}>
                Please wait while we set your account up !
            </Text>
        </View>
    )
}

export default Initializing

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',

    },
    icon: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    text: {
        marginTop: 22,
        textAlign: "center",
        marginHorizontal: 40,
        fontSize: 20
    },
})

import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {logoSrc} from '../constant';
import Gap from '../components/Gap';

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('OnBoardingScreen');
  }, 3000)
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        <Gap height={10} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
});

export default SplashScreen;

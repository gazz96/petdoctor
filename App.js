/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';


// library
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Screens
import SettingScreen from './screens/SettingScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';

// Constant
import { Colors, logoSrc } from './constant';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShopScreen from './screens/ShopScreen';
import AddPropertyScreen from './screens/AddPropertyScreen';
import SearchScreen from './screens/SearchScreen';
import DetailArticleScreen from './screens/DetailArticleScreen';
import SecurityScreen from './screens/SecurityScreen';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import MyPropertiScreen from './screens/MyPropertiScreen';
import DoctorDetailScreen from './screens/DoctorDetailScreen';
import PropertyGalleryScreen from './screens/PropertyGalleryScreen';
import MyOrderScreen from './screens/MyOrderScreen';
import KotaScreen from './screens/KotaScreen';

import { SessionAction, AuthAction } from './actions';
import { Loading } from './components';
import { UserContext } from './context';
import MyIncomeScreen from './screens/MyIncomeScreen';
import TimelineScreen from './screens/TimelineScreen';
import MyReviewScreen from './screens/MyReviewScreen';
import KPRCalculatorScreen from './screens/KPRCalculatorScreen';
import RegisterChooseRoleScreen from './screens/RegisterChooseRoleScreen';

import Toast from 'react-native-toast-message';
import BlogsScreen from './screens/BlogsScreen';
import InductionScreen from './screens/InductionScreen';
import InductionDetailScreen from './screens/InductionDetailScreen';
import OnBoardingScreen from './screens/OnBoardingScreen';
import AddPropertySelectCityScreen from './screens/AddPropertySelectCityScreen';
import OrderScreen from './screens/OrderScreen';
import ChatScreen from './screens/ChatScreen';

// Navigation
const Stack   = createNativeStackNavigator();
const Tab     = createBottomTabNavigator();



const AddPropertyNavigation = () => {
  const userState = UserContext();
  return (
    <Stack.Navigator  screenOptions={{headerShown: false}}>
      <Stack.Screen name="Add Property" component={AddPropertyScreen}/> 
      <Stack.Screen name="Add Property Select City" component={AddPropertySelectCityScreen}/>
    </Stack.Navigator>
  )
}

  // Home Bottom Navigation
const HomeBottomNavigation = () => {
  const userState = UserContext();
  return (    
    <Tab.Navigator screenOptions={{headerShown: false, tabBarActiveTintColor: Colors.primary}}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ 
        tabBarLabel: 'Beranda',
        tabBarIcon: ({color}) => (<Icon name="home" size={14} color={color}/>)
      }} />
      <Tab.Screen name="ShopScreen" component={ShopScreen} options={{ 
        tabBarLabel: 'Doctor',
        unmountOnBlur: true,
        tabBarIcon: ({color}) => (<Icon name="stethoscope" size={14} color={color} solid/>)
      }} />
      
      {
        userState.get().id ? <Tab.Screen name="SettingScreen" component={SettingScreen} options={{ 
          tabBarLabel: 'Pengaturan',
          tabBarIcon: ({color}) => (<Icon name="user" size={14} color={color}/>)
        }}/> : 
        <Tab.Screen name="SettingScreen" component={LoginScreen} options={{ 
          tabBarLabel: 'Pengaturan',
          tabBarIcon: ({color}) => (<Icon name="user" size={14} color={color}/>)
        }}/>
      }
      
    </Tab.Navigator>
  )
}

const HomeBottomNavigationWithAddProperty = () => {
  return (    
    <Tab.Navigator screenOptions={{headerShown: false, tabBarActiveTintColor: Colors.primary}}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ 
        tabBarLabel: 'Beranda',
        tabBarIcon: ({color}) => (<Icon name="home" size={14} color={color}/>)
      }} />
      <Tab.Screen name="ShopScreen" component={ShopScreen} options={{ 
        tabBarLabel: 'Toko',
        unmountOnBlur: true,
        tabBarIcon: ({color}) => (<Icon name="building" size={14} color={color}/>)
      }} />
      

      <Tab.Screen name="Add Property Group" component={AddPropertyNavigation} options={{ 
        tabBarLabel: 'Tambah',
        tabBarIcon: ({color}) => (<Icon name="plus" size={14} color={color} solid/>)
      }} />

      <Tab.Screen name="SettingScreen" component={SettingScreen} options={{ 
        tabBarLabel: 'Pengaturan',
        tabBarIcon: ({color}) => (<Icon name="user" size={14} color={color}/>)
      }}/>
    </Tab.Navigator>
  )
}



const App = () => {

  const state = UserContext();

  return (
    <>
      <NavigationContainer>  
        
        <Stack.Navigator screenOptions={{headerShown: false}}>
      
        {/* <Stack.Screen name="WEW" component={AddPropertyNavigation}/>   */}
        
        <Stack.Screen name="Splash" component={SplashScreen}/>   
        <Stack.Screen name="Login" component={LoginScreen}/> 
          
           
          <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen}/>
          
          {
            state.get().role_id == 4 ? 
              <Stack.Screen name="Home" component={HomeBottomNavigationWithAddProperty}/> : 
              <Stack.Screen name="Home" component={HomeBottomNavigation}/>
          }

          
          <Stack.Screen name="Register Choose Role" component={RegisterChooseRoleScreen}/>
          <Stack.Screen name="Register Screen" component={RegisterScreen}/>
          <Stack.Screen name="Detail Article" component={DetailArticleScreen}/>
          <Stack.Screen name="Account Security" component={SecurityScreen}/>
          <Stack.Screen name="My Property" component={MyPropertiScreen}/>
          <Stack.Screen name="Detail Doctor" component={DoctorDetailScreen}/>
          <Stack.Screen name="Property Gallery" component={PropertyGalleryScreen}/>
          <Stack.Screen name="My Income" component={MyIncomeScreen}/> 
          <Stack.Screen name="My Order" component={MyOrderScreen}/>
          <Stack.Screen name="My Review" component={MyReviewScreen}/>
          <Stack.Screen name="Order Timeline" component={TimelineScreen}/>
          <Stack.Screen name="Blogs Screen" component={BlogsScreen}/>
          <Stack.Screen name="Kota" component={KotaScreen}/>
          <Stack.Screen name="Induction Program" component={InductionScreen}/>
          <Stack.Screen name="Induction Detail" component={InductionDetailScreen}/>
          <Stack.Screen name="Personal Info" component={PersonalInfoScreen}/>
          <Stack.Screen name="KPR Calculator" component={KPRCalculatorScreen}/>
          <Stack.Screen name="Search Screen" component={SearchScreen}/>
          <Stack.Screen name="Order" component={OrderScreen}/>
          <Stack.Screen name="Chats" component={ChatScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast/>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

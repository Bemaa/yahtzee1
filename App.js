import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab=createBottomTabNavigator();
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import Home from './components/Home';
import Gameboard from './components/Gameboard'
import Scoreboard from './components/Scoreboard'



export default function App() {
  return (
    <NavigationContainer >
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} options={{tabBarStyle:{display:'none'},tabBarLabelStyle:{color:"#151515"},tabBarIcon:()=><AntDesign name="home" size={24} color="#151515"/>}}/>
      <Tab.Screen name='Gameboard' component={Gameboard} options={{tabBarLabelStyle:{color:"#151515"},tabBarIcon:()=> <FontAwesome5 name="dice" size={24} color="#151515" />}}/>
      <Tab.Screen name='Scoreboard' component={Scoreboard} options={{tabBarLabelStyle:{color:"#151515"},tabBarIcon:()=> <FontAwesome5 name="clipboard-list" size={24} color="#151515" />}}/>
    </Tab.Navigator>
  </NavigationContainer > 
  )
}
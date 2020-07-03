import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';

import Login from './Screen/Login';
import FieldUpdate from './Screen/Field';
import CustomButton from './Screen/CustomButton';
import UpdateProfile from './Screen/UpdateProfile';
import Payment from './Screen/Payment';
import NoteSummary from './Screen/NoteSummary';
import FinalSent from './Screen/FinalSent';
import Description from './Screen/Description';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function Root(){
  return(
    <Stack.Navigator
    initialRouteName="FieldUpdate"
    screenOptions={{
   headerShown: false
 }}
 >
     <Stack.Screen name="FieldUpdate" component={FieldUpdate} />
     <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
     <Stack.Screen name="Description" component={Description} />
    <Stack.Screen name="CustomButton" component={CustomButton} />
    <Stack.Screen name="Payment" component={Payment} />
    <Stack.Screen name="NoteSummary" component={NoteSummary} />
    <Stack.Screen name="FinalSent" component={FinalSent} />
   </Stack.Navigator>
    
  );
}

function MainStackNavigator() {
  return (
    <NavigationContainer>
    <Drawer.Navigator
    initialRouteName="Login"
    drawerContent={props => customDrawerContent(props)}
  >
  <Drawer.Screen name="Login" component={Login} options={{gestureEnabled:false}}  />
    <Drawer.Screen name ="Root" component={Root} />
  </Drawer.Navigator>
    </NavigationContainer>
  );
}
const customDrawerContent = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.Home} onPress={() => props.navigation.navigate('FieldUpdate')}><Text style={styles.home_text}>Home</Text></TouchableOpacity>
      <TouchableOpacity style={styles.Home} onPress={() => props.navigation.navigate('Description')}><Text style={styles.home_text}>Definitions</Text></TouchableOpacity>
      <TouchableOpacity style={styles.Home} onPress={() => props.navigation.navigate('Login')}><Text style={styles.home_text}>Logout</Text></TouchableOpacity>
      </View>
  )
}
const styles = StyleSheet.create({
  home_text: {
    color: '#6AADEF',
    fontSize: 18,
    marginLeft: 12,
    marginTop: 5,
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  Home: {
    marginTop: 30,
    backgroundColor: '#DFEFFF',
    height: 40,
    width: 260,
    marginLeft: 10
  },

});
export default MainStackNavigator;

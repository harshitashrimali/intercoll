import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions,BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage'
const windows = Dimensions.get('window');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class FinalSent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: '',
      screenName:this.props.route.name,
    }
this.backItems=this.backItems.bind(this);
  }
  UNSAFE_componentWillMount = async () => {
    let temp_user = this.state.UserName;
    let data3 = await AsyncStorage.getItem("username");
    temp_user = JSON.parse(data3);
    this.setState({ UserName: temp_user });
    console.log(this.state.UserName);
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPressed',this.backItems);
}
componentWillUnmount(){
 BackHandler.removeEventListener('hardwareBackPressed',this.backItems)
}
 backItems(){
   let screen= this.state.screenName;
    if(screen=="FinalSent"){
     this.props.navigation.navigate('FieldUpdate');
     return true;
      }
   else{
     console.log("not executed");
   }
 } 
  render() {
    return (
      <View style={{flex:1}} >
          <View style={{backgroundColor:'#fff'}}>
                 <Icon name="menu" color='#24a4dc' size={35} style={{ marginLeft: 8, marginTop: 10 }} onPress={() => this.props.navigation.toggleDrawer()} />
               </View>
      <ScrollView style={styles.body}>
        <View style={styles.send_body}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
          <Image style={styles.right} source={require('../assets/sent.png')} />
          <Text style={styles.send}>Sent</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.textbox}> <Text style={styles.username}>{this.state.UserName}</Text>, your field  visit update has been sent to Intercoll™</Text>
        </View>
        <View style={styles.arrowsButton}>
         <TouchableOpacity onPress={this.backItems} style={styles.box1}><Image style={styles.arrow} source={require('../assets/arrow1.png')} /></TouchableOpacity>
        </View>
      </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  arrow:
  {
     alignSelf:'center',
      marginTop:width*0.01,
      width:55,
      height:50 
  },
  arrowsButton:{
      justifyContent:'center',
     alignItems:'center',
    height:120,
    marginBottom:20
      },
  box1:{
    width:width*0.24,
    marginLeft:10,
    marginRight:10,
    height:55,
    backgroundColor:'#21AAF9',
    borderRadius:10,
     alignItems:'center'
},
  body:
  {
    backgroundColor: 'white'
  },
  login_btn: {
    backgroundColor: '#21AAF9',
    height: 50,
    width: 140,
    alignSelf: 'center',
    borderRadius: 10
  },
  logoText: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 10,
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  icon:
  {
    marginTop: 90,
    marginLeft: 60,
  },
  send_body: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  right:
  {
    marginTop: 30,
    marginLeft: 140,
  },
  send: {
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 28,
    color: '#28d3f1'
  },
  username:{
  textTransform:'capitalize'
  },
  box:
  {
    marginTop: 70,
    alignSelf: 'center',
    width: 200,
    // height: 150,
  },
  textbox: {
    fontSize: 25,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',

  }, logo: {
    alignSelf: 'center',
    marginTop: width * 0.2,
    width: width * 0.9,
    height: height * 0.1
  },
});
export default FinalSent;
import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      username: null,
      password: null,
      spinner: false,
      no:'',
      users: [{name:'Abner',email:'abner@intercoll.co.nz',OPCode:'AD'}, {name:'Ashton',email:'Ashton@intercoll.co.nz',OPCode:'AG'}, {name:'Lee',email:'lee@intercoll.co.nz',OPCode:'LH'}, {name:'Luke',email:'luke@intercoll.co.nz',OPCode:'LB'}, {name:'Mark',email:'mrowson@intercoll.co.nz',OPCode:'MR'},
        {name:'Robert',email:'robert@intercoll.co.nz',OPCode:'RL'}, {name:'Kieran',email:'kieran@intercoll.co.nz',OPCode:'KS'}, {name:'William',email:'william@intercoll.co.nz',OPCode:'WP'}, {name:'Aaron',email:'astott@intercoll.co.nz',OPCode:'AA'}, {name:'Harley',email:'harley@intercoll.co.nz',OPCode:'HF'},
        {name:'Jade',email:'jkerr@intercoll.co.nz',OPCode:'JK'}, {name:'Jason',email:'jedwards@intercoll.co.nz',OPCode:'JA'}, {name:'Marshall',email:'Marshall@intercoll.co.nz',OPCode:'MA'}, {name:'Peter',email:'peter@intercoll.co.nz',OPCode:'PF'}, {name:'Ross',email:'rgrant@intercoll.co.nz',OPCode:'RG'},
        {name:'Tim',email:'Tim@intercoll.co.nz',OPCode:'TR'},{name:'Mathew',email:'mmagele@intercoll.co.nz',OPCode:'MT'},{name:'Joshua',email:'jrussell@intercoll.co.nz',OPCode:'JR'}],
      defaultPassword: 'ABC@01',
      eye:'visibility',
      secureText:true
    };
    this.backID= this.backID.bind(this);
  }
  login =async()=> {
    let found;
    if(this.state.username!=null && this.state.defaultPassword!=null){
     found = this.state.users.filter(element => element.email === this.state.username);
     console.log(`the found ${found}`);
     if(found!=''){
        if (found[0].email === this.state.username && this.state.password === this.state.defaultPassword ) {
      this.setState({spinner:true});
     let emailID={
      name:found[0].name,
      email:found[0].email,
      OPCODE:found[0].OPCode
    }
    await AsyncStorage.setItem('emailID',JSON.stringify(emailID));
      this.props.navigation.navigate("Root",{
        screen:'FieldUpdate'
      });
      this.setState({spinner:false});
      this.setState({username:null});
      this.setState({password:null});
  }else {
    Toast.show("Please enter correct credentials");
    this.setState({spinner:false});
  }
     }else{
       Toast.show("Please enter correct credentials");
     }
    } else{
      Toast.show("Please enter the username and password");
    }
  }
  eyeShow=()=>{
    this.setState(prevState =>({
      eye:prevState.eye==='visibility'?'visibility-off':'visibility',
      secureText:!prevState.secureText
    }))
  }
  componentDidMount(){
    this._unsubscribe =this.props.navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPressed',this.backID);
    });
   
}
componentWillUnmount(){
 BackHandler.removeEventListener('hardwareBackPressed',this.backID)
}
 backID(){
   BackHandler.exitApp();
 } 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView>
          <ScrollView style={styles.scrollView}
            keyboardShouldPersistTaps="handled"
          >
          <Spinner
          visible={this.state.spinner}
          textContent={'Please Wait...'}
          textStyle={{color:'#fff'}}
        />
            <View>
              <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
              />
              <View style={styles.textInputView}>
                <Text style={styles.username}>USERNAME</Text>
                <TextInput
                  style={styles.textInputStyle1}
                  onChangeText={emailId => this.setState({ username:emailId.trim() })}
                  autoCapitalize={"none"}
                  value={this.state.username}
                />
                <Text style={styles.password}
                >PASSWORD</Text>
                <View style={styles.passEyeView}>
                <Icon onPress={this.eyeShow} style={styles.eyeIcon} name={this.state.eye} color="red" size={24} />
                <TextInput
                  secureTextEntry={this.state.secureText}
                  style={styles.textInputStyle2}
                  onChangeText={pass => this.setState({ password:pass.trim() })}
                  value={this.state.password}
                />
                </View>
                <TouchableOpacity style={styles.login_btn} onPress={this.login}>
                  <Text style={styles.logoText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
        flex: 1,
    backgroundColor: 'white',
  },
  passEyeView:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  eyeIcon:{
    padding: 10,
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    right:40,
    zIndex:1
  },
  textInputStyle1: {
    borderColor: 'rgb(219,219,219)',
    backgroundColor: '#F1F3F4',
    borderWidth: 1,
    marginRight: width * 0.1,
    marginLeft: width * 0.1,
    height: height * 0.06,
    padding: 10,
  },
  textInputStyle2: {
    position:'relative',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    // color: '#424242',
    borderColor: 'rgb(219,219,219)',
    backgroundColor: '#F1F3F4',
    borderWidth: 1,
    height: height * 0.06,
    margin: width * 0.1,
    marginTop: 1,
    padding: 10,
  },
  logo: {
    alignSelf: 'center',
    width: width * 0.9,
    height: height * 0.1
  },
  username: {
    alignSelf: 'center',
    margin: width * 0.02,
    alignSelf: 'center',
    fontSize: 16,
    color: '#00008B',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  textInputView: {
    marginTop: width * 0.2,
    },
  password: {
    margin: width * 0.02,
    alignSelf: 'center',
    fontSize: 16,
    color: '#00008B',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
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
});
export default Login;

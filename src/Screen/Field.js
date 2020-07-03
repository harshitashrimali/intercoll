import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, StyleSheet, Animated, Dimensions,BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import RNSmtpMailer from "react-native-smtp-mailer";
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import StatusBarBackground from './StatusBarBackground';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class FieldUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedOUT:false,
      usernameid: '',
      checkedIN:false,
      spinner: false,
      screenName:this.props.route.name,
      date:'',
      namedUser:'',
      checkout:'',
      userGrpA:['abner@intercoll.co.nz', 'Ashton@intercoll.co.nz', 'lee@intercoll.co.nz', 'luke@intercoll.co.nz', 'mrowson@intercoll.co.nz',
      'robert@intercoll.co.nz'],
      userGrpB:['kieran@intercoll.co.nz', 'willam@intercoll.co.nz'],
      userGrpC:['astott@intercoll.co.nz', 'harley@intercoll.co.nz',
      'jkerr@intercoll.co.nz', 'jedwards@intercoll.co.nz', 'Marshall@intercoll.co.nz', 'peter@intercoll.co.nz', 'rgrant@intercoll.co.nz',
      'Tim@intercoll.co.nz','mmagele@intercoll.co.nz','jrussell@intercoll.co.nz'],
      mailAgent:'',
      checkIT:'',
      backClickCount: 0
      }
    this.backItemed= this.backItemed.bind(this);
   
    this.springValue = new Animated.Value(100) ;
  }
  loading() {
    this.setState({ spinner: true });
  }
  initalFun=async()=>{
    BackHandler.addEventListener('hardwareBacked',this.backItemed);
    let mailID=await AsyncStorage.getItem('emailID');
    const DetailScreen=JSON.parse(mailID);
    console.log(DetailScreen);
  let email = DetailScreen.email;
  let name= DetailScreen.name;
  this.setState({namedUser:email})
  this.setState({ usernameid: name });
  console.log("tbis" + this.state.usernameid); 
  let checkT= await AsyncStorage.getItem('checkT');
  this.setState({checkIT:JSON.parse(checkT)});
  const found = this.state.userGrpA.find(element => element === this.state.namedUser);
  if(found === this.state.namedUser){
   this.setState({mailAgent:'vshrimali709@gmail.com'});
   console.log(this.state.mailAgent);
  }
  const founds = this.state.userGrpB.find(element => element === this.state.namedUser);
  if(founds === this.state.namedUser){
   this.setState({mailAgent:'harshitashrimali980@gmail.com'});
   console.log(this.state.mailAgent);
  }
  const founded = this.state.userGrpC.find(element => element === this.state.namedUser);
  if(founded === this.state.namedUser){
   this.setState({mailAgent:'khushiguptakhushigupta9@gmail.com'});
   console.log(this.state.mailAgent);
  }
  }
  componentDidMount() {
     this._unsubscribe =this.props.navigation.addListener('focus', () => {
      this.initalFun();
    });
  }
  onDataSub = async () => {
    try {
      const e = JSON.stringify(this.state.usernameid)
      await AsyncStorage.setItem("username", e);
    } catch (error) {
      console.log("It doesn't work" + error);
    }
      if(this.state.checkedOUT==true+this.state.usernameid){ 
      await AsyncStorage.setItem('agentEmail',JSON.stringify(this.state.mailAgent));
    this.props.navigation.navigate('UpdateProfile');
        }
    else{
    Toast.show(`In order to update, please check-in first`,Toast.LONG);
    }
  }
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBacked',this.backItemed)
  }
backItemed(){
  this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();

  return true;
}
_spring() {
  this.setState({backClickCount: 1}, () => {
      Animated.sequence([
          Animated.spring(
              this.springValue,
              {
                  toValue: -.15 * height,
                  friction: 5,
                  duration: 300,
                  useNativeDriver: true,
              }
          ),
          Animated.timing(
              this.springValue,
              {
                  toValue: 100,
                  duration: 300,
                  useNativeDriver: true,
              }
          ),

      ]).start(() => {
          this.setState({backClickCount: 0});
      });
  });

}
ToastShow=async()=>{
  let date=true+this.state.usernameid;
  this.setState({checkedOUT:date});
  this.setState({checkedIN:false});
        Toast.show(`${this.state.usernameid} has successfully checked in`,Toast.LONG);
        this.setState({ spinner: false });
        this.initalFun();
}
checkToast=()=>{
  Toast.show(`${this.state.usernameid} something went wrong when trying to check-in.Please contact Admin`,Toast.LONG);
  this.setState({ spinner: false })
}
checkoutSucc=async()=>{
  Toast.show(`${this.state.usernameid} has successfully checked out`,Toast.LONG);
      let checkedin=true+this.state.usernameid;
      let checkout=false+this.state.usernameid
       this.setState({checkedOUT:checkout});
       this.setState({checkedIN:true});
        this.setState({ spinner: false });
        this.initalFun();
}
checkoutFail=()=>{
Toast.show(`${this.state.usernameid} something went wrong when trying to check-in.Please contact Admin`,Toast.LONG);
        this.setState({ spinner: false });
}
  checkIn = async() => {
    this.loading(); 
    let name= true+this.state.usernameid;
    if(this.state.checkedOUT!=name){
    RNSmtpMailer.sendMail({
      mailhost: "smtp.office365.com",
      port: "587",
      ssl: false, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
      username: "testapp@intercoll.co.nz",
      password: "Apptest@92467",
      from: "testapp@intercoll.co.nz",
      recipients:"agentupdates@intercoll.co.nz",
      bcc: ["intercoll.test123@gmail.com","agentupdates@intercoll.co.nz"],
      subject: 'Check In',
      htmlBody: `<h3>${this.state.usernameid} has checked in</h3>`,
      attachmentPaths: [],
      attachmentNames: [],//only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[] 
      attachmentTypes: []//needed for android, in ios-only application, leave it empty: attachmentTypes:[]
    })
      .then(success => {
        this.ToastShow();
        console.log(success);
              })
      .catch(err => {
       this.checkToast();
       console.log(err);
      });
    }else{
      Toast.show(`${this.state.usernameid} has already checked-in`,Toast.LONG);
      this.setState({spinner:false});
    }
  };
  drawer=()=>{
    this.setState({checkedIN:false});
    this.setState({checkedOUT:false});
    this.props.navigation.toggleDrawer();
  }
  checkOut = async() => {
    console.log(this.state.checkedIN);
    if(this.state.checkedIN==false){
    if(this.state.checkedOUT==true+this.state.usernameid){
      this.setState({ showIndicator: true })
      this.loading();
      RNSmtpMailer.sendMail({
      mailhost: "smtp.office365.com",
      port: "587",
      ssl: false, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
      username: "testapp@intercoll.co.nz",
      password: "Apptest@92467",
      from: "testapp@intercoll.co.nz",
      recipients: "agentupdates@intercoll.co.nz",
      bcc: ["intercoll.test123@gmail.com","agentupdates@intercoll.co.nz"],
      subject: 'Check Out',
      htmlBody: `<h3>${this.state.usernameid} has checked out</h3>`,
      attachmentPaths: [],
      attachmentNames: [],//only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[] 
      attachmentTypes: []//needed for android, in ios-only application, leave it empty: attachmentTypes:[]
    })
      .then(success => {
        this.checkoutSucc();
      })
      .catch(err => {
        this.checkoutFail();
        this.setState({ spinner: false });
      });
  }else{
    Toast.show('In order to checkout, Please check-in first',Toast.LONG);
  }
}else{
  Toast.show(`${this.state.usernameid} has already checked-out`,Toast.LONG);
      this.setState({spinner:false});
}
  };
  render() {
    return (
      <View style={{flex:1}} >
      <View style={{backgroundColor:'#fff'}}>
             <Icon name="menu" color='#24a4dc' size={35} style={{ marginLeft: 8, marginTop: 10 }} onPress={this.drawer} />
           </View>
      <ScrollView style={styles.body} contentContainerStyle={styles.container} 
        keyboardShouldPersistTaps="handled"
      >
        <StatusBarBackground style={{backgroundColor:'white'}}/>
        <Spinner
          visible={this.state.spinner}
          textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <View style={styles.filed}>
          <Text style={styles.Supdate}>Field Services Updates</Text>
        </View>
        <View style={styles.groupButton}>
          <TouchableOpacity onPress={this.onDataSub}>
            <Image source={require('../assets/update.png')} style={styles.updateImage} /></TouchableOpacity>
          <TouchableOpacity onPress={() => { Linking.openURL('tel: 0800 683 738'); }} >
            <Image source={require('../assets/office.png')} style={styles.officeImage} /></TouchableOpacity>
        </View>
        <View style={styles.checks}>
          <Text style={styles.Welname}>
            Welcome {this.state.usernameid}
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.checkIn} onPress={this.checkIn}>
              <Text style={styles.ctext}>Check In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkOut} onPress={this.checkOut}>
              <Text style={styles.ctext}>Check out</Text>
            </TouchableOpacity>
            </View>
        </View>
        <Animated.View style={[styles.animatedView, {transform: [{translateY: this.springValue}]}]}>
                    <Text style={styles.exitTitleText}> Press back again to exit the app</Text>
                            </Animated.View>
      </ScrollView>
      
      </View>
    )
  }
}
const styles = StyleSheet.create({
  animatedView: {
    width,
    backgroundColor: "#0a5386",
    elevation: 2,
    position: "absolute",
    bottom: 0,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
},
exitTitleText: {
    textAlign: "center",
    color: "#ffffff",
    marginRight: 10,
},
exitText: {
    color: "#e5933a",
    paddingHorizontal: 10,
    paddingVertical: 3
},
  container:{
  justifyContent:'center', 
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  body:
  {
  
   backgroundColor: 'white',
    
  },
  groupButton: {
    flexDirection: 'row',
    marginTop: width * 0.1,
    justifyContent: 'center',
    alignSelf: 'center'

  },
  buttons: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: width * 0.06,
    flexDirection: 'row',
  },
   logo: {
    width: width * 0.8,
    height: height * 0.07,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: width * 0.1
  },
  filed: {
    marginTop: width * 0.1,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#24a4dc',
    width: width * 0.9,
    height: 45,
    borderRadius: 5,
    borderColor: 'skyblue'
  },
  Supdate: {
    color: 'white',
    padding: 6,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  Welname: {
    marginTop: width * 0.08,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
    textTransform: 'capitalize'
  },
  checkIn:
  {
    backgroundColor: '#38cc62',
    width: 130,
    height: 55,
    borderRadius: 10,

  },
  ctext:
  {
    color: 'white',
    padding: 12,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  checkOut:
  {
    marginLeft:width*0.14,
    backgroundColor: 'red',
    width: 130,
    height: 55,
    borderRadius: 10,
  },
  updateImage: {
    width: 150,
    marginTop: width * 0.1,
    height: 150
  },
  officeImage: {
    width: 150,
    marginLeft: width * 0.1,
    marginTop: width * 0.1,
    height: 150
  },
  checks: {
    marginTop: height * 0.1,
    marginBottom:20
  }

});
export default FieldUpdate;

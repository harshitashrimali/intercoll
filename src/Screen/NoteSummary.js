import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Dimensions, Image, TouchableOpacity, ActivityIndicator,BackHandler} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNSmtpMailer from "react-native-smtp-mailer";
import Icon from 'react-native-vector-icons/Entypo';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class NoteSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputValue: '',
      fieldNum: false,
      date: new Date(),
      getValue: [],
      newData: '',
      newStringArr: [],
      newArr: '',
      subjectTitle: '',
      valueItem: '',
      newStringARR: '',
      newFieldARR: '',
      finalDataTosend: '',
      UserName: '',
      AddNote: null,
      finalNotes: null,
      finalDataTosend: '',
      spinner: false,
      screenName:this.props.route.name,
      perScreen:'',
      agentUpdatedID:'',
      fieldNumber:''
     }
    this.handleBackButtonClick=this.handleBackButtonClick.bind(this);
  }
  loading() {
    this.setState({ spinner: true });
  }
  retrieveData = async () => {
    let field = this.state.newData;
    const data1 = await AsyncStorage.getItem("Field_call");
    field = JSON.parse(data1);
    this.setState({ newData: field });
    console.log(this.state.newData);
  }
  getData=async()=> {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButtonClick)
    let list = this.state.getValue;
    let data1 = await AsyncStorage.getItem("Update");
    console.log("this is data" + data1);
    if(this.state.getValue.length!=0){
      list.shift();
      this.setState({getValue:[...this.state.getValue,JSON.parse(data1)]});
      console.log("shifted work");
    }else{
    this.setState({getValue:[...this.state.getValue,JSON.parse(data1)]});
    console.log("unshifted not worked");
    }
    let field = this.state.newData;
    const data2 = await AsyncStorage.getItem("Field_call");
    field = JSON.parse(data2);
    this.setState({ newData: field });
    console.log("the array");
    console.log(this.state.newData);

    let listItem = [this.state.valueItem]
    let data3 = await AsyncStorage.getItem("Update");
    console.log("this is data" + data3);
    listItem = (JSON.parse(data3));
    this.setState({ valueItem: listItem });
    let CCID = `CCID ${this.state.valueItem.Ccid} Agent Update`;
    let ccidDIS=`CCID:${this.state.valueItem.Ccid}`
    this.setState({fieldNumber:ccidDIS});
    this.setState({ subjectTitle: CCID });
    console.log(this.state.valueItem);
    console.log(this.state.subjectTitle);

    let newStringData = Object.values(this.state.valueItem);
    let newString = this.state.newStringARR;
    newString = newStringData;
    this.setState({ newStringARR: newString });
    console.log("this is string" + this.state.newStringARR);

    let newStringData1 = Object.values(this.state.newData);
    let newStringField = this.state.newFieldARR;
    newStringField = newStringData1;
    this.setState({ newFieldARR: newStringField })
    console.log("this is string" + this.state.newFieldARR);

    let finalData = this.state.finalDataTosend;
    finalData = (this.state.newStringARR).toString() + (this.state.newFieldARR).toString();
    this.setState({ finalDataTosend: finalData });
    console.log("This is final Data" + this.state.finalDataTosend);

    let temp_user = this.state.UserName;
    let data4 = await AsyncStorage.getItem("username");
    temp_user = JSON.parse(data4);
    this.setState({ UserName: temp_user });
    console.log(this.state.UserName);

    let agent= await AsyncStorage.getItem("agentEmail");
    let mailed= JSON.parse(agent)
    this.setState({agentUpdatedID:mailed});

    let nam= await AsyncStorage.getItem("ScreenName");
     this.setState({perScreen:nam});
  }
  componentDidMount(){
      this._unsubscribe =this.props.navigation.addListener('focus', () => {
        this.getData();
      });
  }
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress',this.handleBackButtonClick)
  }
handleBackButtonClick() {
  let previous=this.state.perScreen
  let screens=this.state.screenName;
  if(screens=="NoteSummary"){
    this.props.navigation.navigate(previous);
    return true;
  }else{
    console.log("not working");
  }
}
  activity = () => {
    if (this.state.showIndicator) {
      return (
        <View style={{
          justifyContent: 'center'
        }}>
          <ActivityIndicator size="large" color='#24a4dc' />
        </View>
      );
    }
  }
  newFunct = () => {

    let final = this.state.finalDataTosend;
    let newData = this.state.finalNotes;
    let addnote = this.state.AddNote;
    let newFinal = final + addnote;
    newData = newFinal
    this.setState({ finalNotes: newData });
    console.log("new final data" + this.state.finalNotes);
  }
  sendEmail = () => {
    this.loading();
    let addnote = this.state.AddNote;
    if (addnote !== null) {
      RNSmtpMailer.sendMail({
        mailhost: "smtp.office365.com",
        port: "587",
        ssl: false, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
        username: "testapp@intercoll.co.nz",
        password: "Apptest@92467",
        from: "testapp@intercoll.co.nz",
        recipients:"agentupdates@intercoll.co.nz",
        bcc: [ "intercoll.test123@gmail.com","agentupdates@intercoll.co.nz"],
        subject: this.state.subjectTitle,
        htmlBody: `<h3>Username: ${this.state.UserName}</h3> <h4>${this.state.finalDataTosend + " ADD Notes - " + addnote}</h4>`,
        attachmentPaths: [],
        attachmentNames: [],//only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[] 
        attachmentTypes: []//needed for android, in ios-only application, leave it empty: attachmentTypes:[]
      })
        .then(success => {
          this.props.navigation.navigate('FinalSent')
          this.setState({ spinner: false })
        })
        .catch(err => {
          Toast.show(`${this.state.UserName} something went wrong when trying to send email.Please contact Admin`,Toast.LONG);
          this.setState({ spinner: false })
        }
        );
    } else {
      RNSmtpMailer.sendMail({
        mailhost: "smtp.office365.com",
        port: "587",
        ssl: false, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
        username: "testapp@intercoll.co.nz",
        password: "Apptest@92467",
        from: "testapp@intercoll.co.nz",
        recipients:  "agentupdates@intercoll.co.nz",
        bcc: [ "intercoll.test123@gmail.com","agentupdates@intercoll.co.nz"],
        subject: this.state.subjectTitle,
        htmlBody: `<h2>Username: ${this.state.UserName}</h2> <h3>${this.state.finalDataTosend}</h3>`,
        attachmentPaths: [],
        attachmentNames: [],//only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[] 
        attachmentTypes: []//needed for android, in ios-only application, leave it empty: attachmentTypes:[]
      })
        .then(success => {
          this.props.navigation.navigate('FinalSent');
          this.setState({ spinner: false })
        })
        .catch(err => {
          Toast.show(`${this.state.UserName} something went wrong when trying to send email.Please contact Admin`,Toast.LONG);
          this.setState({ spinner: false })
        })
    }
  };
  backItem=()=>{
    this.props.navigation.navigate('CustomButton');
  }
  
  listOption = () => {
    return this.state.getValue.map((item, index) => {
      return (<View key={index}>
        <Text style={styles.noteText}>
        {item.OPCode}, {this.state.fieldNumber}, {item.newDate}, {item.Time}, {item.Address},  {Object.values(this.state.newData).join(",  ")} </Text>
      </View>
      );
    })
  }
  removeData = async () => {
    const removeData = await AsyncStorage.removeItem('Field_call');
    await AsyncStorage.removeItem('Update');
    console.log(removeData);
    this.props.navigation.navigate('FieldUpdate');
  }
  render() {
    return (
      <View style={{flex:1}} >
      <View style={{backgroundColor:'#fff'}}>
             <Icon name="menu" color='#24a4dc' size={35} style={{ marginLeft: 8, marginTop: 10 }} onPress={() => this.props.navigation.toggleDrawer()} />
             <Text style={styles.utext}>Notes summary</Text>
           </View>
      <ScrollView style={styles.body}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{justifyContent:'center'}}
      >
        <Spinner
          visible={this.state.spinner}
          textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />
         <View>
          <View>
          </View>
          <View>
            <View style={styles.textBox}>
            <ScrollView>
            {this.listOption()}
            </ScrollView>
            </View>
          </View>
          <View>
            <Text style={styles.Adnote}>Add notes</Text>
            <TextInput style={styles.inputbox}
              multiline={true}
              numberOfLines={7}
              onChangeText={(text) => this.setState({ AddNote: text })}
            >
            </TextInput>
          </View>
          {this.activity()}
          <View style={{marginTop:height*0.01,marginBottom:10}}>
          <View style={styles.buttons}>
            <Text style={styles.send1}>Send</Text>
          </View>
          <View style={styles.buttons}>
               <TouchableOpacity onPress={this.backItem} style={styles.box}>
            <Image style={styles.arrow} source={require('../assets/arrow2.png')} /></TouchableOpacity>
            <TouchableOpacity onPress={this.sendEmail}>
              <Image style={styles.icon1} source={require('../assets/right.png')}/></TouchableOpacity>
</View>
          </View>
          </View>
      </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  arrow:
  {
    alignSelf: 'center',
    width: 40,
    height: 45
  },
  box: {
    width:width*0.24,
    marginRight:width*0.25,
    backgroundColor: '#21AAF9',
    borderRadius: 10,
    alignSelf: 'center',
    height:45
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  body:
  {
    backgroundColor: 'white'
  },
  buttons: {
    flexDirection: 'row',
    marginTop: width * 0.01,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10
  },
  utext:
  {
    fontSize: 27,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
    marginBottom:10
  },
  Adnote: {
    marginTop: width * 0.05,
    fontSize: 27,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  textBox:
  {
    marginTop: 30,
  paddingLeft:4,
    alignSelf: 'center',
    width: width * 0.9,
    height: width * 0.6,
    backgroundColor: '#F3F4F4',
    borderWidth: 1,
    borderColor: 'lightgray',
    overflow:'scroll',
  },
  inputbox:
  {
    marginTop: 10,
    alignSelf: 'center',
    width: width * 0.9,
    height:width*0.34,
    overflow:'scroll',
    backgroundColor: '#F3F4F4',
    borderWidth: 1,
    borderColor: 'lightgray',
    fontSize: 18,
    textAlignVertical: 'top'
  },
  send1: {
    marginTop: width * 0.02,
    fontSize: 25,
    marginLeft: width * 0.45,
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  icon1: {
    marginRight: width * 0.04,
  },
  noteText: {
    fontSize: 16,
    padding: 2,
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
    color: '#808080'
  }
});
export default NoteSummary;
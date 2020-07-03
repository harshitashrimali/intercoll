import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Dimensions, YellowBox, ActivityIndicator, BackHandler } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage'
import { useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
YellowBox.ignoreWarnings(['componentWillReceiveProps']);
YellowBox.ignoreWarnings(['TimePickerAndroid']);
YellowBox.ignoreWarnings(['DatePickerAndroid']);
class UpdateProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date:moment().format("dddd Do MMM YYYY"),
      localDate:null,
      localTime:null,
      newTime:'Time:  '+moment().format("HH:mm"),
      fieldNum: '',
      refreshing: false,
      showIndicator: false,
      spinner: false,
      screenName:this.props.route.name,
      OPCode:'',
      Address:''
        }
    this.backItems= this.backItems.bind(this);
  }
  loading() {
    this.setState({ spinner: true });
  }
  onChangeTextInput = (text) => {
   const num= text.replace(/[^0-9]/g, "");
   this.setState({ fieldNum: num });
}
  mergeDataOne = async () => {
    this.loading(); 
    if(this.state.Address != '' || this.state.fieldNum != ''){
      if(this.state.Address != ''){
    if (this.state.fieldNum != '') {
      if(this.state.fieldNum.length >5){
    let obj = {
      OPCode:this.state.OPCode,
      newDate: 'Date: ' + this.state.date,
      Ccid: this.state.fieldNum,
      Time: this.state.newTime,
      Address:'Address: '+this.state.Address
    }
    console.log(obj.newDate);
    try {
      const x = JSON.stringify(obj)
      await AsyncStorage.setItem("Update", x);
    } catch (error) {
      console.log("It doesn't work" + error);
    }
    this.setState({ fieldNum: '' });
    this.setState({Address:''});
    this.setState({ date: moment().format("dddd Do MMM YYYY") });
    this.setState({newTime:'Time:  '+moment().format("HH:mm")});
    this.props.navigation.navigate('CustomButton');
    this.setState({ spinner: false });
  } else {
    alert("Please enter 6 digit CCID number");
    this.setState({ spinner: false });
  }
}else{
  alert("Please enter CCID number");
    this.setState({ spinner: false });
}
}else{
  alert("Please fill the Address");
  this.setState({ spinner: false });

}
    }else{
      alert("Please fill CCID number and Address");
      this.setState({ spinner: false });
    }
  }
  IntFun=async()=>{
    let mailID=await AsyncStorage.getItem('emailID');
    const DetailScreen=JSON.parse(mailID);
    let OP = DetailScreen.OPCODE;
    console.log(`OPCODE ${OP}`);
    this.setState({OPCode:OP});
  }
  componentDidMount(){
      BackHandler.addEventListener('hardwareBackPressed',this.backItems);
      this.IntFun();
  }
  componentWillUnmount(){
   BackHandler.removeEventListener('hardwareBackPressed',this.backItems)
  }
   backItems(){
     let screen= this.state.screenName;
      if(screen=="UpdateProfile"){
       this.props.navigation.navigate('FieldUpdate');
       return true;
        }
     else{
       console.log("not executed");
     }
   } 
  optionsData = () => {
    return newItemQW.map(item, index => {
      return <View key={index}>
        <Text>{item}</Text>
      </View>
    })
  }
  onChangeAddress=(text)=>{
 const num= text.replace(/[^\w\s]/gi, "");
   this.setState({ Address: num });
  }
  activity = () => {
    if (this.state.showIndicator) {
      return (
        <View style={{
          marginTop: 20,
          justifyContent: 'center'
        }}>
          {/*Code to show Activity Indicator*/}
          <ActivityIndicator size="large" color='#24a4dc' />
          {/*Size can be large/ small*/}
        </View>
      );
    }
  }
  render() {
    return (
      <View style={{flex:1}} >
      <View style={{backgroundColor:'#fff'}}>
             <Icon name="menu" color='#24a4dc' size={35} style={{ marginLeft: 8, marginTop: 10 }} onPress={() => this.props.navigation.toggleDrawer()} />
             <Text style={styles.utext}>Update</Text>
           </View>
            <ScrollView style={styles.body}
            keyboardShouldPersistTaps="handled"
           >
        <Spinner
          visible={this.state.spinner}
          textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.scroll}>
        <View>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
        <View style={styles.ccidBox}>
          <View style={styles.filed}>
            <Text style={styles.Supdate}>CCID</Text>
          </View>
          <View>
            <TextInput keyboardType='numeric'  
            maxLength={6}
              style={styles.num}
              onChangeText={this.onChangeTextInput}
              value={this.state.fieldNum}
            ></TextInput>
          </View>
          <View>
            <DatePicker
              style={{ width: 250, marginTop: 12,backgroundColor: '#F1F3F4' }}
              date={this.state.date}
              mode="date"
              disabled={true}
              placeholder="select date"
              format="dddd Do MMM YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput:{
                    borderWidth:2,
                    borderColor: 'rgb(219,219,219)'
                  },
                dateText:{
                  color: '#21AAF9',
                  fontSize:16
                }
                }}
              onDateChange={(date) => { 
                this.setState({date:date});
               }} 
            />
            <TextInput  
              style={styles.timeInput}
              onChangeText={this.onChangeTextInput}
              value={this.state.newTime}
              editable={false}
            ></TextInput>
            <View style={styles.filed}>
            <Text style={styles.Supdate}>ADDRESS VISITED</Text>
          </View>
          <TextInput
          multiline={true}
          numberOfLines={7}
          maxLength={100}
              style={styles.Address}
              
              onChangeText={this.onChangeAddress}
              value={this.state.Address}
            ></TextInput>
          </View>
        </View>
        <View style={styles.arrowsButton}>
        <TouchableOpacity onPress={this.backItems} style={styles.box}><Image style={styles.arrow} source={require('../assets/arrow2.png')} /></TouchableOpacity>
        <TouchableOpacity onPress={this.mergeDataOne} style={styles.box}><Image style={styles.arrow} source={require('../assets/arrow1.png')} /></TouchableOpacity>
        </View>
        </View>
      </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  arrowsButton:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:15
      },
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent:'center'
  },
  body:
  {
    backgroundColor: 'white'
  },
  ccidBox: {
    marginTop: width * 0.01,
    flex: 1,
    alignItems: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  utext:
  {
    fontSize: 26,
    textAlign: 'center',
    marginTop: width * 0.02,
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  logo: {
    width: width * 0.8,
    height: height * 0.1,
    alignSelf: 'center',
    marginTop: width * 0.05
  },
  filed: {
    marginTop: 12,
    backgroundColor: '#21AAF9',
    width: 250,
    height: 35,
    borderRadius: 5,
    borderColor: 'skyblue'

  },
  Supdate: {
    color: 'white',
    padding: 4,
    textAlign: 'center',
    fontSize: 18
  },
  timeInput:{
    color: '#21AAF9',
    padding: 4,
    marginTop: 12,
    borderColor: 'rgb(219,219,219)',
    textAlign:'center',
    borderWidth: 2,
    width: 250,
    height: 40,
    fontSize: 17,
    backgroundColor: '#F1F3F4',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  num:
  {
    color: '#21AAF9',
    padding: 4,
    marginTop: 12,
    borderColor: 'rgb(219,219,219)',
    textAlign:'center',
    borderWidth: 2,
    width: 250,
    height: 40,
    fontSize: 20,
    fontWeight:'bold',
    backgroundColor: '#F1F3F4',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  Address:{
    color: '#21AAF9',
    paddingBottom: 4,
    paddingTop:4,
    paddingLeft:20,
    paddingRight:20,
    marginTop: 12,
    borderColor: 'rgb(219,219,219)',
    textAlign:'center',
    borderWidth: 2,
    width: 250,
    height: 100,
    fontSize: 20,
    backgroundColor: '#F1F3F4',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
    overflow:'scroll',
  },
  arrow:
  {
    alignSelf: 'center',
    marginTop: width * 0.01,
    width: 55,
    height: 50
  },
  box: {
    width:width*0.24,
    marginLeft:10,
    marginRight:10,
    height: 55,
    backgroundColor: '#21AAF9',
    marginTop: width * 0.1,
    borderRadius: 10,
    alignSelf: 'center'
  },
});
export default function (props) {
  const isFocused = useIsFocused();

  return <UpdateProfile {...props} isFocused={isFocused} />;
}

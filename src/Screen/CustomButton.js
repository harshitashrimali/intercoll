import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Image, BackHandler, ScrollView } from 'react-native';
import Grid from 'react-native-grid-component';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      options: ["RSL", "Business Card", "SWD", "SWO", "New Add", "Vacant Prop", "New Phn", "Dtr not home", "FB Message", "Dtr Unknown", "Details Conf", "CX", "Disputed"
        , "Veda", "NOP Served", "NFI", "ON WINZ", "LMTC", "GNA", "Revisit","EFS","PFS","Request Docs","AGW"],
      active: false,
      ccid: null,
      refreshing: false,
      screenName:this.props.route.name,
      spinner:false
    }
    this.backItem= this.backItem.bind(this);
  }
    componentDidMount = async () => {
  BackHandler.addEventListener('hardwareBackPress',this.backItem);
    let list = [this.state.ccid]
    let data1 = await AsyncStorage.getItem("Update");
    console.log("this is data" + data1);
    list = (JSON.parse(data1));
    let newList = ` "CCID: ${list.Ccid} -NOD" `
    this.setState({ ccid: newList });
    console.log(this.state.ccid);
  }
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress',this.backItem);
  }
   backItem(){
     let screen= this.state.screenName;
      if(screen=="CustomButton"){
       this.props.navigation.goBack();
       return true;
     }else{
       console.log("not executed");
     }
   } 
  mergeData = async () => {
     this.setState({spinner:true});
    if (this.state.selected && this.state.selected.length > 0) {
      let arr= this.state.selected;
      let object_convert = Object.assign({},arr);
      let dataForm = object_convert;
         console.log("this is object" + dataForm);
      try {
        const x = JSON.stringify(dataForm)
        console.log("this is x" + x);
        await AsyncStorage.setItem("Field_call", x);
        await AsyncStorage.setItem("ScreenName",this.state.screenName);
      } catch (error) {
        console.log("It doesn't work" + error);
      }
      this.setState({spinner:false});
      this.props.navigation.navigate('NoteSummary');
    } else {
      this.setState({spinner:false});
      alert("Please choose atleast one field");
    }
  }
  paymentType =async()=>{
    this.setState({spinner:true});
    if (this.state.selected && this.state.selected.length >0 ) {
      let arr= this.state.selected;
      let object_convert = Object.assign({}, arr);
      let dataForm = object_convert;
      console.log("this is object" + dataForm);
      try {
        const x = JSON.stringify(dataForm)
        console.log("this is x" + x);
        await AsyncStorage.setItem("Field_call", x);
        await AsyncStorage.setItem("ScreenName",this.state.screenName);
      } catch (error) {
        console.log("It doesn't work" + error);
      }
      this.setState({spinner:false});
      this.props.navigation.navigate('Payment');
    } else {
      alert("Please choose atleast one field");
      this.setState({spinner:false});
    }
  }
  selectItem = (value) => {
    console.log("this is ccid" + value);
    let list = [...this.state.selected]
    if (this.state.selected.includes(value)) {
      this.setState({ selected: list.filter(item => item !== value) })
    } else {
      list.push(value)
      this.setState({ selected: list })
    }
  }
  payment_method = () => {
    console.log(this.state.selected);
  }
  _renderItem = (item, index) => (

    <View key={index} style={styles.item}>
      <TouchableOpacity onPress={() => this.selectItem(item)}
        style={[styles.option, { backgroundColor: this.state.selected.includes(item) ? '#AF002A' : '#21AAF9' }]}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif' }}>{item}</Text>
      </TouchableOpacity>
    </View>
  );
  render() {
    return (
      <View style={{flex:1}}>
<View style={{backgroundColor:'#fff'}}>
       <Icon name="menu" color='#24a4dc' size={35} style={{ marginLeft: 8, marginTop: 10 }} onPress={() => this.props.navigation.toggleDrawer()} />
       <Text style={styles.utext}>Field Call Result</Text>
     </View>
      <ScrollView 
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            backgroundColor:'#fff',
                  }}
       >
        <Spinner
          visible={this.state.spinner}
          textContent={'Please Wait...'}
          textStyle={{color:'#fff'}}
        />
        <View style={{ flex: 1 }}>
          <Grid
            style={styles.list}
            renderItem={this._renderItem}
            data={this.state.options}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
          <TouchableOpacity style={styles.paymentBtn} onPress={this.paymentType}><Text style={styles.pay_word}>ARRANGEMENT</Text></TouchableOpacity>
          <View style={styles.arrowsButton}>
          <TouchableOpacity onPress={this.backItem} style={styles.box}>
            <Image style={styles.arrow} source={require('../assets/arrow2.png')} /></TouchableOpacity>
          <TouchableOpacity onPress={this.mergeData} style={styles.box}>
            <Image style={styles.arrow} source={require('../assets/arrow1.png')} /></TouchableOpacity>
</View>
        </View>
      </ScrollView>
      </View>
    );
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
  item: {
    flex: 1,
    margin: width*0.028,
    justifyContent: 'center',
    alignItems: 'center',

  },
  option: {
    height: 30,
    width: width * 0.4,
    borderRadius: width * 0.02,
    justifyContent:'center',
    alignItems:'center'
  },
  utext:
  {
    fontSize: 26,
    textAlign: 'center',
    marginTop: width * 0.01,
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
    marginBottom: width * 0.04
  },
  paymentBtn: {
    backgroundColor: '#3CB371',
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: width * 0.02,
    justifyContent:'center'  
  },
  pay_word: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  NODBtn: {
    backgroundColor: '#AF002A',
    marginTop: 8,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: width * 0.02,
    justifyContent:'center'
  },
  NOD_word: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  arrow:
  {
    alignSelf: 'center',
    width: 50,
    height: 50
  },
  box: {
    width:width*0.24,
    marginLeft:10,
    marginRight:10,
    backgroundColor: '#21AAF9',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'center'
  }
});
export default CustomButton;
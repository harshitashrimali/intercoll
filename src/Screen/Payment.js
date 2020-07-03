import React,{Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions,  StyleSheet, TextInput,YellowBox,BackHandler,Keyboard} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import ModalSelector from 'react-native-modal-selector';
import AsyncStorage from '@react-native-community/async-storage'
import DatePicker from 'react-native-datepicker';
import Spinner from 'react-native-loading-spinner-overlay'; 
import moment from 'moment';
const width = Dimensions.get('window').width;                            
const height = Dimensions.get('window').height;                          
YellowBox.ignoreWarnings(['DatePickerAndroid']);
class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textInputValue: null,
            fieldNum:'',
            date: moment().format("dddd Do MMM YYYY"),                         
            ModeType:null,
            active:false,
            spinner: false,
            screenName:this.props.route.name,
        }
        this.backData= this.backData.bind(this);
    }
       loading() {
      this.setState({spinner:true});
    }
    componentDidMount(){
      BackHandler.addEventListener('hardware',this.backData);
    }
    componentWillUnmount(){
      BackHandler.removeEventListener('hardware',this.backData);
    }
    backData(){
      let screen= this.state.screenName;
      if(screen=="Payment"){
       this.props.navigation.navigate('CustomButton');
       return true;
        }
     else{
       console.log("not executed");
     }
    }
     onChangeFieldnum=(text)=>{
      text = (text.indexOf(".") >= 0) ? (text.substr(0, text.indexOf(".")) + text.substr(text.indexOf("."), 3)) : text;
      if(isNaN(text)){
        text = text.replace(/[^0-9\.]/g,'');
        if(text.split('.').length>2) 
            text =text.replace(/\.+$/,"");  
   }
   this.setState({fieldNum:text});  
    }
    focus=()=>{
      let value= Number(this.state.fieldNum).toFixed(2);
      this.setState({fieldNum:value});
    }
    DataFun =()=>{
      this.loading(); 
      if(this.state.textInputValue!==null && this.state.fieldNum!='' && this.state.fieldNum!=0.00){
        if(this.state.ModeType !==null){
      setTimeout( ()=>{
        this.mergeDataSecond();
     }
      ,1000 );
    } else{
      alert("Please select mode of payment");
    this.setState({spinner:false})
    }
  }else{
    alert("Please fill details");
      this.setState({spinner:false})
  }
    }
    mergeDataSecond =async()=>{
      let obj={
        Mode:'Payment Method',
        payMode: this.state.ModeType,
        numeric:'$'+this.state.fieldNum, 
        textData:this.state.textInputValue,
        SetDate:'Starting  '+this.state.date,
      }
      console.log(obj);
      try {
        const z = JSON.stringify(obj);
          await AsyncStorage.mergeItem("Field_call",z); 
          await AsyncStorage.setItem("ScreenName",this.state.screenName);
      } catch (error) {
         console.log("It doesn't work"+error); 
      }
      this.setState({textInputValue:null});
      this.setState({ModeType: null});
      this.setState({fieldNum: ''});
      this.setState({date: moment().format("dddd Do MMM YYYY")})
      this.props.navigation.navigate('NoteSummary');
      this.setState({spinner:false});
    }
     render(){
        let index = 0;
        const data = [
            { key: index++, label: 'Weekly',initValue:true },
            { key: index++, label: 'Monthly' },
            { key: index++, label: 'Payment in Full' },
            { key: index++, label: 'Settlement Payment'},
            { key: index++, label: 'Per Fortnight'},
            { key: index++, label: 'One off payment'},
        ];
        
        return(
          <View style={{flex:1}} >
          <View style={{backgroundColor:'#fff'}}>
                 <Icon name="menu" color='#24a4dc' size={35} style={{ marginLeft: 8, marginTop: 10 }} onPress={() => this.props.navigation.toggleDrawer()} />
               </View>
                <ScrollView style={styles.body}
                contentContainerStyle={{justifyContent:'center'}}
                 > 
          <Spinner
          visible={this.state.spinner}
          textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />
                <View>
               <Text style={styles.utext}>Payment Method</Text>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
             </View>
             <View style={styles.contain}>
             <View style={styles.container}>
       
       <View style={styles.SectionStyle}>

       <Icon name="credit" color='#24a4dc' size={60} style={styles.credit} />

         <TextInput
             style={styles.priceInput}
           placeholder="Enter Amount"
           keyboardType='numeric'
             underlineColorAndroid="transparent"
             onBlur={this.focus}
             onChangeText={this.onChangeFieldnum}
             onChange={this.vaild}
             value={this.state.fieldNum}
             onSubmitEditing={Keyboard.dismiss}
         />
       </View>
     </View>
               <View style={styles.searchSection}> 
                <Icon name="chevron-thin-down" color='#24a4dc' size={35}  style={styles.searchIcon}/>
                <ModalSelector
                style={styles.output}
                optionContainerStyle={{backgroundColor:'#fff'}}
                    data={data}
                    supportedOrientations={['portrait']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    cancelContainerStyle={{backgroundColor:'#fff'}}
                    onChange={(option)=>{ this.setState({textInputValue:option.label})}}>
                    <TextInput
                        style={styles.payment_input}
                        placeholder="Select Payment Mode"
                        editable={false}
                        value={this.state.textInputValue} />
                </ModalSelector>
                </View>
                <View style={styles.timePicker}>
                <DatePicker
        style={{width:width*0.8,marginTop:18,}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="dddd Do MMM YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
              customStyles={{
                dateInput:{
                  borderWidth:0.5,
                  borderColor: '#000',
                  borderRadius:5,
                },
                dateText:{
                  color: '#21AAF9',
                  fontSize:17
                }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
       
      />
        </View>       
               <View style={styles.containPaymentbtn}>
               <View style={styles.buttons}>
               <TouchableOpacity style={[styles.box,{backgroundColor:this.state.ModeType=='Direct Debit'?'#AF002A':'#52d4eb'}]} 
               onPress={()=>this.setState({ModeType:'Direct Debit'})}>
                     <Text style={styles.ctext} >Direct Debit</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.box,{backgroundColor:this.state.ModeType=='Debit Card'?'#AF002A':'#52d4eb'}]}  
                     onPress={()=>this.setState({ModeType:'Debit Card'})}>
                    <Text style={styles.ctext}>Debit Card</Text>
                    </TouchableOpacity>
                     </View>
                     <View style={[styles.buttons,{marginLeft:5}]} >
               <TouchableOpacity style={[styles.boxs,{backgroundColor:this.state.ModeType=='AP'?'#AF002A':'#52d4eb'}]}  
               onPress={()=>this.setState({ModeType:'AP'})} >
                     <Text style={styles.cdtext}>AP</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.boxs,{backgroundColor:this.state.ModeType=='Cash'?'#AF002A':'#52d4eb'}]}  
                     onPress={()=>this.setState({ModeType:'Cash'})} >
                    <Text style={styles.cdtext}>Cash</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.boxs,{backgroundColor:this.state.ModeType=='EDD'?'#AF002A':'#52d4eb'}]}  
                     onPress={()=>this.setState({ModeType:'EDD'})} >
                    <Text style={styles.cdtext}>EDD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.boxs,{backgroundColor:this.state.ModeType=='Other'?'#AF002A':'#52d4eb'}]}  
                    onPress={()=>this.setState({ModeType:'Other'})} >
                    <Text style={styles.cdtext}>Other</Text>
                    </TouchableOpacity>
                     </View>
                     </View>
                     </View>
                     <View style={styles.arrowsButton}>
                     <TouchableOpacity onPress={this.backData} style={styles.box1}><Image  style={styles.arrow} source={require('../assets/arrow2.png')} /></TouchableOpacity>
                     <TouchableOpacity onPress={this.DataFun} style={styles.box1}><Image  style={styles.arrow} source={require('../assets/arrow1.png')} /></TouchableOpacity>
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
    body:
    {
        backgroundColor:'white'
    },
    containPaymentbtn:{
   justifyContent:'center',
   alignSelf:'center',
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        marginRight:10
        },
 utext:
    {
        fontSize:26,
       textAlign:'center',
       marginTop:width*0.1,
       fontFamily:Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
 },
  
logo:{
    width:width*0.8,
    height:height*0.1,
    justifyContent:'center',
    alignSelf:'center',
    marginTop:width*0.05
  },
num:
{
    position: 'absolute',
    color:'#24a4dc',
    borderColor:'lightgray',
    borderWidth: 2,
    width:width*0.8, 
    height:width*0.2,
    fontSize:18,
    fontWeight:'bold',
    backgroundColor:'#F3F4F4', 
    fontFamily:Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
},
box:
{
    marginTop: 20,
    marginLeft:10,
    backgroundColor:'#52d4eb',
    width:150,
    height:45,
    borderRadius: 10,
},
contain:{
justifyContent:'center',
alignSelf:'center'
},
ctext:
{
    color:'white',
    padding:10,
    fontSize:18,
    textAlign:'center',
    fontFamily:Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
},
cdtext:{
  color:'white',
    padding:10,
    fontSize:18,
    textAlign:'center',
    fontFamily:Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
},
boxs:
{
     marginTop: 10,
    marginLeft:4,
    backgroundColor:'#52d4eb',
    width:72,
    height:45,
    borderRadius: 10,   
},
arrbox:{
        width:135,
        height:50,
        backgroundColor:'#21AAF9',
        marginTop:width*0.1,
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:10,
},
arrow:
{
   marginTop:width*0.001,
   alignSelf:'center'
},
creditIcon:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:width*0.04,
  
},
searchIcon:{
paddingLeft:width*0.7,
},
output:{
position:'absolute',
paddingTop: 10,
paddingRight: 10,
paddingBottom: 10,
paddingLeft: 0,
},
payment_input:{
borderWidth:0.5,
borderColor:'lightgray',
 fontFamily:Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
width:width*0.8, 
borderColor: '#000',
height:50,
color:'#21AAF9',
borderRadius:5,
fontSize:20,
marginLeft:width*0.04,
textAlign:'center',

},
clockIcon:{
    color:'red',
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0
    },
    timePicker:{
        justifyContent:'center',
        alignItems:'center'
    },
    arrow:
{
   alignSelf:'center',
    marginTop:width*0.01,
    width:55,
    height:50 
},
box1:{
    width:width*0.24,
    marginLeft:10,
    marginRight:10,
    height:55,
    backgroundColor:'#21AAF9',
    marginTop:width*0.1,
    borderRadius:10,
     alignItems:'center'
},
credit:{
    color:'red',
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0,
},
container: { 
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:width*0.02
    
  },
  
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 80,
    width:width*0.8,
    borderRadius: 5 ,
    margin: 10
},

credit: {
   padding:0
},
priceInput:{
  overflow:'scroll',
    fontSize:25,
    color:'#21AAF9',
    width:200
}

});
export default Payment;
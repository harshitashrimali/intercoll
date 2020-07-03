import React,{Component} from 'react';
import { StyleSheet, View,ScrollView,Dimensions,Text,BackHandler,Image} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/Entypo';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class Description extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tableHead: ['BUTTON', 'DESCRIPTION'],
        tableData: [
          ['Also Gave WINZ redirection'],
          [ 'Business card left',],
          [ 'Centrix search'],
          [ 'Details confirmed'],
          ['Disputed'],
          ['Debtor not home'],
          ['Debtor unknown'],
          ['Email for Service'],
          ['Face book Message'],
          ['Gone no address'],
          ['Left Message To Call'],
          ['New address obtained'],
          ['New phone number obtained'],
          ['No Further Information'],
          ['Notice of proceedings served'],
          ['On WINZ benefit'],
          ['Payment arrangment'],
          ['Postal For Service'],
          ['Request documents'],
          ['Revisit'],
          ['Red slip left'],
          ['Spoke with debtor'],
          ['Spoke with other'],
          ['Vacant Property'],
          ['Veda Search']
        ],
        tableTitle: ['AGW', 'Business card','CX','Details Conf','Disputed','Dtr not home','Dtr unknown','EFS','FB Message','GNA','LMTC','New Add',
        'New Phn','NFI','NOP Served','On WINZ','Payment','PFS','Request Docs','Revisit','RSL','SWD','SWO','Vacant Prop','Veda'],
      }
      this.backOne= this.backOne.bind(this);
    }
    componentDidMount(){
      BackHandler.addEventListener('hardware',this.backOne);
    }
    componentWillUnmount(){
      BackHandler.removeEventListener('hardware',this.backOne);
    }
    backOne(){
       this.props.navigation.navigate('FieldUpdate');
       return true;
    }
    render() {
      const state = this.state;
      return (
        <View style={{backgroundColor:'#fff',flex:1}} >
        <View style={{backgroundColor:'#fff'}}>
               <Icon name="menu" color='#24a4dc' size={35} style={{ marginLeft: 8, marginTop: 10 }} onPress={() => this.props.navigation.toggleDrawer()} />
               <Image style={styles.logo} source={require('../assets/logo.png')} />
               <Text style={styles.utext}>Definitions</Text>
             </View>
          <ScrollView>
        <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead} flexArr={[1, 2, 2, 1]} style={styles.head} textStyle={styles.texts}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[1, 1]} style={styles.row} textStyle={styles.textData}/>
          </TableWrapper>
        </Table>
      </View>
        </ScrollView>
        </View>
      )
    }
  }
     const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff',fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif'},
    head: {  height: 40,  backgroundColor: '#000099', },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#0080FF' },
    row: {  height: 28  },
    text: { textAlign: 'center',paddingLeft:8, color:'white',fontSize:15},
    textData:{textAlign:'left',paddingLeft:8,fontSize:15},
    texts:{color:'#fff', textAlign: 'left',paddingLeft:8,fontSize:17 },
    utext:
    {
        marginBottom:10,
      fontSize: 26,
      textAlign: 'center',
      fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
    },
    logo:{
      width:width*0.7,
      height:height*0.1,
      justifyContent:'center',
      alignSelf:'center',
      marginTop:width*0.05
    },
  });
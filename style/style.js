import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2e6'
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  header: {
    flexDirection: 'row',
    marginTop: 1,
    marginBottom: 20,
    backgroundColor: '#3A1078',
    
  },
  footer: {
    flexDirection: 'row',
    marginTop:50,
    backgroundColor: '#3A1078',
    
  },
  gameboard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10
  },
  dicepoints: {
    flexDirection: 'row', 
    alignContent: 'center',
    marginHorizontal:40
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#eef2e6',
    fontWeight: 'bold',
    fontSize: 28,
    margin: 10,
  },
  author: {
    flex: 1,
    color: '#eef2e6',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  gameinfo: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 25,
    fontWeight:'bold',
  },
  button: {
    alignItems:'center',
    padding: 10,
    backgroundColor: "#3A1078",
    borderRadius: 15,
    justifyContent: 'center',
    marginHorizontal:100
  },
  tabnavigator: {
    backgroundColor: "#3A1078",
  },
  buttonText: {
    color:"#eef2e6",
    fontSize: 20
  },
  textinput:{
    borderStyle:'solid',
    borderWidth: 2,
    marginTop:20,
    marginBottom:20,
    borderColor: "#151515",
    justifyContent:'center'
  },
  name:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:30
  },
  rules:{
    margin:15,
    fontSize:20
  }
});
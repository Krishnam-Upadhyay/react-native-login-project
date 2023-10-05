import {View,Text,Button,TextInput,StyleSheet,KeyboardAvoidingView} from 'react-native';
import {useState,} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoggedIn } from './counterSlice';



const Login=({navigation}) =>{
    const isLoggedIn = useSelector((state)=>state.counter.isLoggedIn);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [text, setText] = useState('');
    

    
    
    
const getDataFromApi =  (e,p) => {
  const url = 'https://assignment.8848digitalerp.com/api/method/assignment.API.access_token.get_access_token?usr='+e+'&pwd='+p;
  

  fetch(url).then(
  resp => resp.json() // this returns a promise
).then(repos => {
  if(repos.message.msg  ==='success'){
    dispatch(setIsLoggedIn());
    
  }
}).catch(ex => {
  console.error(ex);
})
 
 
};

    const handleOnPress=()=>{
      if(password =='Anand'){
        getDataFromApi(email,'12345');

      }else{
        alert('Wrong Email or Password Please write againe');
      }
      

    }
    

    return (
        <KeyboardAvoidingView behavior = 'padding'>
        <View style = {styles.containerSafe}>
            <Text  style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 5,
              fontStyle: 'italic',
            }}>Email</Text>
            <TextInput style={styles.input} placeholder="example@gmail.com" onChangeText={setEmail} />
            <Text  style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 5,
              fontStyle: 'italic',
            }}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
            />
            <View style={styles.fixToText}>
              <Button title="Login" onPress={handleOnPress} />
                </View>
            
            
            
        </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  containerSafe: {
    backgroundColor: '#F96167',
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 15,
  },
  
  input: {
    marginLeft: 8,
    marginRight: 8,
    height: 40,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
  },

  containerSafe: {
    backgroundColor: '#F96167',
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 15,
  },
   fixToText: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'green',
    color: 'green',
    borderRadius: 8,
    justifyContent: 'center',
  },
  
});

export default Login;
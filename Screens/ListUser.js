import {
  SafeAreaView,
  View,
  
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from './counterSlice';

const ListUser = ({ navigation, route }) => {
  const [u, setU] = useState([]);
  const [data, setData] = useState(null);
  const users = useSelector((state) => state.counter.users);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const getDataFromApi = () => {
    fetch(
      'https://assignment.8848digitalerp.com/api/method/assignment.API.all_users_api.get_user',
      {
        headers: {
          Authorization: ' token eb33bed41ebc137:348f33df4a5e962',
        },
      }
    )
      .then(
        (resp) => resp.json() // this returns a promise
      )
      .then((repos) => {
        setU([...repos.message.data]);
      })
      .catch((ex) => {
        consoe.log(ex.msg);
      });
  };

  useEffect(() => {
    getDataFromApi();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {u && (
          <View>
            {u.map((user, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Users', {
                    itemId: user.name1,
                    ...u,
                  })
                }>
                <View style={styles.item}>
                  <Text key={index}>Name : {user.name1}</Text>
                  <Text key={index}>Age : {user.age}</Text>
                  <Text key={index}>Gender:{user.gender}</Text>
                  <Text key={index}>Designation : {user.designation}</Text>
                  <Text key={index}>Address: {user.address}</Text>
                  <Text key={index}>Company Name :{user.company_name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: 'blue',
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'violet',
    fontSize:70,
    fontWeight:'bold',
    paddingLeft:50,
    

    shadowColor: 'green',
    borderRadius: 30,
    padding: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'space-between',

    alignContent: 'space-around',
    float: 2,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default ListUser;

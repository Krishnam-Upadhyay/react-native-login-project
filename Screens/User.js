import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  SearcBar,
  Button,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Searchbar } from 'react-native-paper';

import { useState, useEffect } from 'react';
const User = (props) => {
  const [userData, setUserData] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [userFound, setUserFound] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [designation, setDesignation] = useState('');
  const [address, setAddress] = useState('');
  const [company_name, setCompayname] = useState('');
  const [changedData, setChangedData] = useState({
    name1: false,
    age: false,
    gender: false,
    designation: false,
    address: false,
    company_name: false,
  });

  const getSpecificUserDataFromApi = (name1) => {
    fetch(
      `https://assignment.8848digitalerp.com/api/method/assignment.API.specific_user.get_specific?name1=${name1}`,
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
        setUserData(repos.message.data.specific_user[0]);
      })
      .catch((ex) => {
        console.warn(ex.msg);
      });
  };

  const getAllusers = () => {
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
        setAllUsers([...repos.message.data]);
      })
      .catch((ex) => {
        consoe.log(ex.msg);
      });
  };
  useEffect(() => {
    getAllusers();
  }, [searchText]);

  useEffect(() => {
    getSpecificUserDataFromApi(props.route.params.itemId);
  }, []);

  const changeType = (a) => {
    if (a) {
      let text = a + '';
      return text;
    } else {
      let text = '';
      return '';
    }
  };

  const handleOnSubmit = () => {
    const sname = userData.name1;
    const newData = {};
    if (changedData.name1) {
      newData.name1 = name;
    }
    if (changedData.age) {
      newData.age = parseInt(age);
    }
    if (changedData.gender) {
      newData.gender = gender;
    }
    if (changedData.designation) {
      newData.designation = designation;
    }
    if (changedData.address) {
      newData.address = address;
    }
    if (changedData.company_name) {
      newData.company_name = company_name;
    }
    const jsonString = JSON.stringify(newData);

    const url = `https://assignment.8848digitalerp.com/api/resource/Assignment/${sname}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ' token eb33bed41ebc137:348f33df4a5e962',
      },
      body: jsonString,
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((upated) => {
        props.navigation.navigate('UsersList');
      })
      .catch((error) => {
        alert('UserNotFound');
      });
  };
  const handleName = () => {
    setChangedData({ ...changedData, name1: true });
  };
  const handleAge = () => {
    setChangedData({ ...changedData, age: true });
  };
  const handleGender = () => {
    setChangedData({ ...changedData, gender: true });
  };
  const handlerDesignation = () => {
    setChangedData({ ...changedData, designation: true });
  };
  const handleAddress = () => {
    setChangedData({ ...changedData, address: true });
  };
  const handleCompanyName = () => {
    setChangedData({ ...changedData, company_name: true });
  };

  const handleSearchIcon = () => {
    const user = allUsers.find((user) => user.name1 == searchText);
    if (user) {
      setUserData(user);
    } else {
      alert('user not found');
    }
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={50}>
      <ScrollView>
        <View style={{ marginTop: 20 }}>
          <Searchbar
            style={styles.input}
            placeholder="Search"
            iconColor="blue"
            mode="bar"
            foc
            onPress={() => alert('pressed')}
            onChangeText={setSearchText}
            value={searchText}
            onIconPress={handleSearchIcon}
          />

          <SafeAreaView style={styles.containerSafe}>
            <Text
              style={{
                marginLeft: 10,
                marginTop: 10,
                marginBottom: 5,
                fontStyle: 'italic',
              }}>
              Name
            </Text>
            <TextInput
              style={styles.input}
              defaultValue={userData.name1}
              onChange={handleName}
              onChangeText={setName}
            />
            <Text
              style={{
                marginLeft: 10,
                marginTop: 10,
                marginBottom: 5,
                fontStyle: 'italic',
              }}>
              Age
            </Text>
            <TextInput
              numeric
              keyboardType="numeric"
              style={styles.input}
              defaultValue={changeType(userData.age)}
              onChange={handleAge}
              onChangeText={setAge}
            />
            <Text
              style={{
                marginLeft: 10,
                marginTop: 10,
                marginBottom: 5,
                fontStyle: 'italic',
              }}>
              Gender
            </Text>
            <TextInput
              style={styles.input}
              onChange={handleGender}
              defaultValue={userData.gender}
              onChangeText={setGender}
            />
            <Text
              style={{
                marginLeft: 10,
                marginTop: 10,
                marginBottom: 5,
                fontStyle: 'italic',
              }}>
              Designation
            </Text>
            <TextInput
              style={styles.input}
              onChange={handlerDesignation}
              defaultValue={userData.designation}
              onChangeText={setDesignation}
            />
            <Text
              style={{
                marginLeft: 10,
                marginTop: 10,
                marginBottom: 5,
                fontStyle: 'italic',
              }}>
              Address
            </Text>
            <TextInput
              style={styles.input}
              onChange={handleAddress}
              defaultValue={userData.address}
              onChangeText={setAddress}
            />
            <Text
              style={{
                marginLeft: 10,
                marginTop: 10,
                marginBottom: 5,
                fontStyle: 'italic',
              }}>
              Company Name
            </Text>
            <TextInput
              style={styles.input}
              onChange={handleCompanyName}
              defaultValue={userData.company_name}
              onChangeText={setCompayname}
            />

            <View style={styles.fixToText}>
              <Button title="Save" onPress={handleOnSubmit} />
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
});
export default User;

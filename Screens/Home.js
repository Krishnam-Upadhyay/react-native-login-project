import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import ListUser from './ListUser';
import User from './User';

const Stack = createStackNavigator();
 
export default function Home() {

  const isLoggedIn = useSelector((state)=>state.counter.isLoggedIn);
  
  
  

  return (
      <NavigationContainer>
          <Stack.Navigator>
      
            
            
        {isLoggedIn ? (
          <>
             <Stack.Screen name="UsersList" component={ListUser} />
             <Stack.Screen name="Users" component={User} />
          </>
        ) : (
          <>
              <Stack.Screen name="Login" component={Login} />
            
          </>
        )}
    </Stack.Navigator>
      </NavigationContainer>
     
  )
  
  }
    
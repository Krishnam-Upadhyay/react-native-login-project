import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  userFound:true,
  
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setIsLoggedIn: (state) => {
     
      state.isLoggedIn  =true;
    },
    setUserFound: (state) => {
     
      state.setUserFound  =false;
    },
    setUsers:(state,actions)=>{
      if(actions.type ==='GET_USERS'){
        state.users= [...actions.payload];
      }
      
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setIsLoggedIn,setUsers,setUserFound } = counterSlice.actions

export default counterSlice.reducer
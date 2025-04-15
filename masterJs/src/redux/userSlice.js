import {createSlice} from "@reduxjs/toolkit";

const initialUser = {
    name:"Vimal Suresh T",
    accountNumber:"1001-1001-9001-8976",
    balance: 5432.28
}

const userSlice = createSlice({
  name:'user',
  initialState: initialUser,
  reducer:{
    updateBalance(state, action){
      const {type , amount} = action.payload;
      if(type == "debit") state.balance -= amount;
      else state.balance += amount;
    }
  }
}) 

export const { updateBalance } = userSlice.actions
export default userSlice.reducer
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { setBasket } from "./basketSlice";

const initialState ={
    user: null
};


export const signInUser = createAsyncThunk(

    'account/signInUser',
    async(data, thunkAPI) =>{

        try {
            const userRes = await agent.Account.login(data);
            const {basket , ...user} = userRes;
            if(basket){
                thunkAPI.dispatch(setBasket(basket))
            }
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchCurrentUser = createAsyncThunk(

    'account/fetchCurrentUser',
    async(_, thunkAPI) =>{
            thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
        try {
            const userRes = await agent.Account.currentUser();
            const {basket , ...user} = userRes;
            if(basket){
                thunkAPI.dispatch(setBasket(basket))
            }
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    },
    {
        condition: ()=> {
            if(!localStorage.getItem('user')) return false;
        }
    }
)


export const accountSlice = createSlice({

    name: 'account',
    initialState,
    reducers:{
        signOut: state => {
            state.user = null;
            localStorage.removeItem('user');
            // history.push('/')
            window.location.href ="/"
        },
        setUser:(state, action)=>{
            state.user = action.payload;
        }
    },
    extraReducers:(builder =>{
        
        builder.addCase(fetchCurrentUser.rejected, (state)=>{
            state.user = null;
            localStorage.removeItem('user');
            toast.error("Session Expired -Please login again")
            window.location.href ="/"
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) =>{
            state.user = action.payload
        });
        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (state, action) =>{
            // state.user = action.payload
            console.log(action.payload)
        });

    })
});

export const { signOut, setUser } = accountSlice.actions;

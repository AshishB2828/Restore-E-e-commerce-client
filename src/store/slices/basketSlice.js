import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../../api/agent";

const initialState ={
    basket: null,
    status:'idle'
};
// Actions
export const addBasketItemAsync = createAsyncThunk(
    'basket/addBasketItemAsync',
    async({productId, quantity = 1}, thunkAPI)=>{
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data});

        }
    }
);
// remove item
export const removeBasketItemAsync = createAsyncThunk(
    'basket/removeBasketItemAsync',
    async({productId, quantity}, thunkAPI)=>{
        try {
            return await agent.Basket.removeItem(productId, quantity);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)


// 
export const basketSlice = createSlice({

    name:'basket',
    initialState,
    reducers:{
        setBasket:(state, action)=>{
            state.basket = action.payload;
        }
    },
    extraReducers:(
        builder => {
            builder.addCase(addBasketItemAsync.pending, (state, action) =>{
                console.log(action);
                state.status = "pendingAddItem";
            });
            builder.addCase(addBasketItemAsync.fulfilled, (state, action)=>{
                state.basket = action.payload;
                state.status = "idle"
            });
            builder.addCase(addBasketItemAsync.rejected, (state)=>{
                state.status = "idle"
            });
            builder.addCase(removeBasketItemAsync.pending, (state, action)=>{
                state.status = "pendingRemoveItem"
            });
            builder.addCase(removeBasketItemAsync.fulfilled, (state, action)=>{
                state.status = "idle";

            const { productId, quantity } = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i=>i.productId === productId);
            if(itemIndex === -1 || itemIndex === undefined) return;
            state.basket.items[itemIndex].quantity -= quantity;
            if(state.basket?.items[itemIndex].quantity === 0)
                state.basket.items.splice(itemIndex, 1);
            });

        }
    )
})

export const { setBasket } = basketSlice.actions;
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";

const productAdapter = createEntityAdapter();
//Actions
export const fetchProductsAsync = createAsyncThunk(
    'catalog/fetchProductsAsync',
    async(_,thunkAPI)=>{
        try {
            return await agent.Catalog.list();
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
);

export const fetchProductAsync = createAsyncThunk(
    'catalog/fetchProductAsync',
    async(productId, thunkAPI) =>{
        try {
            return await agent.Catalog.details(productId);
        } catch (error) {

            return thunkAPI.rejectWithValue({error : error.data});

        }
    }
)

//

export const catalogSlice = createSlice(
    {
        name:'catalog',
        initialState: productAdapter.getInitialState({
            productLoaded: false,
            status:'idle'
        }),
        reducers:{},
        extraReducers:(builder => {
            builder.addCase(fetchProductsAsync.pending, state =>{
                state.status = "pendingFetchProducts";
            });
            builder.addCase(fetchProductsAsync.fulfilled, (state, action) =>{
                productAdapter.setAll(state, action.payload);
                state.status ="idle";
                state.productLoaded=true;
            });
            builder.addCase(fetchProductsAsync.rejected, state=>{
                state.status ="idle";
            });
            builder.addCase(fetchProductAsync.pending, state =>{
                state.status = 'pendingFetchProduct';
            });
            builder.addCase(fetchProductAsync.fulfilled, (state, action) =>{
                productAdapter.upsertOne(state, action.payload);
                state.status ="idle";
            });
            builder.addCase(fetchProductAsync.rejected, (state, action)=>{
                state.status ="idle";
                console.log(action);
            });
        })
    }
);

export const productSelectors = productAdapter.getSelectors(state => state.catalog)
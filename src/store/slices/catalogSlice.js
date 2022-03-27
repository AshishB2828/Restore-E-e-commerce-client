import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";

const productAdapter = createEntityAdapter();


const getAxiosParams = (productParams) =>{
    const params = new URLSearchParams();
    params.append("PageNumber", productParams.pageNumber.toString());
    params.append("PageSize", productParams.pageSize.toString());
    params.append("OrderBy", productParams.orderBy);
    if(productParams.brands?.length)
    params.append("Brands", productParams.brands.toString());
    if(productParams.types?.length)
    params.append("Types", productParams.types.toString());
    if(productParams.searchTerm)
    params.append("SearchTerm", productParams.searchTerm);
    return params;
}

//Actions
export const fetchProductsAsync = createAsyncThunk(
    'catalog/fetchProductsAsync',
    async(_,thunkAPI)=>{
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
        try {
            const response = await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
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

export const fetchFiltersAsync = createAsyncThunk(
    'catalog/fecthFilters',
    async(_, thunkAPI)=>{
        try {
            return await agent.Catalog.fetchFilters();
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

//

function initParams(){
    return{
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        brands:[],
        types:[]
    }
    
}

export const catalogSlice = createSlice(
    {
        name:'catalog',
        initialState: productAdapter.getInitialState({
            productLoaded: false,
            filtersLoaded: false,
            status:'idle',
            brands:[],
            types:[],
            productParams: initParams(),
            metaData: {}
        }),
        reducers:{
            setProductParams: (state, action) => {
                state.productLoaded = false;
                // console.log(action.payload)
                state.productParams ={...state.productParams, ...action.payload, pageNumber: 1};
                // console.log(state.productParams)
            },
            setPageNumber: (state, action) => {
                state.productLoaded = false;
                state.productParams ={...state.productParams, ...action.payload};
            },
            resetProductParams: (state) =>{
                state.productParams = initParams();
            },
            setMetaData: (state, action) =>{
                state.metaData = action.payload
            },
            setProduct: (state, action) =>{
                productAdapter.upsertOne(state, action.payload);
                state.productLoaded = false;
            },
            removeProduct: (state, action) =>{
                productAdapter.removeOne(state, action.payload);
                state.productLoaded = false;

            },

        },
        extraReducers:(builder => {
            builder.addCase(fetchProductsAsync.pending, state =>{
                state.status = "pendingFetchProducts";
            });
            builder.addCase(fetchProductsAsync.fulfilled, (state, action) =>{
                // console.log("fetchProductsAsync.Full => ",action)

                productAdapter.setAll(state, action.payload);
                state.status ="idle";
                state.productLoaded=true;
            });
            builder.addCase(fetchProductsAsync.rejected, (state, action)=>{
                state.status ="idle";
                // console.log("fetchProductsAsync =>", action);
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
                // console.log(action);
            });
            builder.addCase(fetchFiltersAsync.pending, state =>{
                state.status = 'pendingFetchFilters';
            });
            builder.addCase(fetchFiltersAsync.fulfilled, (state, action) =>{
                state.brands = action.payload.brands;
                state.types = action.payload.types;
                state.filtersLoaded = true;
                state.status ="idle";

            });
            builder.addCase(fetchFiltersAsync.rejected, (state, action)=>{
                state.status ="idle";
                // console.log(action);
            });
        })
    }
);

export const productSelectors = productAdapter.getSelectors(state => state.catalog);
export const { resetProductParams, setProductParams, setMetaData, setPageNumber, setProduct, removeProduct } = catalogSlice.actions;
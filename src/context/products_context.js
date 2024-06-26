import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const ProductsContext = React.createContext();

const initialState = {
  isSidebarOpen: false,
  isLoading:false,
  isError:false,
  products:[],
  featured_products:[],
  product_loading:false,
  product_error:false,
  product:{}
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };
  const fetchProducts = async (url)=>{
    try{
      dispatch({type: GET_PRODUCTS_BEGIN});
      const response = await axios.get(url);
      const products = response.data;
      dispatch({type:GET_PRODUCTS_SUCCESS,payload:products});
    }
    catch(e){
      dispatch({type:GET_PRODUCTS_ERROR});
    }
  }
  const fetchProduct = async(url)=>{
    try{
      dispatch({type: GET_SINGLE_PRODUCT_BEGIN});
      const response = await axios.get(url);
      const product = response.data;
      dispatch({type:GET_SINGLE_PRODUCT_SUCCESS,payload:product});
    }
    catch(e){
      dispatch({type:GET_SINGLE_PRODUCT_ERROR});
    }
  }
  useEffect(() =>{
    fetchProducts(url);
  },[]);
  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar,fetchProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};

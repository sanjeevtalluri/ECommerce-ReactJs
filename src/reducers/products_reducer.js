import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  if(action.type === SIDEBAR_OPEN){
    return {...state,isSidebarOpen: true};
  }
  if(action.type === SIDEBAR_CLOSE){
    return {...state,isSidebarOpen: false};
  }
  if(action.type === GET_PRODUCTS_BEGIN){
    return {...state,isLoading:true}
  }
  if(action.type === GET_PRODUCTS_SUCCESS){
    const featured_products = action.payload.filter((product)=>{
      return product.featured === true;
    })
    return {...state,isLoading:false,products:action.payload,featured_products,isError:false};
  }
  if(action.type === GET_PRODUCTS_ERROR){
    return {...state,isLoading:false,isError:true};
  }
  if(action.type === GET_SINGLE_PRODUCT_BEGIN){
    return {...state,product_loading:true}
  }
  if(action.type === GET_SINGLE_PRODUCT_SUCCESS){
    return {...state,product_loading:false,product:action.payload,product_error:false};
  }
  if(action.type === GET_SINGLE_PRODUCT_ERROR){
    return {...state,product_loading:false,product_error:true};
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer

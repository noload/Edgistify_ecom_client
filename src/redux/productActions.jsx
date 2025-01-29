import { fetchProductsApi } from "../utils/api"
import { fetchProductsFailure, fetchProductsStart, fetchProductsSuccess } from "./productSlice";

export const fetchProducts = (category,token)=>async (dispatch)=>{
    dispatch(fetchProductsStart());
    try {
        const  products = await fetchProductsApi(category,token);
        dispatch(fetchProductsSuccess(products))
    } catch (error) {
        
        dispatch(fetchProductsFailure(error))
    }
}
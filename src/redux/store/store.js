import { configureStore } from "@reduxjs/toolkit";
import searchFilterReducer from "../slice/SearchFilterSlice"
import titleHeaderReducer from "../slice/TitleHeaderSlice"
export default configureStore({
    reducer: {
        searchFilter: searchFilterReducer,
        titleHeader: titleHeaderReducer,
    }
})
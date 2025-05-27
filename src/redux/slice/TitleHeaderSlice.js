import { createSlice } from "@reduxjs/toolkit"

export const titleHeaderSlice = createSlice({
    name: "titleHeader",
    initialState: {
        title: "",
        subTitle: ""
    },
    reducers: {
        updateTitleHeader: (state, action) => {
            state.title = action.payload.title;
            state.subTitle = action.payload.subTitle;
        },
        updateSubTitleHeader: (state, action) => {
            state.subTitle = action.payload;
        },

        resetTitleHeader: (state) => {
            state.subTitle = "";
            state.subTitle = "";
        },
    }
})

export const { updateTitleHeader, updateSubTitleHeader, resetTitleHeader } = titleHeaderSlice.actions;
export default titleHeaderSlice.reducer;
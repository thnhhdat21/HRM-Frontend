import { createSlice } from "@reduxjs/toolkit"

export const searchFilterSlice = createSlice({
    name: "searchFilter",
    initialState: {
        name: "",
        type: "",
        status: "",
        pageIndex: "",
        department: [],
        jobPosition: [],
        duty: [],
        dateJoin: ""
    },
    reducers: {
        update: (state, action) => {
            state.name = action.payload.name;
            state.type = action.payload.type;
            state.status = action.payload.status;
            state.pageIndex = action.payload.pageIndex;
            state.department = action.payload.department;
            state.jobPosition = action.payload.jobPosition;
            state.duty = action.payload.duty;
            state.dateJoin = action.payload.dateJoin;
        },
        updateTypeFilter: (state, action) => {
            state.type = action.payload
        },

        updateDepartmentFilter: (state, action) => {
            state.department = action.payload
        },
        updateNameFilter: (state, action) => {
            state.name = action.payload
        },
        updateStatusFilter: (state, action) => {
            state.status = action.payload;
            state.type = '';
        },
        updateSearchFilter: (state, action) => {
            state.name = action.payload.name
            state.dateJoin = action.payload.dateJoin
            state.department = action.payload.department
            state.jobPosition = action.payload.jobPosition
            state.duty = action.payload.duty
            state.pageIndex = 1
            state.type = '';
            state.status = '';
        },
        resetSearchFilter: (state) => {
            state.name = '';
            state.type = '';
            state.status = '';
            state.pageIndex = 1;
            state.department = [];
            state.jobPosition = [];
            state.duty = [];
            state.dateJoin = '';
        }

    }
})

export const { update, updateTypeFilter, updateStatusFilter, updateDepartmentFilter, updateNameFilter, updateSearchFilter, resetSearchFilter } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"

export const searchFilterSlice = createSlice({
    name: "searchFilter",
    initialState: {
        name: "",
        type: "",
        status: "",
        pageIndex: 1,
        department: [],
        jobPosition: [],
        duty: [],
        dateJoin: "",
        yearMonth: "",
        year: 0,
        salaryTableId: 0
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
            state.yearMonth = action.payload.yearMonth;
            state.year = action.payload.year;
            state.salaryTableId = action.payload.salaryTableId;
        },
        updateTypeFilter: (state, action) => {
            state.type = action.payload
        },
        updatePageIndexFilter: (state, action) => {
            state.pageIndex = action.payload
        },

        updateDepartmentFilter: (state, action) => {
            state.department = action.payload
            state.pageIndex = 1
        },
        updateNameFilter: (state, action) => {
            state.name = action.payload
        },
        updateStatusFilter: (state, action) => {
            state.status = action.payload;
            state.type = '';
            state.pageIndex = 1;
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
        updateYearMonthFilter: (state, action) => {
            state.yearMonth = action.payload;
            state.pageIndex = 1
        },
        updateYearFilter: (state, action) => {
            state.year = action.payload;
            state.pageIndex = 1
        },

        updateSalaryTableId: (state, action) => {
            state.salaryTableId = action.payload;
            state.pageIndex = 1
        },

        updateWhenClickNavContract: (state, action) => {
            state.type = action.payload;
            state.pageIndex = 1
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

export const {
    updatePageIndexFilter,
    update,
    updateTypeFilter,
    updateStatusFilter,
    updateDepartmentFilter,
    updateNameFilter,
    updateSearchFilter,
    resetSearchFilter,
    updateYearMonthFilter,
    updateYearFilter,
    updateSalaryTableId,
    updateWhenClickNavContract } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense
} from "../../services/ExpensesAPI";


// GET EXPENSES
export const fetchExpenses = createAsyncThunk(
    "expenses/fetchExpenses",
    async () => {
        const data = await getExpenses();
        return data;
    }
);


// ADD EXPENSE
export const addExpenseThunk = createAsyncThunk(
    "expenses/addExpense",
    async (expense) => {
        const data = await addExpense(expense);
        return data;
    }
);


// UPDATE EXPENSE
export const updateExpenseThunk = createAsyncThunk(
    "expenses/updateExpense",
    async ({ id, expense }) => {
        const data = await updateExpense(id, expense);
        return data;
    }
);


// DELETE EXPENSE
export const deleteExpenseThunk = createAsyncThunk(
    "expenses/deleteExpense",
    async (id) => {
        await deleteExpense(id);
        return id;
    }
);



const expensesSlice = createSlice({
    name: "expenses",

    initialState: {
        expenses: [],
        loading: false,
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {

        builder

            // FETCH
            .addCase(fetchExpenses.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = action.payload;
            })

            .addCase(fetchExpenses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            // ADD
            .addCase(addExpenseThunk.fulfilled, (state, action) => {
                state.expenses.push(action.payload);
            })


            // UPDATE
            .addCase(updateExpenseThunk.fulfilled, (state, action) => {

                const index = state.expenses.findIndex(
                    (item) => item.id === action.payload.id
                );

                if (index !== -1) {
                    state.expenses[index] = action.payload;
                }

            })


            // DELETE
            .addCase(deleteExpenseThunk.fulfilled, (state, action) => {

                state.expenses = state.expenses.filter(
                    (item) => item.id !== action.payload
                );

            });

    }
});

export default expensesSlice.reducer;
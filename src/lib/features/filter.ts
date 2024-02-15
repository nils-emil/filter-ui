import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface FilterState {
  loading: boolean;
  error: boolean;
  filters: Filter[];
}

export interface Filter {
  name: string;
  criteria: FilterCriteria[];
}

export interface FilterCriteria {
  type: string;
  comparisonOperator: string;
  value: string;
}

export const createFilter = createAsyncThunk(
  'filters/create',
  async (newFilter: Filter, thunkAPI) => {
    try {
      await fetch('http://localhost:8080/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFilter),
      });
      thunkAPI.dispatch(fetchFilters());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFilters = createAsyncThunk(
  'filters', async () => {
    const res = await fetch(`http://localhost:8080/filters`);
    return await res.json() as Filter[];
  }
);

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    loading: false,
    error: false,
    filters: [] as Filter[],
  } as FilterState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state: FilterState) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchFilters.fulfilled, (state: FilterState, action: PayloadAction<Filter[]>) => {
        state.filters = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchFilters.rejected, (state: FilterState) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default filterSlice.reducer;
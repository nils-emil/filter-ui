import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {API_URL} from "@/lib/env";

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
  value?: string;
}

export const createFilter = createAsyncThunk(
  'filters/create',
  async (newFilter: Filter, thunkAPI) => {
    await fetch(`${API_URL}/filter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFilter),
    });
    thunkAPI.dispatch(fetchFilters());

  }
);

export const fetchFilters = createAsyncThunk(
  'filters', async () => {
    const res = await fetch(`${API_URL}/filters`);
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
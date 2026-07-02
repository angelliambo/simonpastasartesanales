import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminUser {
  _id: string;
  emailHash: string;
  plan: string;
  role: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  deletedAt?: string | null;
}

interface AdminState {
  users: AdminUser[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  users: [],
  total: 0,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUsers: (
      state,
      action: PayloadAction<{ users: AdminUser[]; total: number }>
    ) => {
      state.users = action.payload.users;
      state.total = action.payload.total;
      state.error = null;
    },
    addUser: (state, action: PayloadAction<AdminUser>) => {
      state.users.unshift(action.payload);
      state.total += 1;
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u._id !== action.payload);
      state.total = Math.max(0, state.total - 1);
    },
    setAdminLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAdminError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    reset: () => initialState,
  },
});

export const {
  setUsers,
  addUser,
  removeUser,
  setAdminLoading,
  setAdminError,
  reset,
} = adminSlice.actions;
export default adminSlice.reducer;

import api from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface IUser {
  tg_id: string;
  first_name: string;
  username: string;
  language_code: string;
  photo_url: string;
}
export interface IUserProfile {
  user_id?: string;
  name?: string;
  sex?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  loking_for?: string;
  photos?: string;
  age?: number;
}
export interface userSlice {
  isLoaded: boolean;

  user: IUser | null;
  profile: IUserProfile | null;
}

const initialState: userSlice = {
  user: null,
  isLoaded: false,
  profile: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const res = await api.post("/auth/me", {
        uts: localStorage.getItem("uts"),
      }); // Замінити на твій endpoint

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchProfile = createAsyncThunk<
  IUserProfile, // Тип результату
  string | undefined // Тип аргументу
>("user/fetchProfile", async (user_id) => {
  try {
    const res = await api.post("/auth/profile", { user_id: user_id });
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoaded = true;
        state.user = null;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.isLoaded = true;
        state.profile = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;

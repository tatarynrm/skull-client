import api from "@/lib/axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  tg_id: string;
  first_name: string;
  username: string;
  language_code: string;
  photo_url: string;
}

export interface IPhoto {
  id: number;
  url: string;
  public_id: string;
  private:boolean;
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
  is_premium?:boolean;
}

export interface userSlice {
  isLoaded: boolean;
  user: IUser | null;
  profile: IUserProfile | null;
  profile_photos: IPhoto[] | null;
}

const initialState: userSlice = {
  user: null,
  isLoaded: false,
  profile: null,
  profile_photos: null,
};

// --- Async actions ---
export const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
  try {
    const res = await api.post("/auth/me", {
      uts: localStorage.getItem("uts"),
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const fetchProfile = createAsyncThunk<IUserProfile, string | undefined>(
  "user/fetchProfile",
  async (user_id) => {
    try {
      const res = await api.post("/auth/profile", { user_id });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchPhotos = createAsyncThunk<IPhoto[], string | undefined>(
  "user/fetchPhotos",
  async (user_id) => {
    try {
      const res = await api.post("/cloudinary/get-photos", { user_id });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// --- Slice ---
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.profile = null;
      state.profile_photos = null;
    },
    setProfilePhotos: (state, action: PayloadAction<IPhoto[]>) => {
      state.profile_photos = action.payload;
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
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.profile_photos = action.payload;
      });
  },
});

export const { logout, setProfilePhotos } = userSlice.actions;

export default userSlice.reducer;

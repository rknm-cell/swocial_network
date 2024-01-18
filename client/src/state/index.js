import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],

}

export const appSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
        },
        setLogout: (state) => {
            state.user = null;
        },
        setFriends: (state, action) => {
            if (state.user){
            state.user.friends = action.payload.friends;
            } else {
                console.error("User not found")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPost = state.posts.map((post)=> {
                if (post._id === action.payload.post._id){
                    return action.payload.post;
                }
            })
            
        },
    }
})

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost} = appSlice.actions;
export default authSlice.reducer;

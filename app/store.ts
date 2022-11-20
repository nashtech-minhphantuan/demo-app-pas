import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../pages/features/counter/counterSlice";
import pokemonReducer from "../pages/features/pokemon/pokemonSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemonsWiki: pokemonReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

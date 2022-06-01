import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './features/users/usersSlice'

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState') || '{}')
  : {}

const store = configureStore({
  reducer: {
    users: usersReducer
  },
  preloadedState: persistedState
})

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

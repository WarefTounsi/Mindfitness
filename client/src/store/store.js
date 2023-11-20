import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user/userSlice'
import conversationReducer from './slices/conversation/conversationSlice'
import messageReducer from './slices/message/messageSlice'
export const store = configureStore({
  reducer: { userReducer, conversationReducer, messageReducer },
})
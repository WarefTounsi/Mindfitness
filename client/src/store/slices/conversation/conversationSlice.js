import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isOpen:false,
  message: "",
  activeConversation: null,
  isOpen: false,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConv: (state, action) => {
      state.conversations = action.payload?.sort(
        (a, b) => new Date(b?.updatedAt) - new Date(a?.updatedAt)
      );
    },
    setActiveConversation: (state, action) => {
      state.activeConversation = action?.payload;
    },
    setIsLoading:(state,action)=>{
      state.isLoading = action?.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action?.payload;
    },
    changeLastMessage: (state, action) => {
      state.conversations = state?.conversations?.map((conversation) =>
        conversation?.id === action?.payload?.conversation
          ? {
              ...conversation,
              id:action?.payload?.conversation,
              lastMessage: {
                ...conversation?.lastMessage,
                content: action?.payload?.content,
              },
            }
          : conversation
      );
    },
    addConversation: (state, action) => {
      const isFound = state.conversations.find(
        (conversation) =>{ 
          return conversation?.id?.toString() === action.payload?.id?.toString()
        }
      );
      if (!isFound) {
        state.conversations.push({...action?.payload,id:action?.payload?.id?.toString()});
      }
    },
  },
});
export const {
  setConv,
  setIsOpen,
  setIsLoading,
  setActiveConversation,
  changeLastMessage,
  addConversation,
} = conversationSlice.actions;


export default conversationSlice.reducer;

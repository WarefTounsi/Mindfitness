import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { setUser, setUsers } from "../../store/slices/user/userSlice";
import {
  setMessages,
  addMessage,
} from "../../store/slices/message/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setConv,
  changeLastMessage,
  setActiveConversation,
  addConversation,
  setIsOpen,
} from "../../store/slices/conversation/conversationSlice";
import { logout } from "../../store/slices/user/userSlice";
import Spinner from "../../components/Spinner/Spinner";
import Card from "../../components/Card/Card";
import User from "../../components/User/User";
import Message from "../../components/Message/Message";
import { io } from "socket.io-client";

function Chat() {

   const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:7005", {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const emitConnectEvent = (newSocket) => {
      let id = JSON.parse(sessionStorage.getItem('auth'))['id'];
      let firstName = JSON.parse(sessionStorage.getItem('auth'))['firstName'];
      let lastName = JSON.parse(sessionStorage.getItem('auth'))['lastName'];

      newSocket.emit("CONNECT", {
        id: id,
        name: firstName,
        lastName: lastName,
        socketID: [newSocket.id],
      });
    };

    newSocket.on('connect', () => {
      console.log('Connected with socket.id:', newSocket.id);
      setSocket(newSocket);
      emitConnectEvent(newSocket);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      setSocket(null);

      // Retry emitting "CONNECT" event
      setTimeout(() => {
        if (!newSocket.connected) {
          emitConnectEvent(newSocket);
        }
      }, 2000); // Adjust the delay as needed
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const dispatch = useDispatch();
  const { user, users, userToDM } = useSelector((state) => state.userReducer);
  const { conversations, isError, isLoading, message, activeConversation , isOpen } =
    useSelector((state) => state.conversationReducer);
  const { messages } = useSelector((state) => state.messageReducer);
  const [loggedIn, setLoggedIn] = useState(true);
  const [loading, setLoading] = useState(isLoading);
  const [content, setContent] = useState("");
  const [userID, setID] = useState(null);
  const Navigate = useNavigate();
  useEffect(() => {
    let id = JSON.parse(sessionStorage.getItem("auth"))["id"];
    setID(id);
    let token = JSON.parse(sessionStorage.getItem("auth"))["accessToken"];
    if (
      token + "" == "undefined" ||
      token === null ||
      token === undefined ||
      !token
    ) {
      return Navigate("/login");
    }
    let config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const getUsers = async () => {
      setLoading(true);
      await axios.get(`http://localhost:8800/user`, config).then((res) => {
        const filteredUsers = res.data.filter((user) => user.id !== id);
        dispatch(setUsers(filteredUsers));
        setLoading(false);
      });
    };
    const setConversations = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:8800/conversations`, config)
        .then((res) => {
          dispatch(setConv(res?.data.data));
          setLoading(false);
        });
    };
    getUsers();
    setConversations();
  }, []);
  useEffect(() => {
    socket?.on("MESSAGE", (data) => {
      dispatch(addConversation(data?.conversation));
      if (activeConversation?.id?.toString() == data?.conversation?.id?.toString()){
        dispatch(addMessage(data?.message));
      }
      dispatch(
        changeLastMessage({
          content: data?.conversation?.lastMessage?.content,
          conversation: data?.conversation?.id,
        })
      );
      if (messages?.length > 1) { 
      document
      .querySelectorAll(".message-box")[messages?.length - 1]
.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, [socket,activeConversation]);

  const onEnterClick = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      sendHandler(e);
    }
  };
  const getMessages = async (convID) => {
    if (convID) {
      setLoading(true);
      let token = JSON.parse(sessionStorage.getItem("auth"))["accessToken"];
      if (
        token + "" == "undefined" ||
        token === null ||
        token === undefined ||
        !token
      ) {
        return () => {
          return Navigate("/login");
        };
      }
      let config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      await axios
        .get(`http://localhost:8800/messages/${convID}`, config)
        .then((res) => {
          dispatch(setMessages(res.data?.data));
          setLoading(false);
        });
    }
  };

  const sendHandler = async (e) => {
    e.preventDefault();
    let token = JSON.parse(sessionStorage.getItem("auth"))["accessToken"];
    if (
      token + "" == "undefined" ||
      token === null ||
      token === undefined ||
      !token
    ) {
      return () => {
        return Navigate("/login");
      };
    }
    let config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    if (activeConversation) {
      let usertodm =
        activeConversation?.createdBy?.id !== userID
          ? activeConversation?.createdBy
          : activeConversation?.with;
      socket.emit("MESSAGE", {
        usertodm,
        message: {
          createdBy: {
            id: userID,
            firstName: JSON.parse(sessionStorage.getItem("auth"))["firstName"],
            lastName: JSON.parse(sessionStorage.getItem("auth"))["lastName"],
          },
          content,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        conversation: {...activeConversation,lastMessage:{...activeConversation.lastMessage,content:content}},
      });
      setContent("");
      await axios.post(
        `http://localhost:8800/messages`,
        {
          conversation: activeConversation?.id,
          content,
          createdAt: Date.now(),
        },
        config
      );
      dispatch(
        addMessage({
          createdBy: {
            id: userID,
            firstName: JSON.parse(sessionStorage.getItem("auth"))["firstName"],
            lastName: JSON.parse(sessionStorage.getItem("auth"))["lastName"],
          },
          content,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          conversation: activeConversation?.id,
        })
      );
      dispatch(
        changeLastMessage({
          content,
          conversation: activeConversation?.id,
        })
      );
      if (messages?.length > 1) {
        document
        .querySelectorAll(".message-box")[messages.length - 1]
.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      await axios
        .post(
          `http://localhost:8800/messages`,
          {
            content,
            createdAt: Date.now(),
            with: userToDM?.id,
          },
          config
        )
        .then((res) => {
          socket.emit("MESSAGE", {
            usertodm: userToDM,
            message: res?.data?.data?.message,
            conversation: res?.data?.data?.conversation,
          });
          dispatch(addConversation(res?.data?.data?.conversation));
          dispatch(setActiveConversation(res?.data?.data?.conversation));
          dispatch(
            addMessage({
              createdBy: { id: userID },
              content,
              createdAt: Date.now(),
              conversation: res?.data?.data?.conversation?.id,
            })
          );
          dispatch(
            changeLastMessage({
              content: content,
              conversation: res?.data?.data?.conversation?.id,
            })
          );
      setContent("");
        });
    }
  };
  return (
    <>
      {loading && <Spinner />}
      <div className="main-container">
        <div className="conversations-container">
          {conversations?.length > 0 &&
            conversations.map((conversation) => {
              return (
                <Card
                  with={
                    conversation?.with
                      ? conversation?.with
                      : conversation?.createdBy
                  }
                  createdBy={conversation?.createdBy}
                  updatedAt={conversation?.updatedAt}
                  getMessages={getMessages}
                  conversation={conversation}
                  dispatch={dispatch}
                  id={conversation?._id}
                  title={
                    userID && userID?.toString() ===
                    conversation?.createdBy?.id?.toString()
                      ? conversation?.with?.firstName +" " +
                        conversation?.with?.lastName
                      : conversation?.createdBy?.firstName + " "+
                        conversation?.createdBy?.lastName
                  }
                  content={conversation?.lastMessage?.content}
                />
              );
            })}
        </div>
        {isOpen && (
          <div class="chat-card-container">
            <div class="chat-card-header">
              <div className="user-name">
                <div class="img-avatar"></div>
                <div class="text-chat">
                  {activeConversation &&
                  userID === activeConversation?.createdBy?.id
                    ? activeConversation?.with?.firstName +
                      " " +
                      activeConversation?.with?.lastName
                    : userID === activeConversation?.with?.id
                    ? activeConversation?.createdBy?.firstName +
                      " " +
                      activeConversation?.createdBy?.lastName
                    : userToDM &&
                      userToDM?.firstName + " " + userToDM?.lastName}
                </div>
              </div>
              <button
                onClick={() => dispatch(setIsOpen(false))}
                className="close-btn btn"
              >
                {" "}
                Close
              </button>
            </div>
            <div class="chat-card-body">
              <div class="messages-container">
                {messages?.length > 0 &&
                  messages?.map((msg) => (
                    <Message
                      userID={userID}
                      content={msg?.content}
                      createdBy={msg?.createdBy?.id}
                    />
                  ))}
              </div>
              <div class="message-input">
                <form>
                  <textarea
                    value={content}
                    placeholder="Type your message here"
                    class="message-send"
                    onKeyDown={onEnterClick}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <button
                    type="submit"
                    class="button-send"
                    onClick={(e) => sendHandler(e)}
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="users-container">
          {users?.length > 0 &&
            users?.map((el) => {
              return (
                <User
                  getMessages={getMessages}
                  id={el?.id}
                  dispatch={dispatch}
                  firstName={el?.firstName}
                  lastName={el?.lastName}
                  img={el?.img}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Chat;

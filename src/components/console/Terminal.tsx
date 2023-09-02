import React, { useEffect, useState } from "react";
import router from "next/router";
import { Get, Post } from "@/services/ApiService";
import { UserInterface } from "@/interfaces/UserInterface";

export default function Terminal() {
  const [messages, setMessages] = useState<object[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [userName, setUserName] = useState<string>("anonymous");
  const [tryAuth, setTryAuth] = useState<boolean>(false);
  const [authData, setAuthData] = useState<UserInterface>({
    username: null,
    password: null,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleLogin = async ({ username, password }: UserInterface) => {
    const result = await Post("/api/auth", { username, password });
    if (result.success) {
      localStorage.setItem("TOKEN", result.token);
    } else {
      const chatsData = await Post("/api/chats/update", {
        username: "error",
        message: result.message,
        time: new Date(),
      });
      if (chatsData.success) {
        setMessages(chatsData.chats);
      }
    }
    setInputText("");
    getCurrentUser();
    setTryAuth(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tryAuth) {
      if (!authData.username && inputText.length > 0) {
        setAuthData({ ...authData, username: inputText.toLowerCase() });
        setInputText("");
      } else if (!authData.password && inputText.length > 0) {
        setAuthData({ ...authData, password: inputText });
        handleLogin({ username: authData.username, password: inputText });
        setInputText("");
      } else if (authData.username && authData.password) {
        handleLogin(authData);
      }
    } else if (inputText.length > 0) {
      switch (inputText.toLowerCase()) {
        case "home":
          router.push("/");
          break;
        case "login":
          setTryAuth(true);
          setInputText("");
          break;
        case "ui-login":
          router.push("/auth/login");
          break;
        case "logout":
          localStorage.removeItem("TOKEN");
          router.push("/");
          setTryAuth(false);
          break;
        case "clear" || "delete":
          clearMessages();
          break;
        case "delete --all":
          if (userName !== "anonymous") {
            const res = await Get("/api/chats/delete");
            if (res.success) {
              setMessages([]);
              setInputText("");
            } else {
              const result = await Post("/api/chats/update", {
                username: "error",
                message: res.message,
                time: new Date(),
              });
              if (result.success) {
                setMessages(result.chats);
              }
              setInputText("");
            }
          } else {
            const result = await Post("/api/chats/update", {
              username: "error",
              message:
                "Oops! looks like you are not eligible to perform this action.",
              time: new Date(),
            });
            if (result.success) {
              setMessages(result.chats);
            }
            setInputText("");
            break;
          }
          break;
        default:
          const result = await Post("/api/chats/update", {
            username: userName,
            message: inputText,
            time: new Date(),
          });
          if (result.success) {
            setMessages(result.chats);
          }
          setInputText("");
          break;
      }
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const getInputType = () => {
    if (tryAuth && !authData.username) {
      return "username";
    } else if (tryAuth && !authData.password) {
      return "password";
    }
    return userName;
  };

  const getInitialMessage = async () => {
    const result = await Get("/api/chats/get");
    if (result.success) {
      setMessages(result.chats);
    }
  };

  const getCurrentUser = async () => {
    if (localStorage.getItem("TOKEN")) {
      const userData = JSON.parse(
        atob(localStorage.getItem("TOKEN") as string)
      );
      setUserName(userData?.username as string);
    } else {
      setUserName("anonymous");
    }
  };

  const handleInputFocus = () => {
    document.getElementById("xinput")?.focus();
  };

  useEffect(() => {
    getInitialMessage();
    getCurrentUser();
  }, []);

  return (
    <div
      onClick={handleInputFocus}
      className="terminal bg-black p-4 h-screen font-fira"
    >
      <div className="terminal-header flex justify-between items-center"></div>
      <div className="terminal-body mt-2 overflow-y-auto">
        {messages.map((message: any, index) => (
          <div key={index} className="mb-1">
            <p>
              <b
                className={
                  userName === message.username
                    ? "text-purple-500"
                    : "text-green-500"
                }
              >
                {message.username}:&nbsp;
              </b>
              {message.message}
            </p>
          </div>
        ))}
      </div>
      <div className="terminal-input mt-2">
        <form onSubmit={handleSubmit} className="flex">
          <div className="flex w-full">
            <div className="flex-none">
              <b className="text-purple-500">{getInputType()}:&nbsp;</b>
            </div>
            <input
              id="xinput"
              type="text"
              value={inputText}
              onChange={handleInputChange}
              style={{ caretShape: "underscore" }}
              className="flex-auto bg-transparent focus:outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

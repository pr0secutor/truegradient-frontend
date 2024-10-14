import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../appSlice";

import { IoSaveOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import BACKEND_URL from "../constants";

const Dash = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState();
  const [chatLog, setChatLog] = useState(() => {
    // Initialize from localStorage, or set default value
    const storedChatLog = localStorage.getItem("chatLog");
    return storedChatLog
      ? JSON.parse(storedChatLog)
      : [{ user: "begin", message: "What can I do for you?" }];
  });

  useEffect(() => {
    if (chatLog.length > 0) {
      localStorage.setItem("chatLog", JSON.stringify(chatLog));
    }
  }, [chatLog]);

  useEffect(() => {
    localStorage.setItem(`chatLog`, JSON.stringify(chatLog));
  }, [chatLog]);

  useEffect(() => {
    dispatch(setCurrentPage("Dash"));
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setChatLog([...chatLog, { user: "me", message: input }]);

    const data = { question: input };
    setInput("");
    setRows(1);

    try {
      const res = await axios.post(`${BACKEND_URL}/api`, data);
      console.log(res.data.data.result_text);
      setChatLog((ChatLog) => [
        ...ChatLog,
        { ...res.data.data, user: "agent", message: res.data.data.result_text },
      ]);
    } catch (error) {}
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents adding a new line
      handleOnSubmit(e); // Calls form submit function
    }
  };

  const [rows, setRows] = useState(1);
  const maxRows = 3;

  const handleInputChange = (e) => {
    // const textareaLineHeight = 24; // assuming each row is 24px tall
    // const previousRows = e.target.rows;
    // e.target.rows = 1; // reset number of rows in textarea

    // const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

    // if (currentRows === previousRows) {
    //   e.target.rows = currentRows;
    // }

    // if (currentRows >= maxRows) {
    //   e.target.rows = maxRows;
    //   e.target.scrollTop = e.target.scrollHeight;
    // }

    // setRows(currentRows < maxRows ? currentRows : maxRows);
    setInput(e.target.value);
  };

  const handleOnClearChat = () => {
    setChatLog((chatLog) => chatLog.length > 0 && [chatLog[0]]);
    setInput("");
    setRows(1);
  };

  return (
    <div>
      <div className="flex h-[95vh] w-full flex-col">
        <div className="flex-1 overflow-y-auto rounded-xl py-4 pr-4 text-sm leading-6 text-slate-900 sm:text-base sm:leading-7">
          {chatLog?.map((message, index) => {
            return <MessageBox message={message} />;
          })}
        </div>

        <form className="mt-2" onSubmit={handleOnSubmit}>
          <label htmlFor="chat-input" className="sr-only">
            Enter your prompt
          </label>
          <div className="relative flex min-w-0 flex-1 flex-col">
            <textarea
              id="chat-input"
              value={input}
              className="block w-full resize-none rounded-xl border-none bg-slate-200 p-4 pl-4 pr-24 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base no-scrollbar"
              placeholder="Enter your prompt"
              rows={rows}
              required
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            >
              {input}
            </textarea>
            <button
              type="submit"
              className="absolute bottom-2 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base"
            >
              Send <span className="sr-only">Send message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MessageBox = ({ message }) => {
  const user_css = "py-4 flex-row ";
  const agent_css = "py-6 mb-4 rounded-xl bg-slate-200";

  const user_img = "https://dummyimage.com/256x256/363536/ffffff&text=U";
  const agent_img = "https://dummyimage.com/256x256/354ea1/ffffff&text=G";

  const email = localStorage.getItem("email")

  const saveResponse = async (e) => {
    e.preventDefault();
    const data = {
      created_by: email,
      question: message.question,
      summary: message.summary,
      result_text: message.result_text,
      result_table_path: message.result_table_path,
      result_visualization_path: message.result_visualization_path,
      error: message.error,
    };

    try {
      const res = await axios.post(`${BACKEND_URL}/save_response`, data);

      if (res.status === 200) toast.success("Response Saved");
    } catch (error) {
      if(error.status === 409) toast.error("Response Already saved");
    }
  };

  return (
    <>
      <div
        className={`flex px-2 sm:px-4 ${
          message.user === "agent" ? agent_css : user_css
        }`}
      >
        <img
          className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
          src={message.user === "me" ? user_img : agent_img}
          alt="profile-pic"
        />

        <div className="flex max-w-3xl items-center">
          <p>{message.message}</p>
        </div>
      </div>

      {message.user === "agent" && (
        <div className="mb-2 flex w-full flex-row justify-end gap-x-2 text-slate-500">
          <button className="hover:text-blue-600" onClick={saveResponse}>
            <IoSaveOutline className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default Dash;

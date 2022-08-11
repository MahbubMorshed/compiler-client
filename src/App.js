import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
// import 'codemirror/keymap/sublime'
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import "./App.css";
import axios from "axios";

function App() {
  const [code, setCode] = useState("a = 0");
  const [testCases, setTestCases] = useState([]);

  const submitCode = () => {
    axios.post("http://localhost:80/python", { code }).then(({ data }) => {
      setTestCases([data.passOrFail]);
    });
    // console.log(code);
  };

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="absolute top-20 bottom-40 left-10 right-10 text-left">
          <div>Create a function that adds two numbers in python.</div>
          {testCases.map((testCase, i) => {
            return (
              <div key={i}>
                <div>{testCase}</div>
              </div>
            );
          })}
          <CodeMirror
            value={code}
            // value="console.log('hello world!');"
            height="200px"
            theme={dracula}
            extensions={[python()]}
            onChange={onChange}
          />
          <div className="border-2 bg-green-600" onClick={submitCode}>
            Submit
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

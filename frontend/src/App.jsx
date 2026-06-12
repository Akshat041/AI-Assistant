import { useState } from "react";
import api from "./services/api";
import MyButton from "./components/GenerateButton";
import PromptInput from "./components/PromptInput";
import ResponseBox from "./components/ResponseBox";
import "./App.css";

function App() {
  const [response, setResponse] = useState("Placeholder response.");
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      if (!prompt || prompt.trim() === "") {
        setResponse("Please enter a prompt.");
        return;
      }
      setLoading(true);
      // send the request to the backend and get the response
      // result = { data: { response: "This is a response from the backend." } }
      const result = await api.post("/generate", { prompt });
      setResponse(result?.data?.response ?? "No response received.");
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Error generating response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI Assistant</h1>
      <PromptInput value={prompt} onChange={setPrompt} />
      <MyButton onClick={handleClick} disabled={loading} />
      <ResponseBox response={response} />
    </div>
  );
}

export default App;

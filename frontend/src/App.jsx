import { useState, useEffect } from "react";
import api from "./services/api";
import MyButton from "./components/GenerateButton";
import PromptInput from "./components/PromptInput";
import ConversationHistory from "./components/ConversationHistory";
import Roadmap from "./components/Roadmap";
import "./App.css";

function App() {
  const [response, setResponse] = useState("Placeholder response.");
  const [roadmap, setRoadmap] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConversations = async () => {
    try {
      // Fetch the conversation history from the backend
      const result = await api.get("/conversations");
      setConversations(result?.data ?? []);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleClick = async () => {
    try {
      if (!prompt || prompt.trim() === "") {
        setResponse("Please enter a prompt.");
        return;
      }
      setLoading(true);
      const result = await api.post("/generate", { prompt });
      // Prefer an explicit `roadmap` object from the API, fallback to `response`.
      // setResponse(result?.data?.response ?? "No response received.");
      setRoadmap(result?.data?.roadmap ?? result?.data ?? null);
      await fetchConversations();
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Error generating response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI Project Architect</h1>
      <PromptInput value={prompt} onChange={setPrompt} />
      <MyButton onClick={handleClick} disabled={loading} />
      <div className="response-section">
        <h2>Current Response</h2>
        <div className="section-divider" />
        <Roadmap roadmap={roadmap}></Roadmap>
      </div>
      <ConversationHistory conversations={conversations} />
    </div>
  );
}

export default App;

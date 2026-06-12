export default function PromptInput({ value, onChange }) {
  return (
    <div className="prompt-input">
      <input
        type="text"
        placeholder="Enter your prompt..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

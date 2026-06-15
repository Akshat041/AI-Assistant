export default function ConversationHistory({ conversations }) {
  return (
    <section className="conversation-history-section">
      <h2>Conversation History</h2>
      <div className="section-divider" />
      <div className="conversation-history">
        {conversations.length === 0 ? (
          <div className="conversation-empty">
            No previous conversations yet.
          </div>
        ) : (
          conversations.map((conversation) => (
            <div key={conversation.id} className="conversation-entry">
              <div className="conversation-prompt">
                <strong>Prompt:</strong> {conversation.prompt}
              </div>
              <div className="conversation-response">
                <strong>Response:</strong> {conversation.response}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

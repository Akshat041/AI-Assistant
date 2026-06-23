import React, { useEffect } from "react";

function tryParseJSON(val) {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch (e) {
      return null;
    }
  }
  return val;
}

function extractMetadata(roadmap) {
  if (!roadmap) return null;

  // Debug-friendly: attempt to parse stringified payloads and prefer `response` field
  const raw = roadmap?.response ?? roadmap;
  const parsed = tryParseJSON(raw) ?? raw;

  // If parsed is now an object, pick relevant keys
  if (parsed && typeof parsed === "object") {
    const keys = [
      "projectName",
      "summary",
      "estimatedDifficulty",
      "estimatedDuration",
      "milestones",
    ];
    const picked = {};
    keys.forEach((k) => {
      if (parsed[k] !== undefined && parsed[k] !== null) picked[k] = parsed[k];
    });
    return Object.keys(picked).length ? picked : null;
  }

  return null;
}

export default function Roadmap({ roadmap }) {
  const metadata = extractMetadata(roadmap);

  useEffect(() => {
    console.debug("Roadmap prop:", roadmap);
    console.debug("Extracted metadata:", metadata);
  }, [roadmap, metadata]);

  if (!metadata) {
    return (
      <div className="roadmap-metadata">No roadmap metadata available.</div>
    );
  }

  const {
    projectName,
    summary,
    estimatedDifficulty,
    estimatedDuration,
    milestones,
  } = metadata;

  return (
    <div className="roadmap-metadata">
      {projectName && <h3>{projectName}</h3>}
      {summary && <p>{summary}</p>}
      {(estimatedDifficulty || estimatedDuration) && (
        <p>
          <strong>Difficulty:</strong> {estimatedDifficulty || "N/A"}
          {" \u2022 "}
          <strong>Duration:</strong> {estimatedDuration || "N/A"}
        </p>
      )}

      <div className="roadmap-milestones">
        <h4>Milestones</h4>
        {Array.isArray(milestones) && milestones.length ? (
          <ol>
            {milestones.map((m) => (
              <li key={m.id ?? m.title}>
                {m.title && <strong>{m.title}</strong>}
                {m.goal && <p>{m.goal}</p>}

                {Array.isArray(m.steps) && m.steps.length ? (
                  <ul>
                    {m.steps.map((s) => (
                      <li key={s.id ?? s.task}>{s.task}</li>
                    ))}
                  </ul>
                ) : null}

                {m.verification && (
                  <p>
                    <em>Verification:</em> {m.verification}
                  </p>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <div>No milestones available.</div>
        )}
      </div>
    </div>
  );
}

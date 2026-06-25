export default function ProjectList({ projects }) {
  return (
    <section className="project-list-section">
      <h2>Projects</h2>
      <div className="section-divider" />
      <div className="projects">
        {projects.length === 0 ? (
          <div className="project-empty">No previous projects yet.</div>
        ) : (
          [...projects]
            .slice()
            .reverse()
            .map((project) => {
              const roadmap = tryParseJSON(project.response);
              return (
                <div key={project.id} className="project-entry">
                  <div className="project-response">
                    {roadmap?.projectName || "Untitled Project!"}
                  </div>
                </div>
              );
            })
        )}
      </div>
    </section>
  );
}

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

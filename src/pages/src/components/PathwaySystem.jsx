import React, { useState } from "react";

const NAVY = "#102A43";
const GOLD = "#F6C453";
const SKY = "#4EA8FF";
const WHITE = "#FFFFFF";
const LIGHT_GRAY = "#F8FAFC";

const paths = [
  {
    year: "Freshman Year", icon: "📖", color: "#4EA8FF", progress: 25,
    steps: [
      { label: "Join 1 club or activity" }, { label: "Build a basic resume" },
      { label: "Develop a study system" }, { label: "Meet with your school counselor" },
      { label: "Start a GPA tracking habit" },
    ],
    resources: [
      { label: "Canva Resume Templates", url: "https://www.canva.com/resumes/templates/high-school/" },
      { label: "Khan Academy Study Tools", url: "https://www.khanacademy.org" },
    ],
  },
  {
    year: "Sophomore Year", icon: "📐", color: "#6EE7B7", progress: 50,
    steps: [
      { label: "Start volunteering (10+ hrs)" }, { label: "Explore career interests" },
      { label: "Take PSAT prep" }, { label: "Shadow a professional" },
      { label: "Grow leadership in a club" },
    ],
    resources: [
      { label: "MyFuture Career Explorer", url: "https://www.myfuture.com/" },
      { label: "Khan Academy PSAT Prep", url: "https://www.khanacademy.org/test-prep/psat-nmsqt" },
    ],
  },
  {
    year: "Junior Year", icon: "🎯", color: GOLD, progress: 75,
    steps: [
      { label: "Create SAT/ACT study plan" }, { label: "Search internship opportunities" },
      { label: "Build your college list" }, { label: "Request teacher recommendations" },
      { label: "Research scholarship databases" },
    ],
    resources: [
      { label: "College Board SAT Prep", url: "https://www.collegeboard.org/search/colleges" },
      { label: "Scholarships.com", url: "https://www.scholarships.com/" },
    ],
  },
  {
    year: "Senior Year", icon: "🎓", color: "#F87171", progress: 100,
    steps: [
      { label: "Complete college applications" }, { label: "Apply for scholarships" },
      { label: "Submit FAFSA early" }, { label: "Write personal statements" },
      { label: "Compare financial aid offers" },
    ],
    resources: [
      { label: "FAFSA Official Guide", url: "https://studentaid.gov/h/apply-for-aid/fafsa" },
      { label: "Common App", url: "https://www.commonapp.org/" },
    ],
  },
];

function PathCard({ path, isActive, onClick }) {
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [hovered, setHovered] = useState(false);

  const toggleStep = (e, i) => {
    e.stopPropagation();
    setCheckedSteps((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  };

  const progressPct = Math.round((checkedSteps.length / path.steps.length) * 100);

  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: isActive ? WHITE : LIGHT_GRAY, borderRadius: 18,
        border: `2px solid ${isActive ? path.color : hovered ? path.color + "88" : "#e8edf2"}`,
        boxShadow: isActive ? `0 16px 48px rgba(16,42,67,0.18), 0 0 0 3px ${path.color}22` : hovered ? `0 8px 28px rgba(16,42,67,0.12)` : `0 4px 16px rgba(16,42,67,0.07)`,
        overflow: "hidden", cursor: "pointer", transition: "all 0.28s ease",
        transform: isActive ? "scale(1.02)" : hovered ? "translateY(-4px)" : "none",
      }}>
      <div style={{ background: isActive ? `linear-gradient(135deg, ${NAVY} 0%, #1a3a5c 100%)` : `linear-gradient(135deg, ${NAVY}cc 0%, #1a3a5c99 100%)`, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: "2rem", background: `${path.color}22`, border: `2px solid ${path.color}66`, borderRadius: "50%", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>{path.icon}</span>
          <div>
            <div style={{ color: path.color, fontSize: "0.72rem", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 2 }}>Pathway</div>
            <div style={{ color: WHITE, fontWeight: 800, fontSize: "1.1rem" }}>{path.year}</div>
          </div>
        </div>
        <div style={{ color: isActive ? GOLD : "rgba(255,255,255,0.5)", fontSize: "1.4rem", transition: "transform 0.3s ease", transform: isActive ? "rotate(90deg)" : "rotate(0deg)" }}>›</div>
      </div>
      <div style={{ padding: "12px 28px 0", background: isActive ? WHITE : LIGHT_GRAY }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#6b8499", marginBottom: 6, fontWeight: 600 }}>
          <span>Progress</span><span style={{ color: path.color, fontWeight: 700 }}>{progressPct}%</span>
        </div>
        <div style={{ height: 7, background: "#e8edf2", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: `linear-gradient(90deg, ${path.color}, ${path.color}bb)`, borderRadius: 99, transition: "width 0.5s ease" }} />
        </div>
      </div>
      {isActive && (
        <div style={{ padding: "20px 28px 28px", background: WHITE }}>
          <p style={{ fontSize: "0.82rem", color: "#6b8499", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Checklist — click to check off steps</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {path.steps.map((step, i) => {
              const isDone = checkedSteps.includes(i);
              return (
                <div key={i} onClick={(e) => toggleStep(e, i)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: isDone ? `${path.color}18` : LIGHT_GRAY, border: `1.5px solid ${isDone ? path.color + "55" : "#e8edf2"}`, cursor: "pointer", transition: "all 0.2s ease" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${isDone ? path.color : "#c8d6e0"}`, background: isDone ? path.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s ease", fontSize: "0.75rem" }}>
                    {isDone && <span style={{ color: NAVY, fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: "0.9rem", color: isDone ? "#6b8499" : NAVY, fontWeight: 500, textDecoration: isDone ? "line-through" : "none", transition: "all 0.2s ease" }}>{step.label}</span>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: "0.82rem", color: "#6b8499", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Key Resources</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {path.resources.map((res) => (
              <a key={res.label} href__={res.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${path.color}18`, border: `1.5px solid ${path.color}55`, color: NAVY, fontWeight: 700, fontSize: "0.82rem", padding: "7px 14px", borderRadius: 50, textDecoration: "none", transition: "all 0.2s ease" }}>
                {res.label} →
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PathwaySystem() {
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <section id="pathways" style={{ padding: "clamp(48px, 8vw, 96px) 5%", background: LIGHT_GRAY }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: GOLD, background: `${GOLD}18`, padding: "5px 14px", borderRadius: 50, marginBottom: 16 }}>Student Pathways</div>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: NAVY, letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 16 }}>Your Year-by-Year Journey</h2>
        <p style={{ fontSize: "1.05rem", color: "#6b8499", maxWidth: 600, lineHeight: 1.7, marginBottom: 48 }}>Not random tips — a structured roadmap from freshman year to college acceptance. Click each path to expand your checklist.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {paths.map((path, i) => (
            <PathCard key={path.year} path={path} isActive={activeIdx === i} onClick={() => setActiveIdx(activeIdx === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

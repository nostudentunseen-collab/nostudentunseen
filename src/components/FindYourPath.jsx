import React, { useState } from "react";
import { base44 } from "@/api/base44Client";

const NAVY = "#102A43";
const GOLD = "#F6C453";
const SKY = "#4EA8FF";
const WHITE = "#FFFFFF";

const questions = [
  { q: "What do you enjoy most?", options: ["Building & creating things", "Helping and working with people", "Solving puzzles & problems", "Writing, art, or performing"] },
  { q: "How do you like to learn?", options: ["Hands-on projects & labs", "Reading and self-study", "Group discussions & teamwork", "Videos and online courses"] },
  { q: "Which subject excites you most?", options: ["Math & Computer Science", "Science & Health", "Business & Economics", "English, History & Arts"] },
  { q: "Are you more into tech, business, or creative work?", options: ["Tech all the way", "Business & entrepreneurship", "Creative arts & media", "A mix of everything"] },
  { q: "Do you want to go to college or explore trades/vocational paths?", options: ["4-year college is my goal", "Community college first", "Trades, apprenticeship, or vocational", "I'm still figuring it out"] },
  { q: "What kind of impact do you want to make?", options: ["Innovate with technology", "Build businesses & wealth", "Heal and serve my community", "Express and inspire others"] },
];

export default function FindYourPath() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (option) => {
    setSelected(option);
    setTimeout(() => {
      const newAnswers = [...answers, option];
      if (current < questions.length - 1) {
        setAnswers(newAnswers); setCurrent(current + 1); setSelected(null);
      } else { submitQuiz(newAnswers); }
    }, 350);
  };

  const submitQuiz = async (finalAnswers) => {
    setLoading(true);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a high school career counselor helping a student find their path. Based on their quiz answers below, give them ONE career/academic path recommendation with specific clubs, certifications, internships, colleges, and a roadmap.\n\nQuiz answers:\n${questions.map((q, i) => `Q: ${q.q}\nA: ${finalAnswers[i]}`).join("\n\n")}\n\nRespond with a JSON object exactly like this:\n{\n  "pathName": "Cybersecurity Path",\n  "emoji": "🔐",\n  "description": "2-3 sentence personalized description of why this fits them",\n  "clubs": ["Club 1", "Club 2", "Club 3"],\n  "certifications": ["Cert 1", "Cert 2"],\n  "internships": ["Internship type 1", "Internship type 2"],\n  "colleges": ["College 1", "College 2", "College 3"],\n  "roadmap": ["Freshman: action", "Sophomore: action", "Junior: action", "Senior: action"]\n}`,
        response_json_schema: {
          type: "object",
          properties: {
            pathName: { type: "string" }, emoji: { type: "string" }, description: { type: "string" },
            clubs: { type: "array", items: { type: "string" } },
            certifications: { type: "array", items: { type: "string" } },
            internships: { type: "array", items: { type: "string" } },
            colleges: { type: "array", items: { type: "string" } },
            roadmap: { type: "array", items: { type: "string" } },
          },
        },
      });
      setResult(res);
    } catch { setResult({ error: true }); }
    setLoading(false);
  };

  const restart = () => { setCurrent(0); setAnswers([]); setResult(null); setSelected(null); setLoading(false); };
  const progress = (current / questions.length) * 100;

  return (
    <section id="quiz" style={{ padding: "clamp(48px, 8vw, 96px) 5%", background: NAVY }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: GOLD, background: `${GOLD}22`, padding: "5px 14px", borderRadius: 50, marginBottom: 16 }}>Find Your Path</div>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: WHITE, letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 12 }}>What's Your Future?</h2>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 40 }}>Answer 6 quick questions and our AI will map out a personalized high school career path — just for you.</p>

        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "clamp(20px, 5vw, 40px)", backdropFilter: "blur(10px)" }}>
          {!result && !loading && (
            <>
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
                  <span>Question {current + 1} of {questions.length}</span>
                  <span style={{ color: GOLD, fontWeight: 700 }}>{Math.round(progress)}% complete</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${SKY}, ${GOLD})`, borderRadius: 99, transition: "width 0.4s ease" }} />
                </div>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: WHITE, marginBottom: 24, lineHeight: 1.4 }}>{questions[current].q}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {questions[current].options.map((opt) => {
                  const isSelected = selected === opt;
                  return (
                    <button key={opt} onClick={() => handleAnswer(opt)}
                      style={{ textAlign: "left", padding: "16px 20px", borderRadius: 12, border: `1.5px solid ${isSelected ? GOLD : "rgba(255,255,255,0.15)"}`, background: isSelected ? `${GOLD}22` : "rgba(255,255,255,0.04)", color: isSelected ? GOLD : "rgba(255,255,255,0.85)", fontSize: "0.95rem", fontWeight: isSelected ? 700 : 500, cursor: "pointer", transition: "all 0.2s ease", transform: isSelected ? "scale(1.02)" : "scale(1)", fontFamily: "'Inter', sans-serif" }}
                      onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = `${SKY}88`; e.currentTarget.style.background = "rgba(78,168,255,0.08)"; e.currentTarget.style.transform = "translateX(4px)"; } }}
                      onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateX(0)"; } }}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {loading && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ width: 56, height: 56, border: `4px solid rgba(255,255,255,0.1)`, borderTop: `4px solid ${GOLD}`, borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 24px" }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem" }}>✨ AI is analyzing your answers...</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: 8 }}>Building your personalized roadmap</p>
            </div>
          )}

          {result && !result.error && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>{result.emoji}</div>
                <div style={{ color: GOLD, fontSize: "0.75rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>You Might Fit</div>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: WHITE, marginBottom: 12 }}>{result.pathName}</h3>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>{result.description}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 24 }}>
                {[{ label: "🎭 Clubs to Join", items: result.clubs }, { label: "📜 Certifications", items: result.certifications }, { label: "💼 Internship Types", items: result.internships }, { label: "🏛️ Target Colleges", items: result.colleges }].map(({ label, items }) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "18px 20px" }}>
                    <div style={{ color: GOLD, fontWeight: 700, fontSize: "0.85rem", marginBottom: 12 }}>{label}</div>
                    {items?.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                        <span style={{ color: SKY, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "20px 24px", marginBottom: 28 }}>
                <div style={{ color: GOLD, fontWeight: 700, fontSize: "0.85rem", marginBottom: 14 }}>🗺️ Your Roadmap</div>
                {result.roadmap?.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < result.roadmap.length - 1 ? 16 : 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: GOLD, color: NAVY, fontWeight: 800, fontSize: "0.78rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                      {i < result.roadmap.length - 1 && <div style={{ width: 2, flex: 1, background: `${GOLD}33`, marginTop: 4 }} />}
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: 1.5, paddingBottom: i < result.roadmap.length - 1 ? 16 : 0 }}>{step}</p>
                  </div>
                ))}
              </div>
              <button onClick={restart}
                style={{ width: "100%", padding: "14px", borderRadius: 50, border: `1.5px solid ${GOLD}55`, background: "transparent", color: GOLD, fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${GOLD}18`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                Retake Quiz →
              </button>
            </div>
          )}

          {result?.error && (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>Something went wrong. Please try again.</p>
              <button onClick={restart} style={{ marginTop: 16, padding: "12px 28px", borderRadius: 50, background: GOLD, color: NAVY, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Try Again</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

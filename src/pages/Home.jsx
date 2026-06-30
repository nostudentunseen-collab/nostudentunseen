import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import PathwaySystem from "@/components/PathwaySystem";
import FindYourPath from "@/components/FindYourPath";

const NAVY = "#102A43";
const GOLD = "#F6C453";
const SKY = "#4EA8FF";
const WHITE = "#FFFFFF";
const LIGHT_GRAY = "#F8FAFC";

const GOFUNDME_URL = "https://www.gofundme.com/f/your-support-helps-students-succeed-in-high-school-wrfvx?attribution_id=sl:a2a5b3a3-f0fa-4012-8c90-bf71fa592889&lang=en_US&ts=1779935788&utm_campaign=man_sharesheet_dash&utm_content=amp17_td-amp20_t1&utm_medium=customer&utm_source=copy_link";
const UNITED_WAY_URL = "https://unitedwaynca.org/what-we-do/our-programs/education/";
const INSTAGRAM_URL = "https://www.instagram.com/nostudentunseen_/";
const EMAIL = "NoStudentUnseen@gmail.com";
const LOGO_URL = "https://media.base44.com/images/public/6a1356cc0a0bf6e77e9eab2e/5b41e9d98_IMG_7775.png";

const TIMELINE_STEPS = [
  { label: "Middle School", icon: "🏫" },
  { label: "Freshman Year", icon: "📖" },
  { label: "Sophomore", icon: "📐" },
  { label: "Junior", icon: "🎯" },
  { label: "Senior", icon: "🎓" },
  { label: "College", icon: "🏛️" },
];

const SECTION_IDS = ["hero", "mission", "what-we-do", "resources", "team"];

const pillars = [
  { icon: "🤝", title: "Social Life", desc: "Tips for building healthy friendships, navigating social dynamics, and finding your people." },
  { icon: "⏰", title: "Time Management", desc: "Proven strategies for juggling school, activities, and life without burning out." },
  { icon: "👩‍🏫", title: "Connecting with Teachers", desc: "How to build real relationships with teachers that open doors and create support systems." },
  { icon: "🎭", title: "Clubs & Activities", desc: "Finding the right extracurriculars to explore passions and build a standout resume." },
  { icon: "📚", title: "School Work", desc: "How to put your best foot forward academically from day one of high school." },
  { icon: "💡", title: "Daily Tips", desc: "Follow our Instagram for daily micro-advice on navigating every part of high school life." },
];

const resources = [
  { tag: "Social Life", title: "How to Make Friends in High School", desc: "Practical strategies from teens and counselors on building authentic friendships when everything feels new.", url: "https://kidshealth.org/en/teens/making-friends.html" },
  { tag: "Academic", title: "Khan Academy", desc: "Free, world-class education resources for every subject. Get ahead before school starts.", url: "https://www.khanacademy.org" },
  { tag: "Career Readiness", title: "MyFuture.com", desc: "Explore career paths, interests, and how high school choices can shape your future.", url: "https://www.myfuture.com/" },
  { tag: "Mental Health", title: "Teen Mental Health Resources", desc: "It's okay to not be okay. Resources for stress, anxiety, and navigating emotions in high school.", url: "https://www.nimh.nih.gov/health/topics/child-and-adolescent-mental-health" },
  { tag: "Social Life", title: "Cyber Awareness Trainer", desc: "Build essential cyber awareness skills to stay safe and smart online.", url: "https://cyber-idealistic-guard-path.base44.app" },
  { tag: "Career Readiness", title: "Resume Templates", desc: "Professional, student-friendly resume templates to help you land internships, jobs, and scholarships.", url: "https://www.canva.com/resumes/templates/high-school/" },
  { tag: "Financial Aid", title: "Scholarship Database", desc: "Search thousands of scholarships by grade, interest, and eligibility.", url: "https://www.scholarships.com/" },
  { tag: "Financial Aid", title: "FAFSA Guide", desc: "Step-by-step guide to completing the FAFSA — the key to unlocking federal financial aid for college.", url: "https://studentaid.gov/h/apply-for-aid/fafsa" },
];

const team = [
  { name: "Derrick Harris", role: "Founder & Chief Executive Officer", accent: NAVY },
  { name: "Sheick Sannoh", role: "Chief of Operations", accent: GOLD },
  { name: "Nehemiah Coleman", role: "Marketing Officer", accent: GOLD },
  { name: "Aiden Saunders", role: "Chief Information Officer", accent: GOLD },
  { name: "Joshua Whitehead", role: "Social Media Manager", accent: GOLD },
  { name: "Theodore Young", role: "Chief of Finances", accent: GOLD },
];

const testimonials = [
  { name: "Marcus T.", grade: "Incoming 9th Grader", msg: "NSU helped me understand what clubs to join and how to actually talk to my teachers. I felt so much more ready for high school than my friends." },
  { name: "Jasmine R.", grade: "Rising Freshman", msg: "I didn't know anything about managing my time in high school. After learning from NSU, I already have a schedule set up and I feel confident going in." },
  { name: "Devon M.", grade: "8th Grade Graduate", msg: "The resources on this site are real and actually useful. It's not just generic advice — it actually speaks to what we go through." },
];

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function scrollTo(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ResourceCard({ r }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: WHITE, borderRadius: 16, padding: "28px 24px",
        border: `1.5px solid ${hovered ? GOLD : "#e8edf2"}`,
        boxShadow: hovered ? `0 12px 40px rgba(16,42,67,0.18), 0 0 0 2px ${GOLD}33` : "0 4px 20px rgba(16,42,67,0.08)",
        display: "flex", flexDirection: "column", gap: 12,
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        cursor: "pointer",
      }}
    >
      <span style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: `${GOLD}22`, color: GOLD, padding: "3px 10px", borderRadius: 50, alignSelf: "flex-start" }}>{r.tag}</span>
      <h4 style={{ fontSize: "1rem", fontWeight: 700, color: NAVY }}>{r.title}</h4>
      <p style={{ fontSize: "0.88rem", color: "#5a7184", lineHeight: 1.6, flex: 1 }}>{r.desc}</p>
      <a href__={r.url} target="_blank" rel="noopener noreferrer" style={{ color: SKY, fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}>Visit Resource →</a>
    </div>
  );
}

function AnimatedTimeline({ activeStep }) {
  return (
    <div className="nsu-timeline" style={{
      position: "fixed", left: 16, top: "50%", transform: "translateY(-50%)",
      zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", gap: 0,
    }}>
      {TIMELINE_STEPS.map((step, i) => {
        const isActive = i === activeStep;
        const isPast = i < activeStep;
        return (
          <div key={step.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: isActive ? 38 : 28, height: isActive ? 38 : 28, borderRadius: "50%",
              background: isActive ? GOLD : isPast ? `${GOLD}66` : "rgba(255,255,255,0.15)",
              border: `2px solid ${isActive ? GOLD : isPast ? `${GOLD}99` : "rgba(255,255,255,0.3)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: isActive ? "1.1rem" : "0.85rem", transition: "all 0.4s ease",
              boxShadow: isActive ? `0 0 16px ${GOLD}99` : "none", cursor: "default",
            }} title={step.label}>
              {step.icon}
            </div>
            {isActive && (
              <div style={{ background: NAVY, color: WHITE, fontSize: "0.65rem", fontWeight: 700, padding: "2px 8px", borderRadius: 8, marginTop: 4, whiteSpace: "nowrap", border: `1px solid ${GOLD}55`, letterSpacing: 0.5 }}>
                {step.label}
              </div>
            )}
            {i < TIMELINE_STEPS.length - 1 && (
              <div style={{ width: 2, height: 28, background: isPast || isActive ? `linear-gradient(to bottom, ${GOLD}cc, ${GOLD}44)` : "rgba(255,255,255,0.12)", transition: "background 0.4s ease", margin: "2px 0" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    base44.analytics.track({ eventName: "page_view", properties: { page: "home" } });
  }, []);

  useEffect(() => {
    const sectionEls = SECTION_IDS.map(id => document.getElementById(id));
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      let current = 0;
      sectionEls.forEach((el, i) => { if (el && el.offsetTop <= scrollY) current = i; });
      setActiveStep(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileNav = (e, id) => {
    setMobileMenuOpen(false);
    scrollTo(e, id);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a2f45", background: WHITE, lineHeight: 1.6 }}>
      <link href__="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .btn-micro { transition: all 0.22s cubic-bezier(.4,0,.2,1) !important; }
        .btn-micro:hover { transform: translateY(-3px) scale(1.04) !important; filter: brightness(1.08); }
        .btn-micro:active { transform: scale(0.97) !important; }
        .card-micro { transition: all 0.25s ease !important; }
        .card-micro:hover { transform: translateY(-5px) !important; box-shadow: 0 16px 40px rgba(16,42,67,0.16) !important; }
        .shimmer-title {
          background: linear-gradient(90deg, #fff 0%, #F6C453 40%, #fff 60%, #F6C453 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .hero-fade { animation: fadeInUp 0.9s ease both; }
        .hero-fade-delay { animation: fadeInUp 0.9s ease 0.2s both; }
        .hero-fade-delay2 { animation: fadeInUp 0.9s ease 0.4s both; }
        .hero-fade-delay3 { animation: fadeInUp 0.9s ease 0.6s both; }
        .mobile-menu-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 998; }
        .mobile-menu { position: fixed; top: 0; right: 0; bottom: 0; width: 280px; background: #0a1f35; z-index: 999; padding: 24px; display: flex; flex-direction: column; gap: 8; box-shadow: -4px 0 24px rgba(0,0,0,0.4); }
        @media (max-width: 768px) {
          .nsu-timeline { display: none !important; }
          .nsu-desktop-nav { display: none !important; }
          .nsu-hamburger { display: flex !important; }
          .nsu-section-pad { padding: 64px 5% !important; }
          .nsu-hero-pad { padding: 80px 5% 48px !important; }
          .nsu-stats { gap: 28px !important; margin-top: 40px !important; }
          .nsu-connect-btns { flex-direction: column !important; align-items: center !important; }
          .nsu-connect-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
        }
        @media (min-width: 769px) { .nsu-hamburger { display: none !important; } }
      `}</style>

      <AnimatedTimeline activeStep={activeStep} />

      {mobileMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} />
          <div className="mobile-menu">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ color: GOLD, fontWeight: 800, fontSize: "1rem" }}>Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} style={{ background: "none", border: "none", color: WHITE, fontSize: "1.5rem", cursor: "pointer", lineHeight: 1 }}>✕</button>
            </div>
            {[["mission", "Mission"], ["what-we-do", "What We Do"], ["pathways", "Pathways"], ["quiz", "Find Your Path"], ["resources", "Resources"], ["team", "Team"], ["testimonials", "Stories"]].map(([id, label]) => (
              <a key={id} href__={`#${id}`} onClick={(e) => handleMobileNav(e, id)}
                style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "1rem", fontWeight: 500, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {label}
              </a>
            ))}
            <a href__="#donate" onClick={(e) => handleMobileNav(e, "donate")}
              style={{ background: GOLD, color: NAVY, padding: "14px 20px", borderRadius: 50, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", textAlign: "center", marginTop: 12 }}>
              Donate 💛
            </a>
          </div>
        </>
      )}

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 997, background: NAVY, padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72, boxShadow: "0 2px 20px rgba(0,0,0,0.35)" }}>
        <a href__="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <img src={LOGO_URL} alt="NSU Logo" style={{ height: 40, borderRadius: 8 }} />
          <span style={{ fontSize: "1rem", fontWeight: 800, color: GOLD, letterSpacing: "-0.3px", lineHeight: 1.2 }}>
            No Student Unseen
            <small style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.65rem", fontWeight: 400, letterSpacing: "0.5px" }}>NSU Non-Profit</small>
          </span>
        </a>
        <ul className="nsu-desktop-nav" style={{ display: "flex", gap: 20, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
          {[["mission", "Mission"], ["what-we-do", "What We Do"], ["pathways", "Pathways"], ["quiz", "Find Your Path"], ["resources", "Resources"], ["team", "Team"], ["testimonials", "Stories"]].map(([id, label]) => (
            <li key={id}>
              <a href__={`#${id}`} onClick={(e) => scrollTo(e, id)} style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>{label}</a>
            </li>
          ))}
          <li>
            <a href__="#donate" onClick={(e) => scrollTo(e, "donate")} className="btn-micro"
              style={{ background: GOLD, color: NAVY, padding: "8px 20px", borderRadius: 50, fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", display: "inline-block" }}>
              Donate
            </a>
          </li>
        </ul>
        <button className="nsu-hamburger" onClick={() => setMobileMenuOpen(true)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 8 }}>
          <span style={{ width: 24, height: 2, background: WHITE, borderRadius: 2, display: "block" }} />
          <span style={{ width: 24, height: 2, background: WHITE, borderRadius: 2, display: "block" }} />
          <span style={{ width: 24, height: 2, background: WHITE, borderRadius: 2, display: "block" }} />
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" className="nsu-hero-pad" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3a5c 60%, #1e4480 100%)`, minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 6% 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 70% 40%, ${GOLD}18 0%, transparent 60%)` }} />
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div className="hero-fade" style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
            <div style={{ display: "inline-block", background: `${GOLD}22`, border: `1px solid ${GOLD}55`, color: GOLD, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", padding: "6px 14px", borderRadius: 50 }}>✦ Non-Profit Organization</div>
            <div style={{ display: "inline-block", background: `${SKY}22`, border: `1px solid ${SKY}55`, color: SKY, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", padding: "6px 14px", borderRadius: 50 }}>🎓 Founded by High School Students</div>
          </div>
          <h1 className="hero-fade-delay" style={{ fontSize: "clamp(2rem, 6vw, 4.2rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 24 }}>
            <span style={{ color: WHITE }}>Every Student Deserves<br />to </span>
            <span className="shimmer-title">Find Their Way</span>
          </h1>
          <p className="hero-fade-delay2" style={{ fontSize: "clamp(0.95rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.78)", maxWidth: 640, margin: "0 auto 40px", lineHeight: 1.7 }}>
            We empower middle school students going into high school with the knowledge, mentorship, and resources needed to thrive — socially, academically, and personally.
          </p>
          <div className="hero-fade-delay3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href__="#mission" onClick={(e) => scrollTo(e, "mission")} className="btn-micro" style={{ background: GOLD, color: NAVY, padding: "14px 28px", borderRadius: 50, fontWeight: 800, fontSize: "0.95rem", textDecoration: "none", boxShadow: `0 4px 24px ${GOLD}55`, display: "inline-block" }}>Our Mission</a>
            <a href__="#donate" onClick={(e) => scrollTo(e, "donate")} className="btn-micro" style={{ background: SKY, color: WHITE, padding: "14px 28px", borderRadius: 50, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", boxShadow: `0 4px 20px ${SKY}44`, display: "inline-block" }}>Support Us</a>
            <a href__="#quiz" onClick={(e) => scrollTo(e, "quiz")} className="btn-micro" style={{ background: "transparent", color: WHITE, padding: "14px 28px", borderRadius: 50, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", border: "2px solid rgba(255,255,255,0.3)", display: "inline-block" }}>Find Your Path ✨</a>
          </div>
          <div className="hero-fade-delay3 nsu-stats" style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 64, flexWrap: "wrap" }}>
            {[["100%", "Funds Donated"], ["5+", "Focus Areas"], ["∞", "Students We Can Reach"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.2rem", fontWeight: 900, color: GOLD, lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", fontWeight: 500, marginTop: 4, letterSpacing: "0.5px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="nsu-section-pad" style={{ padding: "96px 5%", background: WHITE }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: GOLD, background: `${GOLD}18`, padding: "5px 14px", borderRadius: 50, marginBottom: 16 }}>Why We Exist</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 800, color: NAVY, letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 16 }}>The Problem. The Mission. The Goal.</h2>
          <p style={{ fontSize: "1rem", color: "#6b8499", maxWidth: 600, lineHeight: 1.7, marginBottom: 40 }}>Too many middle school students enter high school without a real roadmap. We're here to change that.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { icon: "🔍", title: "The Problem", body: "Many middle school students lack the expectations and knowledge about early high school life — from building healthy social connections, to managing time, to building an educational resume that sets them up for success." },
              { icon: "🎯", title: "Our Mission", body: "To empower middle school students going into high school with the knowledge, mentorship, and resources needed to successfully find their path in early high school life." },
              { icon: "🏆", title: "Our Goal", body: "Helping middle school students going into high school find their way in close to all aspects of early high school life — so no student enters high school feeling unseen or unprepared." },
            ].map((c) => (
              <div key={c.title} className="card-micro" style={{ background: LIGHT_GRAY, borderRadius: 14, padding: "32px 28px", borderLeft: `5px solid ${GOLD}`, boxShadow: `0 4px 24px ${NAVY}14`, cursor: "default" }}>
                <div style={{ fontSize: "2.4rem", marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: NAVY, marginBottom: 10 }}>{c.title}</h3>
                <p style={{ fontSize: "0.92rem", color: "#4a6278", lineHeight: 1.7 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="what-we-do" className="nsu-section-pad" style={{ background: NAVY, padding: "96px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: GOLD, background: `${GOLD}22`, padding: "5px 14px", borderRadius: 50, marginBottom: 16 }}>Our Approach</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 800, color: WHITE, letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 16 }}>How We Help Rising High Schoolers</h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", maxWidth: 600, lineHeight: 1.7, marginBottom: 40 }}>We guide students through every dimension of early high school life — practical, social, and academic.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {pillars.map((p) => (
              <div key={p.title} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "24px 20px", textAlign: "center" }}>
                <div style={{ fontSize: "2.4rem", marginBottom: 14 }}>{p.icon}</div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: GOLD, marginBottom: 8 }}>{p.title}</h4>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PathwaySystem />
      <FindYourPath />

      {/* RESOURCES */}
      <section id="resources" className="nsu-section-pad" style={{ padding: "96px 5%", background: LIGHT_GRAY }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: GOLD, background: `${GOLD}18`, padding: "5px 14px", borderRadius: 50, marginBottom: 16 }}>Student Resources</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 800, color: NAVY, letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 16 }}>Tools to Help You Thrive</h2>
          <p style={{ fontSize: "1rem", color: "#6b8499", maxWidth: 600, lineHeight: 1.7, marginBottom: 40 }}>Curated links and resources to help rising 9th graders hit the ground running.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {resources.map((r) => <ResourceCard key={r.title} r={r} />)}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="nsu-section-pad" style={{ background: WHITE, padding: "96px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: GOLD, background: `${GOLD}18`, padding: "5px 14px", borderRadius: 50, marginBottom: 16 }}>Our Team</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 800, color: NAVY, letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 16 }}>The People Behind NSU</h2>
          <p style={{ fontSize: "1rem", color: "#6b8499", maxWidth: 600, lineHeight: 1.7, marginBottom: 40 }}>A passionate group of leaders dedicated to making sure no student enters high school alone.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {team.map((t) => (
              <div key={t.name} className="card-micro" style={{ background: LIGHT_GRAY, borderRadius: 14, padding: "28px 16px", textAlign: "center", boxShadow: `0 4px 20px ${NAVY}10`, borderTop: `4px solid ${t.accent}`, cursor: "default" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${NAVY}, #1a3a5c)`, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", fontWeight: 800, color: GOLD }}>
                  {getInitials(t.name)}
                </div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: NAVY, marginBottom: 4 }}>{t.name}</h4>
                <div style={{ fontSize: "0.78rem", color: "#6b8499", fontWeight: 500, lineHeight: 1.4 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" className="nsu-section-pad" style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #e8b232 100%)`, textAlign: "center", padding: "96px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: NAVY, marginBottom: 16 }}>Make a Real Difference 💛</h2>
          <p style={{ fontSize: "1rem", color: `${NAVY}bb`, maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.7 }}>Every dollar supports education equity for students who need it most. All proceeds from NSU go directly to our partner charities.</p>
          <a href__={GOFUNDME_URL} target="_blank" rel="noopener noreferrer" className="btn-micro"
            style={{ background: NAVY, color: WHITE, padding: "16px 40px", borderRadius: 50, fontWeight: 800, fontSize: "1rem", textDecoration: "none", display: "inline-block", boxShadow: `0 4px 24px ${NAVY}44` }}>
            Donate on GoFundMe →
          </a>
          <p style={{ marginTop: 20, fontSize: "0.88rem", color: `${NAVY}99` }}>
            Partner Charity: <a href__={UNITED_WAY_URL} target="_blank" rel="noopener noreferrer" style={{ color: NAVY, fontWeight: 600 }}>United Way of the National Capital Area — Education Programs</a>
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="nsu-section-pad" style={{ padding: "96px 5%", background: LIGHT_GRAY }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: GOLD, background: `${GOLD}18`, padding: "5px 14px", borderRadius: 50, marginBottom: 16 }}>Student Stories</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 800, color: NAVY, letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 16 }}>What Students Are Saying</h2>
          <p style={{ fontSize: "1rem", color: "#6b8499", maxWidth: 600, lineHeight: 1.7, marginBottom: 40 }}>Real voices from real students whose high school journeys started stronger because of NSU.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {testimonials.map((t) => (
              <div key={t.name} className="card-micro" style={{ background: WHITE, borderRadius: 14, padding: "28px 24px", boxShadow: `0 4px 24px ${NAVY}10`, borderBottom: `4px solid ${GOLD}`, cursor: "default" }}>
                <div style={{ fontSize: "3.5rem", lineHeight: 0.6, color: GOLD, opacity: 0.5, fontFamily: "Georgia, serif", marginBottom: 8 }}>"</div>
                <p style={{ fontSize: "0.92rem", color: "#4a6278", lineHeight: 1.75, fontStyle: "italic", marginBottom: 20 }}>{t.msg}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 700, color: GOLD, flexShrink: 0 }}>{getInitials(t.name)}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: NAVY }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6b8499" }}>{t.grade}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECT */}
      <section className="nsu-section-pad" style={{ background: NAVY, textAlign: "center", padding: "72px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", fontWeight: 800, color: WHITE, marginBottom: 12 }}>Stay Connected</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: 32, fontSize: "0.95rem" }}>Follow us on Instagram for daily tips, or reach out directly via email.</p>
          <div className="nsu-connect-btns" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href__={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", color: WHITE, padding: "14px 28px", borderRadius: 50, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
              📸 @nostudentunseen_
            </a>
            <a href__={`mailto:${EMAIL}`}
              style={{ background: "rgba(255,255,255,0.1)", color: WHITE, padding: "14px 28px", borderRadius: 50, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, border: "1.5px solid rgba(255,255,255,0.25)" }}>
              ✉️ {EMAIL}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#06182e", color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "32px 5%", fontSize: "0.85rem" }}>
        <div style={{ fontWeight: 800, color: WHITE, marginBottom: 8, fontSize: "1rem" }}>No Student Unseen (NSU)</div>
        <p>© 2025 No Student Unseen. All rights reserved. | A Non-Profit Organization</p>
        <p style={{ marginTop: 8 }}>Empowering rising high schoolers, one student at a time. 💛</p>
        <p style={{ marginTop: 8 }}><a href__={`mailto:${EMAIL}`} style={{ color: GOLD, textDecoration: "none" }}>{EMAIL}</a></p>
      </footer>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SOCIAL = {
  github: "https://github.com/YaswithaMachani",
  linkedin: "https://www.linkedin.com/in/machani-yaswitha-68895530b/",
  leetcode: "https://leetcode.com/u/Yashwitha_100/",
  email: "yaswithamachani77@gmail.com",
  phone: "7815844350",
};

const PROJECTS = [
  {
    id: 1,
    title: "JoyVerse",
    subtitle: "AI Emotion Detection System",
    description:
      "Real-time children's emotion detection using MediaPipe FaceMesh (468 landmarks) + Vision Transformer (ViT) model for high-accuracy classification via webcam feeds.",
    tags: ["React", "FastAPI", "PyTorch", "MongoDB", "MediaPipe", "ViT"],
    github: "https://github.com/YaswithaMachani",
    video: "/Joyverse (2).mp4",
    color: "#7C3AED",
    glow: "#a855f7",
    icon: "🎭",
  },
  {
    id: 2,
    title: "Apna Fasal",
    subtitle: "Agriculture AI Chatbot",
    description:
      "GPT-powered chatbot for the agriculture sector using RAG + Knowledge Graphs for specialized data retrieval, with multi-language processing support.",
    tags: ["Python", "RAG", "LLM", "Node.js", "React", "KnowledgeGraph"],
    github: "https://github.com/YaswithaMachani",
    video: "/ApnaFasal (2).mp4",
    color: "#059669",
    glow: "#10b981",
    icon: "🌾",
  },
];

const SKILLS = [
  {
    category: "Frontend",
    icon: "⚡",
    color: "#F59E0B",
    items: ["React.js", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Backend",
    icon: "🔧",
    color: "#6366F1",
    items: ["Node.js", "Express.js", "FastAPI", "REST API"],
  },
  {
    category: "Database",
    icon: "🗄️",
    color: "#10B981",
    items: ["MongoDB", "MySQL"],
  },
  {
    category: "AI / ML",
    icon: "🧠",
    color: "#EC4899",
    items: [
      "Transformers",
      "LLM",
      "RAG",
      "Deep Learning",
      "CNN",
      'RNN',
      "LSTM",
    ],
  },
  {
    category: "Languages",
    icon: "💻",
    color: "#F97316",
    items: ["Python", "Java", "C"],
  },
  {
    category: "Tools",
    icon: "🛠️",
    color: "#14B8A6",
    items: ["Git", "GitHub", "VS Code", "Postman"],
  },
];

const EDUCATION = [
  {
    year: "2023 – Present",
    title: "B.E. Computer Science",
    place: "Neil Gogte Institute of Technology, Hyderabad",
    detail: "CGPA: 9.09 / 10",
    icon: "🎓",
  },
  {
    year: "2021 – 2023",
    title: "Intermediate (MPC)",
    place: "Narayana Institutions, Hyderabad",
    detail: "Score: 956 / 1000",
    icon: "📚",
  },
  {
    year: "2021",
    title: "Secondary School (SSC)",
    place: "Narayana Group of Schools, Andhra Pradesh",
    detail: "Grade: 10 / 10",
    icon: "🏫",
  },
];

const ACHIEVEMENTS = [
  {
    title: "Complete Data Science, ML, DL, NLP Bootcamp",
    org: "Udemy",
    detail: "Python, ML, ANN, RNN, CNN, LSTM, GRU, Transformers, MLOps",
    icon: "🏆",
  },
  {
    title: "Full Stack Web Development Bootcamp",
    org: "Udemy",
    detail: "HTML, CSS, JavaScript, Node.js, React.js, MongoDB",
    icon: "🌐",
  },
  {
    title: "GenAI ProjectSchool — JoyVerse",
    org: "NGIT",
    detail: "Recognized for successful project completion",
    icon: "🤖",
  },
  {
    title: "GenAI ProjectSchool — Apna Fasal",
    org: "NGIT",
    detail: "Recognized for successful project completion",
    icon: "🌾",
  },
];

/* ─────────────────────────────────────────────
   TINY HOOK: intersection observer
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function Counter({ to, suffix = "", isFloat = false }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const target = isFloat ? to * 100 : to;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(start);
    }, 16);
    return () => clearInterval(id);
  }, [inView, to, isFloat]);
  const displayVal = isFloat ? (val / 100).toFixed(2) : val;
  return <span ref={ref}>{displayVal}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   PARTICLE CANVAS
───────────────────────────────────────────── */
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const dots = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${d.alpha})`;
        ctx.fill();
      });
      // connect nearby dots
      for (let i = 0; i < dots.length; i++)
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

/* ─────────────────────────────────────────────
   FLOATING 3D ORBS (CSS-based)
───────────────────────────────────────────── */
function Orbs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {[
        { w: 400, top: "-10%", left: "-5%", color: "rgba(124,58,237,0.12)", delay: "0s" },
        { w: 300, top: "60%", right: "-8%", color: "rgba(6,182,212,0.10)", delay: "2s" },
        { w: 250, top: "30%", left: "70%", color: "rgba(236,72,153,0.08)", delay: "4s" },
      ].map((o, i) => (
        <div key={i} style={{
          position: "absolute", width: o.w, height: o.w, borderRadius: "50%",
          background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
          top: o.top, left: o.left, right: o.right,
          animation: `floatOrb 8s ease-in-out ${o.delay} infinite alternate`,
          filter: "blur(40px)",
        }} />
      ))}
      <style>{`
        @keyframes floatOrb { from { transform: translateY(0px) scale(1); } to { transform: translateY(30px) scale(1.05); } }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Home", "About", "Skills", "Projects", "Education", "Contact"];
  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1rem 2rem",
      background: scrolled ? "rgba(4,4,16,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(139,92,246,0.15)" : "none",
      transition: "all 0.3s",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div onClick={() => scrollTo("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <svg width="36" height="36" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff00ff" />
              <stop offset="100%" stopColor="#00f3ff" />
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="url(#logoGrad)" strokeWidth="6" filter="url(#logoGlow)" />
          <path d="M 35 35 L 50 55 L 65 35 M 50 55 L 50 75" stroke="url(#logoGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#logoGlow)" />
        </svg>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.4rem", fontWeight: 800, background: "linear-gradient(135deg, #ff00ff, #00f3ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.05em", display: "none", "@media(minWidth: 600px)": { display: "block" } }}>
          YASWITHA
        </span>
      </div>
      {/* Desktop */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
        {links.map(l => (
          <button key={l} onClick={() => scrollTo(l)} style={{
            background: "none", border: "none", color: active === l.toLowerCase() ? "#a78bfa" : "rgba(255,255,255,0.7)",
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", cursor: "pointer", transition: "color 0.2s",
            fontWeight: active === l.toLowerCase() ? 600 : 400,
          }}
            onMouseEnter={e => e.target.style.color = "#a78bfa"}
            onMouseLeave={e => e.target.style.color = active === l.toLowerCase() ? "#a78bfa" : "rgba(255,255,255,0.7)"}
          >{l}</button>
        ))}
        <a href="/Yaswitha_Latest_resume.pdf" target="_blank" rel="noreferrer" style={{
          padding: "0.45rem 1.1rem", borderRadius: "8px",
          background: "linear-gradient(135deg, #7c3aed, #0ea5e9)",
          color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
          textDecoration: "none", fontWeight: 600, letterSpacing: "0.02em",
          boxShadow: "0 0 20px rgba(124,58,237,0.4)",
        }}>Resume ↗</a>
      </div>
      {/* Hamburger */}
      <button onClick={() => setOpen(o => !o)} style={{ display: "none", background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer" }} className="hamburger">
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, bottom: 0,
          background: "rgba(4,4,16,0.97)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "2rem", zIndex: 99,
        }}>
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              background: "none", border: "none", color: "#fff", fontSize: "1.5rem",
              fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
            }}>{l}</button>
          ))}
          <a href="/Yaswitha_Latest_resume.pdf" target="_blank" rel="noreferrer" style={{ color: "#a78bfa", fontSize: "1.2rem", fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>Resume ↗</a>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .hamburger { display: block !important; } }
      `}</style>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  const [typed, setTyped] = useState("");
  const roles = ["AI Engineer", "Full-Stack Developer", "ML Researcher"];
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  useEffect(() => {
    let timeout;
    const tick = () => {
      const cur = roles[roleIdx.current];
      if (!deleting.current) {
        setTyped(cur.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === cur.length) { deleting.current = true; timeout = setTimeout(tick, 1800); return; }
      } else {
        setTyped(cur.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) { deleting.current = false; roleIdx.current = (roleIdx.current + 1) % roles.length; }
      }
      timeout = setTimeout(tick, deleting.current ? 50 : 80);
    };
    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8rem 2rem 6rem", position: "relative", zIndex: 1 }}>
      <div style={{ textAlign: "center", maxWidth: "800px" }}>
        {/* Standing Mascot */}
        <div style={{ marginBottom: "2rem", animation: "fadeSlideUp 0.6s ease forwards" }}>
          <div style={{
            position: "relative", height: "300px", margin: "0 auto",
            animation: "floatMascot 4s ease-in-out infinite alternate", zIndex: 10
          }}>
            <img src="/mascot_standing.png" alt="Neon Mascot" style={{ 
              height: "100%", objectFit: "contain", mixBlendMode: "screen", 
              filter: "drop-shadow(0 0 15px rgba(0,243,255,0.3))",
              WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
              maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)"
            }} />
          </div>
        </div>

        {/* Greeting badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.4rem 1rem", borderRadius: "100px",
          border: "1px solid rgba(139,92,246,0.4)",
          background: "rgba(139,92,246,0.08)",
          marginBottom: "1.5rem",
          animation: "fadeSlideUp 0.6s ease forwards",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a78bfa", display: "inline-block", boxShadow: "0 0 8px #a78bfa", animation: "pulse 2s infinite" }} />
          <span style={{ color: "#a78bfa", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500 }}>Available for opportunities</span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.05,
          color: "#fff", margin: "0 0 0.5rem",
          animation: "fadeSlideUp 0.8s ease 0.1s both",
        }}>
          Yaswitha<br />
          <span style={{ background: "linear-gradient(135deg, #a78bfa 0%, #38bdf8 50%, #f472b6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Machani</span>
        </h1>

        {/* Typewriter */}
        <div style={{ height: "2.5rem", marginBottom: "1.5rem", animation: "fadeSlideUp 0.8s ease 0.2s both" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(1rem,2.5vw,1.5rem)", color: "#38bdf8", fontWeight: 500 }}>
            {typed}<span style={{ animation: "blink 1s step-end infinite", color: "#a78bfa" }}>|</span>
          </span>
        </div>

        {/* Bio */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.65)",
          fontSize: "clamp(0.9rem,2vw,1.1rem)", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto 2.5rem",
          animation: "fadeSlideUp 0.8s ease 0.3s both",
        }}>
          Building intelligent systems at the intersection of AI and full-stack development.
          Passionate about Vision Transformers, LLMs, and shipping impactful products.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem", animation: "fadeSlideUp 0.8s ease 0.4s both" }}>
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} style={{
            padding: "0.75rem 2rem", borderRadius: "12px",
            background: "linear-gradient(135deg, #7c3aed, #0ea5e9)",
            color: "#fff", border: "none", fontSize: "1rem", fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600, cursor: "pointer", boxShadow: "0 0 30px rgba(124,58,237,0.5)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 40px rgba(124,58,237,0.7)"; }}
            onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 0 30px rgba(124,58,237,0.5)"; }}
          >View Projects →</button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{
            padding: "0.75rem 2rem", borderRadius: "12px",
            background: "transparent", color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)", fontSize: "1rem",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#a78bfa"; e.target.style.background = "rgba(139,92,246,0.1)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.background = "transparent"; }}
          >Get in Touch</button>
        </div>

        {/* Social Icons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", animation: "fadeSlideUp 0.8s ease 0.5s both" }}>
          {[
            { href: SOCIAL.github, label: "GitHub", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> },
            { href: SOCIAL.linkedin, label: "LinkedIn", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
            { href: SOCIAL.leetcode, label: "LeetCode", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg> },
            { href: `mailto:${SOCIAL.email}`, label: "Email", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} style={{
              width: 44, height: 44, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#a78bfa"; e.currentTarget.style.color = "#a78bfa"; e.currentTarget.style.background = "rgba(139,92,246,0.15)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = ""; }}
            >{s.svg}</a>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginTop: "4rem", animation: "fadeSlideUp 0.8s ease 0.6s both" }}>
          {[{ label: "CGPA", value: 9.09, suffix: "" }, { label: "Projects", value: 3, suffix: "+" }, { label: "Certifications", value: 2, suffix: "+" }].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "2.5rem", background: "linear-gradient(135deg, #a78bfa, #38bdf8, #ff00ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textShadow: "0 0 20px rgba(167,139,250,0.5)" }}>
                <Counter to={s.value} suffix={s.suffix} isFloat={!Number.isInteger(s.value)} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.25rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator - Relative to flow so it doesn't overlap */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", marginTop: "3rem", animation: "fadeSlideUp 1s ease 1s both" }}>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em" }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(167,139,250,0.6), transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 8px #a78bfa; } 50% { box-shadow: 0 0 16px #a78bfa; } }
        @keyframes scrollPulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes floatMascot {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-15px); }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */
function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} style={{ padding: "3rem 2rem 1.5rem", position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
      <SectionLabel label="About Me" />
      <div style={{ ...glassCard, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease", textAlign: "center" }}>
        <h2 style={{ ...headingStyle, fontSize: "1.5rem", margin: 0 }}>Hi, I’m Yaswitha</h2>
        <p style={{ ...cardText, marginTop: "1rem" }}>
          AI enthusiast & full-stack developer.<br />
          Always learning, always curious.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────── */
function Skills() {
  const [ref, inView] = useInView();
  // Skill icons for each technology
  const skillIcons = {
    "React.js": <svg width="20" height="20" viewBox="0 0 256 256" fill="none" style={{opacity:0.45}}><g><ellipse cx="128" cy="128" rx="110" ry="40" stroke="#61DAFB" strokeWidth="16"/><ellipse cx="128" cy="128" rx="40" ry="110" stroke="#61DAFB" strokeWidth="16"/><ellipse cx="128" cy="128" rx="110" ry="40" transform="rotate(60 128 128)" stroke="#61DAFB" strokeWidth="16"/><ellipse cx="128" cy="128" rx="110" ry="40" transform="rotate(120 128 128)" stroke="#61DAFB" strokeWidth="16"/><circle cx="128" cy="128" r="24" fill="#61DAFB" fillOpacity="0.7"/></g></svg>,
    "JavaScript": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><rect width="32" height="32" rx="6" fill="#F7DF1E" fillOpacity="0.7"/><text x="7" y="22" fontSize="14" fontWeight="bold" fill="#222" fillOpacity="0.7">JS</text></svg>,
    "HTML": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><path d="M6 4l2.2 24L16 28l7.8-4L26 4H6z" fill="#E44D26" fillOpacity="0.7"/><path d="M16 26V6h8l-1.8 18L16 26z" fill="#F16529" fillOpacity="0.7"/></svg>,
    "CSS": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><path d="M6 4l2.2 24L16 28l7.8-4L26 4H6z" fill="#264DE4" fillOpacity="0.7"/><path d="M16 26V6h8l-1.8 18L16 26z" fill="#2965F1" fillOpacity="0.7"/></svg>,
    "Node.js": <svg width="20" height="20" viewBox="0 0 256 272" fill="none" style={{opacity:0.45}}><path d="M128 16L240 80v112l-112 64L16 192V80L128 16z" stroke="#393" strokeWidth="16" fill="#393" fillOpacity="0.7"/></svg>,
    "Express.js": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#222" fillOpacity="0.7"/><text x="5" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">Ex</text></svg>,
    "FastAPI": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#059669" fillOpacity="0.7"/><text x="4" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">Fast</text></svg>,
    "REST API": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#6366F1" fillOpacity="0.7"/><text x="4" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">API</text></svg>,
    "MongoDB": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#10B981" fillOpacity="0.7"/><text x="4" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">Mongo</text></svg>,
    "MySQL": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#00758F" fillOpacity="0.7"/><text x="4" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">SQL</text></svg>,
    "Transformers": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#FEC260" fillOpacity="0.7"/><text x="2" y="22" fontSize="14" fontWeight="bold" fill="#222" fillOpacity="0.7">🤖</text></svg>,
    "LLM": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#EC4899" fillOpacity="0.7"/><text x="6" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">LLM</text></svg>,
    "RAG": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#6366F1" fillOpacity="0.7"/><text x="6" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">RAG</text></svg>,
    "Deep Learning": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#EC4899" fillOpacity="0.7"/><text x="2" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">DL</text></svg>,
    "CNN": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#6366F1" fillOpacity="0.7"/><text x="4" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">CNN</text></svg>,
    "LSTM": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#F59E0B" fillOpacity="0.7"/><text x="2" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">LSTM</text></svg>,
    "Python": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><rect width="32" height="32" rx="6" fill="#3776AB" fillOpacity="0.7"/><text x="4" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">Py</text></svg>,
    "Java": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><rect width="32" height="32" rx="6" fill="#F89820" fillOpacity="0.7"/><text x="4" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">Java</text></svg>,
    "C": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><rect width="32" height="32" rx="6" fill="#555" fillOpacity="0.7"/><text x="10" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">C</text></svg>,
    "Git": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#F05032" fillOpacity="0.7"/><text x="6" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">Git</text></svg>,
    "GitHub": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#222" fillOpacity="0.7"/><text x="2" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">GH</text></svg>,
    "VS Code": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#007ACC" fillOpacity="0.7"/><text x="2" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">VS</text></svg>,
    "Postman": <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style={{opacity:0.45}}><ellipse cx="16" cy="16" rx="14" ry="14" fill="#FF6C37" fillOpacity="0.7"/><text x="2" y="22" fontSize="14" fontWeight="bold" fill="#fff" fillOpacity="0.7">Post</text></svg>,
  };

  return (
    <section id="skills" ref={ref} style={{ padding: "6rem 2rem", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
      <SectionLabel label="Tech Stack" />
      <h2 style={headingStyle}>Skills & Expertise</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
        {SKILLS.map((s, i) => (
          <div key={s.category} style={{
            ...glassCard,
            borderTop: `2px solid ${s.color}`,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: `all 0.6s ease ${i * 0.1}s`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: s.color, fontSize: "0.95rem", letterSpacing: "0.04em" }}>{s.category}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {s.items.map(item => (
                <span
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    padding: "0.3rem 0.7rem",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontFamily: "'DM Mono', monospace",
                    background: `${s.color}18`,
                    color: s.color,
                    border: `1px solid ${s.color}30`,
                    transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = `${s.color}`;
                    e.target.style.color = "#fff";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = `${s.color}18`;
                    e.target.style.color = s.color;
                    e.target.style.transform = "";
                  }}
                >
                  {skillIcons[item] && (
                    <span style={{ display: "inline-flex", alignItems: "center" }}>{skillIcons[item]}</span>
                  )}
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────── */
function Projects() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(null);

  return (
    <section id="projects" ref={ref} style={{ padding: "6rem 2rem", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
      <SectionLabel label="Work" />
      <h2 style={headingStyle}>Featured Projects</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
        {PROJECTS.map((p, i) => (
          <div key={p.id} style={{
            ...glassCard, padding: 0, overflow: "hidden",
            border: active === p.id ? `1px solid ${p.glow}` : "1px solid rgba(255,255,255,0.08)",
            boxShadow: active === p.id ? `0 0 40px ${p.glow}30` : glassCard.boxShadow,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(50px)",
            transition: `all 0.7s ease ${i * 0.15}s`,
            cursor: "pointer",
          }}
            onMouseEnter={() => setActive(p.id)}
            onMouseLeave={() => setActive(null)}
          >
            {/* Color bar */}
            <div style={{ height: 4, background: `linear-gradient(90deg, ${p.color}, ${p.glow})` }} />

            <div style={{ padding: "1.75rem" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <div>
                  <div style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>{p.icon}</div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#fff", margin: 0 }}>{p.title}</h3>
                  <p style={{ color: p.glow, fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", margin: "0.25rem 0 0" }}>{p.subtitle}</p>
                </div>
                <a href={p.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{
                  width: 36, height: 36, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)",
                  textDecoration: "none", background: "rgba(255,255,255,0.05)", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.glow; e.currentTarget.style.color = p.glow; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                  title="View on GitHub"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
              </div>

              <p style={{ ...cardText, marginBottom: "1.25rem" }}>{p.description}</p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    padding: "0.2rem 0.6rem", borderRadius: "5px", fontSize: "0.72rem",
                    fontFamily: "'DM Mono', monospace", background: `${p.color}15`, color: p.glow,
                    border: `1px solid ${p.color}25`,
                  }}>{t}</span>
                ))}
              </div>

              {/* Video embed toggle */}
              <VideoToggle videoUrl={p.video} color={p.glow} />

              {/* Action buttons */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
                <a href={p.github} target="_blank" rel="noreferrer" style={actionBtn(p.color)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" style={{ ...actionBtn(p.color), background: `${p.color}20` }}>
                    Live ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VideoToggle({ videoUrl, color }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(s => !s)} style={{
        display: "flex", alignItems: "center", gap: "0.4rem",
        background: "none", border: `1px solid ${color}40`, borderRadius: "8px",
        color, padding: "0.4rem 0.9rem", fontSize: "0.8rem",
        fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer",
        transition: "all 0.2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = `${color}15`; }}
        onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
      >
        <span>▶</span> {show ? "Hide Demo" : "Watch Demo"}
      </button>
      {show && (
        <div style={{ marginTop: "0.75rem", borderRadius: "10px", overflow: "hidden", border: `1px solid ${color}30` }}>
          <video
            src={videoUrl}
            controls
            width="100%"
            height="200"
            style={{ display: "block", objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   EDUCATION
───────────────────────────────────────────── */
function Education() {
  const [ref, inView] = useInView();
  return (
    <section id="education" ref={ref} style={{ padding: "6rem 2rem", position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
      <SectionLabel label="Background" />
      <h2 style={headingStyle}>Education & Achievements</h2>

      {/* Timeline */}
      <div style={{ marginTop: "3rem", position: "relative" }}>
        <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #7c3aed, #0ea5e9, transparent)" }} />
        {EDUCATION.map((e, i) => (
          <div key={i} style={{
            display: "flex", gap: "1.5rem", marginBottom: "2.5rem", paddingLeft: "0.5rem",
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-30px)",
            transition: `all 0.6s ease ${i * 0.15}s`,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0, boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}>
              {e.icon}
            </div>
            <div style={{ ...glassCard, flex: 1 }}>
              <div style={{ color: "#a78bfa", fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", marginBottom: "0.4rem" }}>{e.year}</div>
              <h3 style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, margin: "0 0 0.25rem", fontSize: "1.05rem" }}>{e.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", margin: "0 0 0.5rem" }}>{e.place}</p>
              <span style={{ padding: "0.2rem 0.7rem", borderRadius: "6px", background: "rgba(56,189,248,0.1)", color: "#38bdf8", fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", border: "1px solid rgba(56,189,248,0.25)" }}>{e.detail}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <h3 style={{ ...headingStyle, fontSize: "1.6rem", marginTop: "4rem" }}>Achievements</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginTop: "2rem" }}>
        {ACHIEVEMENTS.map((a, i) => (
          <div key={i} style={{
            ...glassCard,
            opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: `all 0.6s ease ${i * 0.1 + 0.4}s`,
          }}>
            <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{a.icon}</div>
            <div style={{ color: "#a78bfa", fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", marginBottom: "0.25rem", letterSpacing: "0.08em" }}>{a.org}</div>
            <div style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem" }}>{a.title}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem" }}>{a.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    window.open(`mailto:${SOCIAL.email}?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message + "\n\nFrom: " + form.email)}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const neonCyan = "#00f3ff";
  const neonPink = "#ff00ff";

  return (
    <section id="contact" ref={ref} style={{ padding: "6rem 2rem", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
        <div style={{ width: 24, height: 1, background: `linear-gradient(90deg, ${neonPink}, ${neonCyan})` }} />
        <span style={{ color: neonCyan, fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", textShadow: `0 0 8px ${neonCyan}80` }}>Get In Touch</span>
      </div>
      <h2 style={{ ...headingStyle, textShadow: `0 0 10px ${neonPink}40` }}>Let's Connect</h2>
      <p style={{ ...cardText, margin: "1rem 0 3rem", maxWidth: "600px" }}>
        Open to internships, research roles, and exciting project collaborations. Let's build something meaningful together.
      </p>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.7s ease",
      }}>
        {/* Left Side: Mascot & Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }}>
          <div style={{
            position: "relative", height: "300px",
            animation: "floatMascot 4s ease-in-out infinite alternate"
          }}>
            <img src="/mascot_standing.png" alt="Neon Mascot" style={{ 
              height: "100%", objectFit: "contain", mixBlendMode: "screen", 
              filter: `drop-shadow(0 0 20px ${neonPink}50)`,
              WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
              maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)"
            }} />
          </div>
          
          <div style={{ width: "100%" }}>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.3rem", color: "#fff", marginBottom: "1.5rem", textAlign: "center" }}>Reach me anywhere</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "LinkedIn", value: "machani-yaswitha", href: SOCIAL.linkedin, color: neonCyan, icon: "🔗" },
                { label: "GitHub", value: "YaswithaMachani", href: SOCIAL.github, color: neonPink, icon: "💻" },
                { label: "LeetCode", value: "Yashwitha_100", href: SOCIAL.leetcode, color: neonCyan, icon: "🏆" },
                { label: "Email", value: SOCIAL.email, href: `mailto:${SOCIAL.email}`, color: neonPink, icon: "✉️" },
                { label: "Phone", value: SOCIAL.phone, href: `tel:${SOCIAL.phone}`, color: neonCyan, icon: "📱" },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "1rem", borderRadius: "12px", background: "rgba(255,255,255,0.03)",
                  border: `1px solid rgba(255,255,255,0.1)`, textDecoration: "none", transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = l.color; e.currentTarget.style.boxShadow = `0 0 15px ${l.color}40`; e.currentTarget.style.background = `${l.color}10`; e.currentTarget.style.transform = "translateX(5px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = ""; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.2rem" }}>{l.icon}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#fff" }}>{l.label}</span>
                  </div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", color: l.color }}>{l.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{
          ...glassCard,
          border: `1px solid ${neonCyan}40`,
          boxShadow: `0 0 30px ${neonCyan}20`,
        }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1.5rem", textShadow: `0 0 20px ${neonPink}` }}>🚀</div>
              <p style={{ color: neonCyan, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.3rem", textShadow: `0 0 10px ${neonCyan}80` }}>Transmission Sent!</p>
              <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "0.5rem" }}>Opening your mail client...</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[{ name: "name", label: "Name", type: "text", placeholder: "Your name" }, { name: "email", label: "Email", type: "email", placeholder: "your@email.com" }].map(f => (
                <div key={f.name}>
                  <label style={{ display: "block", color: neonCyan, fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>{f.label.toUpperCase()}</label>
                  <input name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} style={{...inputStyle, background: "rgba(0,0,0,0.3)"}} onFocus={e => { e.target.style.borderColor = neonPink; e.target.style.boxShadow = `0 0 10px ${neonPink}50`; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
                </div>
              ))}
              <div>
                <label style={{ display: "block", color: neonCyan, fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>MESSAGE</label>
                <textarea name="message" placeholder="What's on your mind?" rows={6} value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: "vertical", minHeight: "120px", background: "rgba(0,0,0,0.3)" }} onFocus={e => { e.target.style.borderColor = neonPink; e.target.style.boxShadow = `0 0 10px ${neonPink}50`; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
              </div>
              <button onClick={handleSubmit} style={{
                marginTop: "1rem", padding: "1rem", borderRadius: "12px",
                background: `linear-gradient(135deg, ${neonPink}, ${neonCyan})`,
                color: "#fff", border: "none", fontSize: "1.1rem", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 800, cursor: "pointer", boxShadow: `0 0 20px ${neonPink}60`,
                transition: "all 0.3s", textTransform: "uppercase", letterSpacing: "0.1em"
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 0 30px ${neonCyan}80`; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = `0 0 20px ${neonPink}60`; }}
              >Send Message</button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        /* Contact styles */
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem", textAlign: "center", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
        {[
          { href: SOCIAL.github, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> },
          { href: SOCIAL.linkedin, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
        ].map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#a78bfa"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
          >{s.icon}</a>
        ))}
      </div>
      <p style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>
        © 2026 Yaswitha Machani · Built with ♥ in React
      </p>
      {/* Scroll to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
        position: "fixed", bottom: "2rem", right: "2rem", width: 44, height: 44, borderRadius: "12px",
        background: "linear-gradient(135deg, #7c3aed, #0ea5e9)", border: "none", color: "#fff",
        fontSize: "1.1rem", cursor: "pointer", boxShadow: "0 0 20px rgba(124,58,237,0.4)",
        zIndex: 50, transition: "transform 0.2s",
      }}
        onMouseEnter={e => e.target.style.transform = "translateY(-3px)"}
        onMouseLeave={e => e.target.style.transform = ""}
        title="Back to top"
      >↑</button>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   SHARED STYLES
───────────────────────────────────────────── */
const glassCard = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "1.75rem",
  boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
  transition: "all 0.3s ease",
};
const headingStyle = {
  fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
  fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", margin: "0.5rem 0 0",
};
const cardHeading = { fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff", margin: "0 0 0.75rem" };
const cardText = { fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.75, margin: 0 };
const inputStyle = {
  width: "100%", padding: "0.75rem 1rem", borderRadius: "10px",
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
  outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
};
const actionBtn = (color) => ({
  display: "inline-flex", alignItems: "center", gap: "0.4rem",
  padding: "0.45rem 1rem", borderRadius: "8px",
  background: `${color}15`, color, border: `1px solid ${color}30`,
  textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.8rem", fontWeight: 600, transition: "all 0.2s",
});

function SectionLabel({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
      <div style={{ width: 24, height: 1, background: "linear-gradient(90deg, #7c3aed, #0ea5e9)" }} />
      <span style={{ color: "#a78bfa", fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "education", "contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #040410; color: #fff; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #040410; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 2px; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); }
        textarea { font-family: inherit; }
        a { transition: all 0.2s; }
      `}</style>
      <Particles />
      <Orbs />
      <Navbar active={active} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

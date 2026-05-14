import { useState, useRef, useEffect } from "react";

const VIRAL_KEYWORDS = ["secret","never","million","viral","shocking","truth","exposed","mindset","failure","success","hustle","broke","rich","hack","mistake","believe","quit","fired","founder","billionaire"];

function ViralMeter({ score, size = "lg" }) {
  const color = score >= 80 ? "#22c55e" : score >= 55 ? "#f59e0b" : "#ef4444";
  const r = size === "lg" ? 36 : 22;
  const stroke = size === "lg" ? 5 : 3.5;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width={r*2+stroke*2} height={r*2+stroke*2} style={{transform:"rotate(-90deg)"}}>
      <circle cx={r+stroke} cy={r+stroke} r={r} fill="none" stroke="#1e293b" strokeWidth={stroke}/>
      <circle cx={r+stroke} cy={r+stroke} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{transition:"stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)"}}/>
    </svg>
  );
}

function ClipCard({ clip, onSelect, selected }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={() => onSelect(clip)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: selected ? "rgba(139,92,246,0.13)" : hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.025)",
        border: selected ? "1.5px solid #8b5cf6" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16, padding: "16px 18px", cursor: "pointer",
        transition: "all 0.2s", marginBottom: 10,
        backdropFilter: "blur(8px)"
      }}>
      <div style={{display:"flex", alignItems:"flex-start", gap:12}}>
        <div style={{position:"relative", flexShrink:0}}>
          <ViralMeter score={clip.viralScore} size="sm"/>
          <div style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:10, fontWeight:700, color: clip.viralScore >= 80 ? "#22c55e" : clip.viralScore >= 55 ? "#f59e0b" : "#ef4444",
            transform:"rotate(90deg)"}}>
            {clip.viralScore}
          </div>
        </div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:4}}>
            <span style={{fontSize:13, fontWeight:700, color:"#e2e8f0", letterSpacing:"-0.01em"}}>{clip.title}</span>
            {clip.viralScore >= 80 && <span style={{fontSize:9, fontWeight:800, color:"#22c55e", background:"rgba(34,197,94,0.15)", padding:"2px 7px", borderRadius:99, letterSpacing:"0.08em"}}>🔥 HOT</span>}
          </div>
          <div style={{fontSize:11, color:"#64748b", marginBottom:8}}>{clip.startTime} → {clip.endTime} • {clip.duration}s</div>
          <div style={{display:"flex", gap:5, flexWrap:"wrap"}}>
            {clip.tags.map(t => (
              <span key={t} style={{fontSize:10, color:"#a78bfa", background:"rgba(139,92,246,0.12)", padding:"2px 8px", borderRadius:99, fontWeight:600}}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:4, alignItems:"flex-end", flexShrink:0}}>
          <span style={{fontSize:10, color:"#475569"}}>Emotion</span>
          <div style={{width:48, height:4, background:"#1e293b", borderRadius:99}}>
            <div style={{width:`${clip.emotion}%`, height:"100%", background:"linear-gradient(90deg,#8b5cf6,#ec4899)", borderRadius:99}}/>
          </div>
          <span style={{fontSize:10, color:"#475569", marginTop:2}}>Energy</span>
          <div style={{width:48, height:4, background:"#1e293b", borderRadius:99}}>
            <div style={{width:`${clip.energy}%`, height:"100%", background:"linear-gradient(90deg,#f59e0b,#ef4444)", borderRadius:99}}/>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubtitleStyleBtn({ style, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding:"8px 14px", borderRadius:10, border: active ? "1.5px solid #8b5cf6" : "1px solid rgba(255,255,255,0.1)",
      background: active ? "rgba(139,92,246,0.18)" : "rgba(255,255,255,0.03)",
      color: active ? "#c4b5fd" : "#64748b", fontSize:12, fontWeight:700,
      cursor:"pointer", letterSpacing:"0.02em", transition:"all 0.15s"
    }}>{style}</button>
  );
}

function ProgressBar({ pct, color="#8b5cf6", height=6 }) {
  return (
    <div style={{width:"100%", height, background:"rgba(255,255,255,0.06)", borderRadius:99, overflow:"hidden"}}>
      <div style={{width:`${pct}%`, height:"100%", background:`linear-gradient(90deg,${color},${color}cc)`, borderRadius:99, transition:"width 0.3s"}}/>
    </div>
  );
}

function Tab({ label, active, onClick, icon }) {
  return (
    <button onClick={onClick} style={{
      display:"flex", alignItems:"center", gap:6, padding:"10px 18px",
      background: active ? "rgba(139,92,246,0.15)" : "transparent",
      border: "none", borderBottom: active ? "2px solid #8b5cf6" : "2px solid transparent",
      color: active ? "#c4b5fd" : "#475569", fontSize:13, fontWeight:700,
      cursor:"pointer", transition:"all 0.15s", letterSpacing:"0.01em"
    }}>
      <span>{icon}</span> {label}
    </button>
  );
}

function GlassCard({ children, style={} }) {
  return (
    <div style={{
      background:"rgba(255,255,255,0.03)", backdropFilter:"blur(16px)",
      border:"1px solid rgba(255,255,255,0.07)", borderRadius:20,
      padding:"24px", ...style
    }}>{children}</div>
  );
}

function generateClips(title) {
  const segments = [
    { title:"The $0 to $1M Strategy Nobody Talks About", start:"02:14", end:"03:02", dur:48, tags:["mindset","strategy","viral"], emotion:92, energy:88, vs:94 },
    { title:"Why Most People Quit Before The Breakthrough", start:"07:33", end:"08:18", dur:45, tags:["motivation","failure","hustle"], emotion:78, energy:71, vs:81 },
    { title:"The One Habit That Changed Everything", start:"14:05", end:"14:52", dur:47, tags:["habit","secret","success"], emotion:85, energy:79, vs:88 },
    { title:"He Lost It All And Built It Back Twice", start:"21:40", end:"22:33", dur:53, tags:["story","resilience","broke"], emotion:96, energy:90, vs:97 },
    { title:"Most Founders Miss This Critical Step", start:"31:12", end:"31:58", dur:46, tags:["founder","mistake","startup"], emotion:66, energy:74, vs:72 },
    { title:"The Truth About Overnight Success", start:"41:05", end:"41:48", dur:43, tags:["truth","exposed","reality"], emotion:81, energy:83, vs:85 },
  ];
  return segments.map((s, i) => ({
    id: i, title: s.title, startTime: s.start, endTime: s.end, duration: s.dur,
    tags: s.tags, emotion: s.emotion, energy: s.energy, viralScore: s.vs,
    transcript: `"${s.title.toLowerCase()} — this is the part nobody tells you about. If you've been grinding for years and wondering why nothing is clicking, this moment right here is going to hit different..."`
  }));
}

const EXPORT_PLATFORMS = [
  { id:"shorts", label:"YouTube Shorts", icon:"▶", spec:"1080×1920 • H.264 • AAC", color:"#ef4444" },
  { id:"reels", label:"Instagram Reels", icon:"◈", spec:"1080×1920 • MP4 • 30fps", color:"#e1306c" },
  { id:"tiktok", label:"TikTok", icon:"♪", spec:"1080×1920 • H.264 • High Bitrate", color:"#69c9d0" },
];

export default function ClipForge() {
  const [step, setStep] = useState("upload"); // upload | processing | editor
  const [tab, setTab] = useState("clips");
  const [url, setUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processStage, setProcessStage] = useState(0);
  const [clips, setClips] = useState([]);
  const [selectedClip, setSelectedClip] = useState(null);
  const [subtitleStyle, setSubtitleStyle] = useState("MrBeast");
  const [selectedPlatform, setSelectedPlatform] = useState("shorts");
  const [exporting, setExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState("");
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(100);
  const fileRef = useRef();

  const STAGES = ["Transcribing audio…","Detecting highlights…","Scoring viral potential…","Generating clips…","Rendering subtitles…","Done!"];

  const startProcessing = () => {
    setStep("processing");
    setProgress(0);
    setProcessStage(0);
    let p = 0;
    let stage = 0;
    const iv = setInterval(() => {
      p += Math.random() * 3.2 + 0.8;
      if (p >= 100) { p = 100; clearInterval(iv); }
      const newStage = Math.min(STAGES.length - 1, Math.floor((p / 100) * STAGES.length));
      setProcessStage(newStage);
      setProgress(Math.min(100, p));
      if (p >= 100) {
        setTimeout(() => {
          const c = generateClips("podcast");
          setClips(c);
          setSelectedClip(c[0]);
          setStep("editor");
        }, 600);
      }
    }, 110);
  };

  const handleExport = () => {
    setExporting(true);
    setExportDone(false);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) { clearInterval(iv); setExporting(false); setExportDone(true); }
      setProgress(Math.min(100, p));
    }, 80);
  };

  const fetchAIInsight = async () => {
    if (!selectedClip) return;
    setAiLoading(true);
    setAiInsight("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a viral content strategist. Analyze this podcast clip and give a punchy 3-sentence viral strategy for it.
Clip title: "${selectedClip.title}"
Viral score: ${selectedClip.viralScore}/100
Tags: ${selectedClip.tags.join(", ")}
Emotion: ${selectedClip.emotion}%, Energy: ${selectedClip.energy}%

Give:
1. Why this clip will go viral (1 sentence)
2. The ideal hook caption (max 12 words, no hashtags)
3. Best time to post and which platform first

Keep it sharp, confident, and actionable. No fluff.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "No insight returned.";
      setAiInsight(text);
    } catch(e) {
      setAiInsight("Could not fetch AI insight. Check your network.");
    }
    setAiLoading(false);
  };

  // ── UPLOAD SCREEN ──
  if (step === "upload") return (
    <div style={{minHeight:"100vh", background:"#060912", color:"#e2e8f0", fontFamily:"'DM Sans',system-ui,sans-serif", overflowX:"hidden"}}>
      {/* Ambient bg */}
      <div style={{position:"fixed", inset:0, pointerEvents:"none", zIndex:0}}>
        <div style={{position:"absolute", top:-200, left:"50%", transform:"translateX(-50%)", width:900, height:600, borderRadius:"50%",
          background:"radial-gradient(ellipse,rgba(139,92,246,0.12) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute", bottom:-100, right:-100, width:500, height:500, borderRadius:"50%",
          background:"radial-gradient(ellipse,rgba(236,72,153,0.07) 0%,transparent 70%)"}}/>
      </div>

      <div style={{position:"relative", zIndex:1, maxWidth:860, margin:"0 auto", padding:"0 24px"}}>
        {/* Header */}
        <div style={{padding:"40px 0 48px", textAlign:"center"}}>
          <div style={{display:"inline-flex", alignItems:"center", gap:10, background:"rgba(139,92,246,0.12)", border:"1px solid rgba(139,92,246,0.3)", borderRadius:99, padding:"6px 16px", marginBottom:24}}>
            <span style={{fontSize:12, fontWeight:700, letterSpacing:"0.12em", color:"#a78bfa"}}>⚡ CLIPFORGE AI</span>
          </div>
          <h1 style={{fontSize:"clamp(36px,6vw,64px)", fontWeight:900, letterSpacing:"-0.03em", lineHeight:1.05, margin:"0 0 16px",
            background:"linear-gradient(135deg,#e2e8f0 30%,#a78bfa 65%,#ec4899 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>
            Turn Podcasts Into<br/>Viral Shorts
          </h1>
          <p style={{fontSize:18, color:"#64748b", maxWidth:480, margin:"0 auto", lineHeight:1.6}}>
            AI detects your best moments, cuts clips, adds captions, and formats for Shorts, Reels & TikTok.
          </p>
        </div>

        {/* Upload card */}
        <GlassCard style={{marginBottom:24}}>
          {/* YouTube URL */}
          <div style={{marginBottom:20}}>
            <label style={{fontSize:12, fontWeight:700, color:"#475569", letterSpacing:"0.08em", display:"block", marginBottom:8}}>PASTE YOUTUBE LINK</label>
            <div style={{display:"flex", gap:10}}>
              <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..."
                style={{flex:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12,
                  padding:"12px 16px", color:"#e2e8f0", fontSize:14, outline:"none"}}/>
              <button onClick={() => url && startProcessing()}
                disabled={!url}
                style={{padding:"12px 20px", borderRadius:12, border:"none",
                  background: url ? "linear-gradient(135deg,#8b5cf6,#ec4899)" : "rgba(255,255,255,0.05)",
                  color: url ? "#fff" : "#334155", fontWeight:700, fontSize:13, cursor: url ? "pointer":"default", transition:"all 0.2s"}}>
                Analyze →
              </button>
            </div>
          </div>

          <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:20}}>
            <div style={{flex:1, height:1, background:"rgba(255,255,255,0.07)"}}/>
            <span style={{fontSize:11, color:"#334155", fontWeight:600}}>OR UPLOAD VIDEO</span>
            <div style={{flex:1, height:1, background:"rgba(255,255,255,0.07)"}}/>
          </div>

          {/* Drag drop */}
          <div onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); startProcessing(); }}
            onClick={() => fileRef.current?.click()}
            style={{
              border: dragOver ? "2px dashed #8b5cf6" : "2px dashed rgba(255,255,255,0.1)",
              borderRadius:16, padding:"48px 24px", textAlign:"center", cursor:"pointer",
              background: dragOver ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.02)",
              transition:"all 0.2s"
            }}>
            <input ref={fileRef} type="file" accept="video/mp4" style={{display:"none"}} onChange={() => startProcessing()}/>
            <div style={{fontSize:40, marginBottom:12}}>🎬</div>
            <p style={{fontSize:15, fontWeight:600, color:"#94a3b8", margin:0}}>Drop your MP4 here</p>
            <p style={{fontSize:12, color:"#334155", marginTop:6}}>or click to browse • Max 2GB</p>
          </div>
        </GlassCard>

        {/* Stats row */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:32}}>
          {[["🎯","Highlight AI","Detects viral moments"],["✂️","Auto Clip","15–60s precision cuts"],["📊","Viral Score","1–100 engagement rating"]].map(([icon, title, desc]) => (
            <GlassCard key={title} style={{padding:"16px 20px", textAlign:"center"}}>
              <div style={{fontSize:28, marginBottom:8}}>{icon}</div>
              <div style={{fontSize:13, fontWeight:700, color:"#c4b5fd", marginBottom:4}}>{title}</div>
              <div style={{fontSize:11, color:"#475569"}}>{desc}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );

  // ── PROCESSING SCREEN ──
  if (step === "processing") return (
    <div style={{minHeight:"100vh", background:"#060912", display:"flex", alignItems:"center", justifyContent:"center",
      color:"#e2e8f0", fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div style={{textAlign:"center", maxWidth:480, padding:32}}>
        <div style={{position:"relative", width:120, height:120, margin:"0 auto 32px"}}>
          <ViralMeter score={Math.round(progress)} size="lg"/>
          <div style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:22, fontWeight:900, color:"#a78bfa", transform:"rotate(90deg)"}}>
            {Math.round(progress)}%
          </div>
        </div>
        <h2 style={{fontSize:28, fontWeight:900, letterSpacing:"-0.02em", marginBottom:12}}>Processing Video</h2>
        <p style={{fontSize:16, color:"#8b5cf6", fontWeight:600, marginBottom:24}}>{STAGES[processStage]}</p>
        <div style={{marginBottom:24}}>
          <ProgressBar pct={progress} height={8}/>
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:8}}>
          {STAGES.map((s, i) => (
            <div key={s} style={{display:"flex", alignItems:"center", gap:10, opacity: i <= processStage ? 1 : 0.3, transition:"opacity 0.4s"}}>
              <span style={{fontSize:14}}>{i < processStage ? "✓" : i === processStage ? "⟳" : "○"}</span>
              <span style={{fontSize:13, color: i === processStage ? "#a78bfa" : i < processStage ? "#22c55e" : "#334155", fontWeight: i === processStage ? 700 : 400}}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── EDITOR SCREEN ──
  const sortedClips = [...clips].sort((a, b) => b.viralScore - a.viralScore);

  return (
    <div style={{minHeight:"100vh", background:"#060912", color:"#e2e8f0", fontFamily:"'DM Sans',system-ui,sans-serif", display:"flex", flexDirection:"column"}}>
      {/* Top bar */}
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 24px",
        borderBottom:"1px solid rgba(255,255,255,0.06)", background:"rgba(6,9,18,0.95)", backdropFilter:"blur(20px)",
        position:"sticky", top:0, zIndex:100}}>
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <button onClick={() => setStep("upload")} style={{background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, padding:"6px 12px", color:"#64748b", fontSize:12, cursor:"pointer"}}>← Back</button>
          <span style={{fontSize:13, fontWeight:800, letterSpacing:"0.1em", background:"linear-gradient(90deg,#a78bfa,#ec4899)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>CLIPFORGE</span>
          <span style={{fontSize:11, color:"#334155", padding:"3px 8px", background:"rgba(255,255,255,0.04)", borderRadius:6}}>podcast_ep_142.mp4</span>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:8}}>
          <span style={{fontSize:12, color:"#22c55e", fontWeight:700}}>● {clips.length} clips ready</span>
          <button onClick={handleExport} style={{padding:"8px 20px", borderRadius:10, border:"none",
            background:"linear-gradient(135deg,#8b5cf6,#ec4899)", color:"#fff", fontWeight:800, fontSize:13, cursor:"pointer", letterSpacing:"0.02em"}}>
            {exporting ? "Exporting…" : exportDone ? "✓ Downloaded!" : "Export All"}
          </button>
        </div>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"300px 1fr 320px", flex:1, overflow:"hidden", height:"calc(100vh - 56px)"}}>
        {/* LEFT: Clip list */}
        <div style={{borderRight:"1px solid rgba(255,255,255,0.06)", overflowY:"auto", padding:"20px 16px"}}>
          <div style={{marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <span style={{fontSize:11, fontWeight:700, color:"#475569", letterSpacing:"0.08em"}}>CLIPS • SORTED BY VIRAL SCORE</span>
          </div>
          {sortedClips.map(c => (
            <ClipCard key={c.id} clip={c} onSelect={setSelectedClip} selected={selectedClip?.id === c.id}/>
          ))}
        </div>

        {/* CENTER: Preview + Editor */}
        <div style={{overflowY:"auto", padding:"24px"}}>
          {/* Tabs */}
          <div style={{display:"flex", borderBottom:"1px solid rgba(255,255,255,0.06)", marginBottom:24}}>
            {[["clips","✂️ Clip Editor"],["subtitles","💬 Subtitles"],["format","📐 Format"],["export","🚀 Export"]].map(([id, label]) => (
              <Tab key={id} label={label} active={tab===id} onClick={() => setTab(id)} icon=""/>
            ))}
          </div>

          {/* Clip Editor */}
          {tab === "clips" && selectedClip && (
            <div>
              {/* Preview phone mockup */}
              <div style={{display:"flex", justifyContent:"center", marginBottom:28}}>
                <div style={{width:200, height:356, background:"#0f172a", borderRadius:24, border:"2px solid rgba(255,255,255,0.1)",
                  overflow:"hidden", position:"relative", display:"flex", flexDirection:"column", justifyContent:"flex-end"}}>
                  <div style={{flex:1, background:"linear-gradient(180deg,#1a1040 0%,#0f172a 100%)",
                    display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:36, marginBottom:8}}>🎙️</div>
                      <div style={{width:80, height:80, borderRadius:"50%", background:"rgba(139,92,246,0.2)", border:"2px solid rgba(139,92,246,0.4)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto", fontSize:32}}>▶</div>
                    </div>
                  </div>
                  {/* Subtitle overlay */}
                  <div style={{padding:"12px 10px", background:"linear-gradient(0deg,rgba(0,0,0,0.9),transparent)"}}>
                    <p style={{
                      fontSize: subtitleStyle === "MrBeast" ? 14 : subtitleStyle === "Hormozi" ? 13 : 12,
                      fontWeight: subtitleStyle === "Hormozi" ? 900 : 800,
                      color: subtitleStyle === "MrBeast" ? "#facc15" : subtitleStyle === "Hormozi" ? "#fff" : "#e2e8f0",
                      textTransform: subtitleStyle === "Hormozi" ? "uppercase" : "none",
                      textAlign:"center", letterSpacing: subtitleStyle === "Hormozi" ? "0.05em" : 0,
                      textShadow:"0 2px 8px rgba(0,0,0,0.8)", lineHeight:1.3, margin:0,
                      background: subtitleStyle === "MrBeast" ? "transparent" : subtitleStyle === "Hormozi" ? "rgba(236,72,153,0.8)" : "transparent",
                      padding: subtitleStyle === "Hormozi" ? "2px 4px" : 0,
                    }}>
                      {selectedClip.title}
                    </p>
                  </div>
                  {/* Progress bar */}
                  <div style={{height:2, background:"#1e293b"}}>
                    <div style={{width:"38%", height:"100%", background:"#8b5cf6"}}/>
                  </div>
                  {/* 9:16 badge */}
                  <div style={{position:"absolute", top:8, right:8, fontSize:8, fontWeight:700, color:"#a78bfa",
                    background:"rgba(139,92,246,0.2)", padding:"2px 5px", borderRadius:4}}>9:16</div>
                </div>
              </div>

              {/* Trim controls */}
              <GlassCard style={{marginBottom:16}}>
                <div style={{fontSize:12, fontWeight:700, color:"#475569", letterSpacing:"0.08em", marginBottom:16}}>MANUAL TRIM</div>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
                  <div>
                    <label style={{fontSize:11, color:"#475569", fontWeight:600, display:"block", marginBottom:6}}>Start: {Math.round(trimStart * selectedClip.duration / 100)}s</label>
                    <input type="range" min={0} max={trimEnd-5} value={trimStart} onChange={e => setTrimStart(+e.target.value)}
                      style={{width:"100%", accentColor:"#8b5cf6"}}/>
                  </div>
                  <div>
                    <label style={{fontSize:11, color:"#475569", fontWeight:600, display:"block", marginBottom:6}}>End: {Math.round(trimEnd * selectedClip.duration / 100)}s</label>
                    <input type="range" min={trimStart+5} max={100} value={trimEnd} onChange={e => setTrimEnd(+e.target.value)}
                      style={{width:"100%", accentColor:"#8b5cf6"}}/>
                  </div>
                </div>
                <div style={{marginTop:12, height:28, background:"rgba(255,255,255,0.03)", borderRadius:8, position:"relative", overflow:"hidden"}}>
                  <div style={{position:"absolute", left:`${trimStart}%`, width:`${trimEnd-trimStart}%`, height:"100%",
                    background:"rgba(139,92,246,0.25)", border:"1px solid rgba(139,92,246,0.5)"}}/>
                  <div style={{position:"absolute", left:`${trimStart}%`, top:0, width:2, height:"100%", background:"#8b5cf6"}}/>
                  <div style={{position:"absolute", left:`${trimEnd}%`, top:0, width:2, height:"100%", background:"#ec4899"}}/>
                </div>
              </GlassCard>

              {/* Viral score breakdown */}
              <GlassCard>
                <div style={{display:"flex", alignItems:"center", gap:16}}>
                  <div style={{position:"relative", flexShrink:0}}>
                    <ViralMeter score={selectedClip.viralScore}/>
                    <div style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:16, fontWeight:900, color: selectedClip.viralScore >= 80 ? "#22c55e" : "#f59e0b", transform:"rotate(90deg)"}}>
                      {selectedClip.viralScore}
                    </div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12, fontWeight:700, color:"#475569", marginBottom:12, letterSpacing:"0.08em"}}>VIRAL SCORE BREAKDOWN</div>
                    {[["Emotion",selectedClip.emotion,"#ec4899"],["Energy",selectedClip.energy,"#f59e0b"],["Keywords",Math.round((selectedClip.viralScore+selectedClip.emotion)/2),"#8b5cf6"]].map(([label, val, color]) => (
                      <div key={label} style={{marginBottom:8}}>
                        <div style={{display:"flex", justifyContent:"space-between", marginBottom:4}}>
                          <span style={{fontSize:11, color:"#64748b"}}>{label}</span>
                          <span style={{fontSize:11, fontWeight:700, color}}>{val}%</span>
                        </div>
                        <ProgressBar pct={val} color={color} height={4}/>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Subtitles tab */}
          {tab === "subtitles" && selectedClip && (
            <div>
              <GlassCard style={{marginBottom:16}}>
                <div style={{fontSize:12, fontWeight:700, color:"#475569", letterSpacing:"0.08em", marginBottom:16}}>SUBTITLE STYLE</div>
                <div style={{display:"flex", gap:8, flexWrap:"wrap", marginBottom:20}}>
                  {["MrBeast","Hormozi","Clean","Neon","Bold"].map(s => (
                    <SubtitleStyleBtn key={s} style={s} active={subtitleStyle===s} onClick={() => setSubtitleStyle(s)}/>
                  ))}
                </div>
                <div style={{background:"#000", borderRadius:12, padding:"16px", textAlign:"center", minHeight:80, display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <p style={{
                    fontSize: subtitleStyle === "MrBeast" ? 18 : subtitleStyle === "Hormozi" ? 16 : 15,
                    fontWeight: subtitleStyle === "Hormozi" ? 900 : 800,
                    color: subtitleStyle === "MrBeast" ? "#facc15" : subtitleStyle === "Neon" ? "#4ade80" : "#fff",
                    textTransform: subtitleStyle === "Hormozi" ? "uppercase" : "none",
                    letterSpacing: subtitleStyle === "Hormozi" ? "0.06em" : 0,
                    textShadow: subtitleStyle === "Neon" ? "0 0 12px #4ade80" : "0 2px 8px rgba(0,0,0,0.8)",
                    textDecoration: subtitleStyle === "Bold" ? "underline" : "none",
                    background: subtitleStyle === "Hormozi" ? "rgba(236,72,153,0.85)" : "transparent",
                    padding: subtitleStyle === "Hormozi" ? "4px 8px" : 0,
                    margin:0, lineHeight:1.3
                  }}>
                    {selectedClip.title}
                  </p>
                </div>
              </GlassCard>
              <GlassCard>
                <div style={{fontSize:12, fontWeight:700, color:"#475569", letterSpacing:"0.08em", marginBottom:12}}>TRANSCRIPT PREVIEW</div>
                <p style={{fontSize:13, color:"#94a3b8", lineHeight:1.7, margin:0, fontStyle:"italic"}}>{selectedClip.transcript}</p>
              </GlassCard>
            </div>
          )}

          {/* Format tab */}
          {tab === "format" && (
            <GlassCard>
              <div style={{fontSize:12, fontWeight:700, color:"#475569", letterSpacing:"0.08em", marginBottom:16}}>9:16 VERTICAL FORMAT</div>
              <div style={{display:"flex", gap:16, alignItems:"flex-start"}}>
                <div style={{width:80, height:142, background:"#0f172a", borderRadius:10, border:"1px solid rgba(139,92,246,0.4)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", flexShrink:0}}>
                  <div style={{position:"absolute", top:4, right:4, width:16, height:16, borderRadius:"50%", background:"rgba(139,92,246,0.5)", border:"1px solid #8b5cf6"}}/>
                  <div style={{fontSize:24}}>👤</div>
                  <div style={{position:"absolute", bottom:0, left:0, right:0, height:30, background:"rgba(0,0,0,0.7)", borderRadius:"0 0 9px 9px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <span style={{fontSize:8, color:"#facc15", fontWeight:700}}>AI CENTERED</span>
                  </div>
                </div>
                <div style={{flex:1}}>
                  <p style={{fontSize:13, color:"#94a3b8", lineHeight:1.7, margin:"0 0 16px"}}>
                    Face detection auto-centers the speaker in the 9:16 frame. Landscape footage is intelligently cropped — no black bars.
                  </p>
                  {[["Resolution","1080 × 1920px"],["Frame Rate","30fps"],["Codec","H.264"],["Audio","AAC 320kbps"],["Bitrate","8 Mbps"]].map(([k, v]) => (
                    <div key={k} style={{display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                      <span style={{fontSize:12, color:"#475569"}}>{k}</span>
                      <span style={{fontSize:12, fontWeight:700, color:"#a78bfa"}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          )}

          {/* Export tab */}
          {tab === "export" && (
            <div>
              <GlassCard style={{marginBottom:16}}>
                <div style={{fontSize:12, fontWeight:700, color:"#475569", letterSpacing:"0.08em", marginBottom:16}}>SELECT PLATFORM</div>
                <div style={{display:"flex", flexDirection:"column", gap:10}}>
                  {EXPORT_PLATFORMS.map(p => (
                    <div key={p.id} onClick={() => setSelectedPlatform(p.id)}
                      style={{display:"flex", alignItems:"center", gap:14, padding:"14px 16px", borderRadius:12,
                        border: selectedPlatform === p.id ? `1.5px solid ${p.color}40` : "1px solid rgba(255,255,255,0.06)",
                        background: selectedPlatform === p.id ? `${p.color}10` : "rgba(255,255,255,0.02)",
                        cursor:"pointer", transition:"all 0.15s"}}>
                      <span style={{fontSize:22}}>{p.icon}</span>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13, fontWeight:700, color:"#e2e8f0"}}>{p.label}</div>
                        <div style={{fontSize:11, color:"#475569"}}>{p.spec}</div>
                      </div>
                      <div style={{width:18, height:18, borderRadius:"50%", border: `2px solid ${selectedPlatform===p.id ? p.color : "rgba(255,255,255,0.15)"}`,
                        background: selectedPlatform===p.id ? p.color : "transparent", transition:"all 0.15s"}}/>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <button onClick={handleExport} disabled={exporting}
                style={{width:"100%", padding:"15px", borderRadius:14, border:"none",
                  background: exporting ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg,#8b5cf6,#ec4899)",
                  color:"#fff", fontWeight:900, fontSize:15, cursor: exporting ? "default" : "pointer", letterSpacing:"0.02em", transition:"all 0.2s"}}>
                {exporting ? `Exporting… ${Math.round(progress)}%` : exportDone ? "✓ All Clips Downloaded!" : `Export ${clips.length} Clips for ${EXPORT_PLATFORMS.find(p=>p.id===selectedPlatform)?.label}`}
              </button>
              {exporting && <div style={{marginTop:10}}><ProgressBar pct={progress}/></div>}
            </div>
          )}
        </div>

        {/* RIGHT: AI Panel */}
        <div style={{borderLeft:"1px solid rgba(255,255,255,0.06)", overflowY:"auto", padding:"20px 16px"}}>
          <div style={{fontSize:11, fontWeight:700, color:"#475569", letterSpacing:"0.08em", marginBottom:16}}>AI INSIGHTS</div>
          
          {selectedClip && (
            <>
              <GlassCard style={{marginBottom:14}}>
                <div style={{fontSize:11, color:"#475569", fontWeight:600, marginBottom:8}}>SELECTED CLIP</div>
                <div style={{fontSize:13, fontWeight:700, color:"#c4b5fd", lineHeight:1.4, marginBottom:12}}>{selectedClip.title}</div>
                <div style={{display:"flex", alignItems:"center", gap:10}}>
                  <div style={{position:"relative"}}>
                    <ViralMeter score={selectedClip.viralScore} size="sm"/>
                    <div style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:10, fontWeight:900, color: selectedClip.viralScore >= 80 ? "#22c55e" : "#f59e0b", transform:"rotate(90deg)"}}>
                      {selectedClip.viralScore}
                    </div>
                  </div>
                  <div>
                    <div style={{fontSize:12, fontWeight:700, color: selectedClip.viralScore >= 80 ? "#22c55e" : "#f59e0b"}}>
                      {selectedClip.viralScore >= 80 ? "High Viral Potential" : "Medium Potential"}
                    </div>
                    <div style={{fontSize:11, color:"#475569"}}>{selectedClip.duration}s • {selectedClip.startTime}</div>
                  </div>
                </div>
              </GlassCard>

              <button onClick={fetchAIInsight} disabled={aiLoading}
                style={{width:"100%", padding:"10px", borderRadius:10, border:"1px solid rgba(139,92,246,0.3)",
                  background:"rgba(139,92,246,0.1)", color:"#a78bfa", fontWeight:700, fontSize:12,
                  cursor: aiLoading ? "default":"pointer", marginBottom:14, transition:"all 0.2s"}}>
                {aiLoading ? "🤖 Analyzing…" : "🤖 Get AI Strategy"}
              </button>

              {aiInsight && (
                <GlassCard style={{marginBottom:14}}>
                  <div style={{fontSize:11, color:"#8b5cf6", fontWeight:700, marginBottom:10, letterSpacing:"0.06em"}}>✦ AI VIRAL STRATEGY</div>
                  <p style={{fontSize:12, color:"#94a3b8", lineHeight:1.7, margin:0, whiteSpace:"pre-wrap"}}>{aiInsight}</p>
                </GlassCard>
              )}
            </>
          )}

          {/* All clips summary */}
          <GlassCard style={{marginBottom:14}}>
            <div style={{fontSize:11, color:"#475569", fontWeight:700, letterSpacing:"0.08em", marginBottom:12}}>ALL CLIPS OVERVIEW</div>
            {sortedClips.map(c => (
              <div key={c.id} onClick={() => setSelectedClip(c)}
                style={{display:"flex", alignItems:"center", gap:8, padding:"7px 0",
                  borderBottom:"1px solid rgba(255,255,255,0.04)", cursor:"pointer",
                  opacity: selectedClip?.id === c.id ? 1 : 0.7}}>
                <div style={{width:32, height:32, borderRadius:8, background:`hsl(${c.viralScore * 1.2},70%,40%)`, display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:11, fontWeight:900, color:"#fff", flexShrink:0}}>{c.viralScore}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:11, fontWeight:600, color:"#e2e8f0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{c.title}</div>
                  <div style={{fontSize:10, color:"#334155"}}>{c.duration}s</div>
                </div>
              </div>
            ))}
          </GlassCard>

          <GlassCard>
            <div style={{fontSize:11, color:"#475569", fontWeight:700, letterSpacing:"0.08em", marginBottom:12}}>QUICK STATS</div>
            {[["Avg Viral Score", Math.round(clips.reduce((a,c)=>a+c.viralScore,0)/clips.length||0) + "/100"],
              ["Total Duration", clips.reduce((a,c)=>a+c.duration,0) + "s"],
              ["Hot Clips", clips.filter(c=>c.viralScore>=80).length + " of " + clips.length],
              ["Best Platform","YouTube Shorts"]].map(([k,v]) => (
              <div key={k} style={{display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                <span style={{fontSize:11, color:"#475569"}}>{k}</span>
                <span style={{fontSize:11, fontWeight:700, color:"#a78bfa"}}>{v}</span>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

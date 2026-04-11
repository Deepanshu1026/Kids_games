import { useState, useEffect, useRef } from "react";
import GameModal from './GameModal'
import MemoryMatch from './games/MemoryMatch'
import BalloonPop from './games/BalloonPop'
import AnimalFun from './games/AnimalFun'
import ShapeKingdom from './games/ShapeKingdom'
import NumberSafari from './games/NumberSafari'
import DoodleWorld from './games/DoodleWorld'
import MusicJungle from './games/MusicJungle'
import ShadowMatch from './games/ShadowMatch'
import ColorMixer from './games/ColorMixer'
import PetParade from './games/PetParade'
import RocketLaunch from './games/RocketLaunch'
import kidsVideo from '../assets/kids_video.mp4'

// ── Google Fonts ──────────────────────────────────────────────────────────────
const FontLink = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --sun:    #FFD93D;
      --coral:  #FF6B6B;
      --mint:   #6BCFB0;
      --sky:    #4FC3F7;
      --purple: #C77DFF;
      --orange: #FF9A3C;
      --navy:   #1A1A4E;
      --cream:  #FFF8ED;
      --white:  #FFFFFF;
    }

    body { overflow-x: hidden; background: var(--cream); }

    .fredoka { font-family: 'Fredoka One', cursive; }
    .nunito  { font-family: 'Nunito', sans-serif; }

    /* ── floating blobs ── */
    @keyframes blobFloat {
      0%,100% { transform: translateY(0) rotate(0deg) scale(1); }
      33%      { transform: translateY(-28px) rotate(4deg) scale(1.04); }
      66%      { transform: translateY(14px) rotate(-3deg) scale(0.97); }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes wiggle {
      0%,100% { transform: rotate(-6deg); }
      50%      { transform: rotate(6deg); }
    }
    @keyframes popIn {
      from { opacity:0; transform: scale(0.7) translateY(30px); }
      to   { opacity:1; transform: scale(1)   translateY(0); }
    }
    @keyframes float {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-12px); }
    }
    @keyframes starPulse {
      0%,100% { transform: scale(1); opacity:1; }
      50%      { transform: scale(1.4); opacity:.7; }
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes rainbowBg {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}</style>
);

// ── Decorative floating shapes ────────────────────────────────────────────────
const Blob = ({ color, size, top, left, delay = 0, opacity = 0.25 }) => (
    <div style={{
        position: "absolute", borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
        width: size, height: size, background: color, opacity,
        top, left, animation: `blobFloat ${6 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`, zIndex: 0, pointerEvents: "none",
    }} />
);

const Star = ({ top, left, color, size, delay = 0 }) => (
    <div style={{
        position: "absolute", top, left, fontSize: size, lineHeight: 1,
        animation: `starPulse ${2 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`, pointerEvents: "none", zIndex: 1,
    }}>⭐</div>
);



// ── Games Data ────────────────────────────────────────────────────────────────
const GAMES = [
    {
        id: 1,
        name: "Doodle World",
        desc: "Tap & splash colors to paint magical creatures. Endless creative fun!",
        tag: "Creative",
        age: "2-3 yrs",
        players: "1 Player",
        emoji: "🎨",
        color: "#FF6B6B",
        bg: "#fff0f0",
        component: DoodleWorld
    },
    {
        id: 2,
        name: "Number Safari",
        desc: "Count adorable animals on a jungle adventure. Learn numbers the fun way!",
        tag: "Learning",
        age: "3-5 yrs",
        players: "1-2 Players",
        emoji: "🔢",
        color: "#6BCFB0",
        bg: "#f0fff9",
        component: NumberSafari
    },
    {
        id: 3,
        name: "Shape Kingdom",
        desc: "Match shapes to build castles and unlock silly characters.",
        tag: "Puzzle",
        age: "2-4 yrs",
        players: "1 Player",
        emoji: "🧩",
        color: "#C77DFF",
        bg: "#f8f0ff",
        component: ShapeKingdom
    },
    {
        id: 4,
        name: "Music Jungle",
        desc: "Tap instruments, create beats, and dance with jungle friends!",
        tag: "Music",
        age: "2-5 yrs",
        players: "1-4 Players",
        emoji: "🎵",
        color: "#FF9A3C",
        bg: "#fff5ec",
        component: MusicJungle
    },
    {
        id: 5,
        name: "Shadow Match",
        desc: "Can you guess which animal belongs to each shadow? Try it now!",
        tag: "Mind",
        age: "3-5 yrs",
        players: "1 Player",
        emoji: "👤",
        color: "#636E72",
        bg: "#f0f0f0",
        component: ShadowMatch
    },
    {
        id: 6,
        name: "Color Mixer",
        desc: "Mix red, blue and yellow to see what magic colors you can make!",
        tag: "Science",
        age: "3-5 yrs",
        players: "1 Player",
        emoji: "🧪",
        color: "#55E6C1",
        bg: "#f0fff9",
        component: ColorMixer
    },
    {
        id: 7,
        name: "Pet Parade",
        desc: "Adopt a puppy, kitten or bunny and take care of them today!",
        tag: "Care",
        age: "2-5 yrs",
        players: "1 Player",
        emoji: "🐾",
        color: "#FF9FF3",
        bg: "#fff0fa",
        component: PetParade
    },
    {
        id: 8,
        name: "Rocket Launch",
        desc: "Build up power and launch your rocket into the stars!",
        tag: "Skill",
        age: "4-5 yrs",
        players: "1 Player",
        emoji: "🚀",
        color: "#0984E3",
        bg: "#f0f7ff",
        component: RocketLaunch
    },
    {
        id: 9,
        emoji: "🎈",
        name: "Balloon Pop",
        desc: "Pop colorful balloons to improve focus and reaction time.",
        tag: "Skill",
        age: "2-4 yrs",
        players: "1 Player",
        color: "#FF8E8E",
        bg: "#fff0f0",
        component: BalloonPop
    },
    {
        id: 10,
        emoji: "🧠",
        name: "Memory Match",
        desc: "Train your brain by finding all matching animal pairs!",
        tag: "Mind",
        age: "3-5 yrs",
        players: "1-2 Players",
        color: "#FFE66D",
        bg: "#fffef0",
        component: MemoryMatch
    }
];

const TAG_COLORS = {
    Creative: "#FF6B6B", Learning: "#6BCFB0", Puzzle: "#C77DFF",
    Music: "#FF9A3C", Adventure: "#4FC3F7", Care: "#FFD93D",
    Skill: "#FF8E8E", Mind: "#FFE66D", Science: "#55E6C1"
};

// ── Game Card ─────────────────────────────────────────────────────────────────
const GameCard = ({ game, i, onPlay }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onClick={() => onPlay(game)}
            style={{
                background: hovered ? game.bg : "#fff",
                border: `3px solid ${hovered ? game.color : "#f0e8ff"}`,
                borderRadius: 28, padding: "28px 24px", cursor: "pointer",
                transform: hovered ? "translateY(-10px) scale(1.03)" : "translateY(0) scale(1)",
                transition: "all 0.28s cubic-bezier(.34,1.56,.64,1)",
                animation: `popIn 0.5s ease both`,
                animationDelay: `${i * 0.08}s`,
                boxShadow: hovered ? `0 20px 40px ${game.color}33` : "0 4px 18px rgba(0,0,0,0.07)",
            }}>
            <div style={{
                fontSize: 52, textAlign: "center", marginBottom: 12,
                animation: `float ${3 + i * 0.3}s ease-in-out infinite`
            }}>
                {game.emoji}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
                <span style={{
                    background: `${game.color}22`, color: game.color, borderRadius: 999,
                    padding: "3px 12px", fontSize: 12, fontWeight: 800, fontFamily: "'Nunito',sans-serif"
                }}>
                    {game.tag}
                </span>
                <span style={{
                    background: "#f3f0ff", color: "#7B5EA7", borderRadius: 999,
                    padding: "3px 12px", fontSize: 12, fontWeight: 700, fontFamily: "'Nunito',sans-serif"
                }}>
                    {game.age}
                </span>
            </div>
            <h3 style={{
                fontFamily: "'Fredoka One', cursive", fontSize: 22, color: "#1A1A4E",
                textAlign: "center", marginBottom: 8
            }}>{game.name}</h3>
            <p style={{
                fontFamily: "'Nunito',sans-serif", fontSize: 14, color: "#666", lineHeight: 1.6,
                textAlign: "center", marginBottom: 16
            }}>{game.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#999", fontFamily: "'Nunito',sans-serif" }}>
                    👥 {game.players}
                </span>
                <button
                    onClick={(e) => { e.stopPropagation(); onPlay(game); }}
                    style={{
                        background: game.color, color: "#fff", border: "none",
                        borderRadius: 999, padding: "8px 20px", fontFamily: "'Fredoka One',cursive",
                        fontSize: 15, cursor: "pointer", transition: "transform 0.15s",
                        transform: hovered ? "scale(1.08)" : "scale(1)"
                    }}>
                    Play Now!
                </button>
            </div>
        </div>
    );
};

// ── Marquee Banner ────────────────────────────────────────────────────────────
const Marquee = () => {
    const items = ["🎮 Safe for Kids", "✨ No Ads", "🏆 Learning + Fun", "🎨 Creative Play",
        "🔒 Parent Approved", "⭐ 500K+ Players", "🌈 New Games Weekly"];
    const doubled = [...items, ...items];
    return (
        <div style={{ overflow: "hidden", background: "#1A1A4E", padding: "14px 0" }}>
            <div style={{
                display: "flex", gap: 48, animation: "marquee 22s linear infinite",
                whiteSpace: "nowrap"
            }}>
                {doubled.map((item, i) => (
                    <span key={i} style={{
                        fontFamily: "'Fredoka One',cursive", color: "#FFD93D",
                        fontSize: 16, flexShrink: 0
                    }}>{item}</span>
                ))}
            </div>
        </div>
    );
};

// ── Trust Badges ──────────────────────────────────────────────────────────────
const BADGES = [
    { icon: "🔒", title: "100% Safe", sub: "No in-app purchases" },
    { icon: "📚", title: "Expert Designed", sub: "By child educators" },
    { icon: "👨‍👩‍👧", title: "Parent Control", sub: "Full dashboard" },
    { icon: "🏆", title: "Award Winning", sub: "Best Kids App 2024" },
];

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [activeGame, setActiveGame] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filters = ["All", "Creative", "Learning", "Puzzle", "Music", "Mind", "Care", "Skill", "Science"];
    const filtered = activeFilter === "All" ? GAMES : GAMES.filter(g => g.tag === activeFilter);

    const openGame = (game) => {
        setActiveGame(game);
        setIsModalOpen(true);
    };

    const closeGame = () => {
        setIsModalOpen(false);
        setActiveGame(null);
    };

    const ActiveGameComponent = activeGame ? activeGame.component : null;

    return (
        <>
            <FontLink />
            <div style={{
                fontFamily: "'Nunito',sans-serif", minHeight: "100vh",
                background: "var(--cream)", overflowX: "hidden"
            }}>

                {/* ── NAV ── */}
                <nav style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                    background: "rgba(255,248,237,0.92)", backdropFilter: "blur(12px)",
                    padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    height: 68, borderBottom: "2px solid #FFD93D33"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 32 }}>🎮</span>
                        <span style={{
                            fontFamily: "'Fredoka One',cursive", fontSize: 26,
                            color: "#1A1A4E", letterSpacing: 0.5
                        }}>TinyPlay</span>
                    </div>
                    <div style={{ display: "flex", gap: 28 }}>
                        {["Games", "About", "Parents"].map(l => (
                            <a key={l} href="#" style={{
                                fontFamily: "'Nunito',sans-serif", fontWeight: 700,
                                color: "#1A1A4E", textDecoration: "none", fontSize: 15,
                                transition: "color 0.2s"
                            }}
                                onMouseEnter={e => e.target.style.color = "#FF6B6B"}
                                onMouseLeave={e => e.target.style.color = "#1A1A4E"}>{l}</a>
                        ))}
                    </div>
                    <button style={{
                        background: "#FF6B6B", color: "#fff", border: "none",
                        borderRadius: 999, padding: "10px 24px", fontFamily: "'Fredoka One',cursive",
                        fontSize: 16, cursor: "pointer"
                    }}>
                        Play Free!
                    </button>
                </nav>

                {/* ── HERO ── */}
                <section style={{
                    position: "relative", minHeight: "100vh", display: "flex",
                    alignItems: "center", overflow: "hidden", paddingTop: 68
                }}>
                    {/* Background gradient */}
                    <div style={{
                        position: "absolute", inset: 0, zIndex: 0,
                        background: "linear-gradient(135deg, #FFF8ED 0%, #E8F4FF 40%, #F5EDFF 70%, #FFEDF5 100%)"
                    }} />

                    {/* Floating decorations */}
                    <Blob color="#FF6B6B" size="380px" top="-60px" left="-80px" delay={0} opacity={0.18} />
                    <Blob color="#FFD93D" size="300px" top="40%" left="70%" delay={2} opacity={0.2} />
                    <Blob color="#C77DFF" size="250px" top="60%" left="-5%" delay={1} opacity={0.15} />
                    <Blob color="#6BCFB0" size="200px" top="10%" left="55%" delay={3} opacity={0.18} />
                    <Star top="12%" left="8%" color="#FFD93D" size="28px" delay={0} />
                    <Star top="25%" left="82%" color="#FF6B6B" size="20px" delay={0.5} />
                    <Star top="70%" left="15%" color="#C77DFF" size={24} delay={1} />
                    <Star top="80%" left="72%" color="#6BCFB0" size="18px" delay={1.5} />
                    <Star top="45%" left="48%" color="#FF9A3C" size="16px" delay={0.8} />

                    {/* Content */}
                    <div style={{
                        position: "relative", zIndex: 2, display: "grid",
                        gridTemplateColumns: "1fr 1fr", gap: 48, padding: "80px 8%",
                        width: "100%", alignItems: "center"
                    }}>

                        {/* Left: Text */}
                        <div style={{ animation: "popIn 0.7s ease both" }}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 8,
                                background: "#FFD93D22", border: "2px solid #FFD93D", borderRadius: 999,
                                padding: "6px 18px", marginBottom: 24
                            }}>
                                <span style={{ fontSize: 18 }}>🌟</span>
                                <span style={{
                                    fontFamily: "'Nunito',sans-serif", fontWeight: 800,
                                    color: "#B8860B", fontSize: 14
                                }}>Safe & Fun for Ages 2-5</span>
                            </div>

                            <h1 style={{
                                fontFamily: "'Fredoka One', cursive", fontSize: "clamp(42px,6vw,78px)",
                                lineHeight: 1.1, color: "#1A1A4E", marginBottom: 24
                            }}>
                                Where Little{" "}
                                <span style={{
                                    color: "#FF6B6B", display: "inline-block",
                                    animation: "wiggle 2s ease-in-out infinite"
                                }}>Stars</span>
                                {" "}Play &{" "}
                                <span style={{ color: "#6BCFB0" }}>Grow!</span>
                            </h1>

                            <p style={{
                                fontSize: 18, color: "#555", lineHeight: 1.8, marginBottom: 36,
                                fontWeight: 600, maxWidth: 480
                            }}>
                                10+ magical games designed by child development experts.
                                No ads, no purchases — just pure, joyful learning through play! 🎉
                            </p>

                            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                                <button
                                    onClick={() => openGame(GAMES[0])}
                                    style={{
                                        background: "#FF6B6B", color: "#fff", border: "none",
                                        borderRadius: 999, padding: "16px 36px", fontFamily: "'Fredoka One',cursive",
                                        fontSize: 20, cursor: "pointer", boxShadow: "0 8px 24px #FF6B6B55",
                                        transition: "transform 0.2s, box-shadow 0.2s"
                                    }}
                                    onMouseEnter={e => { e.target.style.transform = "scale(1.07)"; e.target.style.boxShadow = "0 12px 32px #FF6B6B77"; }}
                                    onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 8px 24px #FF6B6B55"; }}>
                                    🚀 Start Playing Free
                                </button>
                                <button style={{
                                    background: "transparent", color: "#1A1A4E",
                                    border: "3px solid #1A1A4E", borderRadius: 999, padding: "16px 36px",
                                    fontFamily: "'Fredoka One',cursive", fontSize: 20, cursor: "pointer",
                                    transition: "all 0.2s"
                                }}
                                    onMouseEnter={e => { e.target.style.background = "#1A1A4E"; e.target.style.color = "#FFD93D"; }}
                                    onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#1A1A4E"; }}>
                                    👀 Watch Demo
                                </button>
                            </div>

                            <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
                                {[["500K+", "Happy Kids"], ["10+", "Fun Games"], ["4.9★", "App Rating"]].map(([n, l]) => (
                                    <div key={l}>
                                        <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 28, color: "#FF6B6B" }}>{n}</div>
                                        <div style={{ fontSize: 13, color: "#888", fontWeight: 700 }}>{l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: 3D Viewer */}
                        <div style={{ position: "relative", animation: "popIn 0.7s ease 0.2s both" }}>
                            <div style={{
                                position: "absolute", inset: -20, borderRadius: 40,
                                background: "linear-gradient(135deg,#FFD93D33,#FF6B6B22,#C77DFF22)",
                                filter: "blur(20px)", zIndex: 0
                            }} />
                            <div style={{
                                position: "relative", zIndex: 1,
                                background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
                                borderRadius: 36, border: "3px solid rgba(255,255,255,0.9)",
                                overflow: "hidden", height: 460,
                                boxShadow: "0 24px 64px rgba(200,120,255,0.2)"
                            }}>
                                <video
                                    src={kidsVideo}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            {/* floating bubbles around viewer */}
                            {[["🎮", "top:10px;right:10px", "#FFD93D"], ["⭐", "bottom:14px;left:10px", "#FF6B6B"],
                            ["🎨", "top:50%;right:-20px", "#6BCFB0"]].map(([e, s, c], i) => (
                                <div key={i} style={{
                                    position: "absolute", ...Object.fromEntries(s.split(";").map(x => x.split(":"))),
                                    width: 48, height: 48, borderRadius: "50%", background: c, display: "flex",
                                    alignItems: "center", justifyContent: "center", fontSize: 22, zIndex: 2,
                                    boxShadow: `0 4px 16px ${c}88`,
                                    animation: `float ${3 + i}s ease-in-out infinite`
                                }}>
                                    {e}
                                </div>
                            ))}
                            <div style={{
                                textAlign: "center", marginTop: 12,
                                fontFamily: "'Nunito',sans-serif", fontSize: 13, color: "#888", fontWeight: 700
                            }}>
                                ✨ Learning and fun in every adventure!
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── MARQUEE ── */}
                <Marquee />

                {/* ── GAMES SECTION ── */}
                <section style={{ padding: "100px 8%", position: "relative" }}>
                    <Blob color="#FFD93D" size="300px" top="-40px" left="80%" opacity={0.12} delay={1} />
                    <Blob color="#6BCFB0" size="250px" top="60%" left="-4%" opacity={0.12} delay={2} />

                    <div style={{ textAlign: "center", marginBottom: 60, position: "relative", zIndex: 1 }}>
                        <div style={{
                            display: "inline-block", background: "#6BCFB022", border: "2px solid #6BCFB0",
                            borderRadius: 999, padding: "6px 18px", marginBottom: 18
                        }}>
                            <span style={{
                                fontFamily: "'Nunito',sans-serif", fontWeight: 800,
                                color: "#0F8060", fontSize: 14
                            }}>🎮 Our Games</span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Fredoka One',cursive", fontSize: "clamp(32px,4vw,54px)",
                            color: "#1A1A4E", marginBottom: 16
                        }}>Pick Your Adventure!</h2>
                        <p style={{ color: "#666", fontSize: 17, maxWidth: 520, margin: "0 auto", fontWeight: 600 }}>
                            Every game is carefully crafted to spark creativity and build skills — wrapped in pure fun!
                        </p>
                    </div>

                    {/* Filter chips */}
                    <div style={{
                        display: "flex", gap: 12, justifyContent: "center",
                        flexWrap: "wrap", marginBottom: 48, position: "relative", zIndex: 1
                    }}>
                        {filters.map(f => (
                            <button key={f} onClick={() => setActiveFilter(f)}
                                style={{
                                    border: activeFilter === f ? "none" : "2px solid #e0d8f0",
                                    background: activeFilter === f ? (TAG_COLORS[f] || "#1A1A4E") : "#fff",
                                    color: activeFilter === f ? "#fff" : "#666",
                                    borderRadius: 999, padding: "8px 20px",
                                    fontFamily: "'Fredoka One',cursive", fontSize: 15, cursor: "pointer",
                                    transition: "all 0.22s cubic-bezier(.34,1.56,.64,1)",
                                    transform: activeFilter === f ? "scale(1.08)" : "scale(1)"
                                }}>
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Cards grid */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: 28, position: "relative", zIndex: 1
                    }}>
                        {filtered.map((g, i) => <GameCard key={g.id} game={g} i={i} onPlay={openGame} />)}
                    </div>
                </section>

                {/* ── TESTIMONIALS ── */}
                <section style={{ padding: "100px 8%", background: "#F5EDFF" }}>
                    <div style={{ textAlign: "center", marginBottom: 56 }}>
                        <h2 style={{
                            fontFamily: "'Fredoka One',cursive", fontSize: "clamp(28px,3.5vw,46px)",
                            color: "#1A1A4E"
                        }}>What Parents Say 💬</h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 28 }}>
                        {[
                            { q: "My daughter absolutely loves Music Jungle! She's been learning rhythms without even knowing it.", name: "Priya M.", role: "Mom of a 4-year-old", emoji: "👩🏽" },
                            { q: "Finally an app I trust! No ads, no sneaky purchases. Just pure joy for my son every morning.", name: "Arjun S.", role: "Dad of twins", emoji: "👨🏻" },
                            { q: "Doodle World improved my child's motor skills in just 2 weeks. Highly recommended!", name: "Fatima R.", role: "Mom of a 3-year-old", emoji: "👩🏾" },
                        ].map((t, i) => (
                            <div key={i} style={{
                                background: "#fff", borderRadius: 24, padding: "28px 24px",
                                boxShadow: "0 4px 20px rgba(200,120,255,0.12)",
                                animation: `popIn 0.5s ease ${i * 0.12}s both`
                            }}>
                                <div style={{ fontSize: 36, marginBottom: 16 }}>{"⭐".repeat(5)}</div>
                                <p style={{ color: "#444", lineHeight: 1.7, fontWeight: 600, marginBottom: 20 }}>
                                    "{t.q}"
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: "50%", background: "#FFD93D",
                                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
                                    }}>
                                        {t.emoji}
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 16, color: "#1A1A4E" }}>{t.name}</div>
                                        <div style={{ fontSize: 12, color: "#999", fontWeight: 700 }}>{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <footer style={{
                    background: "#1A1A4E", padding: "40px 8%",
                    display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 28 }}>🎮</span>
                        <span style={{ fontFamily: "'Fredoka One',cursive", fontSize: 22, color: "#FFD93D" }}>TinyPlay</span>
                    </div>
                    <p style={{ color: "#888", fontSize: 13, fontWeight: 600 }}>
                        © 2025 TinyPlay · Made with ❤️ for little ones everywhere
                    </p>
                    <div style={{ display: "flex", gap: 20 }}>
                        {["Privacy", "Terms", "Contact"].map(l => (
                            <a key={l} href="#" style={{
                                color: "#aaa", fontSize: 13, fontWeight: 700,
                                textDecoration: "none", transition: "color 0.2s"
                            }}
                                onMouseEnter={e => e.target.style.color = "#FFD93D"}
                                onMouseLeave={e => e.target.style.color = "#aaa"}>{l}</a>
                        ))}
                    </div>
                </footer>

                <GameModal
                    isOpen={isModalOpen}
                    onClose={closeGame}
                    title={activeGame?.name}
                    color={activeGame?.color}
                >
                    {ActiveGameComponent && <ActiveGameComponent />}
                </GameModal>

            </div>
        </>
    );
}

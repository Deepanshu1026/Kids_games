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
import rocketImg from '../assets/toy_rocket_transparent.png'
import monkeyImg from '../assets/cute_monkey_transparent.png'
import puzzleImg from '../assets/toy_puzzle_transparent.png'
import balloonsImg from '../assets/toy_balloons_transparent.png'
import drumImg from '../assets/toy_drum_transparent.png'
import paletteImg from '../assets/color_palette_transparent.png'
import animatedMonkeyVideo from '../assets/animated_monkey.mp4'
import themeSong from '../assets/song/bgsong.wav'

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

    /* ── Responsive Mobile Styles ── */
    .nav-links { display: flex; gap: 28px; }
    .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 80px 8%; width: 100%; align-items: center; }
    .stats-row { display: flex; gap: 32px; margin-top: 40px; }
    .footer-content { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; padding: 40px 8%; }
    .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
    .filter-chips { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }
    
    @media (max-width: 900px) {
        .hero-grid { grid-template-columns: 1fr; padding: 40px 5%; text-align: center; gap: 24px; }
        .hero-title { font-size: 2.8rem !important; }
        .hero-desc { margin: 0 auto 36px auto !important; }
        .hero-buttons { justify-content: center; }
        .stats-row { justify-content: center; flex-wrap: wrap; text-align: center; }
        .nav-links { display: none; } /* Hide for mobile simplicity or add a hamburger menu later */
        .footer-content { flex-direction: column; text-align: center; gap: 24px; }
    }
    
    @media (max-width: 480px) {
        .stats-row { gap: 16px; }
        .stats-row > div { flex: 1 1 40%; }
        .hero-title { font-size: 2.2rem !important; }
        .blob-bg { display: none; } /* Hide large blobs on small mobiles for cleaner look */
    }
    `}</style>
);

// ── Black Background Remover Video ────────────────────────────────────────────
const BlackKeyVideo = ({ src, style }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        let animationFrameId;

        const computeFrame = () => {
            if (!video || !canvas || video.paused || video.ended) return;

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const l = frame.data.length / 4;

            for (let i = 0; i < l; i++) {
                const r = frame.data[i * 4 + 0];
                const g = frame.data[i * 4 + 1];
                const b = frame.data[i * 4 + 2];

                // Remove pure black background
                if (r < 18 && g < 18 && b < 18) {
                    frame.data[i * 4 + 3] = 0;
                } else if (r < 30 && g < 30 && b < 30) {
                    // Soft fade for anti-aliasing edges
                    const avg = (r + g + b) / 3;
                    frame.data[i * 4 + 3] = Math.max(0, (avg - 18) * 20);
                }
            }

            ctx.putImageData(frame, 0, 0);
            animationFrameId = requestAnimationFrame(computeFrame);
        };

        const handlePlay = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            computeFrame();
        };

        video.addEventListener("play", handlePlay);
        return () => {
            video.removeEventListener("play", handlePlay);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="floating-helper-video" style={style}>
            <video
                ref={videoRef}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                style={{ display: "none" }}
            />
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
        </div>
    );
};

// ── Image Slider ──────────────────────────────────────────────────────────────
const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [rocketImg, monkeyImg, puzzleImg, balloonsImg, drumImg, paletteImg];


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {images.map((img, idx) => (
                <img
                    key={idx}
                    src={img}
                    alt="Game Thumbnail"
                    style={{
                        position: "absolute",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        opacity: currentIndex === idx ? 1 : 0,
                        transform: currentIndex === idx ? "scale(1.05) translateY(-5px)" : "scale(0.8) translateY(20px)",
                        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))"
                    }}
                />
            ))}

            {/* Slider Controls */}
            <div style={{ position: "absolute", bottom: "-30px", display: "flex", gap: "10px" }}>
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        title={`Go to slide ${idx + 1}`}
                        style={{
                            width: currentIndex === idx ? "24px" : "12px",
                            height: "12px",
                            borderRadius: "999px",
                            border: "none",
                            cursor: "pointer",
                            background: currentIndex === idx ? "#FF6B6B" : "#FFD93D",
                            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

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
        position: "absolute", top, left, fontSize: size, lineHeight: 1, color,
        animation: `starPulse ${2 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`, pointerEvents: "none", zIndex: 1,
    }}>⭐</div>
);



// ── Games Data ────────────────────────────────────────────────────────────────
const ThemeMascot = () => (
    <div className="theme-mascot" aria-label="TinyPlay jungle art guide">
        <div className="theme-mascot-bubble">
            <span>Adventure buddy</span>
            <strong>Pick a game. I will cheer!</strong>
        </div>
        <div className="theme-mascot-character">
            <span className="theme-mascot-badge">TinyPlay</span>
            <span className="theme-mascot-orbit orbit-one">123</span>
            <span className="theme-mascot-orbit orbit-two">♪</span>
            <span className="theme-mascot-orbit orbit-three">★</span>
            <span className="theme-mascot-platform" />
            <img src={monkeyImg} alt="TinyPlay monkey guide" />
            <span className="theme-mascot-note">♪</span>
            <span className="theme-mascot-spark">★</span>
        </div>
    </div>
);

const GAMES = [
    {
        id: 1,
        name: "Doodle World",
        desc: "Tap & splash colors to paint magical creatures. Endless creative fun!",
        tag: "Creative",
        age: "2-3 yrs",
        players: "1 Player",
        emoji: "🎨",
        img: paletteImg,
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
        img: monkeyImg,
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
        img: puzzleImg,
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
        img: drumImg,
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
        img: monkeyImg,
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
        img: paletteImg,
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
        img: monkeyImg,
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
        img: rocketImg,
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
        img: balloonsImg,
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
        img: puzzleImg,
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
        <div className={`adventure-card ${hovered ? "is-hovered" : ""}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onClick={() => onPlay(game)}
            style={{
                "--game-color": game.color,
                "--game-bg": game.bg,
                "--card-tilt": i % 2 === 0 ? "1.5deg" : "-1.5deg",
                background: hovered ? `linear-gradient(180deg, ${game.bg} 0%, #ffffff 58%)` : "#fff",
                border: `2px solid ${hovered ? game.color : "#e8e5f6"}`,
                borderRadius: 8, padding: "24px 24px 22px", cursor: "pointer",
                transform: hovered ? "translateY(-12px) rotate(var(--card-tilt))" : "translateY(0) rotate(0)",
                transition: "all 0.28s cubic-bezier(.34,1.56,.64,1)",
                animation: `popIn 0.5s ease both`,
                animationDelay: `${i * 0.08}s`,
                boxShadow: hovered ? `0 24px 42px ${game.color}2e` : "0 14px 32px rgba(26,26,78,0.08)",
            }}>
            <span className="card-shine" />
            <span className="card-hover-ribbon">Level unlocked</span>
            <span className="card-pop p1">★</span>
            <span className="card-pop p2">●</span>
            <span className="card-pop p3">♪</span>
            <span className="card-pop p4">✦</span>
            <div className="adventure-card-art" style={{
                animation: `float ${3 + i * 0.3}s ease-in-out infinite`
            }}>
                {game.img ? (
                    <img src={game.img} alt={game.name} style={{
                        maxHeight: "100%", maxWidth: "100%", objectFit: "contain",
                        filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.12))",
                        transform: hovered ? "scale(1.18) rotate(-2deg)" : "scale(1.08)"
                    }} />
                ) : (
                    <span style={{ fontSize: 52 }}>{game.emoji}</span>
                )}
            </div>
            <div className="adventure-meta-row" style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
                <span style={{
                    background: `${game.color}22`, color: game.color, borderRadius: 8,
                    padding: "3px 12px", fontSize: 12, fontWeight: 800, fontFamily: "'Nunito',sans-serif"
                }}>
                    {game.tag}
                </span>
                <span style={{
                    background: "#f3f0ff", color: "#7B5EA7", borderRadius: 8,
                    padding: "3px 12px", fontSize: 12, fontWeight: 700, fontFamily: "'Nunito',sans-serif"
                }}>
                    {game.age}
                </span>
            </div>
            <h3 className="adventure-card-title" style={{
                fontFamily: "'Fredoka One', cursive", fontSize: 22, color: "#1A1A4E",
                textAlign: "center", marginBottom: 8
            }}>{game.name}</h3>
            <p className="adventure-card-desc" style={{
                fontFamily: "'Nunito',sans-serif", fontSize: 14, color: "#666", lineHeight: 1.6,
                textAlign: "center", marginBottom: 16
            }}>{game.desc}</p>
            <div className="adventure-card-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#777", fontFamily: "'Nunito',sans-serif", fontWeight: 800 }}>
                    👥 {game.players}
                </span>
                <button
                    className="adventure-play-button"
                    onClick={(e) => { e.stopPropagation(); onPlay(game); }}
                    style={{
                        background: game.color, color: "#fff", border: "none",
                        borderRadius: 8, padding: "10px 20px", fontFamily: "'Fredoka One',cursive",
                        fontSize: 15, cursor: "pointer", transition: "transform 0.15s",
                        transform: hovered ? "scale(1.04)" : "scale(1)"
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

// ── Horizontal Game Showcase Slider ──────────────────────────────────────────
const ShowcaseSlider = ({ onPlay }) => {
    const sliderRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
        }
    };

    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = direction === "left" ? -600 : 600;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            setTimeout(checkScroll, 400);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const showCaseGames = [
        { id: 1, name: "Monkey Jump", img: monkeyImg, bg: "#FF6B6B", border: "#FF8E8E", textId: "MONKEY\\nJUMP!", width: 270, realGame: GAMES[0] }, // Doodle World
        { id: 2, name: "Rocket Math", img: rocketImg, bg: "#4FC3F7", border: "#8EE4FF", textId: "SPACE\\nMATH", width: 270, realGame: GAMES[7] }, // Rocket Launch
        { id: 3, name: "Pattern Puzzle", img: puzzleImg, bg: "#C77DFF", border: "#E0B3FF", textId: "PUZZLE\\nTIME", width: 270, realGame: GAMES[2] }, // Shape Kingdom
        { id: 4, name: "Color Pop", img: balloonsImg, bg: "#6BCFB0", border: "#93E4CC", textId: "COLOR\\nPOP", width: 270, realGame: GAMES[8] }, // Balloon Pop
        { id: 5, name: "Beat Drum", img: drumImg, bg: "#FF9A3C", border: "#FFB87A", textId: "DRUM\\nBEATS", width: 270, realGame: GAMES[3] }, // Music Jungle
        { id: 6, name: "Art Studio", img: paletteImg, bg: "#FFD93D", border: "#FFE885", textId: "PAINT\\nFUN", width: 270, realGame: GAMES[5] }, // Color Mixer
        { id: 7, name: "Monkey Fun", img: monkeyImg, bg: "#FF6B6B", border: "#FF8E8E", textId: "SUPER\\nMONKEY", width: 270, realGame: GAMES[4] }, // Shadow Match
        { id: 8, name: "Rocket Run", img: rocketImg, bg: "#4FC3F7", border: "#8EE4FF", textId: "ROCKET\\nRUN", width: 270, realGame: GAMES[9] }, // Memory Match
    ];

    return (
        <div style={{ position: "relative", width: "100%", background: "var(--cream)", padding: "10px 0 30px 0" }}>
            <style>{`
                .slider-wrapper { position: relative; max-width: 1400px; margin: 0 auto; padding: 0 60px; }
                .slider-container {
                    display: flex; gap: 24px; overflow-x: auto; padding: 60px 10px 30px 10px;
                    scroll-behavior: smooth; scrollbar-width: none; ms-overflow-style: none;
                }
                .slider-container::-webkit-scrollbar { display: none; }
                .showcase-card {
                    position: relative; height: 110px; border-radius: 20px; flex-shrink: 0; cursor: pointer;
                    display: flex; align-items: center; justify-content: flex-end; padding: 0 20px;
                    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.06);
                }
                .showcase-card:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 12px 24px rgba(0,0,0,0.12); }
                .showcase-card::before {
                    content: ''; position: absolute; inset: 0; 
                    background-image: radial-gradient(rgba(255,255,255,0.3) 2px, transparent 2px); 
                    background-size: 16px 16px; border-radius: 20px; opacity: 0.5;
                }
                .showcase-char {
                    position: absolute; left: -15px; bottom: 0; height: 155px; max-width: 150px;
                    object-fit: contain; pointer-events: none; z-index: 2;
                    filter: drop-shadow(0 10px 15px rgba(0,0,0,0.2));
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    transform-origin: bottom center;
                }
                .showcase-card:hover .showcase-char { transform: scale(1.1) rotate(-5deg) translateY(-4px); }
                
                .showcase-logo {
                    font-family: 'Fredoka One', cursive; color: white;
                    text-align: right; line-height: 1.1; font-size: 26px; z-index: 1;
                    text-shadow: 2px 2px 0px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.2);
                }
                .slider-btn {
                    position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
                    width: 48px; height: 48px; border-radius: 12px; border: none;
                    background: #1A1A4E; color: white; font-size: 24px; font-weight: bold;
                    display: flex; align-items: center; justify-content: center; cursor: pointer;
                    box-shadow: 0 8px 20px rgba(26, 26, 78, 0.3); transition: all 0.2s;
                }
                .slider-btn:hover:not(:disabled) { background: #FF6B6B; transform: translateY(-50%) scale(1.1); }
                .slider-btn:disabled { opacity: 0; pointer-events: none; }
                
                @media (max-width: 768px) {
                    .slider-wrapper { padding: 0 20px; }
                    .slider-btn { display: none; }
                    .showcase-card { height: 90px; }
                    .showcase-char { height: 130px; }
                    .showcase-logo { font-size: 22px; }
                }
            `}</style>

            <div className="slider-wrapper">
                <button className="slider-btn" style={{ left: 0 }} onClick={() => scroll("left")} disabled={!canScrollLeft}>❮</button>

                <div className="slider-container" ref={sliderRef} onScroll={checkScroll}>
                    {showCaseGames.map((game, i) => (
                        <div key={i} className="showcase-card" onClick={() => onPlay && onPlay(game.realGame)} style={{ background: game.bg, borderBottom: `6px solid ${game.border}`, width: game.width }}>
                            <img src={game.img} alt={game.name} className="showcase-char" style={{
                                transform: game.name.includes('Rocket') ? 'rotate(40deg) translateY(20px)' : (game.name.includes('Color Pop') ? 'rotate(-10deg) scale(1.1) translateY(10px)' : 'none')
                            }} />
                            <div className="showcase-logo">
                                {game.textId.split('\\n').map((line, idx) => <div key={idx}>{line}</div>)}
                            </div>
                        </div>
                    ))}
                </div>

                <button className="slider-btn" style={{ right: 0 }} onClick={() => scroll("right")} disabled={!canScrollRight}>❯</button>
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
    const [isMusicOn, setIsMusicOn] = useState(false);
    const themeAudioRef = useRef(null);

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

    const stopThemeSong = () => {
        themeAudioRef.current?.pause();
    };

    const startThemeSong = async () => {
        if (!themeAudioRef.current) {
            const audio = new Audio(themeSong);
            audio.loop = true;
            audio.volume = 0.35;
            themeAudioRef.current = audio;
        }

        await themeAudioRef.current.play();
    };

    const toggleThemeSong = async () => {
        if (isMusicOn) {
            stopThemeSong();
            setIsMusicOn(false);
            return;
        }

        try {
            await startThemeSong();
            setIsMusicOn(true);
        } catch {
            setIsMusicOn(false);
        }
    };

    useEffect(() => {
        return () => {
            stopThemeSong();
        };
    }, []);

    const ActiveGameComponent = activeGame ? activeGame.component : null;

    return (
        <>
            <FontLink />
            <div className="tinyplay-page" style={{
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
                    <div className="nav-links">
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

                    <BlackKeyVideo
                        src={animatedMonkeyVideo}
                        style={{
                            position: "fixed",
                            left: "2%",
                            bottom: "5%",
                            width: "220px",
                            zIndex: 1000,
                            pointerEvents: "none",
                            filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.15))"
                        }}
                    />
                    <ThemeMascot />
                    <button
                        className={`theme-song-toggle ${isMusicOn ? "is-playing" : ""}`}
                        onClick={toggleThemeSong}
                        aria-pressed={isMusicOn}
                        aria-label={isMusicOn ? "Turn background theme song off" : "Turn background theme song on"}
                    >
                        <span className="theme-song-icon">{isMusicOn ? "On" : "Off"}</span>
                        <span>{isMusicOn ? "Theme Song" : "Play Music"}</span>
                    </button>

                    {/* Content */}
                    <div className="hero-grid" style={{ position: "relative", zIndex: 2 }}>

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

                            <h1 className="hero-title" style={{
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

                            <p className="hero-desc" style={{
                                fontSize: 18, color: "#555", lineHeight: 1.8, marginBottom: 36,
                                fontWeight: 600, maxWidth: 480
                            }}>
                                10+ magical games designed by child development experts.
                                No ads, no purchases — just pure, joyful learning through play! 🎉
                            </p>

                            <div className="hero-buttons">
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

                            <div className="stats-row">
                                {[["500K+", "Happy Kids"], ["10+", "Fun Games"], ["4.9★", "App Rating"]].map(([n, l]) => (
                                    <div key={l}>
                                        <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 28, color: "#FF6B6B" }}>{n}</div>
                                        <div style={{ fontSize: 13, color: "#888", fontWeight: 700 }}>{l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Video Viewer */}
                        <div style={{ position: "relative", animation: "popIn 0.7s ease 0.2s both" }}>
                            <div style={{
                                position: "absolute", inset: -20, borderRadius: 40,
                                background: "linear-gradient(135deg,#FFD93D33,#FF6B6B22,#C77DFF22)",
                                filter: "blur(20px)", zIndex: 0
                            }} />
                            <div style={{
                                position: "relative", zIndex: 1,
                                height: 460,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <ImageSlider />
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

                {/* ── GAME SHOWCASE SLIDER ── */}
                <ShowcaseSlider onPlay={openGame} />

                {/* ── GAMES SECTION ── */}
                <section className="games-section adventure-section" style={{ padding: "96px 8% 108px", position: "relative" }}>
                    <Blob color="#FFD93D" size="300px" top="-40px" left="80%" opacity={0.12} delay={1} />
                    <Blob color="#6BCFB0" size="250px" top="60%" left="-4%" opacity={0.12} delay={2} />

                    <div className="adventure-heading" style={{ textAlign: "center", marginBottom: 44, position: "relative", zIndex: 1 }}>
                        <div className="adventure-kicker" style={{
                            display: "inline-block", background: "#6BCFB022", border: "2px solid #6BCFB0",
                            borderRadius: 8, padding: "6px 18px", marginBottom: 18
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
                    <div className="filter-chips adventure-filter-bar" style={{ position: "relative", zIndex: 1 }}>
                        {filters.map(f => (
                            <button key={f} className={activeFilter === f ? "is-active" : ""} onClick={() => setActiveFilter(f)}
                                style={{
                                    "--chip-color": TAG_COLORS[f] || "#1A1A4E",
                                    border: activeFilter === f ? "none" : "2px solid #e0d8f0",
                                    background: activeFilter === f ? (TAG_COLORS[f] || "#1A1A4E") : "#fff",
                                    color: activeFilter === f ? "#fff" : "#666",
                                    borderRadius: 8, padding: "9px 22px",
                                    fontFamily: "'Fredoka One',cursive", fontSize: 15, cursor: "pointer",
                                    transition: "all 0.22s cubic-bezier(.34,1.56,.64,1)",
                                    transform: activeFilter === f ? "translateY(-2px)" : "translateY(0)"
                                }}>
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Cards grid */}
                    <div className="games-grid adventure-grid" style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: 26, position: "relative", zIndex: 1
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
                <footer className="footer-content" style={{ background: "#1A1A4E" }}>
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

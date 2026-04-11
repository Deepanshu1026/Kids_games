import { useState, useEffect } from 'react'
import memoryMatchImg from './assets/memory_match.png'
import mathJungleImg from './assets/math_jungle.png'
import wordBalloonsImg from './assets/word_balloons.png'
import CharacterViewer from './components/hero'
const games = [
  {
    id: 'memory',
    title: 'Memory Match',
    description: 'Find all the matching animal pairs! Fun and educational.',
    image: memoryMatchImg,
    category: 'Memory',
    color: '#FF6B6B'
  },
  {
    id: 'math',
    title: 'Math Jungle',
    description: 'Solve fun math puzzles to help the monkey reach the bananas.',
    image: mathJungleImg,
    category: 'Learning',
    color: '#4ECDC4'
  },
  {
    id: 'words',
    title: 'Word Balloons',
    description: 'Pop the balloons to spell out words and learn new vocabulary.',
    image: wordBalloonsImg,
    category: 'Spelling',
    color: '#FFE66D'
  }
]

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <CharacterViewer />
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav">
          <div className="logo">
            <span className="pulse">🎮</span> KidsPlay Universe
          </div>
          <button className="btn btn-secondary">My Profile</button>
        </div>
      </header>

      <main>

        <section className="hero-section">
          <div className="hero-decoration">
            <div className="blob" style={{ width: '400px', height: '400px', top: '-10%', left: '10%' }}></div>
            <div className="blob" style={{ width: '300px', height: '300px', bottom: '0', right: '10%', background: '#4ECDC4' }}></div>
          </div>
          <div className="container hero-content">
            <h1 className="floating">Where Learning <br /> Meets <span style={{ color: '#4ECDC4' }}>Adventure!</span></h1>
            <p>Explore our collection of fun, safe, and educational games designed just for you.</p>
            <div style={{ marginTop: '32px' }}>
              <button className="btn btn-primary">Start Playing Now</button>
            </div>
          </div>
        </section>

        <section className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <h2>Featured Games</h2>
              <p>Hand-picked for maximum fun!</p>
            </div>
            <button className="btn" style={{ background: '#eee' }}>View All</button>
          </div>

          <div className="game-grid">
            {games.map((game) => (
              <div key={game.id} className="game-card">
                <div className="game-badge">{game.category}</div>
                <img src={game.image} alt={game.title} className="game-image" />
                <div className="game-info">
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ backgroundColor: game.color, border: 'none', width: '100%', marginTop: 'auto' }}
                >
                  Play Now
                </button>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '80px 0', background: 'white', marginTop: '80px' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2>Ready to learn?</h2>
            <p>New games added every week to keep the fun going!</p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
              <div style={{ padding: '24px', borderRadius: '24px', background: '#F7F9FC', flex: 1 }}>
                <span style={{ fontSize: '3rem' }}>🧠</span>
                <h3>Brain Boosters</h3>
                <p>Improve logic and memory skills.</p>
              </div>
              <div style={{ padding: '24px', borderRadius: '24px', background: '#F7F9FC', flex: 1 }}>
                <span style={{ fontSize: '3rem' }}>🎨</span>
                <h3>Creative Hub</h3>
                <p>Unleash your inner artist.</p>
              </div>
              <div style={{ padding: '24px', borderRadius: '24px', background: '#F7F9FC', flex: 1 }}>
                <span style={{ fontSize: '3rem' }}>🚀</span>
                <h3>Quick Math</h3>
                <p>Speedy challenges for sharp minds.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '40px 0', textAlign: 'center', borderTop: '1px solid #eee', marginTop: '80px' }}>
        <div className="container">
          <p>© 2026 KidsPlay Universe. Made with ❤️ for curious minds.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

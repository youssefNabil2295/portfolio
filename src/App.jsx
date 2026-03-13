import { useState, useEffect, useRef } from 'react'

// ─── DATA ───────────────────────────────────────────────
const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Contact']

const SKILLS = [
  { name: 'React', level: 88, tag: 'Framework' },
  { name: 'JavaScript (ES6+)', level: 85, tag: 'Language' },
  { name: 'HTML5', level: 95, tag: 'Markup' },
  { name: 'CSS3 & Animations', level: 88, tag: 'Styling' },
  { name: 'Tailwind CSS', level: 82, tag: 'Styling' },
  { name: 'REST APIs', level: 78, tag: 'Integration' },
  { name: 'Git & GitHub', level: 75, tag: 'Tools' },
  { name: 'Responsive Design', level: 92, tag: 'Design' },
]

const PROJECTS = [
  {
    title: 'E-Commerce Store',
    description:
      'A fully functional online store featuring product listings, shopping cart, user authentication, and full checkout flow. Connected to a RESTful backend API with dynamic data rendering.',
    tags: ['React', 'REST API', 'CSS3', 'Authentication', 'Cart System'],
    emoji: '🛒',
    accent: '#00f5a0',
    github: 'https://github.com/youssefNabil2295',
  },
  {
    title: 'Social App',
    description:
      'A social networking platform with user profiles, posts, likes, comments, and a real-time-style feed. Built with React frontend integrated with a full backend for data persistence.',
    tags: ['React', 'Node.js', 'Backend', 'Social Feed', 'CRUD'],
    emoji: '💬',
    accent: '#00d4ff',
    github: 'https://github.com/youssefNabil2295',
  },
]

// ─── HOOKS ──────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── COMPONENTS ─────────────────────────────────────────

function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + 'px'
        ref.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return <div ref={ref} className="cursor-glow" />
}

function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (link) => {
    setActive(link)
    setMenuOpen(false)
    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-darker/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="font-display font-bold text-xl tracking-tight">
          <span className="text-white">YN</span>
          <span className="text-accent">.</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => handleNav(link)}
                className={`font-body text-sm tracking-wide transition-all duration-300 relative group ${
                  active === link ? 'text-accent' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                    active === link ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-400 hover:text-accent transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
            <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-darker/95 backdrop-blur-md border-t border-border px-6 py-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className={`block w-full text-left py-3 font-body text-sm tracking-wide transition-colors ${
                active === link ? 'text-accent' : 'text-slate-400 hover:text-white'
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,245,160,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,160,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Text */}
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/5 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-accent tracking-wider">Available for work</span>
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-none mb-4">
            <span className="text-white">Youssef</span>
            <br />
            <span className="text-accent">Nabil</span>
          </h1>

          <p className="font-mono text-accent2 text-lg mb-4 tracking-wide">
            Frontend Developer
          </p>

          <p className="font-body text-slate-400 text-base leading-relaxed mb-8 max-w-md">
            Crafting fast, clean, and visually compelling web experiences with React.
            Passionate about turning ideas into real products that users love.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group inline-flex items-center gap-2 bg-accent text-dark font-display font-bold px-6 py-3 rounded-lg hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
            >
              View Projects
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
            <a
              href="https://github.com/youssefNabil2295"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border text-slate-300 font-display font-semibold px-6 py-3 rounded-lg hover:border-accent/50 hover:text-accent transition-all duration-300"
            >
              GitHub
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-border">
            {[
              { num: '2+', label: 'Projects Built' },
              { num: '3+', label: 'Years Learning' },
              { num: '8+', label: 'Skills' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display font-bold text-2xl text-accent">{s.num}</div>
                <div className="font-body text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative animate-float">
            {/* Outer ring */}
            <div className="absolute -inset-4 rounded-2xl border border-accent/20 animate-pulse" />
            {/* Glow */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-accent/20 to-accent2/10 blur-xl" />
            {/* Image */}
            <div className="relative w-72 h-96 rounded-2xl overflow-hidden border-2 border-accent/30 animate-glow">
              <img
                src="/profile.jpg"
                alt="Youssef Nabil"
                className="w-full h-full object-cover object-top"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
            </div>

            {/* Badge */}
            <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-4 py-2 shadow-xl">
              <div className="font-mono text-xs text-accent">⚛️ React Dev</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-mono text-xs text-slate-500 tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="glow-line mb-16" />
      <div className="max-w-6xl mx-auto">
        <div className="reveal grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="font-mono text-sm text-accent tracking-widest uppercase mb-4 block">
              // about me
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
              Building the web,<br />
              <span className="text-accent">one component</span> at a time.
            </h2>
            <div className="space-y-4 font-body text-slate-400 text-base leading-relaxed">
              <p>
                I'm a Frontend Developer based in Egypt, focused on building modern and
                responsive web applications with React. I enjoy turning complex problems
                into clean, intuitive user interfaces.
              </p>
              <p>
                With a background in sales, I bring strong communication skills and
                a deep understanding of user needs into everything I build.
              </p>
              <p>
                Currently working on full-stack projects including an e-commerce platform
                and a social app — both built with React and backend integration.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Cairo, Egypt 🇪🇬', 'Open to Remote', 'Full-time Ready'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs border border-border bg-card text-slate-400 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '⚛️', title: 'Frontend Focus', desc: 'React-first development approach' },
              { icon: '📱', title: 'Responsive', desc: 'Mobile-first design on every project' },
              { icon: '🔗', title: 'API Integration', desc: 'Connecting frontends to real backends' },
              { icon: '🚀', title: 'Always Learning', desc: 'Improving skills every day' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 group"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="font-display font-semibold text-white text-sm mb-1 group-hover:text-accent transition-colors">
                  {item.title}
                </div>
                <div className="font-body text-xs text-slate-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-24 px-6">
      <div className="glow-line mb-16" />
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="reveal text-center mb-14">
          <span className="font-mono text-sm text-accent tracking-widest uppercase mb-4 block">
            // skills
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            What I Work With
          </h2>
        </div>

        <div className="reveal grid md:grid-cols-2 gap-6">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              className="bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="font-display font-semibold text-white text-sm">{skill.name}</span>
                  <span className="font-mono text-xs text-slate-600 ml-2">{skill.tag}</span>
                </div>
                <span className="font-mono text-xs text-accent">{skill.level}%</span>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-accent to-accent2"
                  style={{ width: animated ? `${skill.level}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="glow-line mb-16" />
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-14">
          <span className="font-mono text-sm text-accent tracking-widest uppercase mb-4 block">
            // projects
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Things I've Built
          </h2>
        </div>

        <div className="reveal grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="bg-card border border-border rounded-2xl overflow-hidden group hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5"
            >
              {/* Header */}
              <div
                className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}10 0%, transparent 60%), #111118`,
                }}
              >
                <span className="text-7xl">{project.emoji}</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${project.accent}15, transparent 70%)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-body text-slate-400 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2.5 py-1 rounded-md border border-border text-slate-500 bg-darker"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-display font-semibold text-sm text-slate-400 hover:text-accent transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(null)

  const copy = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="glow-line mb-16" />
      <div className="max-w-3xl mx-auto text-center">
        <div className="reveal">
          <span className="font-mono text-sm text-accent tracking-widest uppercase mb-4 block">
            // contact
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Let's Work Together
          </h2>
          <p className="font-body text-slate-400 text-base leading-relaxed mb-12 max-w-xl mx-auto">
            I'm currently open to new opportunities. Whether you have a project in mind or just want
            to say hi — my inbox is always open.
          </p>

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {/* Email */}
            <button
              onClick={() => copy('youssefnabil41995@gmail.com', 'email')}
              className="bg-card border border-border rounded-xl p-5 text-left hover:border-accent/40 transition-all duration-300 group"
            >
              <div className="font-mono text-xs text-slate-500 mb-2">📧 Email</div>
              <div className="font-body text-white text-sm group-hover:text-accent transition-colors break-all">
                youssefnabil41995@gmail.com
              </div>
              <div className="font-mono text-xs text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {copied === 'email' ? '✓ Copied!' : 'Click to copy'}
              </div>
            </button>

            {/* Phone */}
            <button
              onClick={() => copy('01144197332', 'phone')}
              className="bg-card border border-border rounded-xl p-5 text-left hover:border-accent/40 transition-all duration-300 group"
            >
              <div className="font-mono text-xs text-slate-500 mb-2">📱 Phone</div>
              <div className="font-body text-white text-sm group-hover:text-accent transition-colors">
                01144197332
              </div>
              <div className="font-mono text-xs text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {copied === 'phone' ? '✓ Copied!' : 'Click to copy'}
              </div>
            </button>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/youssefNabil2295"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-border bg-card text-slate-400 hover:text-accent hover:border-accent/40 font-display font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/youssef-nabil-749a541b6"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-border bg-card text-slate-400 hover:text-accent2 hover:border-accent2/40 font-display font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 text-center">
      <p className="font-mono text-xs text-slate-600">
        Built by <span className="text-accent">Youssef Nabil</span> · 2026
      </p>
    </footer>
  )
}

// ─── APP ─────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav] = useState('Home')
  useReveal()

  return (
    <div className="min-h-screen bg-dark text-white relative">
      <CursorGlow />
      <Navbar active={activeNav} setActive={setActiveNav} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

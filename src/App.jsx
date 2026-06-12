import { useState, useEffect, useRef } from 'react'

// ─── DATA ───────────────────────────────────────────────
const NAV_LINKS = ['Home', 'About', 'Projects', 'Skills', 'Contact']

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
    title: 'Multi-Vendor E-Commerce Platform',
    description:
      'A comprehensive online shopping platform featuring a fully interactive product catalog, categorized navigation, search system, and dynamic shopping cart management. Built to deliver a seamless client-side user experience with rapid rendering.',
    tags: ['React', 'React Router', 'Tailwind CSS', 'State Management', 'Responsive Design'],
    emoji: '🛒',
    accent: '#00f5a0',
    liveLink: 'https://e-commerce-nine-phi-10.vercel.app/#/',
    github: 'https://github.com/youssefNabil2295',
  },
  {
    title: 'She Clinic Website',
    description:
      'A premium, modern web application designed for a specialized beauty and medical clinic. Features a clean multi-page user interface built with advanced components, custom booking inquiries, detailed service highlights, and an interactive image gallery.',
    tags: ['React', 'Tailwind CSS', 'UI/UX Design', 'Interactive UI', 'Multi-Page Navigation'],
    emoji: '✨',
    accent: '#ff007f',
    liveLink: 'https://she-clinic.vercel.app/',
    github: 'https://github.com/youssefNabil2295',
  },
  {
    title: 'Menna Ismail Makeup Artist Portfolio',
    description:
      'A sleek, visually stunning brand presentation platform showcasing professional makeup services, pricing structures, and media showcases. Heavily optimized for mobile devices with high-performance responsive layout distributions.',
    tags: ['React', 'Tailwind CSS', 'Visual Portfolio', 'Mobile First', 'Modern Layouts'],
    emoji: '💄',
    accent: '#00d4ff',
    liveLink: 'https://menna-ismail-makeup-artist.vercel.app/',
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

function Navbar({ active, setActive, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)

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
        <div className="font-display font-bold text-xl tracking-tight">
          <span className="text-white">YN</span>
          <span className="text-accent">.</span>
        </div>

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
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,245,160,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,160,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div>
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
            Flexible in adapting custom layouts and dedicated to turning software ideas into premium user interfaces.
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
            <a
              href="/cv.pdf"
              download="youssef-nabil-cv"
              className="inline-flex items-center gap-2 border border-accent text-accent font-display font-semibold px-6 py-3 rounded-lg hover:bg-accent hover:text-dark transition-all duration-300"
            >
              Download CV ↓
            </a>
          </div>
                
          <div className="flex gap-8 mt-10 pt-8 border-t border-border">
            {[
              { num: '3+', label: 'Commercial Projects' },
              { num: '3+', label: 'Years Learning' },
              { num: '8+', label: 'Core Skills' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display font-bold text-2xl text-accent">{s.num}</div>
                <div className="font-body text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative animate-float">
            <div className="absolute -inset-4 rounded-2xl border border-accent/20 animate-pulse" />
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-accent/20 to-accent2/10 blur-xl" />
            <div className="relative w-72 h-96 rounded-2xl overflow-hidden border-2 border-accent/30 animate-glow">
              <img
                src="/profile.jpg"
                alt="Youssef Nabil"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-4 py-2 shadow-xl">
              <div className="font-mono text-xs text-accent">⚛️ React Dev</div>
            </div>
          </div>
        </div>
      </div>

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
                I'm a Front-end Developer based in Egypt, specialized in engineering high-end, clean, and interactive user interfaces using React and modern CSS architectures like Tailwind CSS.
              </p>
              <p>
                Leveraging a diverse structural workflow background, I bridge user empathy with high-quality technical implementation, striving to create solid web apps that balance performance and accessibility.
              </p>
              <p>
                Currently focusing on scaling commercial single-page applications, production landing pages, and interactive client portfolios with a strong emphasis on pixel-perfect layouts.
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

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '⚛️', title: 'Frontend Focus', desc: 'React-first development approach' },
              { icon: '📱', title: 'Responsive Layouts', desc: 'Fluid design targeting all viewports' },
              { icon: '🔗', title: 'Interactive Cards', desc: 'Handling interactive dynamic states' },
              { icon: '🚀', title: 'Performance Oriented', desc: 'Optimizing rendering cycles' },
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

        <div className="reveal grid md:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="bg-card border border-border rounded-2xl overflow-hidden group hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 flex flex-col justify-between"
            >
              <div>
                <div
                  className="h-44 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.accent}10 0%, transparent 60%), #111118`,
                  }}
                >
                  <span className="text-6xl">{project.emoji}</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${project.accent}15, transparent 70%)`,
                    }}
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-body text-slate-400 text-xs leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-md border border-border text-slate-400 bg-darker"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-border/20 mt-auto">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-display font-bold text-xs text-accent hover:underline transition-all duration-300"
                >
                  Live Demo 🔗
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-display font-semibold text-xs text-slate-400 hover:text-white transition-colors duration-300"
                >
                  GitHub →
                </a>
              </div>
            </div>
          ))}
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

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
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
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatsAppButton({ isMenuOpen }) {
  // يخفي الزرار لو قائمة الموبايل مفتوحة لتجنب تداخل الـ UI
  if (isMenuOpen) return null;

  return (
    <a
      href="https://wa.me/201144197332"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-darker/80 backdrop-blur-sm border border-accent text-accent hover:bg-accent hover:text-dark p-3.5 rounded-full shadow-2xl transition-all duration-300 group flex items-center justify-center hover:scale-110 active:scale-95"
      aria-label="Contact on WhatsApp"
    >
      {/* نبضة مشعة (Radiant Pulse Effect) حول الزرار بلون الـ Accent */}
      <span className="absolute -inset-1 rounded-full bg-accent/20 animate-ping opacity-75 group-hover:opacity-100 transition-opacity" />
      
      <svg
        className="w-6 h-6 fill-current relative z-10"
        viewBox="0 0 24 24"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-3.559c1.649.979 3.26 1.489 4.854 1.49 5.405-.003 9.803-4.383 9.806-9.767.001-2.606-1.012-5.056-2.852-6.898C16.554 3.383 14.11 2.37 11.514 2.37c-5.413 0-9.81 4.385-9.813 9.77-.001 1.77.485 3.5 1.406 5.023l-.934 3.415 3.474-.912zm11.215-4.887c-.3-.15-1.774-.875-2.048-.974-.274-.1-.474-.15-.674.15-.2.3-.774.974-.949 1.174-.175.2-.35.225-.65.075-1.125-.562-1.913-1.012-2.662-2.3-.199-.343.199-.319.57-.104.333.193.65.65.65.65.2.3.2.55.1.75-.1.2-.5 1.2-1.15 1.75-.42.355-.85.15-1.15-.05-1.637-.818-2.684-1.803-3.262-2.82-.175-.3-.025-.463.125-.613.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.624-.924-2.224-.244-.588-.493-.508-.674-.517-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.224 5.112 4.525.714.31 1.272.495 1.708.634.717.228 1.37.195 1.886.118.574-.085 1.774-.725 2.024-1.425.25-.7 2.5-2.425.175-2.575z" />
      </svg>
    </a>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useReveal()

  return (
    <div className="min-h-screen bg-dark text-white relative">
      <CursorGlow />
      <Navbar active={activeNav} setActive={setActiveNav} menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      {/* استدعاء زر الواتساب العائم وتمرير حالة المنيو */}
      <WhatsAppButton isMenuOpen={isMenuOpen} />
    </div>
  )
}
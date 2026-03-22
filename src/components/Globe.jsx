import React from 'react';

export default function Globe() {
  // Generate particles for the globe
  const particles = Array.from({ length: 60 }, (_, i) => {
    const angle = (i / 60) * Math.PI * 2;
    const radius = 120 + Math.random() * 60;
    const x = 200 + Math.cos(angle) * radius;
    const y = 200 + Math.sin(angle) * radius;
    const size = 1 + Math.random() * 2.5;
    const delay = Math.random() * 5;
    const duration = 3 + Math.random() * 4;
    return { x, y, size, delay, duration, id: i };
  });

  // Orbit dots
  const orbitDots = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i / 8) * 360,
    radius: 140 + (i % 3) * 20,
    duration: 12 + i * 2,
    size: 2 + (i % 3),
  }));

  return (
    <div className="relative w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] mx-auto animate-float">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-teal-500/5 blur-3xl scale-125" />
      
      {/* SVG Globe */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full relative z-10"
        style={{ filter: 'drop-shadow(0 0 30px rgba(26,188,156,0.15))' }}
      >
        {/* Subtle grid circles */}
        {[160, 130, 100, 70].map((r, i) => (
          <circle
            key={`grid-${i}`}
            cx="200" cy="200" r={r}
            className="globe-grid-line"
            strokeDasharray={i % 2 === 0 ? "4 6" : "none"}
          />
        ))}

        {/* Main globe circle */}
        <circle
          cx="200" cy="200" r="140"
          fill="none"
          stroke="url(#globeGrad)"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Meridians */}
        {[-60, -20, 20, 60].map((rx, i) => (
          <ellipse
            key={`meridian-${i}`}
            cx="200" cy="200"
            rx={Math.abs(rx) + 20} ry="140"
            fill="none"
            stroke="url(#globeGrad)"
            strokeWidth="0.8"
            opacity="0.3"
          />
        ))}

        {/* Parallels */}
        {[-80, -40, 0, 40, 80].map((dy, i) => {
          const y = 200 + dy;
          const r = Math.sqrt(140 * 140 - dy * dy);
          return (
            <line
              key={`parallel-${i}`}
              x1={200 - r} y1={y}
              x2={200 + r} y2={y}
              stroke="url(#globeGrad)"
              strokeWidth="0.6"
              opacity="0.25"
            />
          );
        })}

        {/* Particle dots */}
        {particles.map(p => (
          <circle
            key={`particle-${p.id}`}
            cx={p.x} cy={p.y} r={p.size}
            fill="#1abc9c"
            opacity="0.4"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.6;0.1"
              dur={`${p.duration}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Animated orbit dots */}
        {orbitDots.map(dot => (
          <circle
            key={`orbit-${dot.id}`}
            r={dot.size}
            fill={dot.id % 2 === 0 ? "#1abc9c" : "#c9a84c"}
            opacity="0.7"
          >
            <animateMotion
              dur={`${dot.duration}s`}
              repeatCount="indefinite"
              begin={`${dot.id * 0.5}s`}
            >
              <mpath href={`#orbitPath-${dot.id % 3}`} />
            </animateMotion>
          </circle>
        ))}

        {/* Orbit paths */}
        <ellipse id="orbitPath-0" cx="200" cy="200" rx="140" ry="50" fill="none" />
        <ellipse id="orbitPath-1" cx="200" cy="200" rx="50" ry="140" fill="none" />
        <ellipse id="orbitPath-2" cx="200" cy="200" rx="120" ry="90" fill="none" transform="rotate(30, 200, 200)" />

        {/* Center pulse */}
        <circle cx="200" cy="200" r="6" fill="#1abc9c" opacity="0.8">
          <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Gradients */}
        <defs>
          <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1abc9c" />
            <stop offset="100%" stopColor="#c9a84c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

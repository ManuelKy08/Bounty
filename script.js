// Detect if mobile device
const isMobile = window.innerWidth <= 768;

// Matrix Rain Effect
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'kikikokokrrsecriskymanueltamba?><!#4(*!&@^99912312451';
const fontSize = isMobile ? 16 : 23;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

let lastTime = 0;
const fps = isMobile ? 20 : 30; // Lower FPS on mobile for performance
const interval = 1000 / fps;

function drawMatrix(currentTime) {
    if (currentTime - lastTime >= interval) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        lastTime = currentTime;
    }
    requestAnimationFrame(drawMatrix);
}

requestAnimationFrame(drawMatrix);

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Custom Cursor (Desktop only)
if (!isMobile) {
    const customCursor = document.getElementById('customCursor');
    let cursorTrails = [];

    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';

        // Create cursor trail
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);

        cursorTrails.push(trail);
        if (cursorTrails.length > 10) {
            const oldTrail = cursorTrails.shift();
            oldTrail.remove();
        }

        setTimeout(() => {
            trail.remove();
            cursorTrails = cursorTrails.filter(t => t !== trail);
        }, 500);
    });
}

// Glitch Effect for ASCII Art
const asciiArt = document.getElementById('asciiArt');
if (asciiArt) {
    setInterval(() => {
        asciiArt.style.textShadow = `
            0 0 ${Math.random() * 10 + 5}px rgba(0, 255, 0, ${Math.random() * 0.5 + 0.5}),
            0 0 ${Math.random() * 20 + 10}px rgba(0, 255, 0, ${Math.random() * 0.3 + 0.4}),
            0 0 ${Math.random() * 30 + 15}px rgba(0, 255, 0, ${Math.random() * 0.2 + 0.3})
        `;
    }, 2000);
}

// Smooth scroll for anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Log to console (Easter egg for security researchers)
console.log('%c🔐 RISKY MANUEL - CYBERSECURITY PORTFOLIO', 'color: #00ff00; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(0,255,0,0.8);');
console.log('%cLooking for vulnerabilities? Nice try! 😎', 'color: #00ffff; font-size: 14px;');
console.log('%cThis portfolio is protected by layers of cyberpunk magic ✨', 'color: #00ff00; font-size: 12px;');
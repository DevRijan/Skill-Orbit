/**
 * Skill-Orbit Visuals - Interactive Fluid Background
 * High-performance canvas-based gradient mesh simulation.
 */

class FluidBackground {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.particles = [];
        this.mouse = { x: -1000, y: -1000 };
        this.numPoints = 12;
        this.numParticles = 100;
        this.colors = [];
        
        this.init();
        this.animate();
        this.bindEvents();
    }

    init() {
        this.resize();
        this.updateColors();
        
        // Init Blobs
        this.points = [];
        for (let i = 0; i < this.numPoints; i++) {
            this.points.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                radius: Math.random() * 500 + 350,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            });
        }

        // Init Particles
        this.particles = [];
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    updateColors() {
        const isLight = document.body.classList.contains('light-mode');
        if (isLight) {
            this.colors = [
                'rgba(139, 92, 246, 0.18)', // Softer Purple
                'rgba(14, 165, 233, 0.15)',  // Softer Sky
                'rgba(167, 139, 250, 0.12)'  // Faint Lavender
            ];
            this.particleColor = 'rgba(139, 92, 246, 0.22)';
            this.lineColor = 'rgba(139, 92, 246, 0.12)';
        } else {
            this.colors = [
                'rgba(124, 58, 237, 0.4)', // Much more opaque
                'rgba(14, 165, 233, 0.35)',
                'rgba(139, 92, 246, 0.3)'
            ];
            this.particleColor = 'rgba(255, 255, 255, 0.25)';
            this.lineColor = 'rgba(124, 58, 237, 0.15)';
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.init());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        const observer = new MutationObserver(() => {
            this.updateColors();
            this.points.forEach(p => {
                p.color = this.colors[Math.floor(Math.random() * this.colors.length)];
            });
        });
        observer.observe(document.body, { attributes: true });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw Blobs
        this.points.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 500) {
                const force = (500 - dist) / 500;
                p.x -= dx * force * 0.015;
                p.y -= dy * force * 0.015;
            }

            if (p.x < -p.radius) p.x = this.canvas.width + p.radius;
            if (p.x > this.canvas.width + p.radius) p.x = -p.radius;
            if (p.y < -p.radius) p.y = this.canvas.height + p.radius;
            if (p.y > this.canvas.height + p.radius) p.y = -p.radius;

            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw Particles & Network
        this.particles.forEach((p, i) => {
            p.update(this.mouse);
            p.draw(this.ctx, this.particleColor);
            
            // Draw lines to nearby particles
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.lineColor;
                    this.ctx.globalAlpha = 1 - (dist / 150);
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        });
        this.ctx.globalAlpha = 1;

        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.originalVx = this.vx;
        this.originalVy = this.vy;
    }

    update(mouse) {
        this.x += this.vx;
        this.y += this.vy;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
            const force = (150 - dist) / 150;
            this.vx -= dx * force * 0.05;
            this.vy -= dy * force * 0.05;
        } else {
            // Gradually return to original speed
            this.vx += (this.originalVx - this.vx) * 0.02;
            this.vy += (this.originalVy - this.vy) * 0.02;
        }

        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
    }

    draw(ctx, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    new FluidBackground();
});

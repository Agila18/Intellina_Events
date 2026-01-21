import React, { useEffect, useRef } from 'react';
import './ParticleNetworkAnimation.css';

const ParticleNetworkAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // --- HELPER FUNCTIONS ---
        const getLimitedRandom = (min, max, roundToInteger) => {
            let number = Math.random() * (max - min) + min;
            if (roundToInteger) {
                number = Math.round(number);
            }
            return number;
        };

        const returnRandomArrayitem = (array) => {
            return array[Math.floor(Math.random() * array.length)];
        };

        // --- CLASSES ---

        /**
         * Particle Class
         */
        class Particle {
            constructor(parent, x, y) {
                this.network = parent;
                this.canvas = parent.canvas;
                this.ctx = parent.ctx;
                this.particleColor = returnRandomArrayitem(this.network.options.particleColors);
                this.radius = getLimitedRandom(1.5, 2.5);
                this.opacity = 0;
                this.x = x || Math.random() * this.canvas.width;
                this.y = y || Math.random() * this.canvas.height;
                this.velocity = {
                    x: (Math.random() - 0.5) * parent.options.velocity,
                    y: (Math.random() - 0.5) * parent.options.velocity
                };
            }

            update() {
                if (this.opacity < 1) {
                    this.opacity += 0.01;
                } else {
                    this.opacity = 1;
                }
                // Change dir if outside map
                if (this.x > this.canvas.width + 100 || this.x < -100) {
                    this.velocity.x = -this.velocity.x;
                }
                if (this.y > this.canvas.height + 100 || this.y < -100) {
                    this.velocity.y = -this.velocity.y;
                }

                // Update position
                this.x += this.velocity.x;
                this.y += this.velocity.y;
            }

            draw() {
                this.ctx.beginPath();
                this.ctx.fillStyle = this.particleColor;
                this.ctx.globalAlpha = this.opacity;
                this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        }

        /**
         * ParticleNetwork Class
         */
        class ParticleNetwork {
            constructor(parent) {
                this.options = {
                    velocity: 1, // the higher the faster
                    density: 15000, // the lower the denser
                    netLineDistance: 200,
                    netLineColor: 'rgba(229, 9, 20, 0.4)', // Intellina Red
                    particleColors: ['#e50914', '#ff3333', '#b30710'] // Red variants
                };
                this.canvas = parent.canvas;
                this.ctx = parent.ctx;

                this.animationFrame = null;
                this.createIntervalId = null;

                this.init();
            }

            init() {
                this.createParticles(true);
                this.animationFrame = requestAnimationFrame(this.update.bind(this));
                this.bindUiActions();
            }

            createParticles(isInitial) {
                this.particles = [];
                const quantity = this.canvas.width * this.canvas.height / this.options.density;

                if (isInitial) {
                    let counter = 0;
                    if (this.createIntervalId) clearInterval(this.createIntervalId);

                    this.createIntervalId = setInterval(() => {
                        if (counter < quantity - 1) {
                            this.particles.push(new Particle(this));
                        } else {
                            clearInterval(this.createIntervalId);
                        }
                        counter++;
                    }, 250);
                } else {
                    for (let i = 0; i < quantity; i++) {
                        this.particles.push(new Particle(this));
                    }
                }
            }

            createInteractionParticle() {
                this.interactionParticle = new Particle(this);
                this.interactionParticle.velocity = { x: 0, y: 0 };
                this.particles.push(this.interactionParticle);
                return this.interactionParticle;
            }

            removeInteractionParticle() {
                const index = this.particles.indexOf(this.interactionParticle);
                if (index > -1) {
                    this.interactionParticle = undefined;
                    this.particles.splice(index, 1);
                }
            }

            update() {
                if (this.canvas) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.ctx.globalAlpha = 1;

                    // Draw connections
                    for (let i = 0; i < this.particles.length; i++) {
                        for (let j = this.particles.length - 1; j > i; j--) {
                            const p1 = this.particles[i];
                            const p2 = this.particles[j];

                            // Simple check
                            let distance = Math.min(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
                            if (distance > this.options.netLineDistance) continue;

                            // Precise check
                            distance = Math.sqrt(
                                Math.pow(p1.x - p2.x, 2) +
                                Math.pow(p1.y - p2.y, 2)
                            );
                            if (distance > this.options.netLineDistance) continue;

                            this.ctx.beginPath();
                            this.ctx.strokeStyle = this.options.netLineColor;
                            this.ctx.globalAlpha = (this.options.netLineDistance - distance) / this.options.netLineDistance * p1.opacity * p2.opacity;
                            this.ctx.lineWidth = 0.7;
                            this.ctx.moveTo(p1.x, p1.y);
                            this.ctx.lineTo(p2.x, p2.y);
                            this.ctx.stroke();
                        }
                    }

                    // Draw particles
                    for (let i = 0; i < this.particles.length; i++) {
                        this.particles[i].update();
                        this.particles[i].draw();
                    }

                    if (this.options.velocity !== 0) {
                        this.animationFrame = requestAnimationFrame(this.update.bind(this));
                    }
                }
            }

            bindUiActions() {
                this.spawnQuantity = 3;
                this.mouseIsDown = false;
                this.touchIsMoving = false;

                this.onMouseMove = (e) => {
                    // Adjust for canvas position relative to viewport
                    const rect = this.canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    if (!this.interactionParticle) {
                        this.createInteractionParticle();
                    }
                    this.interactionParticle.x = x;
                    this.interactionParticle.y = y;
                };

                this.onTouchMove = (e) => {
                    e.preventDefault();
                    this.touchIsMoving = true;

                    const rect = this.canvas.getBoundingClientRect();
                    const x = e.changedTouches[0].clientX - rect.left;
                    const y = e.changedTouches[0].clientY - rect.top;

                    if (!this.interactionParticle) {
                        this.createInteractionParticle();
                    }
                    this.interactionParticle.x = x;
                    this.interactionParticle.y = y;
                };

                this.onMouseDown = (e) => {
                    this.mouseIsDown = true;
                    let counter = 0;
                    let quantity = this.spawnQuantity;

                    const intervalId = setInterval(() => {
                        if (this.mouseIsDown) {
                            if (counter === 1) quantity = 1;
                            for (let i = 0; i < quantity; i++) {
                                if (this.interactionParticle) {
                                    this.particles.push(new Particle(this, this.interactionParticle.x, this.interactionParticle.y));
                                }
                            }
                        } else {
                            clearInterval(intervalId);
                        }
                        counter++;
                    }, 50);
                };

                this.onTouchStart = (e) => {
                    e.preventDefault();
                    setTimeout(() => {
                        if (!this.touchIsMoving) {
                            const rect = this.canvas.getBoundingClientRect();
                            const x = e.changedTouches[0].clientX - rect.left;
                            const y = e.changedTouches[0].clientY - rect.top;

                            for (let i = 0; i < this.spawnQuantity; i++) {
                                this.particles.push(new Particle(this, x, y));
                            }
                        }
                    }, 200);
                };

                this.onMouseUp = () => { this.mouseIsDown = false; };
                this.onMouseOut = () => { this.removeInteractionParticle(); };
                this.onTouchEnd = (e) => {
                    e.preventDefault();
                    this.touchIsMoving = false;
                    this.removeInteractionParticle();
                };

                // Bind events to canvas
                this.canvas.addEventListener('mousemove', this.onMouseMove);
                this.canvas.addEventListener('touchmove', this.onTouchMove);
                this.canvas.addEventListener('mousedown', this.onMouseDown);
                this.canvas.addEventListener('touchstart', this.onTouchStart);
                this.canvas.addEventListener('mouseup', this.onMouseUp);
                this.canvas.addEventListener('mouseout', this.onMouseOut);
                this.canvas.addEventListener('touchend', this.onTouchEnd);
            }

            unbindUiActions() {
                if (this.canvas) {
                    this.canvas.removeEventListener('mousemove', this.onMouseMove);
                    this.canvas.removeEventListener('touchmove', this.onTouchMove);
                    this.canvas.removeEventListener('mousedown', this.onMouseDown);
                    this.canvas.removeEventListener('touchstart', this.onTouchStart);
                    this.canvas.removeEventListener('mouseup', this.onMouseUp);
                    this.canvas.removeEventListener('mouseout', this.onMouseOut);
                    this.canvas.removeEventListener('touchend', this.onTouchEnd);
                }
            }

            destroy() {
                if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
                if (this.createIntervalId) clearInterval(this.createIntervalId);
                this.unbindUiActions();
            }
        }

        // --- INITIALIZATION ---
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        const sizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        sizeCanvas();

        const particleNetwork = new ParticleNetwork({
            canvas: canvas,
            ctx: ctx,
            options: {} // Options handled inside class constructor for now, or pass props
        });

        const handleResize = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            sizeCanvas();
            particleNetwork.createParticles(false);
        };

        window.addEventListener('resize', handleResize);

        // --- CLEANUP ---
        return () => {
            window.removeEventListener('resize', handleResize);
            particleNetwork.destroy();
            container.removeChild(canvas);
        };

    }, []);

    return (
        <div className="particle-network-animation" ref={containerRef}>
            <div className="glow glow-1"></div>
            <div className="glow glow-2"></div>
            <div className="glow glow-3"></div>
        </div>
    );
};

export default ParticleNetworkAnimation;

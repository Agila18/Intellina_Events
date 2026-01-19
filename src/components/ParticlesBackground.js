import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        // console.log(container);
    };

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: 'transparent',
                },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push',
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse',
                    },
                    resize: true,
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: ['#ff0000', '#8B0000', '#b40707ff'], // Red, Dark Red, White
                },
                links: {
                    color: '#ff0000',
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 1,
                    triangles: {
                        enable: true,
                        opacity: 0.1,
                    },
                },
                collisions: {
                    enable: false,
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'bounce',
                    },
                    random: true,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 120,
                    limit: 130,
                },
                opacity: {
                    value: { min: 0.3, max: 0.8 },
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.3,
                        sync: false,
                    },
                },
                shape: {
                    type: ['circle', 'triangle'],
                },
                size: {
                    value: { min: 1, max: 3 },
                    animation: {
                        enable: true,
                        speed: 2,
                        minimumValue: 0.5,
                        sync: false,
                    },
                },
            },
            detectRetina: true,
            pauseOnBlur: true,
            pauseOnOutsideViewport: true,
        }),
        [],
    );

    if (init) {
        return (
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
                className="absolute inset-0 z-0 pointer-events-none"
            />
        );
    }

    return <></>;
};

export default ParticlesBackground;
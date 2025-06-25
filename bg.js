// File: background.js
window.addEventListener('DOMContentLoaded', initThreeJS);
function initThreeJS() {
    const canvas = document.getElementById('global-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background

    const particleSystems = [];

    // Background particles (cyan)
    const bgGeometry = new THREE.BufferGeometry();
    const bgParticles = 1500;
    const bgPositions = new Float32Array(bgParticles * 3);
    for (let i = 0; i < bgParticles * 3; i++) {
        bgPositions[i] = (Math.random() - 0.5) * 3000;
    }
    bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));

    const bgMaterial = new THREE.PointsMaterial({
        color: 0x00f5ff,
        size: 1,
        transparent: true,
        opacity: 0.3
    });
    const bgPoints = new THREE.Points(bgGeometry, bgMaterial);
    scene.add(bgPoints);
    particleSystems.push({ points: bgPoints, speed: { x: 0.0005, y: 0.001 } });

    // Foreground particles (cyan)
    const fgGeometry = new THREE.BufferGeometry();
    const fgParticles = 800;
    const fgPositions = new Float32Array(fgParticles * 3);
    for (let i = 0; i < fgParticles * 3; i++) {
        fgPositions[i] = (Math.random() - 0.5) * 2000;
    }
    fgGeometry.setAttribute('position', new THREE.BufferAttribute(fgPositions, 3));

    const fgMaterial = new THREE.PointsMaterial({
        color: 0x00f5ff,
        size: 2.5,
        transparent: true,
        opacity: 0.6
    });
    const fgPoints = new THREE.Points(fgGeometry, fgMaterial);
    scene.add(fgPoints);
    particleSystems.push({ points: fgPoints, speed: { x: 0.001, y: 0.0015 } });

    // Accent particles (cyan)
    const accentGeometry = new THREE.BufferGeometry();
    const accentParticles = 400;
    const accentPositions = new Float32Array(accentParticles * 3);
    for (let i = 0; i < accentParticles * 3; i++) {
        accentPositions[i] = (Math.random() - 0.5) * 2500;
    }
    accentGeometry.setAttribute('position', new THREE.BufferAttribute(accentPositions, 3));

    const accentMaterial = new THREE.PointsMaterial({
        color: 0x00f5ff,
        size: 1.8,
        transparent: true,
        opacity: 0.4
    });
    const accentPoints = new THREE.Points(accentGeometry, accentMaterial);
    scene.add(accentPoints);
    particleSystems.push({ points: accentPoints, speed: { x: 0.0008, y: 0.0012 } });

    camera.position.z = 1000;

    function animate() {
        requestAnimationFrame(animate);

        particleSystems.forEach(system => {
            system.points.rotation.x += system.speed.x;
            system.points.rotation.y += system.speed.y;
        });

        const time = Date.now() * 0.0005;
        particleSystems.forEach((system, index) => {
            system.points.position.y = Math.sin(time + index) * 10;
            system.points.position.x = Math.cos(time + index * 0.5) * 5;
        });

        renderer.render(scene, camera);
    }

    animate();

            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });

            // Parallax effect based on scroll
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset * 0.0005;
                particleSystems.forEach((system, index) => {
                    system.points.rotation.z = scrolled * (index + 1) * 0.1;
                });
            });
        }

        // Scroll animations
        function handleScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Animate skill progress bars
                        if (entry.target.id === 'skills') {
                            const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                            progressBars.forEach(bar => {
                                const width = bar.getAttribute('data-width');
                                setTimeout(() => {
                                    bar.style.width = width;
                                }, 500);
                            });
                        }
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
        }



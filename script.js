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

        // Initialize EmailJS
        function initEmailJS() {
            // Initialize EmailJS with your public key
            emailjs.init("service_kd4domt"); // Replace with your EmailJS public key
        }

        // Form submission with email functionality
        function handleSubmit(event) {
            event.preventDefault();
            const button = event.target.querySelector('.submit-btn');
            const originalText = button.innerHTML;
            const form = event.target;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            button.disabled = true;
            
            // Send email using EmailJS
            emailjs.sendForm('service_kd4domt', 'template_rzak5io', form)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    button.innerHTML = '<i class="fas fa-check"></i> Message Sent Successfully!';
                    
                    // Show success message
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.disabled = false;
                        form.reset();
                    }, 3000);
                }, function(error) {
                    console.log('FAILED...', error);
                    button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
                    
                    // Show error message
                    showNotification('Failed to send message. Please try again or contact me directly.', 'error');
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.disabled = false;
                    }, 3000);
                });
        }

        // Notification system
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            `;
            
            document.body.appendChild(notification);
            
            // Trigger animation
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            // Remove notification after 5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 5000);
        }

        // Download resume function
        function downloadResume() {
            // Create a simple text file as placeholder
            const resumeContent = `
AHANAF SHAHRIAR NAFIZ
Creative Developer | AI Enthusiast

Contact:
Email: ahanaf.shahriar.nafiz@gmail.com
LinkedIn: https://www.linkedin.com/in/fizeeeti0n/

Skills:
- Web Development (HTML, CSS, JavaScript)
- Python Programming
- AI/ML Development
- Firebase Integration
- Node.js Backend Development

This is a placeholder resume. Please replace with your actual resume content.
            `;
            
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Ahanaf_Shahriar_Nafiz_Resume.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }

        // Navigation functionality
        function initNavigation() {
            const navbar = document.getElementById('navbar');
            const navLinks = document.querySelectorAll('.nav-link');
            const mobileToggle = document.getElementById('mobile-toggle');
            const navMenu = document.getElementById('nav-menu');
            const sections = document.querySelectorAll('section[id]');

            // Mobile menu toggle
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });

            // Close mobile menu when clicking on links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                });
            });

            // Navbar scroll effect
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Update active nav link based on scroll position
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (window.scrollY >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });

                // Update active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === current) {
                        link.classList.add('active');
                    }
                });
            });

            // Smooth scrolling for navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', () => {
            initThreeJS();
            handleScrollAnimations();
            initNavigation();
            initEmailJS();
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-content');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });

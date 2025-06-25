        // Three.js Background Animation
        function initThreeJS() {
            const container = document.getElementById('canvas-container');
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            // Create particles
            const geometry = new THREE.BufferGeometry();
            const particles = 1000;
            const positions = new Float32Array(particles * 3);

            for (let i = 0; i < particles * 3; i++) {
                positions[i] = (Math.random() - 0.5) * 2000;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const material = new THREE.PointsMaterial({
                color: 0x00f5ff,
                size: 2,
                transparent: true,
                opacity: 0.8
            });

            const points = new THREE.Points(geometry, material);
            scene.add(points);

            camera.position.z = 500;

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                points.rotation.x += 0.001;
                points.rotation.y += 0.002;
                renderer.render(scene, camera);
            }

            animate();

            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
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
            emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
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
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
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
    const resumeUrl = '/cv/Own CV.pdf'; // Make sure this path is correct and accessible

    const a = document.createElement('a');
    a.href = resumeUrl;
    a.download = 'Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


        // Smooth scrolling for navigation
        function smoothScroll() {
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
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', () => {
            initThreeJS();
            handleScrollAnimations();
            smoothScroll();
            initEmailJS();
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });


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

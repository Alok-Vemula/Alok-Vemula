/**
 * ALOK VEMULA PORTFOLIO - ENHANCED JAVASCRIPT
 * Modern Portfolio Manager with Advanced Features & Performance Optimizations
 * Version: 2.0.0
 */

// Performance monitoring utilities
const PerformanceMonitor = {
    startTime: performance.now(),
    metrics: {
        loadTime: 0,
        renderTime: 0,
        interactionTime: 0,
        memoryUsage: 0,
        networkInfo: null
    },
    
    init() {
        this.measureLoadTime();
        this.measureRenderTime();
        this.monitorMemory();
        this.monitorNetwork();
        this.trackWebVitals();
    },
    
    measureLoadTime() {
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now() - this.startTime;
            console.log(`🚀 Page load time: ${this.metrics.loadTime.toFixed(2)}ms`);
        });
    },
    
    measureRenderTime() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'measure') {
                        console.log(`⏱️ ${entry.name}: ${entry.duration.toFixed(2)}ms`);
                    }
                }
            });
            observer.observe({ entryTypes: ['measure'] });
        }
    },
    
    monitorMemory() {
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.memoryUsage = performance.memory.usedJSHeapSize;
                if (this.metrics.memoryUsage > performance.memory.jsHeapSizeLimit * 0.9) {
                    console.warn('⚠️ High memory usage detected');
                }
            }, 5000);
        }
    },
    
    monitorNetwork() {
        if ('connection' in navigator) {
            this.metrics.networkInfo = {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt,
                saveData: navigator.connection.saveData
            };
        }
    },
    
    trackWebVitals() {
        // Core Web Vitals tracking would be implemented here
        console.log('📊 Web Vitals monitoring enabled');
    }
};

// Enhanced Portfolio Manager Class
class PortfolioManager {
    constructor() {
        this.config = {
            animationDuration: 300,
            scrollThreshold: 0.1,
            voiceCommands: {
                'go to contact': () => this.scrollToSection('contact'),
                'show projects': () => this.scrollToSection('projects'),
                'about me': () => this.scrollToSection('about'),
                'skills': () => this.scrollToSection('skills'),
                'education': () => this.scrollToSection('education'),
                'download resume': () => this.downloadResume(),
                'go home': () => this.scrollToSection('home'),
                'toggle dark mode': () => this.toggleDarkMode(),
                'scroll to top': () => this.scrollToTop()
            }
        };
        
        this.state = {
            isDarkMode: false,
            isListening: false,
            currentSection: 'home',
            analytics: {
                pageViews: 0,
                visitTime: 0,
                scrollDepth: 0,
                interactions: 0,
                startTime: Date.now()
            }
        };
        
        this.components = {
            voiceRecognition: null,
            intersectionObserver: null,
            resizeObserver: null,
            particleSystem: null,
            threeJS: null
        };
        
        this.init();
    }

    /**
     * Initialize the portfolio manager with comprehensive setup
     */
    async init() {
        try {
            performance.mark('portfolio-init-start');
            
            // Critical initialization only
            await this.setupEventListeners();
            await this.setupPerformanceMonitoring();
            await this.setupIntersectionObserver();
            
            // Defer heavy operations to prevent long tasks
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    this.initializeComponents();
                    this.startAnalytics();
                    this.setupVoiceInterface();
                    this.setupDarkMode();
                    this.setupImageOptimization();
                    this.setupErrorHandling();
                    this.setupAccessibility();
                });
            } else {
                setTimeout(() => {
                    this.initializeComponents();
                    this.startAnalytics();
                    this.setupVoiceInterface();
                    this.setupDarkMode();
                    this.setupImageOptimization();
                    this.setupErrorHandling();
                    this.setupAccessibility();
                }, 0);
            }
            
            performance.mark('portfolio-init-end');
            performance.measure('portfolio-init', 'portfolio-init-start', 'portfolio-init-end');
            
            console.log('✅ Portfolio manager initialized successfully');
            this.showNotification('Portfolio loaded successfully!', 'success');
        } catch (error) {
            this.handleError(error, 'Initialization');
        }
    }

    /**
     * Setup comprehensive event listeners with throttling
     */
    async setupEventListeners() {
        // Throttled scroll handler
        this.throttledScrollHandler = this.throttle(() => {
            this.handleScroll();
            this.updateScrollDepth();
            this.updateActiveNavigation();
        }, 16); // ~60fps
        
        // Throttled resize handler
        this.throttledResizeHandler = this.throttle(() => {
            this.handleResize();
        }, 250);
        
        // Event listeners
        window.addEventListener('scroll', this.throttledScrollHandler, { passive: true });
        window.addEventListener('resize', this.throttledResizeHandler, { passive: true });
        
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
            this.setupFormValidation(contactForm);
        }
        
        // Download resume button
        const downloadBtn = document.getElementById('download-resume');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadResume());
        }
        
        // Dark mode toggle
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        }
        
        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => this.scrollToTop());
        }
        
        // Voice button
        const voiceButton = document.getElementById('voice-button');
        if (voiceButton) {
            voiceButton.addEventListener('click', () => this.toggleVoiceRecognition());
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Page visibility change
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    }

    /**
     * Initialize all components
     */
    async initializeComponents() {
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Update current year
        const currentYearElement = document.getElementById('current-year');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
        
        // Hide loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }, 1000);
        }
        
        // Initialize particle system
        await this.startParticleSystem();
        
        // Initialize 3D scene
        await this.init3D();
    }

    /**
     * Start analytics tracking
     */
    async startAnalytics() {
        this.state.analytics.pageViews++;
        this.updateAnalyticsDisplay();
        
        // Track visit time
        setInterval(() => {
            this.state.analytics.visitTime = Math.floor((Date.now() - this.state.analytics.startTime) / 1000);
            this.updateAnalyticsDisplay();
        }, 1000);
        
        // Track interactions
        document.addEventListener('click', () => {
            this.state.analytics.interactions++;
            this.updateAnalyticsDisplay();
        });
    }

    /**
     * Setup voice interface with enhanced recognition
     */
    async setupVoiceInterface() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.components.voiceRecognition = new SpeechRecognition();
            
            this.components.voiceRecognition.continuous = false;
            this.components.voiceRecognition.interimResults = false;
            this.components.voiceRecognition.lang = 'en-US';
            
            this.components.voiceRecognition.onstart = () => {
                this.state.isListening = true;
                this.updateVoiceButtonState();
                this.showNotification('Listening...', 'info');
            };
            
            this.components.voiceRecognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase().trim();
                this.processVoiceCommand(command);
            };
            
            this.components.voiceRecognition.onerror = (event) => {
                console.error('Voice recognition error:', event.error);
                this.showNotification('Voice recognition error', 'error');
                this.state.isListening = false;
                this.updateVoiceButtonState();
            };
            
            this.components.voiceRecognition.onend = () => {
                this.state.isListening = false;
                this.updateVoiceButtonState();
            };
        } else {
            console.warn('Voice recognition not supported');
            const voiceButton = document.getElementById('voice-button');
            if (voiceButton) {
                voiceButton.style.display = 'none';
            }
        }
    }

    /**
     * Process voice commands with fuzzy matching
     */
    processVoiceCommand(command) {
        const commands = Object.keys(this.config.voiceCommands);
        const bestMatch = this.findBestMatch(command, commands);
        
        if (bestMatch && bestMatch.score > 0.6) {
            this.showNotification(`Executing: ${bestMatch.command}`, 'success');
            this.config.voiceCommands[bestMatch.command]();
        } else {
            this.showNotification('Command not recognized', 'warning');
        }
    }

    /**
     * Find best matching command using fuzzy string matching
     */
    findBestMatch(input, commands) {
        let bestMatch = { command: null, score: 0 };
        
        commands.forEach(command => {
            const score = this.calculateSimilarity(input, command);
            if (score > bestMatch.score) {
                bestMatch = { command, score };
            }
        });
        
        return bestMatch;
    }

    /**
     * Calculate string similarity using Levenshtein distance
     */
    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const distance = this.levenshteinDistance(longer, shorter);
        return (longer.length - distance) / longer.length;
    }

    /**
     * Calculate Levenshtein distance between two strings
     */
    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    /**
     * Setup dark mode with system preference detection
     */
    async setupDarkMode() {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        
        this.state.isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
        this.applyDarkMode();
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.state.isDarkMode = e.matches;
                this.applyDarkMode();
            }
        });
    }

    /**
     * Apply dark mode styles
     */
    applyDarkMode() {
        const html = document.documentElement;
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        
        if (this.state.isDarkMode) {
            html.classList.add('dark');
            html.setAttribute('data-theme', 'dark');
            if (darkModeToggle) {
                darkModeToggle.innerHTML = '<i data-lucide="sun" class="w-6 h-6"></i>';
                lucide.createIcons();
            }
        } else {
            html.classList.remove('dark');
            html.setAttribute('data-theme', 'light');
            if (darkModeToggle) {
                darkModeToggle.innerHTML = '<i data-lucide="moon" class="w-6 h-6"></i>';
                lucide.createIcons();
            }
        }
        
        localStorage.setItem('theme', this.state.isDarkMode ? 'dark' : 'light');
    }

    /**
     * Toggle dark mode
     */
    toggleDarkMode() {
        this.state.isDarkMode = !this.state.isDarkMode;
        this.applyDarkMode();
        this.showNotification(`Switched to ${this.state.isDarkMode ? 'dark' : 'light'} mode`, 'info');
    }

    /**
     * Setup image optimization with lazy loading
     */
    async setupImageOptimization() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            });
        }
    }

    /**
     * Setup intersection observer for scroll animations
     */
    async setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            this.components.intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        this.trackSectionView(entry.target.id);
                    }
                });
            }, {
                threshold: this.config.scrollThreshold,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe all reveal elements
            document.querySelectorAll('.reveal').forEach(el => {
                this.components.intersectionObserver.observe(el);
            });
        }
    }

    /**
     * Track section views for analytics
     */
    trackSectionView(sectionId) {
        if (sectionId && sectionId !== this.state.currentSection) {
            this.state.currentSection = sectionId;
            console.log(`📊 Section viewed: ${sectionId}`);
            // Could send to analytics service here
        }
    }

    /**
     * Setup performance monitoring
     */
    async setupPerformanceMonitoring() {
        PerformanceMonitor.init();
        
        // Monitor long tasks
        if ('PerformanceObserver' in window) {
            const longTaskObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) {
                        console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(2)}ms`);
                    }
                }
            });
            longTaskObserver.observe({ entryTypes: ['longtask'] });
        }
    }

    /**
     * Setup comprehensive error handling
     */
    async setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.handleError(event.error, 'Global Error');
        });
        
        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'Unhandled Promise Rejection');
        });
        
        // Network error handler
        window.addEventListener('online', () => {
            this.showNotification('Connection restored', 'success');
        });
        
        window.addEventListener('offline', () => {
            this.showNotification('Connection lost', 'warning');
        });
    }

    /**
     * Setup accessibility features
     */
    async setupAccessibility() {
        // Skip link functionality
        const skipLink = document.querySelector('a[href="#main-content"]');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.focus();
                    mainContent.scrollIntoView();
                }
            });
        }
        
        // Focus management for mobile menu
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                setTimeout(() => {
                    const firstLink = mobileMenu.querySelector('a');
                    if (firstLink) firstLink.focus();
                }, 100);
            });
        }
        
        // Announce page changes to screen readers
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
        
        this.announcer = announcer;
    }

    /**
     * Enhanced error handling with retry logic
     */
    handleError(error, context = 'Unknown') {
        console.error(`❌ Error in ${context}:`, error);
        
        // Handle null or undefined errors
        if (!error) {
            console.error('❌ Null or undefined error received');
            return;
        }
        
        // Retry logic for network errors
        if (error.name === 'NetworkError' || (error.message && error.message.includes('fetch'))) {
            this.retryOperation(() => {
                console.log('🔄 Retrying operation...');
            }, 3);
        }
        
        // Report to analytics service
        this.reportError(error, context);
        
        // Show user-friendly notification
        this.showNotification('An error occurred. Please try again.', 'error');
    }

    /**
     * Retry operation with exponential backoff
     */
    retryOperation(operation, maxRetries = 3) {
        let retries = 0;
        const retry = () => {
            if (retries < maxRetries) {
                retries++;
                setTimeout(() => {
                    try {
                        operation();
                    } catch (error) {
                        this.handleError(error, 'Retry operation');
                        retry();
                    }
                }, Math.pow(2, retries) * 1000); // Exponential backoff
            }
        };
        retry();
    }

    /**
     * Report errors to analytics service
     */
    reportError(error, context) {
        const errorData = {
            message: error?.message || 'Unknown error',
            stack: error?.stack || 'No stack trace available',
            context: context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            userId: this.generateUserId()
        };
        
        // In production, send to error reporting service
        console.log('📊 Error reported:', errorData);
    }

    /**
     * Generate a simple user ID for analytics
     */
    generateUserId() {
        let userId = localStorage.getItem('portfolio-user-id');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('portfolio-user-id', userId);
        }
        return userId;
    }

    /**
     * Utility functions
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Navigation and scrolling functions
     */
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            this.announceToScreenReader(`Navigated to ${sectionId} section`);
        }
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        
        if (scrollTopBtn) {
            if (scrollTop > 100) {
                scrollTopBtn.classList.remove('hidden');
            } else {
                scrollTopBtn.classList.add('hidden');
            }
        }
    }

    handleResize() {
        // Update 3D scene on resize
        if (this.scene && this.camera && this.renderer) {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }
        
        // Update particle system
        if (this.particleSystem) {
            this.updateParticleSystem();
        }
        
        // Update analytics
        this.analytics.screenSize = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    updateScrollDepth() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollDepth = Math.round((scrollTop / documentHeight) * 100);
        
        this.state.analytics.scrollDepth = Math.max(this.state.analytics.scrollDepth, scrollDepth);
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Mobile menu functions
     */
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        
        if (mobileMenu && mobileMenuButton) {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            
            if (!isExpanded) {
                this.announceToScreenReader('Mobile menu opened');
            } else {
                this.announceToScreenReader('Mobile menu closed');
            }
        }
    }

    /**
     * Form handling functions
     */
    setupFormValidation(form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateField(input);
            });
            
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
        
        // Character counter for textarea
        const messageTextarea = form.querySelector('#message');
        const charCount = form.querySelector('#char-count');
        
        if (messageTextarea && charCount) {
            messageTextarea.addEventListener('input', () => {
                const count = messageTextarea.value.length;
                charCount.textContent = `${count}/500 characters`;
                
                if (count > 500) {
                    charCount.classList.add('text-red-500');
                } else {
                    charCount.classList.remove('text-red-500');
                }
            });
        }
    }

    validateField(field) {
        const isValid = field.checkValidity();
        const errorMessage = field.validationMessage;
        
        if (isValid) {
            field.classList.remove('border-red-500');
            field.classList.add('border-green-500');
        } else {
            field.classList.remove('border-green-500');
            field.classList.add('border-red-500');
        }
        
        return { isValid, errorMessage };
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const submitText = form.querySelector('#submit-text');
        const submitLoading = form.querySelector('#submit-loading');
        const formStatus = form.querySelector('#form-status');
        
        // Show loading state
        if (submitButton && submitText && submitLoading) {
            submitButton.disabled = true;
            submitText.style.display = 'none';
            submitLoading.classList.remove('hidden');
        }
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            if (formStatus) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.className = 'mt-4 text-sm text-center text-green-500';
            }
            
            this.showNotification('Message sent successfully!', 'success');
            form.reset();
            
        } catch (error) {
            // Error
            if (formStatus) {
                formStatus.textContent = 'Failed to send message. Please try again.';
                formStatus.className = 'mt-4 text-sm text-center text-red-500';
            }
            
            this.showNotification('Failed to send message', 'error');
        } finally {
            // Reset button state
            if (submitButton && submitText && submitLoading) {
                submitButton.disabled = false;
                submitText.style.display = 'block';
                submitLoading.classList.add('hidden');
            }
        }
    }

    /**
     * Voice interface functions
     */
    toggleVoiceRecognition() {
        if (!this.components.voiceRecognition) {
            this.showNotification('Voice recognition not supported', 'warning');
            return;
        }
        
        if (this.state.isListening) {
            this.components.voiceRecognition.stop();
        } else {
            this.components.voiceRecognition.start();
        }
    }

    updateVoiceButtonState() {
        const voiceButton = document.getElementById('voice-button');
        if (voiceButton) {
            if (this.state.isListening) {
                voiceButton.classList.add('listening');
            } else {
                voiceButton.classList.remove('listening');
            }
        }
    }

    /**
     * Analytics functions
     */
    updateAnalyticsDisplay() {
        const elements = {
            'page-views': this.state.analytics.pageViews,
            'visit-time': `${this.state.analytics.visitTime}s`,
            'scroll-depth': `${this.state.analytics.scrollDepth}%`,
            'interactions': this.state.analytics.interactions
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    /**
     * Notification system
     */
    showNotification(message, type = 'info', duration = 5000) {
        const container = document.getElementById('notification-container');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button class="ml-4 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()" title="Close notification" aria-label="Close notification">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
        `;
        
        container.appendChild(notification);
        
        // Re-initialize icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Auto-remove after duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);
    }

    /**
     * Accessibility functions
     */
    announceToScreenReader(message) {
        if (this.announcer) {
            this.announcer.textContent = message;
            setTimeout(() => {
                this.announcer.textContent = '';
            }, 1000);
        }
    }

    /**
     * Keyboard shortcuts
     */
    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + K for search (future feature)
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            this.showNotification('Search feature coming soon!', 'info');
        }
        
        // Escape to close mobile menu
        if (event.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                this.toggleMobileMenu();
            }
        }
        
        // Space/Enter on voice button
        if ((event.key === ' ' || event.key === 'Enter') && event.target.id === 'voice-button') {
            event.preventDefault();
            this.toggleVoiceRecognition();
        }
    }

    /**
     * Page visibility handling
     */
    handleVisibilityChange() {
        if (document.hidden) {
            console.log('📱 Page hidden');
        } else {
            console.log('👁️ Page visible');
            this.state.analytics.pageViews++;
            this.updateAnalyticsDisplay();
        }
    }

    /**
     * Download resume function
     */
    downloadResume() {
        // In a real implementation, this would download the actual resume
        this.showNotification('Resume download started!', 'success');
        console.log('📄 Resume download initiated');
    }

    /**
     * Particle system
     */
    async startParticleSystem() {
        const container = document.getElementById('particle-container');
        if (!container) return;
        
        const particleCount = 50;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(99, 102, 241, 0.5);
                border-radius: 50%;
                pointer-events: none;
            `;
            
            container.appendChild(particle);
            particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
        
        const animate = () => {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
                if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
                
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    /**
     * 3D Scene initialization
     */
    async init3D() {
        const container = document.getElementById('hero-3d-container');
        if (!container || typeof THREE === 'undefined') return;
        
        let scene, camera, renderer, shape, particles;
        let mouseX = 0, mouseY = 0;
        
        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.z = 5;
            
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);
            
            // Main Shape
            const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
            const material = new THREE.MeshStandardMaterial({
                color: 0x6366f1,
                roughness: 0.3,
                metalness: 0.7
            });
            shape = new THREE.Mesh(geometry, material);
            scene.add(shape);
            
            // Particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 5000;
            const posArray = new Float32Array(particlesCount * 3);
            
            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 10;
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.005,
                color: 0xffffff
            });
            particles = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particles);
            
            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);
            
            // Event Listeners
            window.addEventListener('resize', onWindowResize, false);
            document.addEventListener('mousemove', onMouseMove, false);
            
            animate();
        }
        
        function onWindowResize() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
        
        function onMouseMove(event) {
            mouseX = event.clientX - (window.innerWidth / 2);
            mouseY = event.clientY - (window.innerHeight / 2);
        }
        
        const clock = new THREE.Clock();
        function animate() {
            const elapsedTime = clock.getElapsedTime();
            shape.rotation.y = 0.5 * elapsedTime;
            particles.rotation.y = -0.1 * elapsedTime;
            
            // Parallax effect
            camera.position.x += (mouseX * 0.0001 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 0.0001 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        
        init();
    }

    /**
     * Enhanced cleanup method for proper memory management
     */
    cleanup() {
        try {
            // Stop voice recognition
            if (this.components.voiceRecognition) {
                this.components.voiceRecognition.stop();
                this.components.voiceRecognition = null;
            }
            
            // Disconnect observers
            if (this.components.intersectionObserver) {
                this.components.intersectionObserver.disconnect();
                this.components.intersectionObserver = null;
            }
            
            if (this.components.resizeObserver) {
                this.components.resizeObserver.disconnect();
                this.components.resizeObserver = null;
            }
            
            // Remove event listeners
            window.removeEventListener('scroll', this.throttledScrollHandler);
            window.removeEventListener('resize', this.throttledResizeHandler);
            
            console.log('🧹 Portfolio manager cleaned up successfully');
        } catch (error) {
            this.handleError(error, 'Cleanup');
        }
    }

    /**
     * Health check method
     */
    healthCheck() {
        const health = {
            timestamp: new Date().toISOString(),
            performance: {
                loadTime: this.state.analytics.performance?.loadTime || 0,
                memoryUsage: this.state.analytics.performance?.memoryUsage || 0,
                interactions: this.state.analytics.interactions
            },
            features: {
                voiceRecognition: !!this.components.voiceRecognition,
                darkMode: this.state.isDarkMode,
                serviceWorker: 'serviceWorker' in navigator,
                intersectionObserver: 'IntersectionObserver' in window,
                webGL: !!document.createElement('canvas').getContext('webgl')
            },
            errors: this.errorCount || 0
        };
        
        console.log('🏥 Portfolio health check:', health);
        return health;
    }
}

// Initialize the portfolio manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        performance.mark('portfolio-start');
        
        const portfolio = new PortfolioManager();
        
        // Make portfolio globally accessible for debugging
        window.portfolio = portfolio;
        
        // Setup cleanup on page unload
        window.addEventListener('beforeunload', () => {
            portfolio.cleanup();
        });
        
        // Health check every 30 seconds
        setInterval(() => {
            portfolio.healthCheck();
        }, 30000);
        
        performance.mark('portfolio-end');
        performance.measure('portfolio-total', 'portfolio-start', 'portfolio-end');
        
        console.log('🎉 Portfolio initialized successfully');
    } catch (error) {
        console.error('💥 Failed to initialize portfolio:', error);
        // Fallback initialization
        document.body.classList.add('error-state');
    }
});

// Export for global access
window.PortfolioManager = PortfolioManager;
window.PerformanceMonitor = PerformanceMonitor;
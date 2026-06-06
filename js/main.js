/* ============================================
   THE LOST COMPASS - MAIN JAVASCRIPT
   Premium Pirates Universe Experience
   ============================================ */

// ============================================
// Loading Screen Manager
// ============================================

class LoadingScreenManager {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
  }

  hideLoadingScreen() {
    if (this.loadingScreen) {
      this.loadingScreen.style.animation = 'fadeOut 1s ease-out forwards';
      setTimeout(() => {
        this.loadingScreen.style.display = 'none';
      }, 1000);
    }
  }
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      pointer-events: none;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// Audio Management
// ============================================

class AudioManager {
  constructor() {
    this.ambientAudio = document.getElementById('ambient-audio');
    this.thunderAudio = document.getElementById('thunder-audio');
    this.isPlaying = false;
  }

  init() {
    // Set ambient audio to loop
    if (this.ambientAudio) {
      this.ambientAudio.loop = true;
      this.ambientAudio.volume = 0.25;
      this.playAmbient();
    }

    // Random thunder effect
    this.scheduleThunder();
  }

  playAmbient() {
    if (this.ambientAudio && !this.isPlaying) {
      this.ambientAudio.play().catch(err => {
        console.log('Audio playback blocked:', err);
      });
      this.isPlaying = true;
    }
  }

  scheduleThunder() {
    if (this.thunderAudio) {
      // Random thunder every 10-18 seconds
      const randomInterval = Math.random() * 8000 + 10000;
      
      setTimeout(() => {
        this.thunderAudio.currentTime = 0;
        this.thunderAudio.volume = 0.15;
        this.thunderAudio.play().catch(err => {
          console.log('Thunder playback blocked:', err);
        });
        
        // Schedule next thunder
        this.scheduleThunder();
      }, randomInterval);
    }
  }

  toggleAudio() {
    if (this.ambientAudio) {
      if (this.isPlaying) {
        this.ambientAudio.pause();
        this.isPlaying = false;
      } else {
        this.ambientAudio.play();
        this.isPlaying = true;
      }
    }
  }
}

// ============================================
// Smooth Scroll Navigation
// ============================================

class Navigation {
  constructor() {
    this.navContainer = document.querySelector('.nav-container');
    this.navToggle = document.getElementById('nav-toggle');
    this.navLinks = document.querySelectorAll('.nav-menu a');
    this.setupSmoothScroll();
    this.setupMobileToggle();
  }

  setupSmoothScroll() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href') || '';
        if (!href.startsWith('#')) {
          return;
        }

        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  setupMobileToggle() {
    if (!this.navContainer || !this.navToggle) {
      return;
    }

    const closeMenu = () => {
      this.navContainer.classList.remove('nav-open');
      this.navToggle.setAttribute('aria-expanded', 'false');
    };

    this.navToggle.addEventListener('click', () => {
      const isOpen = this.navContainer.classList.toggle('nav-open');
      this.navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    this.navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          closeMenu();
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }
}

// ============================================
// Button Interactions
// ============================================

class ButtonInteractions {
  constructor() {
    this.beginVoyageBtn = document.getElementById('begin-voyage-btn');
    this.discoverFateBtn = document.getElementById('discover-fate-btn');
    this.setupListeners();
  }

  setupListeners() {
    if (this.beginVoyageBtn) {
      this.beginVoyageBtn.addEventListener('click', () => {
        this.handleBeginVoyage();
      });
    }

    if (this.discoverFateBtn) {
      this.discoverFateBtn.addEventListener('click', () => {
        this.handleDiscoverFate();
      });
    }
  }

  handleBeginVoyage() {
    console.log('Beginning voyage...');
    // Will navigate to Pirate Identity Quiz page
    window.location.href = 'quiz.html';
  }

  handleDiscoverFate() {
    console.log('Discovering fate...');
    // Will show random pirate fact or fortune
    this.showRandomFortune();
  }

  showRandomFortune() {
    const fortunes = [
      "The compass points north, but your heart navigates true.",
      "Every pirate's fortune begins with a single sail.",
      "The sea whispers secrets only the brave dare hear.",
      "Fate favors those bold enough to claim it.",
      "In the abyss, we find our greatest treasure.",
      "The ocean calls to those with restless souls.",
      "A true captain knows the difference between map and destiny.",
    ];

    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const fortune = fortunes[randomIndex];

    // Create temporary fortune display
    const fortuneDisplay = document.createElement('div');
    fortuneDisplay.innerHTML = fortune;
    fortuneDisplay.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(11, 31, 51, 0.95);
      border: 2px solid #C9A44C;
      color: #C9A44C;
      padding: 2.5rem;
      border-radius: 2px;
      font-size: 1.4rem;
      text-align: center;
      z-index: 9999;
      max-width: 80%;
      font-style: italic;
      font-family: 'Lora', serif;
      animation: fortuneFade 4.5s ease-in-out forwards;
      box-shadow: 0 0 30px rgba(201, 164, 76, 0.5);
    `;

    document.body.appendChild(fortuneDisplay);

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fortuneFade {
        0% {
          opacity: 0;
          transform: translate(-50%, -60%);
        }
        10% {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
        90% {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -40%);
        }
      }
    `;
    document.head.appendChild(style);

    // Remove element after animation
    setTimeout(() => {
      fortuneDisplay.remove();
    }, 4500);
  }
}

// ============================================
// Parallax Effect - Removed (Elements repositioned)
// ============================================
// Parallax effect disabled as decorative elements moved to other sections

// ============================================
// Quote Rotation (Sliding Quotes)
// ============================================

class QuoteRotation {
  constructor() {
    this.quoteItems = document.querySelectorAll('.quote-item-v3');
    this.quoteBackground = document.getElementById('quote-bg-v3');
    this.currentQuote = 0;
    this.quoteInterval = null;
    
    // Character background image mappings
    this.characterImages = {
      'Jack Sparrow': 'assets/images/home/jack sparrow.jpg',
      'Davy Jones': 'assets/images/home/davy jones.jpeg',
      'Barbossa': 'assets/images/home/barbosa.jpeg',
      'Will Turner': 'assets/images/home/will turner.jpg',
      'Elizabeth Swann': 'assets/images/home/elizabeth swan.jpg',
    };

    this.startQuoteRotation();
  }

  startQuoteRotation() {
    if (this.quoteItems.length === 0) return;

    // Set initial background
    this.updateBackground();

    // Rotate quotes every 8 seconds (8000ms)
    this.quoteInterval = setInterval(() => {
      this.nextQuote();
    }, 8000);
  }

  updateBackground() {
    const currentCharacter = this.quoteItems[this.currentQuote].getAttribute('data-character');
    const imagePath = this.characterImages[currentCharacter];
    
    if (imagePath && this.quoteBackground) {
      this.quoteBackground.style.backgroundImage = `url('${imagePath}')`;
    }
  }

  nextQuote() {
    // Remove active class and add exit animation to current quote
    this.quoteItems[this.currentQuote].classList.remove('active');
    this.quoteItems[this.currentQuote].classList.add('exit');

    // Move to next quote
    this.currentQuote = (this.currentQuote + 1) % this.quoteItems.length;

    // Wait for exit animation, then show next quote
    setTimeout(() => {
      // Reset all quotes
      this.quoteItems.forEach((item, index) => {
        if (index === this.currentQuote) {
          item.classList.remove('exit');
          item.classList.add('active');
        } else {
          item.classList.remove('active', 'exit');
        }
      });
      
      // Update background for new quote
      this.updateBackground();
    }, 450);
  }
}

// ============================================
// HTML Layer Compass Spin (no CSS dependency)
// ============================================

function initHtmlCompassSpin() {
  const compass = document.getElementById('html-compass-spin');
  if (!compass) return;

  let angle = 0;
  const step = () => {
    angle = (angle + 0.05) % 360;
    compass.style.transform = `rotate(${angle}deg)`;
    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

// ============================================
// Scroll Animations (Fade In On View)
// ============================================

class ScrollAnimations {
  constructor() {
    this.setupIntersectionObserver();
    this.setupScrollFadeIn();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all cards and sections (including the reveal-enabled homepage blocks)
    document.querySelectorAll('.feature-card, .feature-card-v3, .welcome-content, .quote-container, .quote-container-v3').forEach(element => {
      observer.observe(element);
    });
  }

  setupScrollFadeIn() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = index * 0.1;
          entry.target.style.transitionDelay = `${delay}s`;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    // Observe all reveal-enabled elements
    document.querySelectorAll('.reveal-on-scroll, .scroll-fade-in').forEach(element => {
      observer.observe(element);
    });
  }
}

// ============================================
// Navigation Auth Buttons
// ============================================

class AuthButtons {
  constructor() {
    this.loginBtn = document.querySelector('.login-btn');
    this.signupBtn = document.querySelector('.signup-btn');
    this.setupListeners();
  }

  setupListeners() {
    if (this.loginBtn) {
      this.loginBtn.addEventListener('click', () => {
        alert('Login feature coming soon!');
      });
    }

    if (this.signupBtn) {
      this.signupBtn.addEventListener('click', () => {
        alert('Sign Up feature coming soon!');
      });
    }
  }
}

// ============================================

class ScrollNavigation {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav-menu a');
    this.sections = document.querySelectorAll('section, .home-container');
    this.isScrolling = false;
    this.setupScrollSpy();
  }

  setupScrollSpy() {
    window.addEventListener('scroll', () => {
      if (this.isScrolling) return;
      this.isScrolling = true;
      
      requestAnimationFrame(() => {
        let current = '';
        
        this.sections.forEach(section => {
          const sectionTop = section.offsetTop;
          if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
          }
        });

        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
          }
        });
        
        this.isScrolling = false;
      });
    }, { passive: true });
  }
}

// ============================================
// Custom Cursor (Compass Theme)
// ============================================

class CustomCursor {
  constructor() {
    this.cursor = document.getElementById('cursor');
    this.isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    this.mouseX = 0;
    this.mouseY = 0;
    if (this.cursor && !this.isTouchDevice) {
      this.setupCursor();
    }
  }

  setupCursor() {
    // Enable cursor display
    this.cursor.classList.add('active');
    document.body.style.cursor = 'none';

    // Ultra-smooth mouse tracking with centered positioning
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX - 12; // Center the 24px cursor
      this.mouseY = e.clientY - 12;
      this.cursor.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;
    }, { passive: true });

    // Interactive element hover
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
      });
      element.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
      });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      this.cursor.classList.add('hidden');
    });

    document.addEventListener('mouseenter', () => {
      this.cursor.classList.remove('hidden');
    });
  }
}

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Loading screen
  const loadingManager = new LoadingScreenManager();

  // Initialize all components
  const audioManager = new AudioManager();
  audioManager.init();

  const navigation = new Navigation();
  const authButtons = new AuthButtons();
  const buttonInteractions = new ButtonInteractions();
  const scrollNavigation = new ScrollNavigation();
  // Disabled custom cursor to fix lag - using regular browser cursor instead
  // const customCursor = new CustomCursor();
  const scrollAnimations = new ScrollAnimations();
  const quoteRotation = new QuoteRotation();
  initHtmlCompassSpin();

  // Hide loading screen after 2 seconds
  setTimeout(() => {
    loadingManager.hideLoadingScreen();
  }, 2000);

  console.log('The Lost Compass - Initialized');
});

// ============================================
// Page Visibility - Pause audio when tab inactive
// ============================================

document.addEventListener('visibilitychange', () => {
  const ambientAudio = document.getElementById('ambient-audio');
  if (ambientAudio) {
    if (document.hidden) {
      ambientAudio.pause();
    } else {
      ambientAudio.play().catch(err => {
        console.log('Auto-play blocked:', err);
      });
    }
  }
});

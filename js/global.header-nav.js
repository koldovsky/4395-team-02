// Mobile Menu Toggle Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navContent = document.querySelector('.nav-content');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    if (!mobileMenuToggle || !navContent) {
        console.log('Mobile menu elements not found');
        return;
    }
    
    console.log('Initializing mobile menu...');
    
    // Function to close menu
    function closeMenu() {
        navContent.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
        body.classList.remove('menu-open');
    }
    
    // Function to open menu
    function openMenu() {
        navContent.classList.add('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        body.style.overflow = 'hidden';
        body.classList.add('menu-open');
    }
    
    // Remove any existing event listeners by cloning the buttons
    const newToggle = mobileMenuToggle.cloneNode(true);
    mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    
    if (closeMenuBtn) {
        const newCloseBtn = closeMenuBtn.cloneNode(true);
        closeMenuBtn.parentNode.replaceChild(newCloseBtn, closeMenuBtn);
    }
    const closeButton = document.querySelector('.close-menu-btn');
    
    // Toggle menu on burger button click
    toggleButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        console.log('Burger clicked, isExpanded:', isExpanded);
        
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu on close button click
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked');
            closeMenu();
        });
    }
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's an anchor link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    closeMenu();
                    // Smooth scroll to target
                    setTimeout(() => {
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }, 300);
                }
            } else {
                // For regular links, just close the menu
                closeMenu();
            }
        });
    });
    
    // Close menu when clicking on overlay (outside nav content)
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navContent.contains(event.target);
        const isClickOnToggle = toggleButton.contains(event.target);
        
        // If menu is open and click is outside nav and not on toggle button
        if (navContent.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
            console.log('Clicked outside sidebar, closing menu');
            closeMenu();
        }
    });
    
    // Also close when clicking the overlay background specifically
    navContent.addEventListener('click', function(event) {
        // Only close if clicking on the overlay background, not the menu itself
        if (event.target === navContent) {
            closeMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navContent.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Handle window resize - close menu if resizing to desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 1024 && navContent.classList.contains('active')) {
                closeMenu();
            }
        }, 250);
    });
    
    // Add visual feedback for touch devices
    navLinks.forEach(link => {
        link.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        link.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
    
    // Prevent scrolling on the nav content from propagating to body
    navContent.addEventListener('touchmove', function(e) {
        e.stopPropagation();
    }, { passive: true });
}

// Process numbers explosion
function initProcessNumbers() {
  const nums = document.querySelectorAll('.process__step-number');

  if (!nums.length) return;

  nums.forEach((num) => {
    if (num.dataset.prepared === 'true') return;

    const text = num.textContent.trim();
    num.textContent = '';

    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.classList.add('process__digit');
      span.textContent = char;
      num.appendChild(span);
    });

    num.dataset.prepared = 'true';

    num.addEventListener('mouseenter', () => {
      const digits = num.querySelectorAll('.process__digit');

      digits.forEach((d) => {
        const card = num.closest('.process__step');
        if (!card) return;

        const numberRect = num.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        const maxLeft = numberRect.left - cardRect.left;
        const maxRight = cardRect.right - numberRect.right;

        const maxUp = numberRect.top - cardRect.top;
        const maxDown = cardRect.bottom - numberRect.bottom;

        const randX =
          (Math.random() - 1) * 2 * Math.min(maxLeft, maxRight);
        const randY =
          (Math.random() - 1) * 2 * Math.min(maxUp, maxDown);

        const randR = (Math.random() - 1) * 180;
        const randScale = 0.8 + Math.random() * 0.7;

        d.style.setProperty('--rand-x', `${randX}px`);
        d.style.setProperty('--rand-y', `${randY}px`);
        d.style.setProperty('--rand-rot', `${randR}deg`);
        d.style.setProperty('--rand-scale', `${randScale}`);
      });

      num.classList.add('process__step-number--explode');

      setTimeout(() => {
        num.classList.remove('process__step-number--explode');
      }, 250); //timeout to reset after animation
    });

    num.addEventListener('mouseleave', () => {
      num.classList.remove('process__step-number--explode');
    });
  });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    initMobileMenu();

    // Explosion
    initProcessNumbers(); 
    
    // Smooth scroll for all anchor links on desktop too
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
});

// Also initialize after HTMX loads content
document.addEventListener('htmx:afterSwap', function(event) {
    console.log('HTMX content loaded');
    // Small delay to ensure content is fully rendered
    setTimeout(function() {
        initMobileMenu();
        // Explosion
        initProcessNumbers();
    }, 100);
});

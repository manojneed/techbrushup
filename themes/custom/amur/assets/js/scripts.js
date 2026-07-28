(function (Drupal, once) {
  Drupal.behaviors.techbrushupBehaviors = {
    attach: function (context, settings) {
      // Horizontal scroll buttons (unchanged)
      const mainMenu = document.getElementById('mainMenu');
      const scrollLeft = document.getElementById('scrollLeft');
      const scrollRight = document.getElementById('scrollRight');
      const leftOverlay = document.getElementById('leftOverlay');
      const rightOverlay = document.getElementById('rightOverlay');
      if (mainMenu && scrollLeft && scrollRight) {
        scrollLeft.addEventListener('click', () => mainMenu.scrollBy({
          left: -300,
          behavior: 'smooth'
        }));
        scrollRight.addEventListener('click', () => mainMenu.scrollBy({
          left: 300,
          behavior: 'smooth'
        }));
        const update = () => {
          const left = mainMenu.scrollLeft;
          const max = mainMenu.scrollWidth - mainMenu.clientWidth;
          if (leftOverlay) leftOverlay.classList.toggle('hidden', left <= 5);
          if (rightOverlay) rightOverlay.classList.toggle('hidden', left >= max - 5);
        };
        mainMenu.addEventListener('scroll', update);
        window.addEventListener('resize', update);
        update();
      }
      // Mobile menu toggle
      const mobileBtn = document.getElementById('mobileMenuBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      const closeMenu = document.getElementById('closeMobileMenu');
      if (mobileBtn && mobileMenu && closeMenu) {
        mobileBtn.addEventListener('click', () => {
          mobileMenu.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        });
        closeMenu.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          document.body.style.overflow = '';
        });
        mobileMenu.addEventListener('click', (e) => {
          if (e.target === mobileMenu) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
          }
        });
      }
      // Mobile sub-menu toggles (enhanced UI)
      const toggles = document.querySelectorAll('[data-toggle]');
      toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
          const targetId = toggle.getAttribute('data-toggle');
          const submenu = document.getElementById(targetId);
          const parentItem = toggle.closest('.mobile-menu-item');
          console.log(parentItem)
          if (submenu && parentItem) {
            // Close other open submenus (optional, for better UX)
            document.querySelectorAll('.mobile-submenu.open').forEach(openMenu => {
              if (openMenu !== submenu) {
                openMenu.classList.remove('open');
                openMenu.closest('.mobile-menu-item')?.classList.remove('open');
              }
            });
            submenu.classList.toggle('open');
            parentItem.classList.toggle('open');
          }
        });
      });
   // ------------- DYNAMIC READING TIME -------------
    function calculateReadingTime() {
      const articleText = document.querySelector('.max-w-3xl')?.innerText || '';
      const wordsPerMinute = 200;
      const words = articleText.trim().split(/\s+/).length;
      const minutes = Math.max(2, Math.ceil(words / wordsPerMinute));
      const readTimeString = `${minutes} min read`;
      const shortTime = `${minutes} min`;
      const headerBadge = document.getElementById('dynamicReadTime');
      const inlineSpan = document.getElementById('inlineReadTime');
      if (headerBadge) headerBadge.innerText = readTimeString;
      if (inlineSpan) inlineSpan.innerText = shortTime;
    }
    window.addEventListener('DOMContentLoaded', calculateReadingTime);
    
    // ------------- PROGRESS BAR -------------
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 100;
      if (progressBar) progressBar.style.width = scrolled + '%';
    });

    // ------------- COPY CODE FUNCTIONALITY (robust) -------------
    const toast = document.getElementById('toastMsg');
    async function copyToClipboard(text, btnElement) {
      try {
        await navigator.clipboard.writeText(text);
        // visual feedback on button
        const originalIcon = btnElement.querySelector('i');
        const originalTextSpan = btnElement.childNodes[btnElement.childNodes.length-1];
        if (originalIcon) {
          originalIcon.classList.remove('fa-copy');
          originalIcon.classList.add('fa-check');
        }
        toast.classList.remove('opacity-0', 'pointer-events-none');
        toast.classList.add('opacity-100');
        setTimeout(() => {
          if (originalIcon) {
            originalIcon.classList.remove('fa-check');
            originalIcon.classList.add('fa-copy');
          }
          toast.classList.remove('opacity-100');
          toast.classList.add('opacity-0', 'pointer-events-none');
        }, 2000);
      } catch (err) {
        alert('Press Ctrl+C to copy the code');
      }
    }

    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-code');
        const preBlock = document.getElementById(targetId);
        if (preBlock) {
          copyToClipboard(preBlock.innerText, btn);
        }
      });
    });

    // ------------- DARK MODE (default light) -------------
    const darkToggle = document.getElementById('darkModeToggle');
    const htmlEl = document.documentElement;
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') htmlEl.classList.add('dark');
    else htmlEl.classList.remove('dark');
    if (darkToggle) {
      darkToggle.addEventListener('click', () => {
        if (htmlEl.classList.contains('dark')) {
          htmlEl.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          htmlEl.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
      });
    }
    },

    detach: function (context, settings, trigger) {
      if (trigger === "unload") {
        // Optional cleanup logic
      }
    }
  };
})(Drupal, once);
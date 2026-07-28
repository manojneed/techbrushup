/**
 * @file
 * Custom JavaScript for TechBrushUp theme.
 */

(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.techbrushup = {
    attach: function (context, settings) {
      // ---------------------------------------------------------------------
      // 1. Horizontal scroll with overlay visibility
      // ---------------------------------------------------------------------
      const mainMenu = context.querySelector('#mainMenu');
      const scrollLeft = context.querySelector('#scrollLeft');
      const scrollRight = context.querySelector('#scrollRight');
      const leftOverlay = context.querySelector('#leftOverlay');
      const rightOverlay = context.querySelector('#rightOverlay');

      if (mainMenu && scrollLeft && scrollRight && !mainMenu.hasAttribute('data-scroll-init')) {
        const updateOverlays = () => {
          const left = mainMenu.scrollLeft;
          const max = mainMenu.scrollWidth - mainMenu.clientWidth;
          if (leftOverlay) {
            leftOverlay.classList.toggle('hidden', left <= 5);
          }
          if (rightOverlay) {
            rightOverlay.classList.toggle('hidden', left >= max - 5);
          }
        };

        scrollLeft.addEventListener('click', () => {
          mainMenu.scrollBy({ left: -280, behavior: 'smooth' });
          setTimeout(updateOverlays, 200);
        });
        scrollRight.addEventListener('click', () => {
          mainMenu.scrollBy({ left: 280, behavior: 'smooth' });
          setTimeout(updateOverlays, 200);
        });

        mainMenu.addEventListener('scroll', updateOverlays);
        window.addEventListener('resize', updateOverlays);
        updateOverlays();

        mainMenu.setAttribute('data-scroll-init', 'true');
      }

      // ---------------------------------------------------------------------
      // 2. Dark mode toggle with localStorage
      // ---------------------------------------------------------------------
      const darkToggle = context.querySelector('#darkModeToggle');
      console.log(darkToggle);
      if (darkToggle && !darkToggle.hasAttribute('data-dark-init')) {
        darkToggle.addEventListener('click', () => {
          const html = document.documentElement;
          if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
          } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          }
        });
        darkToggle.setAttribute('data-dark-init', 'true');
      }

      // ---------------------------------------------------------------------
      // 3. Mobile menu open/close
      // ---------------------------------------------------------------------
      const mobileBtn = context.querySelector('#mobileMenuBtn');
      const mobileMenuDiv = context.querySelector('#mobileMenu');
      const closeMob = context.querySelector('#closeMobileMenu');

      if (mobileBtn && mobileMenuDiv && closeMob && !mobileBtn.hasAttribute('data-mobile-init')) {
        const openMenu = () => {
          mobileMenuDiv.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        };
        const closeMenu = () => {
          mobileMenuDiv.classList.add('hidden');
          document.body.style.overflow = '';
        };

        mobileBtn.addEventListener('click', openMenu);
        closeMob.addEventListener('click', closeMenu);
        mobileMenuDiv.addEventListener('click', (e) => {
          if (e.target === mobileMenuDiv) {
            closeMenu();
          }
        });

        mobileBtn.setAttribute('data-mobile-init', 'true');
      }

      // ---------------------------------------------------------------------
      // 4. Mobile submenu toggles (accordion style)
      // ---------------------------------------------------------------------
      const toggles = context.querySelectorAll('[data-toggle]');
      toggles.forEach((toggle) => {
        if (!toggle.hasAttribute('data-sub-init')) {
          toggle.addEventListener('click', () => {
            const targetId = toggle.getAttribute('data-toggle');
            const sub = context.querySelector(`#${targetId}`);
            const parent = toggle.closest('.mobile-menu-item');
            if (sub && parent) {
              // Close any other open submenu
              document.querySelectorAll('.mobile-submenu.open').forEach((open) => {
                if (open !== sub) {
                  open.classList.remove('open');
                  open.closest('.mobile-menu-item')?.classList.remove('open');
                }
              });
              sub.classList.toggle('open');
              parent.classList.toggle('open');
            }
          });
          toggle.setAttribute('data-sub-init', 'true');
        }
      });

      // ---------------------------------------------------------------------
      // 5. Active state for horizontal menu items (fancy-menu-item)
      // ---------------------------------------------------------------------
      const menuItems = context.querySelectorAll('#mainMenu .fancy-menu-item');
      menuItems.forEach((item) => {
        if (!item.hasAttribute('data-click-init')) {
          item.addEventListener('click', function (e) {
            // Only if you want to allow changing active state on click
            menuItems.forEach((i) => i.classList.remove('active'));
            this.classList.add('active');
          });
          item.setAttribute('data-click-init', 'true');
        }
      });
    }
  };

})(jQuery, Drupal, drupalSettings);
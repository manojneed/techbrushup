(function (Drupal, once) {
  // Define the behavior.
  Drupal.behaviors.techbrushupBehaviors = {
    attach: function (context, settings) {
      // main menu
      const tabs = document.querySelectorAll(".main-menu a");
      const rightArrow = document.querySelector(".main-menu .right-arrow svg");
      const leftArrow = document.querySelector(".main-menu .left-arrow svg");
      const leftArrowContainer = document.querySelector(
        ".main-menu .left-arrow"
      );
      const rightArrowContainer = document.querySelector(
        ".main-menu .right-arrow"
      );
      const tabsList = document.querySelector(".main-menu ul");
      const removeAllActiveClasses = () => {
        tabs.forEach((tab) => {
          tab.classList.remove("active");
        });
      };
      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          removeAllActiveClasses();
          tab.classList.add("active");
        });
      });
      const manageIcons = () => {
        if (tabsList.scrollLeft >= 20) {
          leftArrowContainer.classList.add("active");
        } else {
          leftArrowContainer.classList.remove("active");
        }

        let maxScrollValue = tabsList.scrollWidth - tabsList.clientWidth - 20;

        if (tabsList.scrollLeft >= maxScrollValue) {
          rightArrowContainer.classList.remove("active");
        } else {
          rightArrowContainer.classList.add("active");
        }
      };
      rightArrow.addEventListener("click", () => {
        tabsList.scrollLeft += 200;
        manageIcons();
      });
      leftArrow.addEventListener("click", () => {
        tabsList.scrollLeft -= 200;
        manageIcons();
      });
      tabsList.addEventListener("scroll", manageIcons);

      let dragging = false;

      const drag = (e) => {
        if (!dragging) return;
        tabsList.classList.add("dragging");
        tabsList.scrollLeft -= e.movementX;
      };
      tabsList.addEventListener("mousedown", () => {
        dragging = true;
      });

      tabsList.addEventListener("mousemove", drag);

      document.addEventListener("mouseup", () => {
        dragging = false;
        tabsList.classList.remove("dragging");
      });

      // copy code snippet
      const copyButtons = document.querySelectorAll(".copy-button");

      copyButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Find the code element within the same code-snippet container
          const code = button
            .closest(".code-snippet")
            .querySelector(".code").innerText;

          // Copy the code to the clipboard
          navigator.clipboard
            .writeText(code)
            .then(() => {
              // Change button text to "Copied!"
              button.textContent = "Copied!";
              button.classList.add("copied"); // Add a class for styling (optional)

              // Revert the button text back to "Copy" after 2 seconds
              setTimeout(() => {
                button.textContent = "Copy";
                button.classList.remove("copied"); // Remove the class (optional)
              }, 2000); // 2000 milliseconds = 2 seconds
            })
            .catch((err) => {
              console.error("Failed to copy: ", err);
            });
        });
      });
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("nav-links");

      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
        console.log("clicked" + navLinks);
      });
    },
    detach: function (context, settings, trigger) {
      // Optional: Clean up when elements are removed from the DOM.
      if (trigger === "unload") {
        // Remove event listeners or perform other cleanup tasks.
      }
    },
  };
})(Drupal, once);

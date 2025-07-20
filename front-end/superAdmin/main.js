function showSection(sectionId) {
        // Hide all content sections
        document.querySelectorAll(".section-content").forEach((section) => {
          section.classList.remove("active");
        });

        // Show the selected section
        document.getElementById(sectionId).classList.add("active");

        // Update active state for sidebar items
        document.querySelectorAll(".sidebar-item").forEach((item) => {
          item.classList.remove("active");
        });
        const activeItem = document.querySelector(
          `[data-section="${sectionId}"]`
        );
        if (activeItem) {
          activeItem.classList.add("active");
        }

        // Update the header title based on the active section
        const sectionTitle = document.getElementById("sectionTitle");
        switch (sectionId) {
          case "dashboard":
            sectionTitle.textContent = "Dashboard";
            break;
          case "users":
            sectionTitle.textContent = "Kelola User";
            break;
          case "departement":
            sectionTitle.textContent = "Departement";
            break;
          case "print":
            sectionTitle.textContent = "Print";
            break;
          default:
            sectionTitle.textContent = "Admin Panel"; // Fallback title
        }

        // Automatically close the sidebar on mobile devices after selection
        if (window.innerWidth < 768) {
          document.getElementById("sidebar").classList.add("-translate-x-full");
        }
      }

      /**
       * Toggles the visibility of the sidebar on mobile devices.
       */
      function toggleSidebar() {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("-translate-x-full");
      }

      /**
       * Generates and displays a monthly consultation statistics chart.
       */
      function showMonthlyChart() {
        const chartContent = document.getElementById("chart-content");
        if (!chartContent) return; // Ensure element exists

        chartContent.innerHTML = `
          <div class="w-full h-full flex items-end justify-between">
            ${[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Mei",
              "Jun",
              "Jul",
              "Agt",
              "Sep",
              "Okt",
              "Nov",
              "Des",
            ]
              .map((bulan) => {
                const tinggi = Math.floor(Math.random() * 70) + 30; // Random height between 30% and 100%
                return `
                  <div class="flex flex-col items-center">
                    <div class="w-8 bg-primary rounded-t" style="height:${tinggi}%"></div>
                    <span class="text-xs mt-1">${bulan}</span>
                  </div>
                `;
              })
              .join("")}
          </div>
        `;
      }

      /**
       * Generates and displays a yearly consultation statistics chart.
       */
      function showYearlyChart() {
        const chartContent = document.getElementById("chart-content");
        if (!chartContent) return; // Ensure element exists

        chartContent.innerHTML = `
          <div class="w-full h-full flex items-end justify-around">
            ${["2020", "2021", "2022", "2023", "2024"]
              .map((tahun) => {
                const tinggi = Math.floor(Math.random() * 70) + 30; // Random height between 30% and 100%
                return `
                  <div class="flex flex-col items-center">
                    <div class="w-10 bg-secondary rounded-t" style="height:${tinggi}%"></div>
                    <span class="text-xs mt-1">${tahun}</span>
                  </div>
                `;
              })
              .join("")}
          </div>
        `;
      }

      // Event Listeners for chart buttons and initial chart load
      document.addEventListener("DOMContentLoaded", function () {
        const btnMonth = document.getElementById("btn-month");
        const btnYear = document.getElementById("btn-year");
        const sectionTitle = document.getElementById("sectionTitle");
        const mobileSidebarToggle = document.getElementById(
          "mobile-sidebar-toggle"
        );
        const sidebarItems = document.querySelectorAll(".sidebar-item");

        // Initialize the title based on the default active section (Dashboard)
        sectionTitle.textContent = "Dashboard";

        // Event listener for mobile sidebar toggle
        if (mobileSidebarToggle) {
          mobileSidebarToggle.addEventListener("click", toggleSidebar);
        }

        // Event listeners for sidebar navigation items
        sidebarItems.forEach((item) => {
          item.addEventListener("click", function () {
            const sectionId = this.dataset.section;
            showSection(sectionId);
          });
        });

        // Event listeners for chart buttons
        if (btnMonth) {
          btnMonth.addEventListener("click", function () {
            btnMonth.classList.add("bg-primary", "text-white");
            btnMonth.classList.remove("bg-gray-200", "text-gray-700");

            if (btnYear) {
              btnYear.classList.add("bg-gray-200", "text-gray-700");
              btnYear.classList.remove("bg-primary", "text-white");
            }
            showMonthlyChart();
          });
        }

        if (btnYear) {
          btnYear.addEventListener("click", function () {
            btnYear.classList.add("bg-primary", "text-white");
            btnYear.classList.remove("bg-gray-200", "text-gray-700");

            if (btnMonth) {
              btnMonth.classList.add("bg-gray-200", "text-gray-700");
              btnMonth.classList.remove("bg-primary", "text-white");
            }
            showYearlyChart();
          });
        }

        // Display monthly chart data when the page first loads
        showMonthlyChart();
      });
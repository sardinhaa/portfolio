function initDither() {
    const canvas = document.getElementById('ditherCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create dither pattern
    function drawDither() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Create a gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Apply manual dithering effect
        const size = 4; // Size of dither squares
        for (let y = 0; y < canvas.height; y += size) {
            for (let x = 0; x < canvas.width; x += size) {
                const value = Math.floor(Math.random() * 256);
                ctx.fillStyle = `rgba(${value}, ${value}, ${value}, 0.05)`;
                ctx.fillRect(x, y, size, size);
            }
        }
    }
    
    drawDither();
    
    // Add mouse movement parallax effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        canvas.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
    });
}

// Theme management
function setTheme(theme) {
    document.body.className = `theme-${theme}`;
    localStorage.setItem('portfolioTheme', theme);
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' }); // smooth scroll [web:22][web:73]
    }
}

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Load theme
    const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
    setTheme(savedTheme);

    // Init dither background
    initDither();

    // Dock hover effect
    const dock = document.querySelector('.dock');
    const dockItems = document.querySelectorAll('.dock-item');

    if (dock && dockItems.length) {
        dock.addEventListener('mouseenter', () => {
            dockItems.forEach(item => {
                const label = item.querySelector('.dock-label');
                if (label) label.style.opacity = '1';
            });
        });

        dock.addEventListener('mouseleave', () => {
            dockItems.forEach(item => {
                const label = item.querySelector('.dock-label');
                if (label) label.style.opacity = '0';
            });
        });
    }

    // Skill items animation delay
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 50}ms`;
    });
});

// Window resize handler
window.addEventListener('resize', () => {
    initDither();
});

// Navegação da card e dos projetos
document.addEventListener('DOMContentLoaded', () => {
  const projectsCard = document.querySelector('.projects-card');
  const project1 = document.querySelector('.project-1');
  const project2 = document.querySelector('.project-2');

  if (projectsCard) {
    projectsCard.addEventListener('click', () => {
      window.location.href = 'projects.html';
    });
  }

  if (project1) {
    project1.addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = '1.html';
    });
  }

  if (project2) {
    project2.addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = '2.html';
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  // ... resto do código já existente
  // Theme hamburger menu
  const themeMenu = document.querySelector('.theme-menu');
  const themeToggle = themeMenu ? themeMenu.querySelector('.theme-menu-toggle') : null;

  if (themeMenu && themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      themeMenu.classList.toggle('open');
    });

    // Fechar ao clicar fora
    document.addEventListener('click', () => {
      themeMenu.classList.remove('open');
    });

    const dropdown = themeMenu.querySelector('.theme-menu-dropdown');
    if (dropdown) {
      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }
});


document.addEventListener("DOMContentLoaded", () => {
    const projectContainer = document.querySelector("#projects .grid");
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            projectContainer.innerHTML = "";
            data.forEach((project, index) => {
                const card = `
                    <div class="project-card rounded-xl overflow-hidden" 
                         data-aos="fade-up" 
                         data-aos-delay="${index * 100}">
                        
                        <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
                        
                        <div class="p-6">
                            <h4 class="text-xl font-semibold text-gold-300 mb-3">${project.title}</h4>
                            <p class="text-gold-100 text-sm mb-4">${project.description}</p>
                            
                            <div class="flex gap-2 mb-4">
                                ${project.tags.map(tag => `
                                    <span class="gold-bg px-3 py-1 rounded-full text-xs text-gold-300">
                                        ${tag}
                                    </span>
                                `).join('')}
                            </div>

                            <div class="flex gap-6 text-gold-200">
                                <a href="${project.github}" target="_blank" class="hover:text-gold-400">
                                    <i class="fa-brands fa-github"></i> GitHub
                                </a>
                                <a href="${project.live}" target="_blank" class="hover:text-gold-400">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Live
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            
                projectContainer.innerHTML += card;
            });
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            projectContainer.innerHTML = "<p class='text-red-500'>Failed to load projects.</p>";
        });
});

// --- Particle Animation Logic ---
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
  
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', initCanvas);


initCanvas();
for(let i=0; i<80; i++) particles.push(new Particle());
animateParticles();

// typing annimiton 

  const textElement = document.getElementById('typing-text');
  const words = ["Obaidur Rahman", "A Developer",]; 
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 150;
  const backSpeed = 100;
  const delayBetweenWords = 2000;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentTypeSpeed = isDeleting ? backSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      currentTypeSpeed = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      currentTypeSpeed = 500;
    }

    setTimeout(typeEffect, currentTypeSpeed);
  }

  document.addEventListener('DOMContentLoaded', typeEffect);

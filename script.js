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
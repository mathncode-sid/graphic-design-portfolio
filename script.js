// ========================================
// AUTO-UPDATE FOOTER YEAR
// ========================================

document.getElementById('year').textContent = new Date().getFullYear();

// ========================================
// NAVIGATION & MENU FUNCTIONALITY
// ========================================

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
  });
});

// ========================================
// HEADER SCROLL FUNCTIONALITY
// ========================================

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Update active nav link based on scroll position
  const sections = document.querySelectorAll('section');
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// ========================================
// PROJECTS DATA
// ========================================

const projects = [
  {
    id: 1,
    title: "Against The Odds - Book Cover",
    category: "branding",
    img: "assets/Against The Odds Book Cover.webp",
    description: "Minimalist book cover design with contrast and powerful typography that captures the essence of overcoming challenges."
  },
  {
    id: 2,
    title: "Bruno Fernandes - Football Player Feature",
    category: "social",
    img: "assets/Bruno8.webp",
    description: "Dynamic social media graphic for Manchester United player Bruno Fernandes featuring geometric design elements and vibrant colors."
  },
  {
    id: 3,
    title: "CR7 x Nike - Winning Isn't For Everyone",
    category: "branding",
    img: "assets/CR7.webp",
    description: "Inspirational sports marketing design for Cristiano Ronaldo and Nike collaboration with powerful messaging."
  },
  {
    id: 4,
    title: "Benefits of Strawberry - Infographic",
    category: "print",
    img: "assets/Day One.webp",
    description: "Educational infographic design highlighting the health benefits of strawberries with modern sliced fruit effect."
  },
  {
    id: 5,
    title: "Emmanuel Kiprotich - Campaign Poster",
    category: "print",
    img: "assets/EK Delegate Poster(1).webp",
    description: "Academic campaign poster for physics department delegate with clean layout and professional branding."
  },
  {
    id: 6,
    title: "Just Do It - Nike Basketball Campaign",
    category: "branding",
    img: "assets/JUST DO IT - STEPH CURRY.webp",
    description: "Motivational sports poster featuring Stephen Curry with Nike's iconic slogan and dynamic composition."
  },
  {
    id: 7,
    title: "Music Streaming Promotion",
    category: "social",
    img: "assets/LISTEN PARTY.webp",
    description: "Modern streaming music promotional graphic with atmospheric lighting and gradient effects."
  },
  {
    id: 8,
    title: "Ray of Kindness - Charity Event",
    category: "print",
    img: "assets/RAY OF KINDNESS INSTAGRAM POST 1.webp",
    description: "Charity event flyer for Tree House Children's Home with vibrant design and clear information layout."
  },
  {
    id: 9,
    title: "Ronaldo - Real Madrid Tribute",
    category: "social",
    img: "assets/RealCR7.webp",
    description: "Sports tribute design showcasing Cristiano Ronaldo during his time at Real Madrid with dynamic layout."
  },
  {
    id: 10,
    title: "Echoes of Resilience",
    category: "social",
    img: "assets/Echoes of Resilience webinar.webp",
    description: "Professional webinar poster for EmoEase Community in partnership with Harun Gachiri."
  },
  {
    id: 11,
    title: "Men Talk. Men Heal",
    category: "print",
    img: "assets/MTH(1).webp",
    description: "Impactful poster for a Men's Wellness Event on Father's Day promoting mental health awareness."
  },
  {
    id: 12,
    title: "Self Love Webinar",
    category: "social",
    img: "assets/Self Love The Foundation of Wellness.webp",
    description: "Professional webinar design on Self Love focusing on wellness and personal development."
  },
  {
    id: 13,
    title: "EA Vertical Business Card",
    category: "branding",
    img: "assets/Manuel Abae.webp",
    description: "Professional business card design for a client showcasing their services with elegant vertical layout."
  }
];

// ========================================
// PROJECT GRID & FILTERING
// ========================================

const projectsGrid = document.querySelector('.projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalCategory = document.getElementById('modal-category');

function createProjectElements(projectsToShow) {
  projectsGrid.innerHTML = '';
  
  projectsToShow.forEach(project => {
    const projectItem = document.createElement('div');
    projectItem.classList.add('project-item');
    projectItem.setAttribute('data-id', project.id);
    projectItem.setAttribute('data-category', project.category);
    
    projectItem.innerHTML = `
      <img src="${project.img}" alt="${project.title}" class="project-img">
      <div class="project-overlay">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-category">${project.category}</p>
      </div>
    `;
    
    projectsGrid.appendChild(projectItem);
    
    // Add click event to open modal
    projectItem.addEventListener('click', () => {
      modalImage.src = project.img;
      modalTitle.textContent = project.title;
      modalDescription.textContent = project.description;
      modalCategory.textContent = `Category: ${project.category.charAt(0).toUpperCase() + project.category.slice(1)}`;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
}

// Initial project load
createProjectElements(projects);

// Filter functionality
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    if (filter === 'all') {
      createProjectElements(projects);
    } else {
      const filteredProjects = projects.filter(project => project.category === filter);
      createProjectElements(filteredProjects);
    }
  });
});

// ========================================
// MODAL FUNCTIONALITY
// ========================================

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// ========================================
// CONTACT FORM HANDLING
// ========================================

const form = document.getElementById('email-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    alert('Please fill out all fields.');
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Submit form
  form.submit();
});

// ========================================
// SKILL BARS ANIMATION
// ========================================

const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
  
  skillsAnimated = true;
}

window.addEventListener('scroll', () => {
  const skillSection = document.querySelector('.about');
  if (!skillSection) return;
  
  const sectionPos = skillSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;
  
  if (sectionPos < screenPos && !skillsAnimated) {
    animateSkills();
  }
});

// ========================================
// SMOOTH SCROLL BEHAVIOR
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


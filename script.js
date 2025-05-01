// Navigation functionality
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

// Highlight active nav item based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const header = document.querySelector('header');
  
  // Add background to header when scrolled
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Update active nav link based on scroll position
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

// Projects data with the new uploaded images
const projects = [
  {
    id: 1,
    title: "Against The Odds - Book Cover",
    category: "branding",
    img: "assets/Against The Odds Book Cover.webp",
    description: "Minimalist book cover design with contrast and powerful typography."
  },
  {
    id: 2,
    title: "Bruno Fernandes - Football Player Feature",
    category: "social",
    img: "assets/Bruno8.webp",
    description: "Dynamic social media graphic for Manchester United player Bruno Fernandes featuring geometric design elements."
  },
  {
    id: 3,
    title: "CR7 x Nike - Winning Isn't For Everyone",
    category: "branding",
    img: "assets/CR7.webp",
    description: "Inspirational sports marketing design for Cristiano Ronaldo and Nike collaboration."
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
    description: "Motivational sports poster featuring Stephen Curry with Nike's iconic slogan."
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
    description: "Webinar Poster for EmoEase Community in partnership with Harun Gachiri"
  }
];

// Populate projects grid
const projectsGrid = document.querySelector('.projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalCategory = document.getElementById('modal-category');

// Function to create project elements
function createProjectElements(projectsToShow) {
  projectsGrid.innerHTML = '';
  
  projectsToShow.forEach(project => {
    const projectItem = document.createElement('div');
    projectItem.classList.add('project-item');
    projectItem.setAttribute('data-id', project.id);
    
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
      modalCategory.textContent = `Category: ${project.category}`;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
  });
}

// Initial project load
createProjectElements(projects);

// Filter functionality
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
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

// Close modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Initialize EmailJS
emailjs.init("service_cygydj6");

// Form submission with validation
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

  // Send email using EmailJS
  emailjs.send("service_cygydj6", "template_28ibpcq", {
    name: name,
    email: email,
    subject: subject,
    message: message
  })
  .then(() => {
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
  })
  .catch((error) => {
    console.error('Error sending email:', error);
    alert('Oops! Something went wrong. Please try again later.');
  });
});

// Skill bars animation trigger on scroll
const skillSection = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.skill-level');

const showSkills = () => {
  skillBars.forEach(bar => {
    bar.style.width = bar.parentElement.children[0].style.width;
  });
};

window.addEventListener('scroll', () => {
  const sectionPos = skillSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;
  
  if(sectionPos < screenPos) {
    showSkills();
  }
});

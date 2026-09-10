/**
 * Main Application Orchestrator
 * Coordinates Three.js 3D Scenes, DOM Population, Smooth Scroll, and User Interactions
 */

import { PROFILE_CONFIG } from './profileConfig.js';
import { initThreeHeroScene } from './threeHeroScene.js';
import { initKisanMitraVisual } from './projectVisual.js';
import { initCardTilt } from './tilt.js';


document.addEventListener('DOMContentLoaded', () => {
  renderProfileData();
  renderStats();
  renderFocusAreas();
  renderCompetencyTags();
  renderSkills();
  renderCertifications();
  renderEducation();
  renderExperience();
  setupNavigation();
  setupResumeAction();
  setupContactForm();

  // Initialize Lucide icons if loaded
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initialize 3D WebGL scenes
  try {
    initThreeHeroScene();
  } catch (err) {
    console.error('[Main] Hero scene init error:', err);
  }

  try {
    initKisanMitraVisual();
  } catch (err) {
    console.error('[Main] KisanMitra visual init error:', err);
  }

  // Initialize 3D Card Tilt effects after cards are inserted
  initCardTilt();
});

/**
 * Render Professional Real Stats in Hero
 */
function renderStats() {
  const container = document.getElementById('hero-stats-container');
  if (!container || !PROFILE_CONFIG.personal.stats) return;

  container.innerHTML = PROFILE_CONFIG.personal.stats.map(s => `
    <div class="hero-stat-card glass-card tilt-card">
      <div class="hero-stat-val">${s.value}</div>
      <div class="hero-stat-label">${s.label}</div>
      <div class="hero-stat-sub">${s.sub}</div>
    </div>
  `).join('');
}

/**
 * Populate core profile data into DOM
 */
function renderProfileData() {
  const p = PROFILE_CONFIG.personal;
  const s = PROFILE_CONFIG.socialLinks;

  // Hero section
  const heroGreeting = document.getElementById('hero-greeting');
  if (heroGreeting) heroGreeting.textContent = `Hi, I'm ${p.shortName}`;

  const heroIntro = document.getElementById('hero-intro');
  if (heroIntro) heroIntro.textContent = p.heroIntro;

  // Social Links
  const linkedinLinks = document.querySelectorAll('.link-linkedin');
  linkedinLinks.forEach(link => {
    link.href = s.linkedin;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  const githubLinks = document.querySelectorAll('.link-github');
  githubLinks.forEach(link => {
    link.href = s.github;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  // About narrative
  const narrativeContainer = document.getElementById('about-narrative-content');
  if (narrativeContainer && p.bio) {
    narrativeContainer.innerHTML = p.bio.map(paragraph => `<p>${paragraph}</p>`).join('');
  }

  // Profile Card
  const profileCardName = document.getElementById('profile-card-name');
  if (profileCardName) profileCardName.textContent = p.fullName;

  const profileCardRole = document.getElementById('profile-card-role');
  if (profileCardRole) profileCardRole.textContent = p.title;

  const profileAvatar = document.getElementById('profile-avatar');
  if (profileAvatar && p.avatarUrl) {
    profileAvatar.src = p.avatarUrl;
    profileAvatar.alt = p.fullName;
  }
}

/**
 * Render About Focus Cards
 */
function renderFocusAreas() {
  const container = document.getElementById('focus-cards-container');
  if (!container) return;

  const items = PROFILE_CONFIG.focusAreas;
  container.innerHTML = items.map(f => `
    <div class="focus-card tilt-card">
      <div class="focus-card-icon">
        <i data-lucide="${f.icon}"></i>
      </div>
      <h3 class="focus-card-title">${f.title}</h3>
      <p class="focus-card-desc">${f.description}</p>
    </div>
  `).join('');
}

/**
 * Render Competency Highlight Tags
 */
function renderCompetencyTags() {
  const container = document.getElementById('competency-tags-container');
  if (!container) return;

  const tags = PROFILE_CONFIG.competencyHighlights;
  container.innerHTML = tags.map(tag => `
    <span class="competency-tag">
      <i data-lucide="check-circle" style="width: 14px; height: 14px; color: var(--accent-cyan);"></i>
      ${tag}
    </span>
  `).join('');
}

/**
 * Render Categorized 3D Skills Cards
 */
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const categories = PROFILE_CONFIG.skillCategories;

  container.innerHTML = categories.map(cat => `
    <div class="skill-category-block">
      <div class="category-title-bar">
        <i data-lucide="${cat.icon}" class="category-icon"></i>
        <h3 class="category-name">${cat.category}</h3>
        <span class="category-counter">${cat.skills.length} competencies</span>
      </div>

      <div class="skills-grid">
        ${cat.skills.map(skill => `
          <div class="skill-card tilt-card" data-tilt>
            <div class="skill-card-top">
              <div class="skill-icon-box">
                <i data-lucide="${getSkillLucideIcon(skill.name)}"></i>
              </div>
              <span class="skill-tag">${skill.tag}</span>
            </div>
            <h4 class="skill-name">${skill.name}</h4>
            <p class="skill-desc">${skill.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/**
 * Helper to match skill names to Lucide icon names
 */
function getSkillLucideIcon(skillName) {
  const map = {
    'Python': 'terminal',
    'C++': 'cpu',
    'Java': 'coffee',
    'Data Science': 'database',
    'Data Transformation': 'shuffle',
    'NumPy': 'layout-grid',
    'Jupyter Lab': 'book-open',
    'Google Colab': 'cloud',
    'Machine Learning': 'network',
    'Generative AI': 'sparkles',
    'ChatGPT': 'message-square-code',
    'Power BI': 'bar-chart-big',
    'GitHub': 'github'
  };
  return map[skillName] || 'code';
}

/**
 * Render 7 Verified Certifications
 */
function renderCertifications() {
  const container = document.getElementById('cert-grid');
  if (!container) return;

  const certs = PROFILE_CONFIG.certifications;

  container.innerHTML = certs.map(cert => `
    <div class="cert-card tilt-card">
      <div class="cert-top">
        <div class="cert-icon-box">
          <i data-lucide="${cert.icon || 'award'}"></i>
        </div>
        <div class="cert-meta">
          <span class="cert-issuer">
            <i data-lucide="shield-check" style="width: 14px; height: 14px;"></i>
            ${cert.issuer}
          </span>
          <h3 class="cert-name">${cert.name}</h3>
          <span class="cert-category">${cert.category}</span>
        </div>
      </div>

      <div class="cert-footer">
        <span class="cert-badge-verified">
          <i data-lucide="badge-check" style="width: 14px; height: 14px; color: var(--accent-cyan);"></i>
          Verified Credential
        </span>
        <a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-cyan cert-btn">
          <span>View Certificate</span>
          <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
        </a>
      </div>
    </div>
  `).join('');
}

/**
 * Render Education Timeline
 */
function renderEducation() {
  const container = document.getElementById('education-timeline');
  if (!container) return;

  const list = PROFILE_CONFIG.education;

  container.innerHTML = list.map(item => `
    <div class="timeline-item">
      <div class="timeline-node">
        <div class="timeline-node-inner"></div>
      </div>
      <div class="timeline-card glass-card tilt-card">
        <div class="timeline-header">
          <h3 class="timeline-degree">${item.degree}</h3>
          <span class="badge">${item.status}</span>
        </div>
        <div class="timeline-univ">${item.university}</div>
        <div class="timeline-college">
          <i data-lucide="map-pin" style="width: 15px; height: 15px; color: var(--accent-cyan);"></i>
          ${item.college}
        </div>
        <ul class="timeline-points">
          ${item.highlights.map(pt => `
            <li class="timeline-point">
              <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
              <span>${pt}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

/**
 * Render Experience & Activities
 */
function renderExperience() {
  const container = document.getElementById('experience-grid');
  if (!container) return;

  // If container already has pre-rendered experience cards in HTML, preserve them
  if (container.children.length > 0) {
    return;
  }

  const activities = PROFILE_CONFIG.experienceActivities;
  if (!activities || !activities.length) return;

  container.innerHTML = activities.map(item => `
    <div class="experience-card tilt-card">
      <div class="experience-icon">
        ${item.image ? `<img src="${item.image}" alt="${item.role} Logo" loading="lazy">` : `<i data-lucide="award"></i>`}
      </div>
      <div class="experience-content">
        <span class="experience-type">${item.type}</span>
        <h3>${item.role}</h3>
        <h4>${item.organization}</h4>
        <div class="experience-date">${item.period}</div>
        <p>${item.description}</p>
        <div class="experience-tags">
          ${item.tags ? item.tags.map(t => `<span>${t}</span>`).join('') : ''}
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Setup Smooth Navigation, Scrollspy & Mobile Hamburger
 */
function setupNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar Scroll Listener
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menu Toggle
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking link
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ScrollSpy Active Link Tracking
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
}

/**
 * Setup Resume Actions (Direct download or notification)
 */
function setupResumeAction() {
  const resumeBtns = document.querySelectorAll('.btn-download-resume');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const resumeUrl = PROFILE_CONFIG.resume.url;
      if (!resumeUrl) {
        window.open(PROFILE_CONFIG.socialLinks.linkedin, '_blank');
        return;
      }

      fetch(resumeUrl, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            const a = document.createElement('a');
            a.href = resumeUrl;
            a.download = PROFILE_CONFIG.resume.downloadFileName || 'Adinath_Ugale_Resume.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } else {
            // If local PDF not yet uploaded by user, open LinkedIn credentials
            window.open(PROFILE_CONFIG.socialLinks.linkedin, '_blank');
          }
        })
        .catch(() => {
          window.open(PROFILE_CONFIG.socialLinks.linkedin, '_blank');
        });
    });
  });
}

/**
 * Setup Contact Form Submission & Email Copying
 */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const statusBanner = document.getElementById('form-status');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  // Copy email button helper
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(PROFILE_CONFIG.socialLinks.email).then(() => {
        const origText = copyEmailBtn.innerText;
        copyEmailBtn.innerText = 'Copied to Clipboard!';
        setTimeout(() => {
          copyEmailBtn.innerText = origText;
        }, 2200);
      });
    });
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showStatus('Please fill in all fields before sending.', 'error');
      return;
    }

    const endpoint = PROFILE_CONFIG.contactConfig.formspreeEndpoint;

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        if (res.ok) {
          showStatus('Thank you! Your message has been sent successfully.', 'success');
          form.reset();
        } else {
          showStatus('Unable to deliver message right now. Opening your email client...', 'error');
          openMailClient(name, email, message);
        }
      } catch (err) {
        showStatus('Network error. Opening your email client...', 'error');
        openMailClient(name, email, message);
      }
    } else {
      // Default recruiter-friendly fallback: open mailto link directly with prefilled content
      showStatus('Opening your default email client to send message...', 'success');
      setTimeout(() => {
        openMailClient(name, email, message);
      }, 500);
    }
  });

  function showStatus(text, type) {
    if (!statusBanner) return;
    statusBanner.textContent = text;
    statusBanner.className = `form-status ${type}`;
    statusBanner.style.display = 'block';
  }

  function openMailClient(name, email, message) {
    const recipient = PROFILE_CONFIG.contactConfig.defaultRecipientEmail;
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Adinath,\n\n${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  }
}
const profile = document.querySelector(".hero-profile-photo");
const photo = profile?.querySelector("img");

if (profile && photo) {

    profile.addEventListener("mousemove", (e) => {

        const rect = profile.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        profile.style.transform =
            `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        photo.style.transform =
            `translateZ(45px) rotateX(${rotateX * 0.25}deg) rotateY(${rotateY * 0.25}deg)`;
    });

    profile.addEventListener("mouseleave", () => {

        profile.style.transform =
            "translate(-50%, -50%) rotateX(0deg) rotateY(0deg)";

        photo.style.transform =
            "translateZ(35px) rotateX(0deg) rotateY(0deg)";
    });
}
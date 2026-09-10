/**
 * Centralized Profile & Portfolio Configuration
 * Adinath Shivram Ugale - AI & Data Science Engineer
 * 
 * Update this single file to modify profile details, links, projects, skills, and certifications.
 */

export const PROFILE_CONFIG = {
  personal: {
    fullName: "Adinath Shivram Ugale",
    shortName: "Adinath Ugale",
    title: "AI & Data Science Engineer | Data Scientist",
    roles: [
      "AI & Data Science Engineer",
      "Full Stack Developer",
      "Creative Technologist",
      "Machine Learning Builder"
    ],
    avatarUrl: "assets/portfolioimage.png",
    location: "Nashik / Pune, Maharashtra, India",
    statusBadge: "Available for AI & Developer Roles",
    bio: [
      "I am an Artificial Intelligence and Data Science engineering student passionate about Data Science, Machine Learning, Artificial Intelligence, Generative AI and building real-world technology solutions.",
      "I enjoy transforming data into meaningful insights and developing intelligent applications that can solve practical problems."
    ],
    heroIntro: "I build data-driven and intelligent solutions using Python, Machine Learning, Generative AI and modern data technologies.",
    stats: [
      { label: "Projects Built", value: "1", sub: "Production & ML Apps" },
      { label: "Core Technologies", value: "15+", sub: "Python, Web, AI & Data" },
      { label: "Certifications", value: "10", sub: "GeeksforGeeks Verified" }
    ]
  },

  socialLinks: {
    linkedin: "https://www.linkedin.com/in/adinath-ugale-502b5534a",
    github: "https://www.instagram.com/adinath_ugale_77?stkn=MWU4NGl3MTlvb2doZA==",
    email: "aadinathsugale@gmail.com" // Update with your preferred primary email
  },

  resume: {
    // Replace with your direct Google Drive link or drop your resume into assets/resume.pdf
    url: "assets/resume.pdf",
    downloadFileName: "Adinath_Ugale_Resume.pdf",
    heading: "Let's build something intelligent.",
    subheading: "Explore my experience, skills and projects through my resume."
  },

  education: [
    {
      degree: "B.E. Artificial Intelligence & Data Science",
      university: "Savitribai Phule Pune University (SPPU)",
      college: "Late G. N. Sapkal College of Engineering, Nashik",
      status: "Undergraduate Student",
      highlights: [
        "Core focus on Artificial Intelligence, Machine Learning algorithms, and Applied Mathematics",
        "Data Engineering, Data Structures, Predictive Modeling, and Big Data concepts",
        "Hands-on lab coursework in Python, Database Management Systems, and Statistical Analysis"
      ]
    }
  ],

  focusAreas: [
    {
      title: "AI & Data Science",
      icon: "brain-circuit",
      description: "End-to-end intelligent systems, neural networks, and algorithmic problem solving."
    },
    {
      title: "Machine Learning",
      icon: "cpu",
      description: "Supervised & unsupervised learning, classification, regression, and model evaluation."
    },
    {
      title: "Data Analytics",
      icon: "bar-chart-3",
      description: "Statistical data transformation, exploratory data analysis, and Power BI dashboards."
    },
    {
      title: "Generative AI",
      icon: "sparkles",
      description: "Prompt engineering, LLM application architecture, and conversational interfaces."
    }
  ],

  competencyHighlights: [
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Generative AI",
    "Data Analytics",
    "Problem Solving",
    "Python Development"
  ],

  skillCategories: [
    {
      category: "Programming",
      icon: "code",
      skills: [
        { name: "Python", icon: "python", tag: "Primary", desc: "Core language for ML pipelines, automation, data wrangling & backend scripts." },
        { name: "C++", icon: "cpp", tag: "Core", desc: "Foundational algorithms, object-oriented programming, and memory concepts." },
        { name: "Java", icon: "java", tag: "OOP", desc: "Object-oriented software development and cross-platform logic." }
      ]
    },
    {
      category: "Data Science",
      icon: "database",
      skills: [
        { name: "Data Science", icon: "binary", tag: "Discipline", desc: "Hypothesis testing, statistical inference, feature engineering & insights." },
        { name: "Data Transformation", icon: "shuffle", tag: "ETL", desc: "Cleaning, reshaping, normalizing, and preparing tabular datasets." },
        { name: "NumPy", icon: "grid", tag: "Arrays", desc: "High-performance vector and multi-dimensional matrix operations." },
        { name: "Jupyter Lab", icon: "notebook", tag: "IDE", desc: "Interactive exploratory computational notebooks and visualization." },
        { name: "Google Colab", icon: "cloud", tag: "Cloud", desc: "Cloud GPU acceleration for deep learning and reproducible research." }
      ]
    },
    {
      category: "AI / Machine Learning",
      icon: "bot",
      skills: [
        { name: "Machine Learning", icon: "network", tag: "Predictive", desc: "Model training, tuning heuristics, cross-validation, and metrics." },
        { name: "Generative AI", icon: "sparkles", tag: "GenAI", desc: "Multimodal AI patterns, prompting strategies, and semantic workflows." },
        { name: "ChatGPT", icon: "message-square-code", tag: "LLM", desc: "Prompt optimization, conversational AI flows, and assistive workflows." }
      ]
    },
    {
      category: "Data Visualization",
      icon: "pie-chart",
      skills: [
        { name: "Power BI", icon: "bar-chart-big", tag: "BI & Dashboards", desc: "Interactive business intelligence reports, KPI cards, and DAX modeling." }
      ]
    },
    {
      category: "Development & Tools",
      icon: "wrench",
      skills: [
        { name: "GitHub", icon: "github", tag: "VCS", desc: "Collaborative Git version control, repository maintenance, and deployments." }
      ]
    }
  ],

  featuredProject: {
    title: "KisanMitra AI",
    badge: "Featured Flagship Project",
    category: "AI / Agriculture / Data Science",
    tagline: "Smart Decisions. Better Farming.",
    description: "KisanMitra AI is an AI-powered multilingual agricultural decision-support platform designed to help Indian farmers make better farming decisions.",
    problem: "Farmers often need information about crops, diseases, weather, fertilizers and farming decisions from different sources, leading to delayed decisions and harvest risks.",
    solution: "KisanMitra AI brings intelligent agricultural assistance into one unified, multilingual, and mobile-friendly platform.",
    features: [
      {
        title: "Crop Disease Leaf Pathology",
        desc: "Visual leaf lesion scanner identifying blight, rust, and viral infections with confidence markers and cultural treatment steps."
      },
      {
        title: "Agro-Climatic Crop Recommendation",
        desc: "Precision matching based on soil type, seasonal cycle (Kharif/Rabi/Zaid), and water availability."
      },
      {
        title: "Balanced Fertilizer Guidance",
        desc: "Accurate N-P-K nutrient split schedules, basal dosages, and bio-fertilizer alternatives."
      },
      {
        title: "Hyperlocal Weather & Agri Alerts",
        desc: "Meteorological telemetry (temperature, humidity, rain probability) with proactive severe event advisories."
      },
      {
        title: "Multilingual Farmer Assistance",
        desc: "24x7 intelligent voice and text assistant accessible natively in Marathi (मराठी), Hindi (हिंदी), and English."
      },
      {
        title: "Interactive Crop Lifecycle",
        desc: "End-to-end guidance from sowing to tillering, disease scouting, and safe post-harvest storage."
      }
    ],
    techStack: ["Python", "FastAPI / Heuristic ML", "Computer Vision Heuristics", "Web Speech API", "Modern Web UI", "Agri Telemetry"],
    liveDemoUrl: "https://adinath-ugale.github.io/kisan-mitra-ai/",
    githubUrl: "https://github.com/adinath-ugale"
  },

  certifications: [
    {
      id: 1,
      name: "GitHub",
      issuer: "GeeksforGeeks",
      category: "Development & Version Control",
      url: "https://media.geeksforgeeks.org/courses/certificates/80fc3907303f2da6342a88a1422bc848.pdf",
      icon: "git-branch"
    },
    {
      id: 2,
      name: "Generative AI",
      issuer: "GeeksforGeeks",
      category: "Artificial Intelligence",
      url: "https://media.geeksforgeeks.org/courses/certificates/43536864bf23429777a7cd04a88d07a9.pdf",
      icon: "sparkles"
    },
    {
      id: 3,
      name: "Soft Skill",
      issuer: "GeeksforGeeks",
      category: "Professional Development",
      url: "https://media.geeksforgeeks.org/courses/certificates/50290aae1d4e7ca65952cd14849502b3.pdf",
      icon: "users"
    },
    {
      id: 4,
      name: "Machine Learning",
      issuer: "GeeksforGeeks",
      category: "Artificial Intelligence & Data",
      url: "https://media.geeksforgeeks.org/courses/certificates/d1ed14ff00dcf02ac9aaf370ec4f488a.pdf",
      icon: "cpu"
    },
    {
      id: 5,
      name: "Python for Data Science",
      issuer: "GeeksforGeeks",
      category: "Data Science & Analytics",
      url: "https://media.geeksforgeeks.org/courses/certificates/5156baa5a292a0960a67c2b1003ce5d8.pdf",
      icon: "binary"
    },
    {
      id: 6,
      name: "Power BI",
      issuer: "GeeksforGeeks",
      category: "Data Visualization & BI",
      url: "https://media.geeksforgeeks.org/courses/certificates/d0056577ad1266b99c29184bff50a205.pdf",
      icon: "bar-chart-3"
    },
    {
      id: 7,
      name: "Python Programming",
      issuer: "GeeksforGeeks",
      category: "Software Development",
      url: "https://media.geeksforgeeks.org/courses/certificates/5f3937848a718d5dfc6cf892e5d614fb.pdf",
      icon: "code"
    }
  ],

  experienceActivities: [

  // ================= 1. GEEKSFORGEEKS =================
  {
    role: "Campus Mantri",
    organization: "GeeksforGeeks",
    type: "Leadership",
    period: "Campus Leadership",
    description: "Contributing to the student developer community by promoting coding, technical learning, workshops and technology-focused opportunities on campus.",
    image: "assets/gfg.png",
    tags: ["Leadership", "Community", "Coding", "Technology"]
  },

  // ================= 2. E-CELL IIT BOMBAY =================
  {
    role: "Campus Ambassador",
    organization: "E-Cell IIT Bombay",
    type: "Campus Ambassador",
    period: "2026",
    description: "Participating in campus engagement initiatives and promoting entrepreneurship, innovation and student-focused opportunities.",
    image: "assets/ecell.png",
    tags: ["Entrepreneurship", "Innovation", "Networking", "Engagement"]
  },

  // ================= 3. BUILD HUB =================
  {
    role: "Ambassador",
    organization: "Build Hub",
    type: "Ambassador",
    period: "Ambassador Program",
    description: "Participating in the Build Hub ambassador program and contributing to community engagement, technology awareness and student opportunities.",
    image: "assets/buildhub.webp",
    tags: ["Community", "Technology", "Networking"]
  },

  // ================= 4. MYGOV =================
  {
    role: "Ambassador",
    organization: "MyGov",
    type: "Ambassador",
    period: "Ambassador Program",
    description: "Participating in MyGov initiatives and contributing to awareness, engagement and participation in citizen-focused programs.",
    image: "assets/myGov.webp",
    tags: ["Community", "Engagement", "Awareness"]
  },

  // ================= 5. PYTHON INTERNSHIP =================
  {
    role: "Python Internship Program",
    organization: "iBase Electrosoft LLP",
    type: "Internship",
    period: "7 Days Internship Program",
    description: "Completed a practical Python internship program with hands-on exposure to programming concepts, development tasks and problem-solving.",
    image: "assets/ibase.jpg",
    tags: ["Python", "Programming", "Problem Solving"]
  },

  // ================= 6. CYBER SECURITY =================
  {
    role: "Cyber Security Workshop",
    organization: "TAT Cyber",
    type: "Workshop",
    period: "3 Days",
    description: "Completed a 3-day Cyber Security workshop and gained exposure to fundamental cybersecurity concepts, digital security and safe computing practices.",
    image: "assets/cyber.jpg",
    tags: ["Cyber Security", "Networking", "Digital Security"]
  },

  // ================= 7. NSS =================
  {
    role: "NSS Camp",
    organization: "National Service Scheme",
    type: "Social Activity",
    period: "7 Days",
    description: "Participated in a 7-day NSS camp, gaining experience in teamwork, collaboration, social responsibility and community-oriented activities.",
    image: "assets/nss.png",
    tags: ["Teamwork", "Collaboration", "Social Responsibility"]
  }

],

  contactConfig: {
    // To receive messages directly to your email, create a free endpoint on formspree.io and paste here:
    // e.g., formspreeEndpoint: "https://formspree.io/f/your_form_id"
    formspreeEndpoint: "",
    defaultRecipientEmail: "aadinathsugale@gmail.com"
  }
};

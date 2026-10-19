import type { DomainId, IndustryIcon, ServiceId } from "./types";

/**
 * ENGLISH CONTENT — single source of truth for all English copy.
 * Source: MIPV Corporate Profile 2026 (EN) and the approved website brief.
 * Keep the structure identical in content/bm.ts.
 */
export const en = {
  meta: {
    siteName: "MIPV",
    defaultTitle: "MIPV | Integrated Multidisciplinary Professional Consultancy",
    titleTemplate: "%s | MIPV",
    defaultDescription:
      "MIPV is a multidisciplinary professional consultancy based in Nilai, Negeri Sembilan, delivering integrated advisory, assessment, research, training and organisational improvement solutions.",
    pages: {
      home: {
        title: "MIPV | Integrated Multidisciplinary Professional Consultancy",
        description:
          "Management. Innovation. Performance. Value. MIPV delivers integrated advisory, assessment, research, training and organisational improvement solutions for institutions and businesses in Malaysia.",
      },
      about: {
        title: "About MIPV",
        description:
          "MIPV is an integrated multidisciplinary professional consultancy guided by the principles of Management, Innovation, Performance and Value. Learn about our vision, mission and operating model.",
      },
      expertise: {
        title: "Our Expertise",
        description:
          "Five integrated capability domains: governance, risk, integrity and compliance; quality, safety and health; psychology, psychometrics and human capital; strategic management; and research and evaluation.",
      },
      services: {
        title: "Our Professional Services",
        description:
          "Consultancy and advisory, assessment and diagnostics, research and evaluation, training and capacity development, audit and professional review, and implementation and improvement support.",
      },
      approach: {
        title: "Our Integrated Approach",
        description:
          "A systematic five-stage pathway — Discover, Assess, Design, Implement, Evaluate — coordinated through MIPV's in-house multidisciplinary operating model.",
      },
      industries: {
        title: "Industries & Sectors",
        description:
          "Adaptable multidisciplinary expertise for government, GLCs, corporate enterprises, manufacturing, construction, education, professional services and SMEs.",
      },
      contact: {
        title: "Contact MIPV",
        description:
          "Contact MIPV in Nilai, Negeri Sembilan, Malaysia. Email enquiry@mipv.com.my call +60 17-444 9446 / +60 18-955 3551, or WhatsApp +60 17-444 9446.",
      },
      privacy: {
        title: "Privacy Policy",
        description: "How MIPV collects, uses and protects personal data under the Personal Data Protection Act 2010.",
      },
      terms: {
        title: "Website Terms",
        description: "Terms governing the use of the MIPV website.",
      },
      notFound: {
        title: "Page Not Found",
        description: "The page you are looking for could not be found.",
      },
    },
  },

  nav: {
    home: "HOME",
    about: "ABOUT",
    expertise: "EXPERTISE",
    services: "SERVICES",
    approach: "OUR APPROACH",
    industries: "INDUSTRIES",
    contact: "CONTACT",
    cta: "GET IN TOUCH",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNavLabel: "Main navigation",
    skipToContent: "Skip to main content",
    languageLabel: "Select language",
    homeLinkLabel: "MIPV — home",
  },

  common: {
    readMore: "READ MORE",
    learnMore: "LEARN MORE",
    exploreDomain: "EXPLORE THIS DOMAIN",
    viewAllExpertise: "VIEW ALL EXPERTISE",
    viewAllServices: "VIEW ALL SERVICES",
    discoverApproach: "DISCOVER OUR APPROACH",
    enquireService: "ENQUIRE ABOUT THIS SERVICE",
    contactMipv: "CONTACT MIPV",
    breadcrumbLabel: "Breadcrumb",
    home: "Home",
    focusLabel: "OUR FOCUS",
    includesLabel: "MAY INCLUDE",
    stageLabel: "STAGE",
    onThisPage: "On this page",
  },

  principles: [
    {
      letter: "M",
      title: "MANAGEMENT",
      subtitle: "",
      lead: "Strategic leadership and organisational effectiveness.",
      body: "Strengthening strategic direction, governance and operational effectiveness.",
    },
    {
      letter: "I",
      title: "INNOVATION",
      subtitle: "",
      lead: "New ideas, methodologies and transformative solutions.",
      body: "Advancing ideas and methodologies that enable organisational transformation.",
    },
    {
      letter: "P",
      title: "PERFORMANCE",
      subtitle: "",
      lead: "Organisational capability and measurable improvement.",
      body: "Enhancing systems, human capabilities and measurable organisational outcomes.",
    },
    {
      letter: "V",
      title: "VALUE",
      subtitle: "",
      lead: "Sustainable and meaningful outcomes.",
      body: "Creating meaningful, ethical and sustainable organisational benefits.",
    },
  ],

  home: {
    hero: {
      eyebrow: "AN INTEGRATED MULTIDISCIPLINARY PROFESSIONAL CONSULTANCY",
      headline: ["MANAGEMENT.", "INNOVATION.", "PERFORMANCE.", "VALUE."],
      tagline: "Integrated Expertise. Evidence-Based Solutions. Sustainable Value.",
      paragraph:
        "MIPV is a multidisciplinary professional consultancy delivering integrated advisory, assessment, research, training and organisational improvement solutions to address complex institutional and business challenges.",
      primaryCta: "EXPLORE OUR EXPERTISE",
      secondaryCta: "GET IN TOUCH",
      operatingNote: "Nilai, Negeri Sembilan · Remote-based operations",
    },
    whoWeAre: {
      eyebrow: "WHO WE ARE",
      heading: "ONE ORGANISATION. DIVERSE EXPERTISE. UNIFIED PURPOSE.",
      paragraphs: [
        "MIPV integrates diverse professional disciplines through a coordinated, in-house operating model. Rather than treating governance, people, safety or performance as separate concerns, we examine how they influence one another and design solutions that reflect those connections.",
        "Organisational outcomes depend on the relationship between people, processes, systems, governance, safety, risk, quality and performance. Addressing one area in isolation rarely produces lasting improvement.",
      ],
      connectionsLabel: "THE CONNECTIONS WE ADDRESS",
      connections: ["People", "Processes", "Systems", "Governance", "Safety", "Risk", "Quality", "Performance"],
      pillars: [
        { title: "OUR FOCUS", text: "Governance, risk, integrity, quality, safety, people, management and performance." },
        { title: "OUR APPROACH", text: "Combining professional knowledge, analytical methods and practical implementation." },
        {
          title: "OUR PURPOSE",
          text: "Helping organisations make informed decisions, strengthen capabilities and create long-term value.",
        },
      ],
    },
    principles: {
      eyebrow: "THE MEANING BEHIND MIPV",
      heading: "FOUR PRINCIPLES. ONE PURPOSE.",
      intro: "The four letters of MIPV express the principles that shape every engagement and form the foundation of our corporate identity.",
    },
    expertise: {
      eyebrow: "OUR EXPERTISE",
      heading: "FIVE INTEGRATED CAPABILITY DOMAINS",
      intro: "Complementary professional disciplines, coordinated within one consultancy framework.",
    },
    services: {
      eyebrow: "OUR SERVICES",
      heading: "MULTIPLE DISCIPLINES. SIX MODES OF DELIVERY.",
      intro: "Our expertise is delivered through six complementary service models, applied individually or in combination according to each organisation's needs.",
    },
    approach: {
      eyebrow: "OUR APPROACH",
      heading: "A SYSTEMATIC PATHWAY TO SUSTAINABLE RESULTS",
      intro: "A structured five-stage delivery framework brings consistency and transparency to every engagement.",
    },
    why: {
      eyebrow: "WHY MIPV",
      heading: "A MULTIDISCIPLINARY PERSPECTIVE ON ORGANISATIONAL EXCELLENCE",
      statements: [
        "Governance influences performance.",
        "Leadership shapes culture.",
        "Safety affects productivity.",
        "Integrity strengthens trust.",
        "Quality drives consistency.",
      ],
      closing: "We address the connections between people, systems, processes, governance and performance.",
      points: [
        {
          title: "Integrated multidisciplinary perspectives",
          text: "Relevant disciplines are brought together to examine issues from more than one angle.",
        },
        {
          title: "Evidence-based assessments and advisory",
          text: "Recommendations are grounded in structured data collection and careful analysis.",
        },
        {
          title: "Customised, practical interventions",
          text: "Engagements are designed around each organisation's context, priorities and objectives.",
        },
        {
          title: "Structured professional methodologies",
          text: "Consistent methods support clarity, comparability and accountability.",
        },
        {
          title: "Coordinated in-house operating model",
          text: "Each engagement is coordinated internally with clear professional ownership.",
        },
        {
          title: "Focus on sustainable organisational value",
          text: "Solutions are designed to support improvement that endures beyond the engagement.",
        },
      ],
    },
    cta: {
      heading: "LET'S BUILD STRONGER ORGANISATIONS.",
      text: "Discover how integrated professional expertise can support your organisation's challenges, priorities and opportunities.",
      button: "CONTACT MIPV",
    },
  },

  about: {
    heading: "ABOUT MIPV",
    subheading: "ONE ORGANISATION. DIVERSE EXPERTISE. UNIFIED PURPOSE.",
    overviewEyebrow: "CORPORATE OVERVIEW",
    overview: [
      "MIPV is an integrated multidisciplinary professional consultancy established to provide comprehensive advisory, assessment, research, training and organisational improvement solutions across diverse industries and sectors.",
      "Guided by the principles of Management, Innovation, Performance and Value, MIPV brings together multiple professional disciplines within a coordinated consultancy framework to address complex organisational, operational and institutional challenges.",
      "Our approach integrates strategic analysis, professional knowledge, evidence-based assessment and practical implementation to support informed decision-making, organisational effectiveness and sustainable development.",
    ],
    factsHeading: "CORPORATE INFORMATION",
    facts: [
      { label: "Registered Name", value: "MIPV Consultancy" },
      { label: "Business Registration No.", value: "003830433-K" },
      { label: "Business Positioning", value: "Multidisciplinary Professional Consultancy" },
      { label: "Operating Model", value: "In-House Multidisciplinary Expertise" },
      { label: "Business Location", value: "Nilai, Negeri Sembilan, Malaysia" },
      { label: "Operations", value: "Remote-Based Operations" },
    ],
    philosophy: {
      eyebrow: "CORPORATE PHILOSOPHY",
      heading: "THE MEANING BEHIND MIPV",
      intro:
        "MIPV is more than a name. Each letter represents a principle that guides how we think, how we work and how we measure the value of our contribution.",
    },
    visionMission: {
      heading: "VISION & MISSION",
      visionLabel: "OUR VISION",
      vision:
        "To be a trusted multidisciplinary professional consultancy recognised for advancing organisational excellence, strengthening institutional capabilities and creating sustainable value through integrated expertise and innovative solutions.",
      missionLabel: "OUR MISSION",
      mission:
        "To provide comprehensive, evidence-based and practical professional solutions that empower organisations to enhance governance, manage risks, strengthen human capabilities, improve operational performance and achieve strategic objectives.",
    },
    operatingModel: {
      eyebrow: "OPERATING MODEL",
      heading: "INTERNAL MULTIDISCIPLINARY EXPERTISE",
      paragraphs: [
        "MIPV operates through an in-house multidisciplinary model. Specialist competencies are coordinated within a single consultancy framework, with consistent methodologies and clear ownership of every engagement.",
        "Operations are remote-based from Nilai, Negeri Sembilan. On-site engagements may be arranged according to assignment requirements.",
      ],
      link: "SEE HOW WE WORK",
    },
    commitment: {
      eyebrow: "PROFESSIONAL COMMITMENT",
      heading: "RESPONSIBLE, EVIDENCE-BASED PRACTICE",
      items: [
        {
          title: "Integrity and objectivity",
          text: "Engagements are conducted with honesty, objectivity and respect for the organisations and people involved.",
        },
        {
          title: "Appropriate professional scope",
          text: "Regulated and specialised services, including psychometric, psychological and audit work, are delivered only within appropriate qualifications, authorisations and scope.",
        },
        {
          title: "Confidentiality",
          text: "Client information is handled responsibly and used only for the purposes of the engagement.",
        },
        {
          title: "Evidence and transparency",
          text: "Findings and recommendations are based on sound evidence and communicated clearly.",
        },
      ],
    },
  },

  domains: [
    {
      id: "governance" as DomainId,
      number: "01",
      title: "GOVERNANCE, RISK, INTEGRITY & COMPLIANCE",
      short: "Responsible governance, risk awareness, ethical practices and controls.",
      tagline: "Strengthening Governance. Managing Risk. Building Trust.",
      intro:
        "Supporting ethical, accountable and resilient organisations through structured advisory, assessments and capacity building.",
      context:
        "We help organisations clarify accountabilities, understand their exposure to risk and strengthen the policies, controls and integrity measures that underpin institutional trust.",
      items: [
        "Corporate Governance",
        "Enterprise Risk Management",
        "Integrity and Anti-Corruption",
        "Anti-Bribery Management Systems",
        "Organisational Compliance",
        "Ethics and Integrity Assessment",
        "Internal Controls",
        "Policy and Procedure Development",
        "Governance and Risk Maturity Assessment",
      ],
      focus: "Responsible decisions and institutional trust",
      scopeNote: "",
    },
    {
      id: "quality-safety" as DomainId,
      number: "02",
      title: "QUALITY, SAFETY, HEALTH & ORGANISATIONAL EXCELLENCE",
      short: "Management systems, workplace safety and continual improvement.",
      tagline: "Better Systems. Safer Workplaces. Stronger Performance.",
      intro:
        "Strengthening management systems, workplace practices and operational improvement through professional guidance and evaluation.",
      context:
        "Our work in this domain supports organisations in establishing reliable management systems, identifying workplace risks and building a culture of continual improvement.",
      items: [
        "Quality Management Systems",
        "Occupational Safety and Health",
        "Environmental, Health and Safety Advisory",
        "Workplace Risk Assessment",
        "Internal Management System Audits",
        "Safety Culture Assessment",
        "Process Improvement",
        "Operational Excellence",
        "Management System Readiness",
        "Continual Improvement",
      ],
      focus: "Safer operations and reliable performance",
      scopeNote: "",
    },
    {
      id: "human-capital" as DomainId,
      number: "03",
      title: "PSYCHOLOGY, PSYCHOMETRICS & HUMAN CAPITAL",
      short: "People assessment, capability development and organisational culture.",
      tagline: "Understanding People. Enhancing Potential.",
      intro:
        "Applying behavioural and human-capital perspectives to inform organisational decisions and professional development.",
      context:
        "Assessments and studies in this domain help organisations understand capabilities, behaviours and workplace climate, and plan the development of their people with greater confidence.",
      items: [
        "Psychometric Assessment",
        "Behavioural Profiling",
        "Psychological Assessment, where professionally authorised",
        "Leadership Assessment",
        "Competency Evaluation",
        "Organisational Climate Studies",
        "Employee Engagement Assessment",
        "Training Needs Analysis",
        "Talent Development",
        "Human Capital Development",
      ],
      focus: "Evidence-based people decisions",
      scopeNote:
        "Psychological assessment and other regulated activities are undertaken only where professionally authorised and within the appropriate scope of practice.",
    },
    {
      id: "strategy-performance" as DomainId,
      number: "04",
      title: "STRATEGIC MANAGEMENT & ORGANISATIONAL PERFORMANCE",
      short: "Organisational strategy, business improvement and effectiveness.",
      tagline: "Turning Strategy into Organisational Results.",
      intro:
        "Supporting sound strategic planning, organisational effectiveness and the practical execution of improvement priorities.",
      context:
        "We support leadership teams in setting clear direction, aligning structures and processes, and managing change in a way that translates intent into measurable progress.",
      items: [
        "Corporate Strategy",
        "Strategic Planning",
        "Organisational Development",
        "Business Advisory",
        "Performance Management",
        "Process Optimisation",
        "Change Management",
        "Management Development",
        "Organisational Effectiveness",
        "Business Transformation",
      ],
      focus: "Aligned direction and measurable improvement",
      scopeNote: "",
    },
    {
      id: "research-innovation" as DomainId,
      number: "05",
      title: "RESEARCH, EVALUATION, INNOVATION & SPECIALISED SOLUTIONS",
      short: "Evidence generation, assessment and customised solutions.",
      tagline: "Evidence. Insight. Improvement.",
      intro:
        "Producing reliable insights and structured evaluation to support organisational learning and informed decision-making.",
      context:
        "Rigorous research and evaluation methods provide the evidence base for policy, programme and organisational decisions, while specialised solutions address needs that span several disciplines.",
      items: [
        "Applied Research",
        "Quantitative and Qualitative Studies",
        "Programme Evaluation",
        "Policy Evaluation",
        "Impact Assessment",
        "Organisational Diagnostics",
        "Stakeholder Surveys",
        "Baseline Studies",
        "Innovation Advisory",
        "Tailored Multidisciplinary Solutions",
      ],
      focus: "Actionable insights for better decisions",
      scopeNote: "",
    },
  ],

  expertisePage: {
    heading: "OUR EXPERTISE",
    subheading: "INTEGRATED COMPETENCIES. COMPREHENSIVE PERSPECTIVES.",
    intro:
      "MIPV organises its professional expertise into five primary domains. Each domain stands on its own, yet the greatest value often comes from combining them — because governance, people, safety, quality and performance are rarely separate in practice.",
    integrated: {
      eyebrow: "INTEGRATED PROFESSIONAL SOLUTIONS",
      heading: "BEYOND INDIVIDUAL DISCIPLINES.",
      intro:
        "Complex organisational challenges rarely sit within a single professional field. MIPV brings relevant internal capabilities together through a coordinated consultancy approach.",
      items: [
        { title: "CROSS-FUNCTIONAL ASSESSMENTS", text: "Multiple dimensions examined through one coherent framework." },
        { title: "CUSTOMISED PROGRAMMES", text: "Engagements designed around an organisation's objectives." },
        { title: "INTEGRATED SYSTEMS", text: "Connected governance, people, quality, risk and performance solutions." },
        { title: "SPECIALISED PROJECTS", text: "Project-specific professional services within verified competencies." },
      ],
    },
  },

  services: [
    {
      id: "consultancy-advisory" as ServiceId,
      number: "01",
      title: "CONSULTANCY & ADVISORY",
      description:
        "Strategic, technical and professional advisory supporting organisational decision-making and improvement.",
      includes: [
        "Strategic and management advisory",
        "Governance, risk and compliance guidance",
        "Technical advisory on management systems",
        "Policy and framework development support",
      ],
    },
    {
      id: "assessment-diagnostics" as ServiceId,
      number: "02",
      title: "ASSESSMENT & DIAGNOSTICS",
      description:
        "Structured evaluations, psychometric assessments, maturity reviews, capability assessments and organisational diagnostics.",
      includes: [
        "Psychometric and competency assessments",
        "Governance, risk and integrity maturity reviews",
        "Organisational climate and culture diagnostics",
        "Safety culture and capability assessments",
      ],
    },
    {
      id: "research-evaluation" as ServiceId,
      number: "03",
      title: "RESEARCH & EVALUATION",
      description: "Applied research, surveys, analytical studies, programme evaluations and impact assessments.",
      includes: [
        "Applied research and diagnostic studies",
        "Stakeholder and employee surveys",
        "Programme and policy evaluation",
        "Baseline, impact and effectiveness studies",
      ],
    },
    {
      id: "training-capacity" as ServiceId,
      number: "04",
      title: "TRAINING & CAPACITY DEVELOPMENT",
      description:
        "Professional development programmes, workshops, awareness initiatives and competency enhancement activities.",
      includes: [
        "Professional development programmes",
        "Workshops and awareness sessions",
        "Leadership and competency development",
        "Training needs analysis",
      ],
    },
    {
      id: "audit-review" as ServiceId,
      number: "05",
      title: "AUDIT & PROFESSIONAL REVIEW",
      description:
        "Internal audits, compliance reviews, management system evaluations and professional assessments within applicable qualifications and authorisations.",
      includes: [
        "Management system internal audits",
        "Compliance and internal control reviews",
        "Policy and procedure reviews",
        "Readiness and gap assessments",
      ],
    },
    {
      id: "implementation-improvement" as ServiceId,
      number: "06",
      title: "IMPLEMENTATION & IMPROVEMENT SUPPORT",
      description:
        "Development, implementation, monitoring and continuous improvement of organisational systems, strategies and programmes.",
      includes: [
        "Framework and system development",
        "Implementation planning and coordination",
        "Monitoring and progress review",
        "Continual improvement support",
      ],
    },
  ],

  servicesPage: {
    heading: "OUR PROFESSIONAL SERVICES",
    subheading: "MULTIPLE DISCIPLINES. INTEGRATED DELIVERY.",
    intro:
      "MIPV delivers its multidisciplinary expertise through six complementary modes of delivery. An engagement may draw on a single mode or combine several, depending on the organisation's objectives and the scope of work.",
    scope: {
      heading: "PROFESSIONAL SCOPE",
      text: "Psychometric, psychological, audit and other regulated or specialised services are delivered responsibly and only within appropriate professional qualifications, authorisations and scope. Any such requirement is clarified at the outset of an engagement.",
    },
  },

  approach: [
    {
      number: "01",
      title: "DISCOVER",
      short: "Understand needs, challenges and objectives.",
      description: "Understand organisational context, objectives, challenges and stakeholders.",
      activities: ["Initial consultation and scoping", "Stakeholder and context mapping", "Agreement on objectives and deliverables"],
    },
    {
      number: "02",
      title: "ASSESS",
      short: "Review current conditions and analyse evidence.",
      description: "Conduct professional reviews, organisational diagnostics and evidence-based evaluation.",
      activities: ["Document and data review", "Surveys, interviews and assessments", "Analysis of findings and evidence"],
    },
    {
      number: "03",
      title: "DESIGN",
      short: "Develop tailored strategies and interventions.",
      description: "Develop appropriate strategies, frameworks and solutions.",
      activities: ["Solution and framework development", "Prioritised recommendations", "Implementation and evaluation planning"],
    },
    {
      number: "04",
      title: "IMPLEMENT",
      short: "Support coordinated execution and development.",
      description: "Support implementation, professional development and coordinated interventions.",
      activities: ["Coordinated interventions", "Training and capacity development", "Ongoing advisory support"],
    },
    {
      number: "05",
      title: "EVALUATE",
      short: "Review outcomes and improvement opportunities.",
      description: "Review effectiveness, assess outcomes and identify opportunities for continuous improvement.",
      activities: ["Outcome and effectiveness review", "Reporting of results", "Recommendations for continual improvement"],
    },
  ],

  approachPage: {
    heading: "OUR INTEGRATED APPROACH",
    subheading: "A SYSTEMATIC PATHWAY TO SUSTAINABLE RESULTS.",
    intro:
      "Every engagement follows a structured delivery framework. The five stages provide consistency and transparency, while allowing the depth and sequence of work to be tailored to each organisation's needs.",
    frameworkEyebrow: "INTEGRATED DELIVERY FRAMEWORK",
    frameworkHeading: "FIVE STAGES. ONE COHERENT ENGAGEMENT.",
    cycleNote: "Evaluation informs the next cycle of improvement, so the framework supports continual progress rather than a single intervention.",
    model: {
      eyebrow: "OPERATING MODEL",
      heading: "INTERNAL EXPERTISE. INTEGRATED DELIVERY. PROFESSIONAL ACCOUNTABILITY.",
      paragraphs: [
        "MIPV's in-house multidisciplinary model is structured to coordinate specialist competencies, maintain consistent methodologies and provide clear engagement ownership.",
        "Each engagement is scoped against the organisation's objectives, and the relevant disciplines are identified at the outset. Inputs from different areas of expertise are then coordinated within a single engagement framework, so that findings and recommendations are coherent rather than fragmented.",
      ],
      attributes: [
        { title: "PROFESSIONAL OWNERSHIP", text: "Defined engagement responsibility." },
        { title: "INTEGRATED COLLABORATION", text: "Coordinated cross-disciplinary input." },
        { title: "TECHNICAL COMPETENCE", text: "Appropriate expertise for each scope." },
        { title: "QUALITY ASSURANCE", text: "Structured professional review." },
        { title: "CLIENT CONFIDENTIALITY", text: "Responsible handling of information." },
        { title: "CONTINUAL IMPROVEMENT", text: "Refinement of processes and methods." },
      ],
      note: "Operations are remote-based from Nilai, Negeri Sembilan. On-site engagements may be arranged according to assignment requirements.",
    },
  },

  industries: [
    {
      icon: "landmark" as IndustryIcon,
      name: "Government & Public Sector",
      text: "Governance, integrity, programme and policy evaluation, and capability development for public institutions.",
    },
    {
      icon: "building" as IndustryIcon,
      name: "Government-Linked Companies",
      text: "Governance, risk, compliance and performance frameworks for organisations with public accountability.",
    },
    {
      icon: "briefcase" as IndustryIcon,
      name: "Corporate & Private Enterprises",
      text: "Strategy, organisational development, people assessment and management system support.",
    },
    {
      icon: "factory" as IndustryIcon,
      name: "Manufacturing & Industrial",
      text: "Quality management, occupational safety and health, process improvement and operational excellence.",
    },
    {
      icon: "hardhat" as IndustryIcon,
      name: "Construction & Infrastructure",
      text: "Workplace risk assessment, safety culture, compliance and management system readiness.",
    },
    {
      icon: "graduation" as IndustryIcon,
      name: "Education & Institutions",
      text: "Applied research, evaluation, organisational climate studies and capacity development.",
    },
    {
      icon: "users" as IndustryIcon,
      name: "Human Capital & Professional Services",
      text: "Psychometric assessment, competency evaluation, training needs analysis and talent development.",
    },
    {
      icon: "store" as IndustryIcon,
      name: "Small and Medium Enterprises",
      text: "Practical, right-sized support for governance, management systems, planning and growth.",
    },
  ],

  industriesPage: {
    heading: "INDUSTRIES & SECTORS",
    subheading: "ADAPTABLE EXPERTISE ACROSS DIVERSE ORGANISATIONS.",
    intro:
      "MIPV's multidisciplinary capabilities are intended to support organisations with varying institutional, operational, governance and performance requirements. The sectors below illustrate where our expertise may be applied.",
    listHeading: "POTENTIAL AREAS OF SUPPORT",
    note: "Services are tailored to each organisation's context, requirements and applicable professional considerations.",
  },

  contact: {
    heading: "CONTACT MIPV",
    subheading: "LET'S DISCUSS YOUR ORGANISATION'S NEEDS.",
    intro:
      "Tell us about your organisation's challenges, priorities or the support you are considering, and we will respond to discuss how MIPV may be able to help.",
    detailsHeading: "CORPORATE CONTACT",
    labels: {
      registration: "Business Registration No.",
      location: "Location",
      operations: "Operations",
      email: "Email",
      phone: "Telephone",
      whatsapp: "WhatsApp",
      website: "Website",
      registeredName: "Registered Name",
    },
    locationValue: "Nilai, Negeri Sembilan, Malaysia",
    operationsValue: "Remote-Based Operations",
    whatsappAction: "Message us on WhatsApp",
    onsiteNote: "On-site engagements may be arranged according to assignment requirements.",
    form: {
      heading: "ENQUIRY FORM",
      requiredNote: "Fields marked * are required.",
      fullName: "Full Name",
      organisation: "Organisation",
      email: "Email",
      phone: "Contact Number",
      optional: "(optional)",
      service: "Service of Interest",
      servicePlaceholder: "Select a service",
      generalEnquiry: "General enquiry",
      subject: "Subject",
      message: "Message",
      messageHint: "Briefly describe your organisation, your needs and any relevant timeframe.",
      consent:
        "I consent to MIPV collecting and using the personal data I have provided to respond to my enquiry, in accordance with the",
      consentLink: "Privacy Policy",
      submit: "SUBMIT ENQUIRY",
      submitting: "SUBMITTING…",
      successHeading: "THANK YOU. YOUR ENQUIRY HAS BEEN SENT.",
      successText: "We have received your message and will reply to the email address you provided.",
      sendAnother: "Send another enquiry",
      errorSummary: "Please correct the highlighted fields.",
      errors: {
        fullName: "Please enter your full name.",
        organisation: "Please enter your organisation's name.",
        email: "Please enter a valid email address.",
        phone: "Please enter a valid contact number.",
        service: "Please select a service of interest.",
        subject: "Please enter a subject.",
        message: "Please enter a message of at least 20 characters.",
        consent: "Please confirm your consent so that we can respond.",
        tooLong: "This entry is too long.",
        captcha: "Please complete the security check.",
      },
      server: {
        notConfigured:
          "Our online enquiry form is not yet available. Your message has not been sent. Please contact us directly by email, telephone or WhatsApp.",
        rateLimited: "Too many submissions have been received from your connection. Please wait a few minutes and try again.",
        rejected: "Your enquiry could not be verified. Please try again, or contact us directly.",
        failed: "Your enquiry could not be sent due to a technical problem. Please try again shortly, or contact us directly.",
        network: "We could not reach the server. Please check your connection and try again.",
      },
    },
  },

  footer: {
    tagline: "Integrated Expertise. Evidence-Based Solutions. Sustainable Value.",
    description: "An integrated multidisciplinary professional consultancy.",
    quickLinks: "QUICK LINKS",
    servicesHeading: "SERVICES",
    contactHeading: "CONTACT",
    privacy: "Privacy Policy",
    terms: "Website Terms",
    contact: "Contact",
    copyright: "© 2026 MIPV. ALL RIGHTS RESERVED.",
    registration: "MIPV Consultancy · Business Registration No. 003830433-K",
    location: "Nilai, Negeri Sembilan, Malaysia · Remote-Based Operations",
  },

  legal: {
    lastUpdatedLabel: "Last updated",
    lastUpdated: "October 2026",
    privacy: {
      heading: "PRIVACY POLICY",
      subheading: "HOW WE HANDLE PERSONAL DATA.",
      sections: [
        {
          title: "1. Introduction",
          body: [
            "This Privacy Policy explains how MIPV Consultancy (Business Registration No. 003830433-K) (\"MIPV\", \"we\", \"us\") collects, uses, discloses and protects personal data provided through this website, in accordance with the Personal Data Protection Act 2010 of Malaysia (PDPA).",
          ],
        },
        {
          title: "2. Personal data we collect",
          body: [
            "When you submit the enquiry form, we collect the information you provide: your full name, organisation, email address, contact number (if provided), service of interest, subject and message.",
            "When you visit the website, our hosting provider may process limited technical information such as your IP address, browser type and the time of access, for security and operational purposes.",
          ],
        },
        {
          title: "3. How we use personal data",
          body: [
            "We use personal data to respond to your enquiry, to communicate with you about the services you have asked about, to keep a record of our correspondence, and to protect the security of the website and prevent misuse of the enquiry form.",
            "We do not use your personal data for unsolicited marketing, and we do not sell personal data.",
          ],
        },
        {
          title: "4. Disclosure",
          body: [
            "Personal data may be processed by service providers that host this website or deliver email on our behalf, solely for those purposes. We may also disclose personal data where required by law or by a competent authority.",
          ],
        },
        {
          title: "5. Retention",
          body: [
            "We retain personal data only for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law.",
          ],
        },
        {
          title: "6. Security",
          body: [
            "We apply reasonable technical and organisational measures to protect personal data, including encrypted (HTTPS) transmission. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
          ],
        },
        {
          title: "7. Cookies and spam protection",
          body: [
            "This website does not use advertising or analytics cookies. Where a spam-protection service is enabled on the enquiry form, it may process limited technical information to distinguish genuine visitors from automated submissions.",
          ],
        },
        {
          title: "8. Your rights",
          body: [
            "Subject to the PDPA, you may request access to, or correction of, your personal data, and you may withdraw your consent to its processing. To do so, please contact us at enquiry@mipv.com.my.",
          ],
        },
        {
          title: "9. Changes to this policy",
          body: [
            "We may update this Privacy Policy from time to time. The current version will always be published on this page with its date of last update.",
          ],
        },
        {
          title: "10. Contact",
          body: [
            "For any questions about this Privacy Policy, please contact MIPV at enquiry@mipv.com.my, +60 17-444 9446 or +60 18-955 3551.",
          ],
        },
      ],
    },
    terms: {
      heading: "WEBSITE TERMS",
      subheading: "TERMS OF USE FOR THIS WEBSITE.",
      sections: [
        {
          title: "1. Acceptance",
          body: [
            "This website is operated by MIPV Consultancy (Business Registration No. 003830433-K) (\"MIPV\"). By accessing or using the website, you agree to these Website Terms.",
          ],
        },
        {
          title: "2. General information only",
          body: [
            "The content of this website is provided for general information about MIPV and its services. It does not constitute professional advice, and it should not be relied upon as a substitute for advice specific to your circumstances.",
            "Submitting an enquiry does not create a client or professional relationship. Any engagement is subject to a separate written agreement that defines its scope, terms and deliverables.",
          ],
        },
        {
          title: "3. Professional scope",
          body: [
            "Descriptions of services on this website indicate areas of capability. Regulated or specialised services, including psychometric, psychological and audit services, are provided only within appropriate professional qualifications, authorisations and scope.",
          ],
        },
        {
          title: "4. Intellectual property",
          body: [
            "The MIPV name, logo, website content and design are the property of MIPV unless otherwise stated. They may not be reproduced, modified or used for commercial purposes without prior written permission.",
          ],
        },
        {
          title: "5. Acceptable use",
          body: [
            "You agree not to misuse the website, including by submitting false or misleading information, attempting to gain unauthorised access, or interfering with its operation or security.",
          ],
        },
        {
          title: "6. External links",
          body: [
            "Links to external websites are provided for convenience. MIPV is not responsible for the content, availability or privacy practices of external websites.",
          ],
        },
        {
          title: "7. Limitation of liability",
          body: [
            "While we take care to keep the information on this website accurate and current, it is provided on an \"as is\" basis. To the extent permitted by law, MIPV is not liable for any loss arising from the use of, or reliance on, this website.",
          ],
        },
        {
          title: "8. Governing law",
          body: ["These Website Terms are governed by the laws of Malaysia."],
        },
        {
          title: "9. Changes",
          body: [
            "We may revise these Website Terms at any time by updating this page. Continued use of the website after any change constitutes acceptance of the revised terms.",
          ],
        },
      ],
    },
  },

  notFound: {
    heading: "PAGE NOT FOUND",
    text: "The page you are looking for may have been moved or no longer exists.",
    button: "RETURN TO HOMEPAGE",
  },
};

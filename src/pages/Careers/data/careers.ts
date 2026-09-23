export interface JobPost {
  id: number;
  title: string;
  category: string;
  location: string;
  type: string;
  experience: string;
  department: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

export const jobPosts: JobPost[] = [
  {
    id: 1,
    title: "CRM Manager",
    category: "CRM",
    location: "Noida, Uttar Pradesh",
    type: "Full Time",
    experience: "3–5 Years",
    department: "Sales & CRM",
    description:
      "We are looking for a CRM Manager to build meaningful customer journeys, improve lead management and help our sales team create a better experience for every customer.",
    responsibilities: [
      "Manage and optimise CRM processes across the customer lifecycle.",
      "Maintain lead pipelines, customer data and reporting dashboards.",
      "Coordinate with sales and marketing teams on lead nurturing.",
      "Track CRM performance and identify opportunities for improvement.",
      "Create regular reports on leads, conversions and customer engagement.",
    ],
    qualifications: [
      "3–5 years of experience in CRM, sales operations or a related role.",
      "Experience with CRM platforms and lead management systems.",
      "Strong communication and analytical skills.",
      "Good understanding of real estate sales processes is preferred.",
    ],
  },

  {
    id: 2,
    title: "Civil Site Engineer",
    category: "CIVIL",
    location: "Rishikesh, Uttarakhand",
    type: "Full Time",
    experience: "2–4 Years",
    department: "Projects",
    description:
      "Join our projects team to manage on-site execution, quality and coordination across our residential developments.",
    responsibilities: [
      "Supervise day-to-day construction activities at project sites.",
      "Coordinate with contractors, consultants and vendors.",
      "Monitor project quality, progress and safety standards.",
      "Review drawings, measurements and material requirements.",
      "Prepare daily and weekly site progress reports.",
    ],
    qualifications: [
      "Diploma or Bachelor's degree in Civil Engineering.",
      "2–4 years of relevant site experience.",
      "Strong understanding of construction processes.",
      "Ability to read technical drawings and specifications.",
    ],
  },

  {
    id: 3,
    title: "Sales Manager",
    category: "SALES",
    location: "Noida, Uttar Pradesh",
    type: "Full Time",
    experience: "3–6 Years",
    department: "Sales",
    description:
      "We are looking for an energetic Sales Manager to drive property sales and build long-term relationships with customers.",
    responsibilities: [
      "Manage and convert property sales enquiries.",
      "Build relationships with prospective buyers.",
      "Conduct property presentations and site visits.",
      "Coordinate with marketing and CRM teams.",
      "Maintain sales reports and achieve monthly targets.",
    ],
    qualifications: [
      "3–6 years of experience in real estate sales.",
      "Strong negotiation and communication skills.",
      "Good understanding of residential real estate.",
      "Customer-focused approach with strong follow-up skills.",
    ],
  },

  {
    id: 4,
    title: "Digital Marketing Executive",
    category: "MARKETING",
    location: "Noida, Uttar Pradesh",
    type: "Full Time",
    experience: "1–3 Years",
    department: "Marketing",
    description:
      "Help us build a strong digital presence through creative campaigns, content and performance marketing.",
    responsibilities: [
      "Plan and execute digital marketing campaigns.",
      "Coordinate social media and content initiatives.",
      "Monitor campaign performance and analytics.",
      "Work with creative teams on digital assets.",
      "Research trends and identify new marketing opportunities.",
    ],
    qualifications: [
      "1–3 years of experience in digital marketing.",
      "Understanding of Meta Ads and Google Ads.",
      "Good analytical and communication skills.",
      "Strong interest in content and digital trends.",
    ],
  },

  {
    id: 5,
    title: "Senior Architect",
    category: "ARCHITECTURE",
    location: "Rishikesh, Uttarakhand",
    type: "Full Time",
    experience: "5–8 Years",
    department: "Design",
    description:
      "Work with our design team to develop thoughtful residential spaces that balance architecture, landscape and lifestyle.",
    responsibilities: [
      "Lead architectural design development from concept to execution.",
      "Coordinate with consultants and project teams.",
      "Review drawings, materials and design specifications.",
      "Ensure design intent is maintained during execution.",
      "Contribute to design research and architectural direction.",
    ],
    qualifications: [
      "Bachelor's or Master's degree in Architecture.",
      "5–8 years of relevant architectural experience.",
      "Strong knowledge of architectural detailing.",
      "Proficiency in AutoCAD, SketchUp or similar tools.",
    ],
  },

  {
    id: 6,
    title: "HR & Administration Executive",
    category: "ADMINISTRATIVE",
    location: "Noida, Uttar Pradesh",
    type: "Full Time",
    experience: "1–3 Years",
    department: "Human Resources",
    description:
      "Support our growing team through efficient HR operations, administration and employee engagement initiatives.",
    responsibilities: [
      "Manage day-to-day HR and administrative activities.",
      "Support recruitment and onboarding processes.",
      "Maintain employee records and documentation.",
      "Coordinate office administration and vendors.",
      "Assist with employee engagement initiatives.",
    ],
    qualifications: [
      "Bachelor's degree in HR, Business Administration or related field.",
      "1–3 years of HR or administration experience.",
      "Strong organisational and communication skills.",
      "Good working knowledge of MS Office or Google Workspace.",
    ],
  },
];
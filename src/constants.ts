export interface Subject {
  name: string;
  referenceLink: string;
  notesLink: string;
  questionPaperLink: string;
}

export interface SemesterData {
  id: string;
  title: string;
  subjects: Subject[];
  syllabusLink: string;
}

export const SEMESTERS: SemesterData[] = [
  {
    id: "s1",
    title: "Semester 1",
    syllabusLink: "https://drive.google.com/drive/folders/S1_SYLLABUS",
    subjects: [
      {
        name: "Linear Algebra & Calculus",
        referenceLink: "https://drive.google.com/drive/folders/S1_LA_REF",
        notesLink: "https://drive.google.com/drive/folders/S1_LA_NOTES",
        questionPaperLink: "https://drive.google.com/drive/folders/S1_LA_QP"
      },
      {
        name: "Engineering Physics A",
        referenceLink: "https://drive.google.com/drive/folders/S1_PHYS_REF",
        notesLink: "https://drive.google.com/drive/folders/S1_PHYS_NOTES",
        questionPaperLink: "https://drive.google.com/drive/folders/S1_PHYS_QP"
      }
    ]
  },
  {
    id: "s2",
    title: "Semester 2",
    syllabusLink: "https://drive.google.com/drive/folders/S2_SYLLABUS",
    subjects: [
      {
        name: "Vector Calculus & Differential Equations",
        referenceLink: "https://drive.google.com/drive/folders/S2_VC_REF",
        notesLink: "https://drive.google.com/drive/folders/S2_VC_NOTES",
        questionPaperLink: "https://drive.google.com/drive/folders/S2_VC_QP"
      },
      {
        name: "Engineering Chemistry",
        referenceLink: "https://drive.google.com/drive/folders/S2_CHEM_REF",
        notesLink: "https://drive.google.com/drive/folders/S2_CHEM_NOTES",
        questionPaperLink: "https://drive.google.com/drive/folders/S2_CHEM_QP"
      }
    ]
  },
  {
    id: "s3",
    title: "Semester 3",
    syllabusLink: "https://drive.google.com/drive/folders/S3_SYLLABUS",
    subjects: [
      {
        name: "Partial Differential Equations & Complex Analysis",
        referenceLink: "https://drive.google.com/drive/folders/S3_MATH_REF",
        notesLink: "https://drive.google.com/drive/folders/S3_MATH_NOTES",
        questionPaperLink: "https://drive.google.com/drive/folders/S3_MATH_QP"
      },
      {
        name: "Circuits & Networks",
        referenceLink: "https://drive.google.com/drive/folders/S3_CIRC_REF",
        notesLink: "https://drive.google.com/drive/folders/S3_CIRC_NOTES",
        questionPaperLink: "https://drive.google.com/drive/folders/S3_CIRC_QP"
      }
    ]
  },
  {
    id: "s4",
    title: "Semester 4",
    syllabusLink: "https://drive.google.com/drive/folders/S4_SYLLABUS",
    subjects: [
      {
        name: "Probability, Random Processes & Numerical Methods",
        referenceLink: "https://drive.google.com/drive/folders/S4_MATH_REF",
        notesLink: "https://drive.google.com/drive/folders/S4_MATH_NOTES",
        questionPaperLink: "https://drive.google.com/drive/folders/S4_MATH_QP"
      },
      {
        name: "Digital Electronics",
        referenceLink: "https://drive.google.com/drive/folders/S4_DIGI_REF",
        notesLink: "https://drive.google.com/drive/folders/S4_DIGI_NOTES",
        questionPaperLink: "https://drive.google.com/drive/folders/S4_DIGI_QP"
      }
    ]
  }
];

export const FAQS = [
  {
    question: "Where can I find the latest updates?",
    answer: "The EL Resource Lair is updated at the beginning of each semester. Major changes are announced in our department groups."
  },
  {
    question: "How do I report missing resources?",
    answer: "Please contact our student representatives or use the feedback section in the footer for any missing or broken links."
  },
  {
    question: "Are these the only study materials?",
    answer: "These are curated resources. We always recommend attending lectures for the most accurate and up-to-date information."
  }
];

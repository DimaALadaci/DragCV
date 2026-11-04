/**
 * @typedef {Object} PersonalInfo
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} location
 * @property {string} summary
 * @property {string} website
 */

/**
 * @typedef {Object} ResumeEntry
 * @property {string} id Stable entry identifier.
 * @property {string} [role]
 * @property {string} [organization]
 * @property {string} [period]
 * @property {string} [description]
 * @property {string} [name]
 * @property {string} [details]
 */

/**
 * @typedef {'experience' | 'education' | 'skills' | 'projects'} SectionType
 */

/**
 * @typedef {Object} ResumeSection
 * @property {string} id Stable string identifier, used later by dnd-kit.
 * @property {SectionType} type
 * @property {string} title
 * @property {ResumeEntry[]} entries
 */

/**
 * @typedef {Object} ResumeDocument
 * @property {PersonalInfo} personalInfo
 * @property {ResumeSection[]} sections
 */

/** @type {ResumeDocument} */
export const initialResumeDocument = {
  personalInfo: {
    name: 'Alex Morgan',
    email: 'alex.morgan@email.com',
    phone: '(555) 012-3456',
    location: 'New York, NY',
    website: 'alexmorgan.dev',
    summary: 'Product-minded software engineer focused on thoughtful web experiences.',
  },
  sections: [
    {
      id: 'experience',
      type: 'experience',
      title: 'Experience',
      entries: [
        {
          id: 'experience-1',
          role: 'Frontend Engineer',
          organization: 'Northstar Studio',
          period: '2023 — Present',
          description: 'Building fast, accessible interfaces for ambitious teams.',
        },
      ],
    },
    {
      id: 'education',
      type: 'education',
      title: 'Education',
      entries: [
        {
          id: 'education-1',
          role: 'B.S. Computer Science',
          organization: 'State University',
          period: '2018 — 2022',
          description: 'Graduated with honors.',
        },
      ],
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'Skills',
      entries: [
        { id: 'skills-1', name: 'React, JavaScript, CSS, Accessibility' },
      ],
    },
    {
      id: 'projects',
      type: 'projects',
      title: 'Projects',
      entries: [
        {
          id: 'projects-1',
          name: 'Resume Builder',
          details: 'A focused editor for composing polished resumes.',
        },
      ],
    },
  ],
}

/**
 * Keeps document updates immutable and centralized in App's reducer.
 * @param {ResumeDocument} state
 * @param {{ type: string, payload: { sectionId: string, updatedEntries: ResumeEntry[] } }} action
 * @returns {ResumeDocument}
 */
export function resumeDocumentReducer(state, action) {
  if (action.type === 'personalInfoUpdated') {
    return { ...state, personalInfo: { ...state.personalInfo, [action.payload.field]: action.payload.value } }
  }
  if (action.type === 'sectionEntriesUpdated') {
    const { sectionId, updatedEntries } = action.payload

    return {
      ...state,
      sections: state.sections.map((section) =>
        section.id === sectionId
          ? { ...section, entries: updatedEntries }
          : section,
      ),
    }
  }

  return state
}

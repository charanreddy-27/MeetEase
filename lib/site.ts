/**
 * Single source of truth for "who built this" + project links.
 * Used by the footer, the About page, and the About-the-Project page so the
 * details stay identical everywhere. Update once, changes propagate.
 */

export const developer = {
  name: 'Chanda Charan Reddy',
  shortName: 'Charan',
  title: 'AI & Automation Engineer',
  location: 'Bangalore, India',
  tagline: 'I build intelligent systems.',
  portfolio: 'https://www.charanreddy.dev',
  github: 'https://github.com/charanreddy-27',
  linkedin: 'https://www.linkedin.com/in/chandacharanreddy/',
  bookACall: 'https://cal.com/charanreddy-27/30min',
  email: 'charanreddychanda@gmail.com',
  orcid: 'https://orcid.org/0009-0003-2414-6717',
} as const;

export const project = {
  name: 'MeetEase',
  // ⚠️ Verify this matches your actual repo (best-guess from the folder name).
  repo: 'https://github.com/charanreddy-27/MeetEase',
  // Optional — drop your LinkedIn post URL here once it's live.
  linkedinPost: '',
} as const;

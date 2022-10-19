interface SocialLink {
  iconLink: string;
  link: string;
  name: 'Twitter' | 'LinkedIn';
}

interface Company {
  iconLink?: string;
  name: string;
}

export interface TeamMember {
  companies?: Array<Company>;
  name: string;
  photoLink?: string;
  role: string;
  socialLinks?: Array<SocialLink>;
}

export const members: Array<TeamMember> = [
  {
    name: 'Garrett Maring',
    role: 'CEO',
    companies: [
      { name: 'Kernel', iconLink: '/img/about/companies/kernel.png' },
      {
        name: 'Apple',
        iconLink: '/img/about/companies/apple.svg',
      },
    ],
    socialLinks: [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/garrettmaring/',
        iconLink: '/img/about/social/linkedin.png',
      },
      {
        name: 'Twitter',
        link: 'https://twitter.com/garrettmaring',
        iconLink: '/img/about/social/twitter.png',
      },
    ],
    photoLink: '/img/about/members/garrett.jpg',
  },
  {
    name: 'Mike Maring',
    role: 'VP of Product',
    companies: [
      { name: 'Google', iconLink: '/img/about/companies/google.svg' },
      {
        name: 'T-Mobile',
        iconLink: '/img/about/companies/tmobile.svg',
      },
      {
        name: 'Amazon',
        iconLink: '/img/about/companies/amazon.svg',
      },
      {
        name: 'Microsoft',
        iconLink: '/img/about/companies/ms.png',
      },
    ],
    socialLinks: [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/mikemaring/',
        iconLink: '/img/about/social/linkedin.png',
      },
      {
        name: 'Twitter',
        link: 'https://twitter.com/MikeTheNFT',
        iconLink: '/img/about/social/twitter.png',
      },
    ],
    photoLink: '/img/about/members/mike.png',
  },
  {
    name: 'Christopher Kelly',
    role: 'Software Engineer',
    companies: [
      { name: 'Yahoo!', iconLink: '/img/about/companies/yahoo.png' },
      { name: 'Amazon', iconLink: '/img/about/companies/amazon.svg' },
    ],
    socialLinks: [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/cck197/',
        iconLink: '/img/about/social/linkedin.png',
      },
    ],
  },
  {
    name: 'Jay H',
    role: 'Software Engineer',
    companies: [
      {
        name: 'Blavity',
        iconLink: '/img/about/companies/blavity.png',
      },
    ],
    socialLinks: [
      {
        name: 'Twitter',
        link: 'https://twitter.com/cryptobuilder_7',
        iconLink: '/img/about/social/twitter.png',
      },
    ],
    photoLink: '/img/about/members/jay.png',
  },
  {
    name: 'Chris Y',
    role: 'Software Engineer',
    photoLink: '/img/about/members/yung.png',
    companies: [
      {
        name: 'Startup',
      },
    ],
  },

  {
    name: 'Georgios Diamantopoulos',
    role: 'Software Engineer',
    companies: [
      { name: 'Zero to MVP', iconLink: '/img/about/companies/ztm.png' },
    ],
    socialLinks: [
      {
        name: 'LinkedIn',
        link: 'https://linkedin.com/in/georgiosd',
        iconLink: '/img/about/social/linkedin.png',
      },
      {
        name: 'Twitter',
        link: 'https://twitter.com/georgiosd',
        iconLink: '/img/about/social/twitter.png',
      },
    ],
    photoLink: '/img/about/members/georgios.jpg',
  },
  {
    name: 'Mark Holcomb',
    role: 'Software Engineer',
    companies: [
      { name: 'Grubhub', iconLink: '/img/about/companies/grubhub.png' },
      { name: 'Salesforce', iconLink: '/img/about/companies/salesforce.svg' },
    ],
    socialLinks: [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/mark-holcomb/',
        iconLink: '/img/about/social/linkedin.png',
      },
    ],
  },
  {
    name: 'TJ Sharp',
    role: 'Software Engineer',
    companies: [
      { name: 'Northrop Grumman', iconLink: '/img/about/companies/ng.png' },
      { name: 'Tektronix', iconLink: '/img/about/companies/tek.svg' },
      { name: 'Kernel', iconLink: '/img/about/companies/kernel.png' },
    ],
  },
];

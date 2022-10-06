interface SocialLink {
  iconLink: string;
  link: string;
  name: 'Twitter' | 'LinkedIn';
}

interface Company {
  iconLink?: string;
  name: string;
}

interface CompanyMemeber {
  companies?: Array<Company>;
  name: string;
  photoLink?: string;
  role: string;
  socialLinks?: Array<SocialLink>;
}

export const members: Array<CompanyMemeber> = [
  {
    name: 'Garrett Maring',
    role: 'CEO',
    companies: [
      { name: 'Kernel', iconLink: '/img/about/k.png' },
      {
        name: 'Apple',
        iconLink: '/img/about/apple.svg',
      },
    ],
    socialLinks: [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/garrettmaring/',
        iconLink: '/img/about/linkedin.png',
      },
      {
        name: 'Twitter',
        link: 'https://twitter.com/garrettmaring',
        iconLink: '/img/about/twitter.png',
      },
    ],
    photoLink: '/img/about/members/garrett.jpg',
  },
  {
    name: 'Jay H',
    role: 'Software Engineer',
    companies: [{ name: 'Blavity' }],
    socialLinks: [
      {
        name: 'Twitter',
        link: 'https://twitter.com/cryptobuilder_7',
        iconLink: '/img/about/twitter.png',
      },
    ],
    photoLink: '/img/about/members/jay.png',
  },
  {
    name: 'Mike Maring',
    role: 'VP of Product',
    companies: [
      { name: 'Google', iconLink: '/img/about/google.svg' },
      {
        name: 'Nordstrom',
        iconLink: '',
      },
      {
        name: 'Amazon',
        iconLink: '/img/about/amazon.svg',
      },
      {
        name: 'Microsoft',
        iconLink: '/img/about/ms.png',
      },
    ],
    socialLinks: [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/mikemaring/',
        iconLink: '/img/about/linkedin.png',
      },
      {
        name: 'Twitter',
        link: 'https://twitter.com/MikeTheNFT',
        iconLink: '/img/about/twitter.png',
      },
    ],
    photoLink: '/img/about/members/mike.png',
  },
  {
    name: 'Chris Y',
    role: 'Software Engineer',
    photoLink: '/img/about/members/yung.png',
  },
  {
    name: 'Christopher Kelly',
    role: 'Software Engineer',
    companies: [
      { name: 'Yahoo!', iconLink: '/img/about/yahoo.png' },
      { name: 'Amazon', iconLink: '/img/about/amazon.svg' },
    ],
    socialLinks: [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/cck197/',
        iconLink: '/img/about/linkedin.png',
      },
    ],
  },
  {
    name: 'Georgios Diamantopoulos',
    role: 'Software Engineer',
    companies: [{ name: 'Zero to MVP' }],
    socialLinks: [
      {
        name: 'LinkedIn',
        link: 'https://linkedin.com/in/georgiosd',
        iconLink: '/img/about/linkedin.png',
      },
      {
        name: 'Twitter',
        link: 'https://twitter.com/georgiosd',
        iconLink: '/img/about/twitter.png',
      },
    ],
    photoLink: '/img/about/members/georgios.jpg',
  },
  {
    name: 'Mark Holcomb',
    role: 'Software Engineer',
    companies: [
      { name: 'Grubhub' },
      { name: 'Salesforce', iconLink: '/img/about/salesforce.png' },
    ],
    socialLinks: [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/mark-holcomb/',
        iconLink: '/img/about/linkedin.png',
      },
    ],
  },
  {
    name: 'TJ Sharp',
    role: 'Software Engineer',
    companies: [
      { name: 'Northrop Grumman' },
      { name: 'Tektronix' },
      { name: 'Kernel', iconLink: '/img/about/k.png' },
    ],
  },
];

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
    role: 'Founder & CEO',
    companies: [
      {
        name: 'Apple',
        iconLink: '/img/about/companies/apple.svg',
      },
      { name: 'Kernel', iconLink: '/img/about/companies/kernel.png' },
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
        name: 'Amazon',
        iconLink: '/img/about/companies/amazon.svg',
      },
      {
        name: 'Microsoft',
        iconLink: '/img/about/companies/ms.png',
      },
      {
        name: 'T-Mobile',
        iconLink: '/img/about/companies/tmobile.svg',
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
    name: 'Mark Holcomb',
    role: 'Engineering',
    photoLink: '/img/about/members/mark.png',
    companies: [
      { name: 'Salesforce', iconLink: '/img/about/companies/salesforce.svg' },
      { name: 'Grubhub', iconLink: '/img/about/companies/grubhub.png' },
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
    name: 'Thomas Sharp',
    role: 'Engineering',
    photoLink: '/img/about/members/tj.png',
    companies: [
      { name: 'Kernel', iconLink: '/img/about/companies/kernel.png' },
      { name: 'Northrop Grumman', iconLink: '/img/about/companies/ng.png' },
      { name: 'Tektronix', iconLink: '/img/about/companies/tek.svg' },
    ],
  },
  {
    name: 'Christopher Yung',
    role: 'Engineering',
    photoLink: '/img/about/members/yung.png',
    companies: [
      {
        name: 'Apple',
        iconLink: '/img/about/companies/apple.svg',
      },
    ],
    socialLinks: [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/cyung92/',
        iconLink: '/img/about/social/linkedin.png',
      },
    ],
  },
];

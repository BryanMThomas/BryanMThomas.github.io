import { nanoid } from 'nanoid';

// HEAD DATA
export const headData = {
  title: 'Bryan Thomas | Software Engineer',
  lang: 'en',
  description: 'Welcome to my portfolio',
};

// HERO DATA
export const heroData = {
  name: 'Bryan Thomas',
};

// ABOUT DATA
export const aboutData = {
  img: 'profile.jpg',
  paragraphOne:
    'I started my career in test automation as a Software Development Engineer in Test. Today I am expanding my knowledge of software development in industy.',
  paragraphTwo:
    'My passions are full stack web development and building out tools/processes that assist with the development lifecycle.',
  paragraphThree:
    'I am currently deveopling my skills in React JS, .NET Core, and the AWS Public Cloud',
  resume: 'https://www.resumemaker.online/es.php',
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'project.jpg',
    title: '',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'project.jpg',
    title: '',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'project.jpg',
    title: '',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
];

// CONTACT DATA
export const contactData = {
  cta: 'Want to get in touch?',
  btn: 'Shoot Me An Email!',
  email: 'thomas.bryan.m@gmail.com',
  subtext: 'Or check me out on Github or LinkedIn',
};

// FOOTER DATA
export const footerData = {
  networks: [
    {
      id: nanoid(),
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/bryan-m-thomas/',
    },
    {
      id: nanoid(),
      name: 'github',
      url: 'https://github.com/BryanMThomas',
    },
  ],
};

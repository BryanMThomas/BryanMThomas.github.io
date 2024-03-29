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
    'I have passion for building out tools/processes that assist with CICD and the development lifecycle.',
  paragraphTwo: 'I am currently deveopling my skills as a Software Engineer at Microsoft',
  paragraphThree:
    "Currently I am learning Distributed Systems and DevOps best practices. My learnings include pursuing Azure Fundamentals & Kubernetes and Cloud Native Associate certifications as well as reading 'Distributed Systems' by Brendan Burns",
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'inclusive-arch.png',
    title: 'Inclusive Terminology Project',
    info: 'Series of Apps that consume an Inclusive Terminology API identifies non inclusive terms and suggests alternatives. Consuming Apps Include Web App, GitHub Action, Outlook Extension',
    info2: 'Azure Kubernetes Service (AKS), Azure Container Registry, React JS,',
    url: 'http://40.89.251.158:3000/',
    repo: 'https://github.com/BryanMThomas/InclusiveTerminology',
  },
  {
    id: nanoid(),
    img: 'ttp_Project.png',
    title: 'Painting Estimate Web App',
    info: 'Built to allow painting company to provide more consistent estimates and save historical data.',
    info2:
      'AWS Lambda, Dynamo DB, S3 Buckets, Amplify, React JS, useState Hook, React Bootstrap, React Router',
    url: 'https://demo-portfolio-vids-gifs.s3-us-west-2.amazonaws.com/PaintingEstimateApp/paintingEstimateApp.mp4',
    repo: 'https://github.com/BryanMThomas/ToddThomasPaintingApp',
  },
  {
    id: nanoid(),
    img: 'VR_Airspace_Project.png',
    title: 'VR Airspace Control Tower',
    info: 'VR team project completed in conjunction with General Dynamics to establish remote airspace in Virtual Reality. Created the ability to remotely control an airspace with access to realtime data including flight patterns, aircraft location, radio transmissiond, and view of the tarmac.',
    info2: 'AWS EC2 Instances, Swagger API, Node JS, Unity / C#',
    url: 'https://demo-portfolio-vids-gifs.s3-us-west-2.amazonaws.com/VR_Airspace_Project/VR_Airspace_Project.mp4',
    repo: 'https://github.com/BryanMThomas/VR_AirSpace_Project',
  },
  {
    id: nanoid(),
    img: 'bryx_Project.png',
    title: 'bryx Real Estate Site',
    info: 'Introductory project used to learn about developing a web app using AWS and React JS.',
    info2:
      'AWS Lambda, Dynamo DB, S3 Buckets, Amplify, React JS, useState Hook, React Bootstrap, React Router',
    url: 'https://main.d3svg2y1msp5x4.amplifyapp.com/',
    repo: 'https://github.com/BryanMThomas/bryx-project',
  },
];

// CONTACT DATA
export const contactData = {
  cta: 'Want to get in touch?',
  btn: 'Shoot Me An Email!',
  email: 'thomas.bryan.m@gmail.com',
  subtext: 'Or check me out on Github or LinkedIn',
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

export const url = process.env.URL || 'http://localhost:8080';
export const siteName = 'STEM Gender Project';
export const siteDescription = '';
export const siteType = 'Personal'; // schema
export const locale = 'en_EN';
export const lang = 'en';
export const skipContent = 'Skip to content';
export const author = {
  name: 'ccm.design', // i.e. Lene Saile - page / blog author's name. Must be set.
  avatar: '/icon-512x512.png', // path to the author's avatar. In this case just using a favicon.
  email: 'hello@ccmdesign.ca', // i.e. hola@lenesaile.com - email of the author
  website: 'https://www.claudiomendonca.com', // i.e. https.://www.lenesaile.com - the personal site of the author
};
export const creator = {
  name: 'ccm.design', // i.e. Lene Saile - page / blog author's name. Must be set.
  email: 'hello@ccmdesign.ca', // i.e. hola@lenesaile.com - email of the author
  website: 'https://www.ccmdesign.ca', // i.e. https.://www.lenesaile.com - the personal site of the author
};
export const pathToSvgLogo = 'src/assets/svg/misc/logo.svg'; // used for favicon generation
export const themeColor = '#DD4462'; //  Manifest: defines the default theme color for the application
export const themeBgColor = '#FBFBFB'; // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
export const opengraph_default = '/assets/images/template/opengraph-default.jpg'; // fallback/default meta image
export const opengraph_default_alt =
  "Claudio Mendonca | Thought and notes on web development, design and other things."; // alt text for default meta image"
export const blog = {
  // RSS feed
  name: 'Claudio Mendonca',
  description: 'Thoughts and notes on web development, design and other things.',
  // feed links are looped over in the head. You may add more to the array.
  feedLinks: [
    {
      title: 'Atom Feed',
      url: '/feed.xml',
      type: 'application/atom+xml'
    },
    {
      title: 'JSON Feed',
      url: '/feed.json',
      type: 'application/json'
    }
  ],
  // Tags
  tagSingle: 'Tag',
  tagPlural: 'Tags',
  tagMore: 'More tags:',
  // pagination
  paginationLabel: 'Blog',
  paginationPage: 'Page',
  paginationPrevious: 'Previous',
  paginationNext: 'Next',
  paginationNumbers: true
};
export const details = {
  aria: 'section controls',
  expand: 'expand all',
  collapse: 'collapse all'
};
export const navigation = {
  navLabel: 'Menu',
  ariaTop: 'Main',
  ariaBottom: 'Complementary',
  ariaPlatforms: 'Platforms',
  drawerNav: false
};
// export const themeSwitch = {
//   title: 'Theme',
//   light: 'light',
//   dark: 'dark'
// };
export const greenweb = {
  // this goes into src/common/greenweb.njk
  providers: {
    // if you want to add more than one, edit the array directly.
    domain: 'netlify.com',
    service: 'cdn'
  },
  credentials: {
    // optional, eg: 	{ domain='my-org.com', doctype = 'webpage', url = 'https://my-org.com/our-climate-record'}
    domain: '',
    doctype: '',
    url: ''
  }
};
export const viewRepo = {
  // this is for the view/edit on github link. The value in the package.json will be pulled in.
  allow: true,
  infoText: 'View this page on GitHub'
};
export const easteregg = true;

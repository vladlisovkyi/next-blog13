export interface SiteConfig {
  siteName: string;
  description: string;
  currentlyAt: string;
  socialLinks: {
    twitter: string;
    youtube: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: "Explorer",
  description:
    "A minimal and lovely travel blog which shares experiences and citiest around the world!",
  currentlyAt: "Budapest",
  socialLinks: {
    twitter: "https://github.com/vladlisovkyi",
    youtube: "https://github.com/vladlisovkyi",
    github: "https://github.com/vladlisovkyi",
    linkedin: "https://github.com/vladlisovkyi",
    instagram: "https://github.com/vladlisovkyi",
  },
};

export default siteConfig;

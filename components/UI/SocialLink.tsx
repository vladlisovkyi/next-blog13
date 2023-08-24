import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoInstagram,
  BiLogoYoutube,
  BiLogoLinkedin,
  BiLogoGithub,
} from "react-icons/bi";
const SocialLink = ({
  platform,
  link,
  isShareURL = false,
}: {
  platform: string;
  link: string;
  isShareURL?: boolean;
}) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <BiLogoFacebook size="20" />;
      case "twitter":
        return <BiLogoTwitter size="20" />;
      case "instagram":
        return <BiLogoInstagram size="20" />;
      case "youtube":
        return <BiLogoYoutube size="20" />;
      case "linkedin":
        return <BiLogoLinkedin size="20" />;
      case "github":
        return <BiLogoGithub size="20" />;
    }
  };

  return (
    <Link href={link}>
      <div
        className={`${
          isShareURL
            ? "py-2 px-3 w-full bg-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-600 hover:text-neutral-100 duration-100 ease-in-out transition-colors"
            : ""
        }`}
      >
        {getIcon(platform)}
      </div>
    </Link>
  );
};

export default SocialLink;

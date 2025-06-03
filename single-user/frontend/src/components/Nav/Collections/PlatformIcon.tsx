import { IoLogoGithub } from "react-icons/io5";
import { SiJirasoftware } from "react-icons/si";

export function PlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "GitHub":
      return <IoLogoGithub />;
    case "Jira":
      return <SiJirasoftware />;
    default:
      return null;
  }
}

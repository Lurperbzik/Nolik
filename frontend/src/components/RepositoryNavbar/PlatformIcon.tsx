import { IoLogoGithub } from 'react-icons/io5';
import { SiJirasoftware } from 'react-icons/si';

interface IconProps {
  platform: string;
}

export function PlatformIcon({ platform }: IconProps) {
  switch (platform) {
    case 'Github':
      return <IoLogoGithub />;
    case 'Jira':
      return <SiJirasoftware />;
    default:
      return null;
  }
}

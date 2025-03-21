export function getURL(url: string, platform: string): string {
  let githubUrl: string = '';
  switch (platform) {
    case 'Github': {
      const userRepo = url.split('/repos/')[1];
      githubUrl = 'https://github.com/' + userRepo;
      break;
    }
    default: {
      githubUrl = url;
      break;
    }
  }
  return githubUrl;
}

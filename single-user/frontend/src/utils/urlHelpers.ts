export function getURL(url: string, platform: string): string | null {
  switch (platform) {
    case 'GitHub': {
      const userRepo = url.split('/repos/')[1];
      return 'https://github.com/' + userRepo;
    }
    default: {
      return null;
    }
  }
}

export function getRepo(name: string, owner: string, platform: string) {
  switch (platform) {
    case 'GitHub': {
      return {
        owner: owner,
        name: name,
        platform: 'GitHub',
        url: `https://api.github.com/repos/${owner}/${name}`,
      };
    }
    default: {
      return null;
    }
  }
}

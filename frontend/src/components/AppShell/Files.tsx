import { useState, useEffect } from 'react';
import { MainChat } from '../MainChat/MainChat';
import { useCollections } from '../../services/Collections';
import { RepositoryNavbar } from '../RepositoryNavbar/RepositoryNavbar';

export type RepoProps = {
  name: string;
  platform: string;
  url: string;
};

export function Files() {
  const [active, setActive] = useState('');
  const { data, isLoading, error } = useCollections();
  const [conversations, setConversations] = useState<
    { repoURL: string; style: React.CSSProperties }[]
  >([]);

  let repos: RepoProps[] | undefined = undefined;

  if (!isLoading && !error && data) {
    repos = data.map((repo) => ({
      name: repo.repo,
      platform: repo.plataform,
      url: repo.url,
    }));
  }

  useEffect(() => {
    if (active !== '' && repos) {
      const repo = repos.find((repo) => repo.name === active);
      if (!repo) {
        return;
      }

      const exists = conversations.some(
        (element) => element.repoURL === repo.url,
      );
      if (!exists) {
        setConversations((prev) => [
          ...prev,
          { repoURL: repo.url, style: { display: 'none' } },
        ]);
      }

      setConversations((prevConvs) =>
        prevConvs.map((element) => ({
          ...element,
          style:
            element.repoURL === repo.url
              ? { display: 'block' }
              : { display: 'none' },
        })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return {
    Navlink: (
      <RepositoryNavbar repos={repos} active={active} setActive={setActive} />
    ),
    Conversation: conversations.map((conversation) => (
      <>
        <div key={conversation.repoURL} style={conversation.style}>
          <MainChat repoURL={conversation.repoURL} />
        </div>
      </>
    )),
  };
}

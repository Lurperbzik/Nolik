import { useState, useEffect } from 'react';
import { MainChat } from './MainChat/MainChat';
import { Repositories } from './RepoContent/RepoContent';
import { useCollections } from '../../../../hooks/Collections';

export type RepoProps = {
  name: string;
  plataform: string;
  url: string;
};

export type NavLinkProps = {
  repos: RepoProps[] | undefined;
  active: string;
  setActive: (value: string) => void;
};

function Navlink({ repos, active, setActive }: NavLinkProps) {
  return <Repositories repos={repos} active={active} setActive={setActive} />;
}

export interface ConversationProps {
  repoURL: string;
  style?: React.CSSProperties;
}

function Conversation({ repoURL, style }: ConversationProps) {
  return (
    <div style={style}>
      <MainChat key={repoURL} repoURL={repoURL} />
    </div>
  );
}

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
      plataform: repo.plataform,
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
        // Agregar nueva conversación con estilo oculto inicialmente
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
    Navlink: <Navlink repos={repos} active={active} setActive={setActive} />,
    Conversation: conversations.map((conversation) => (
      <Conversation
        key={conversation.repoURL}
        repoURL={conversation.repoURL}
        style={conversation.style}
      />
    )),
  };
}

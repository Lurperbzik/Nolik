import { useState, useEffect } from 'react';
import { MainChat } from '../MainChat/MainChat';
import { RepositoryNavbar } from '../RepositoryNavbar/RepositoryNavbar';
import { Repository } from '../../models/Repositories';
import { useGetCollections } from '../../services/GetCollections';

type filesProps = {
  repos: Repository[];
  setRepos: React.Dispatch<React.SetStateAction<Repository[]>>;
};

export function Files({ repos, setRepos }: filesProps) {
  const [active, setActive] = useState('');
  const [conversations, setConversations] = useState<
    { repoURL: string; style: React.CSSProperties }[]
  >([]);

  const {
    getCollections,
    loading: loadingCollections,
    error: errorCollections,
  } = useGetCollections({
    setData: (data: Repository[]) => {
      setRepos(data);
    },
  });

  useEffect(() => {
    getCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <>
        <RepositoryNavbar
          repos={repos}
          loadingCollections={loadingCollections}
          errorCollections={errorCollections}
          active={active}
          setActive={setActive}
        />
      </>
    ),

    Conversation: conversations.map((conversation) => (
      <div key={`conversation-${conversation.repoURL}`}>
        <div style={conversation.style}>
          <MainChat repoURL={conversation.repoURL} />
        </div>
      </div>
    )),
  };
}

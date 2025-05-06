import { useState, useEffect } from "react";
import { AddModal } from "./Modal";
import { useValidateRepository } from "../../services/requests/validateGithubRepo";
import { useCreateCollection } from "../../services/requests/Collection/create";

type ModalProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
};

export function ModalContainer({ opened, setOpened }: ModalProps) {
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [flag, setFlag] = useState(false);
  const [request, setRequest] = useState(false);

  const { loading, error, validateRepository } = useValidateRepository({
    owner: owner,
    name: name,
  });
  const { createCollection } = useCreateCollection({
    name: name,
    owner: owner,
  });

  async function handleSubmit() {
    setRequest(true);
  }

  useEffect(() => {
    if (request) {
      validateRepository().then((isValid) => {
        setFlag(isValid);
        setSuccess(isValid);
      });
      setRequest(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  useEffect(() => {
    if (flag) {
      createCollection();
      setFlag(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);

  return (
    <AddModal
      opened={opened}
      setOpened={setOpened}
      handleSubmit={handleSubmit}
      setOwner={setOwner}
      setName={setName}
      success={success}
      error={error}
      loading={loading}
    />
  );
}

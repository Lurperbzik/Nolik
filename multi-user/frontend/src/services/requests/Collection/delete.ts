import { HookService } from "../../HookService";
import { Collection } from "../../../models/Collection";
type useDeleteCollectionProps = {
  collection: Collection | undefined;
};

export const useDeleteCollection = ({
  collection,
}: useDeleteCollectionProps) => {
  const { loading, error, request } = HookService({
    request: {
      url: `http://localhost:3000/collections`,
      method: "DELETE",
      body: JSON.stringify(collection),
    },
  });

  const deleteCollection = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, deleteCollection };
};

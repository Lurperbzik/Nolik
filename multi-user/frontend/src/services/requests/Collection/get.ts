import { HookService } from "../../HookService";
import { Collection } from "../../../models/Collection";

type getCollectionsProps = {
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
};

export const useGetCollections = ({ setCollections }: getCollectionsProps) => {
  const { loading, error, request } = HookService({
    request: {
      url: "http://localhost:3000/collections",
      method: "GET",
    },
    setData: setCollections,
  });

  const getCollections = async () => {
    const succes = await request();
    console.log("Collections fetched:", succes);
    return succes;
  };

  return { loading, error, getCollections };
};

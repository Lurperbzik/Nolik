import { HttpException } from "../model/exception";
import { Collection } from "./collection.model";
import { CustomRequest } from "../middleware/auth";
import { CollectionManager } from "./collection.manager";
import { CollectionSocket } from "../Sockets/utils/collection.socket";
import {
  getCollectionsService,
  CollectionService,
} from "../services/requests/getCollections.service";
import { createCollectionService } from "../services/requests/createCollection";
import { deleteCollectionService } from "../services/requests/deleteCollection";

const manager = new CollectionManager();
const socket = new CollectionSocket();

export const getCollections = () => async (req: CustomRequest, res: any) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }
  let collections: Collection[] = [];
  try {
    collections = await manager.getByUserId({ userId: parseInt(userId) });
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
    return;
  }

  try {
    const collectionsService: CollectionService[] =
      await getCollectionsService();
    const result = new Set(collections.map((item) => item.url));
    const matchingCollections = collectionsService.filter((item) =>
      result.has(item.url)
    );
    res.status(200).json(matchingCollections);
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export async function createCollection(req: CustomRequest, res: any) {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }
  const collection: Collection = req.body;
  collection.ownerId = parseInt(userId);
  try {
    await createCollectionService(collection);
    await manager.create(collection);
    await socket.onCreateCollection(userId);
    res.status(201).json("Collection created successfully");
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
}

export async function deleteCollection(req: CustomRequest, res: any) {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }

  const collection: Collection = req.body;
  if (!collection || !collection.url || !collection.ownerId) {
    res.status(400).json("Incorrect values");
    return;
  }

  try {
    const updatedCollections: Map<number, Collection[]> = await manager.delete({
      collection,
    });
    const allCollections = await manager.getAll();
    const exists = Array.from(allCollections.values()).some((collections) =>
      collections.some((c) => c.url === collection.url)
    );

    if (!exists) {
      await deleteCollectionService(collection.url);
    }
    await socket.onDeleteCollection(updatedCollections);
    res.status(200).json("Collection deleted successfully");
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
}

import { HttpException } from "../model/exception";
import { Collection } from "../model/collection";
import { Model } from "../model/collection";
import { CustomRequest } from "../middleware/auth";
import {
  getCollectionsService,
  CollectionService,
} from "../services/requests/getCollections.service";
import { createCollectionService } from "../services/requests/createCollection";
import { deleteCollectionService } from "../services/requests/deleteCollection";

const model = new Model();

export const getCollections = async (req: CustomRequest, res: any) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }
  let collections: Collection[] = [];
  try {
    collections = await model.getCollections(userId);
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
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

export const deleteCollection = async (req: any, res: any) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }

  const collection = req.body as Collection;
  if (!collection) {
    res.status(400).json("Incorrect values");
    return;
  }
  if (!collection.name || !collection.platform || !collection.url) {
    res.status(400).json("Incorrect values");
    return;
  }
  try {
    await model.canDeleteCollection(collection, userId);
    await deleteCollectionService(collection.url);
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
    return;
  }

  try {
    await model.deleteCollection(collection, userId);
    res.status(200).json("Collection deleted");
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const createCollection = async (req: CustomRequest, res: any) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }

  const collection = req.body as Collection;
  if (!collection) {
    res.status(400).json("Incorrect values");
    return;
  }

  if (
    !collection.name ||
    !collection.platform ||
    !collection.url ||
    !collection.owner
  ) {
    res.status(400).json("Incorrect values");
    return;
  }

  try {
    await model.createCollection(collection, userId);
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
    return;
  }

  try {
    await createCollectionService(collection);
    res.status(200).json("Collection created");
    return;
  } catch (err: any) {
    if (err instanceof HttpException) {
      if (err.statusCode === 400) {
        // Other user already created collection
        res.status(200).json("Collection created");
        return;
      }
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
    await model.deleteCollection(collection, userId);
  }
};

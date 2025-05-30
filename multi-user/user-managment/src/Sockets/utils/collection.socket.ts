import { connectedUsers } from "../webSocket";
import { CollectionManager } from "../../Collection/collection.manager";
import { Collection } from "../../Collection/collection.model";

export class CollectionSocket {
  private collectionManager: CollectionManager =
    CollectionManager.getInstance();

  public async onCreateCollection(userId: string | undefined) {
    if (!userId) return;

    const socket = connectedUsers.get(parseInt(userId));
    if (!socket) return;

    const collections: Collection[] = await this.collectionManager.getByUserId({
      userId: parseInt(userId),
    });
    socket.emit("collections", collections);
  }

  public async onDeleteCollection(collections: Map<number, Collection[]>) {
    if (!collections) return;
    for (const [userId, userCollections] of collections) {
      const socket = connectedUsers.get(userId);
      if (socket) {
        socket.emit("collections", userCollections);
      }
    }
  }

  public async onAcceptCollection(userId: string | undefined) {
    if (!userId) return;

    const collections: Collection[] =
      await this.collectionManager.getByUserIdFromDB({
        userId: parseInt(userId),
      });

    const socket = connectedUsers.get(parseInt(userId));
    if (socket) {
      socket.emit("collections", collections);
    }
  }

  public async onUpdateCollection(collection: Collection) {
    if (!collection) return;

    const collections: Collection[] = await this.collectionManager.getByUserId({
      userId: collection.ownerId,
    });

    const socket = connectedUsers.get(collection.ownerId);
    if (socket) {
      socket.emit("collections", collections);
    }
  }
}

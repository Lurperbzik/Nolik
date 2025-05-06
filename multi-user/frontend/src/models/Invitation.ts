export interface CollectionInvitation {
  name: string;
  owner: string;
  platform: string;
  url: string;
  invitedUserId: number;
  invitedByUserId: number;
  collectionId: number;
  status: string;
}

export interface Invitation {
  collectionUrl: string;
  invitedUsername: string;
}

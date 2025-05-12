export interface Invitation {
  nameCollection: string;
  ownerCollection: string;
  platformCollection: string;
  urlCollection: string;
  invitedUserId: number;
  invitedByUserId: number;
  collectionId: number;
  status: string;
  invitedUsername: string;
  invitedByUsername: string;
}

export interface ShortInvitation {
  collectionUrl: string;
  invitedUsername: string;
}

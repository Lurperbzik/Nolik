interface ResponseInvitationInterface {
  collectionUrl: string;
  invitedByUserId: number;
  invitedUsername: string;
}

interface InvitationInterface {
  nameCollection: string;
  ownerCollection: string;
  platformCollection: string;
  urlCollection: string;
  invitedUserId: number;
  invitedByUserId: number;
  collectionId: number;
  status: string;
  invitedByUsername: string;
  invitedUsername: number;
}

export class ResponseInvitation {
  public collectionUrl: string;
  public invitedUsername: string;
  public invitedByUserId: number;

  constructor(data: ResponseInvitationInterface) {
    this.collectionUrl = data.collectionUrl;
    this.invitedUsername = data.invitedUsername;
    this.invitedByUserId = data.invitedByUserId;
  }

  static fromJson(json: ResponseInvitationInterface): ResponseInvitation {
    return new ResponseInvitation(json);
  }

  toJson(): any {
    return {
      collectionUrl: this.collectionUrl,
      invitedUsername: this.invitedUsername,
      invitedByUserId: this.invitedByUserId,
    };
  }

  static fromInvitation(
    invitation: ResponseInvitationInterface
  ): ResponseInvitation {
    return new ResponseInvitation({
      collectionUrl: invitation.collectionUrl,
      invitedUsername: invitation.invitedUsername,
      invitedByUserId: invitation.invitedByUserId,
    });
  }
}

export class Invitation {
  public nameCollection: string;
  public ownerCollection: string;
  public platformCollection: string;
  public urlCollection: string;
  public invitedUserId: number;
  public invitedByUserId: number;
  public collectionId: number;
  public status: string;
  public invitedByUsername: string;
  public invitedUsername: number;

  constructor(data: InvitationInterface) {
    this.nameCollection = data.nameCollection;
    this.ownerCollection = data.ownerCollection;
    this.platformCollection = data.platformCollection;
    this.urlCollection = data.urlCollection;
    this.invitedUserId = data.invitedUserId;
    this.invitedByUserId = data.invitedByUserId;
    this.collectionId = data.collectionId;
    this.status = data.status;
    this.invitedByUsername = data.invitedByUsername;
    this.invitedUsername = data.invitedUsername;
  }

  static fromJson(json: InvitationInterface): Invitation {
    return new Invitation(json);
  }

  toJson(): any {
    return {
      nameCollection: this.nameCollection,
      ownerCollection: this.ownerCollection,
      platformCollection: this.platformCollection,
      urlCollection: this.urlCollection,
      invitedUserId: this.invitedUserId,
      invitedByUserId: this.invitedByUserId,
      collectionId: this.collectionId,
      status: this.status,
      invitedByUsername: this.invitedByUsername,
      invitedUsername: this.invitedUsername,
    };
  }
}

interface CollectionInterface {
  id: number;
  name: string;
  owner: string;
  platform: string;
  url: string;
  status: string;
  ownerId: number;
}

export class Collection {
  public id: number;
  public name: string;
  public owner: string;
  public platform: string;
  public url: string;
  public status: string;
  public ownerId: number;

  constructor(data: CollectionInterface) {
    this.id = data.id;
    this.name = data.name;
    this.owner = data.owner;
    this.platform = data.platform;
    this.url = data.url;
    this.status = data.status;
    this.ownerId = data.ownerId;
  }
  static fromJson(json: CollectionInterface): Collection {
    return new Collection(json);
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      owner: this.owner,
      platform: this.platform,
      url: this.url,
      state: this.status,
      ownerId: this.ownerId,
    };
  }
}

interface UserInterface {
  id?: number;
  token?: string;
  role: string;
  username: string;
  password?: string;
  apiKey?: string;
}

export class User {
  public id?: number;
  public token?: string;
  public username: string;
  public role: string;
  public password?: string;
  public apiKey?: string;

  constructor(data: UserInterface) {
    this.id = data.id;
    this.token = data.token;
    this.username = data.username;
    this.role = data.role;
    this.password = data.password;
    this.apiKey = data.apiKey;
  }
  static fromJson(json: UserInterface): User {
    return new User(json);
  }

  toJson(): any {
    return {
      id: this.id,
      token: this.token,
      username: this.username,
      role: this.role,
    };
  }
}

interface UserResponseInterface {
  id: number;
  username: string;
}

export class UserResponse {
  public id: number;
  public username: string;

  constructor(data: UserResponseInterface) {
    this.id = data.id;
    this.username = data.username;
  }
  static fromJson(json: UserResponseInterface): UserResponse {
    return new UserResponse(json);
  }

  public toJson(): any {
    return {
      id: this.id,
      username: this.username,
    };
  }
}

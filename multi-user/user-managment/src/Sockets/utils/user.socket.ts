import { connectedUsers } from "../webSocket";
import { UserResponse } from "../../User/user.model";
import { UserManager } from "../../User/user.manager";

export class UserSocket {
  private userManager: UserManager = UserManager.getInstance();

  public async onUsersChange() {
    const users: UserResponse[] = await this.userManager.getAll();
    for (const [userId, socket] of connectedUsers) {
      socket.emit("users", users);
    }
  }
}

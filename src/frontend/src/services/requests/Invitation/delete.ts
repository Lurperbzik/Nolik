import { Invitation } from "../../../models/Invitation";
const host = import.meta.env.VITE_USER_MANAGEMENT_HOST;
const port = import.meta.env.VITE_USER_MANAGEMENT_PORT;

export async function deleteInvitation(invitation: Invitation | undefined) {
  await fetch(`http://${host}:${port}/invitations`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invitation),
    credentials: "include",
  });
}

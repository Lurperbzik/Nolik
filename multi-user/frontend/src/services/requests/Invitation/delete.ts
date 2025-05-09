import { CollectionInvitation } from "../../../models/Invitation";

export async function deleteInvitation(invitation: CollectionInvitation) {
  await fetch(`http://localhost:3000/invitations`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invitation),
    credentials: "include",
  });
}

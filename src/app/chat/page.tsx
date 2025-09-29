import ProfileInfo from "@/components/profile/profile-info";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ChatPage = async () => {
  const session = auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      ChatPage
      <ProfileInfo />
    </div>
  );
};
export default ChatPage;

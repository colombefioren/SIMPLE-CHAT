"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "../lib/auth/auth-client";

const HomePage = () => {
  const router = useRouter();
  const session = useSession();

  const [isPending, setIsPending] = useState(false);

  if (session) {
    router.push("/chat");
  }

  const handleClick = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/chat",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          console.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/chat");
        },
      },
    });
  };
  return (
    <div className="flex w-full mt-20 justify-center min-h-screen">
      <Button
        disabled={isPending}
        onClick={handleClick}
        className="uppercase w-fit text-white bg-red-800 rounded-sm p-2 hover:bg-red-900 cursor-pointer"
      >
        lOGIN with GOOGLE
      </Button>
    </div>
  );
};
export default HomePage;

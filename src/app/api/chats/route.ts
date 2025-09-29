import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/db/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const chats = await prisma.chat.findMany({
      where: {
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          include: {
            sender: true,
          },
        },
        group: true,
      },
    });

    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error while fetching chats" },
      { status: 500 }
    );
  }
};

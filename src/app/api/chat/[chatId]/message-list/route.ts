import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/db/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (request: Request,{ params }: { params: { chatId: string } }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { chatId } = await params;

  try {
    const messageList = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            sender: true,
          },
        },
      },
    });

    return NextResponse.json(messageList);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get message list" },
      { status: 500 }
    );
  }
};

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/db/prisma";
import { CreateChatBody } from "@/types/chat";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body: CreateChatBody = await request.json();
  const memberIds = [session.user.id, ...body.memberIds];

  try {
    const existingChat = prisma.chat.findFirst({
      where: {
        members: {
          every: {
            userId: {
              in: memberIds,
            },
          },
        },
      },
    });

    if(existingChat){
      return NextResponse.json(existingChat, { status: 200 });
    }
    
    const chat = await prisma.chat.create({
      data: {
        type: body.type,
        members: {
          create: [
            {
              userId: session.user.id,
            },
            ...body.memberIds.map((id) => ({
              userId: id,
            })),
          ],
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        messages: true,
      },
    });

    return NextResponse.json(chat, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error while creating chat" },
      { status: 500 }
    );
  }
};

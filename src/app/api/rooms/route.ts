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
    const rooms = await prisma.room.findMany({
      include: {
        chat: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json(rooms);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get rooms" }, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, chatId, membersId } = body;
  const membersIdWithCreator: string[] = [
    ...(membersId ?? []),
    session.user.id,
  ];

  try {
    const room = await prisma.room.create({
      data: {
        name,
        chatId,
        createdBy: session.user.id,
        members: {
          create: membersIdWithCreator.map((id: string) => ({ userId: id })),
        },
      },
    });
    return NextResponse.json(room);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
};

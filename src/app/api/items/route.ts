import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await prisma.item.findMany();
    return NextResponse.json(items);
  } catch (error: any) {
    console.error("Prisma Error in GET /api/items:", error);
    return NextResponse.json({ 
      error: "Failed to fetch items", 
      details: error?.message || String(error)
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newItem = await prisma.item.create({
      data: {
        name: body.name,
        type: body.type,
        width: body.width,
        height: body.height,
        color: body.color,
      },
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Prisma Error in POST /api/items:", error);
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}

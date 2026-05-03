import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updatedItem = await prisma.item.update({
      where: { id },
      data: {
        name: body.name !== undefined ? body.name : undefined,
        type: body.type !== undefined ? body.type : undefined,
        width: body.width !== undefined ? body.width : undefined,
        height: body.height !== undefined ? body.height : undefined,
        color: body.color !== undefined ? body.color : undefined,
        gridX: body.gridX !== undefined ? body.gridX : undefined,
        gridY: body.gridY !== undefined ? body.gridY : undefined,
        isPlaced: body.isPlaced !== undefined ? body.isPlaced : undefined,
      },
    });
    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.item.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserSession } from "@/lib/getSession";
import { ObjectId } from "mongodb";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Plant ID" }, { status: 400 });
    }

    const plantsCollection = db.collection("plants");
    const plant = await plantsCollection.findOne({ _id: new ObjectId(id) });

    if (!plant) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }

    return NextResponse.json(plant);
  } catch (error: any) {
    console.error("Error in GET /api/plants/[id]:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch plant" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    const { id } = await props.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Plant ID" }, { status: 400 });
    }

    const plantsCollection = db.collection("plants");
    const plant = await plantsCollection.findOne({ _id: new ObjectId(id) });

    if (!plant) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }

    // Optional: Only allow the owner of the plant to delete it.
    // If the plant has no userId (e.g. it is part of initial seed), let anyone delete it for testing purposes, or check user.
    if (plant.userId && plant.userId !== user.id) {
      return NextResponse.json({ error: "You do not have permission to delete this plant." }, { status: 403 });
    }

    await plantsCollection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: "Plant deleted successfully" });
  } catch (error: any) {
    console.error("Error in DELETE /api/plants/[id]:", error);
    return NextResponse.json({ error: error.message || "Failed to delete plant" }, { status: 500 });
  }
}

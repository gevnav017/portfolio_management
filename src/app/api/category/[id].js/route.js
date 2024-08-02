"use server";

import { NextResponse } from "next/server";
import db from "../../../../../db/db";

// delete category
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const deleteCategory = await db.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteCategory);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}

// update category
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.json();

    const updateCategory = await db.category.update({
      where: {
        id: id,
      },
      data: data,
    });

    return NextResponse.json(updateCategory);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}

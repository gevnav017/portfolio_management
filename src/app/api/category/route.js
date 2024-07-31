import { NextResponse } from "next/server";
import db from "../../../../db/db";

// get categories
export async function getCategories() {
  try {
    const categories = await db.category.findMany();

    return { categories };
  } catch (err) {
    return { error: err };
  } finally {
    db.$disconnect();
  }
}

// post new category
export async function POST(req) {
  try {
    const data = await req.json();

    const category = await db.category.create({
      data,
    });

    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}

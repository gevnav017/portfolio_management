import { NextResponse } from "next/server";
import db from "../../../../db/db";

// get categories
export async function GetCategories() {
  const categories = await db.category.findMany();

  return { categories };
}

// post new category
export async function POST(req) {
  const data = await req.json();

  const category = await db.category.create({
    data
  });

  db.$disconnect();

  return NextResponse.json(category)
}
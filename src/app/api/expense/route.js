"use server";

import { NextResponse } from "next/server";
import db from "../../../../db/db";

export async function GetExpenses() {
  const expenses = await db.expense.findMany();

  const expenseTotal = expenses.reduce(
    (acc, expense) => acc + parseFloat(expense.amount),
    0
  );

  const uniqueCategories = [new Set(expenses.map(expense => expense.category))];
  const expenseCategories = uniqueCategories[0];

  db.$disconnect()

  return { expenses, expenseTotal, expenseCategories };
}

// post add new income component
export async function POST(req) {
  const data = await req.json();

  const expense = await db.expense.create({
    data,
  });

  return NextResponse.json(expense);
}

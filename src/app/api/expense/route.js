"use server";

import { NextResponse } from "next/server";
import db from "../../../../db/db";

export async function getExpenses() {
  try {
    const expenses = await db.expense.findMany();

    const expenseTotal = expenses.reduce(
      (acc, expense) => acc + parseFloat(expense.amount),
      0
    );

    const uniqueCategories = [
      new Set(expenses.map((expense) => expense.category)),
    ];
    const expenseCategories = uniqueCategories[0];

    return { expenses, expenseTotal, expenseCategories };
  } catch (err) {
    return { error: err };
  } finally {
    db.$disconnect();
  }
}

// post add new income component
export async function POST(req) {
  try {
    const data = await req.json();

    const expense = await db.expense.create({
      data,
    });

    return NextResponse.json(expense);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}

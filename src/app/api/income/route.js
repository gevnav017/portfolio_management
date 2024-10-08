"use server";

import { NextResponse } from "next/server";
import db from "../../../../db/db";

// get incomes
export async function getIncomes() {
  try {
    const incomes = await db.income.findMany();

    const incomeTotal = incomes.reduce(
      (acc, income) => acc + parseFloat(income.amount),
      0
    );

    const uniqueCategories = [
      new Set(incomes.map((income) => income.category)),
    ];
    const incomeCategories = uniqueCategories[0];

    const passiveIncomes = incomes.filter(income => income.type === "Passive")
    const passiveIncomeTotal = passiveIncomes.reduce(
      (acc, passiveIncome) => acc + parseFloat(passiveIncome.amount),
      0
    );

    return { incomes, incomeTotal, incomeCategories, passiveIncomeTotal };
  } catch (err) {
    return { error: err };
  } finally {
    db.$disconnect();
  }
}

// post add new income
export async function POST(req) {
  try {
    const data = await req.json();

    const income = await db.income.create({
      data,
    });

    return NextResponse.json(income);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}

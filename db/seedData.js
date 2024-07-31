import db from "./db.js";

const categories = [
    {name: "Salary"},
    {name: "Rent"},
]

const assets = [
    {category: "stock", name: "TGT", amount: 100},
    {category: "stock", name: "TGT", amount: 100}
]

const liabilities = [
    {category: "loan", name: "auto", amount: 200},
    {category: "loan", name: "home", amount: 300}
]

const categoryData = async () => {
    await db.category.deleteMany();
    await db.category.createMany({
        data: categories
    });
}

const assetsData = async () => {
    await db.asset.deleteMany();
    await db.asset.createMany({
        data: assets
    });
}

const liabilitiesData = async () => {
    await db.liability.deleteMany();
    await db.liability.createMany({
        data: liabilities
    });
}

const runSeed = async () => {
    await categoryData();
    await assetsData();
    await liabilitiesData();

    console.log("seed successful")
}

runSeed();
import db from "./db.js";

const assets = [
    {category: "stock", desc: "TGT", amount: 100},
    {category: "stock", desc: "TGT", amount: 100}
]

const liabilities = [
    {category: "loan", desc: "auto", amount: 200},
    {category: "loan", desc: "home", amount: 300}
]

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
    await assetsData();
    await liabilitiesData();

    console.log("seed successful")
}

runSeed();
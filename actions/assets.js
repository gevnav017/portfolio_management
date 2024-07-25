import db from "../db/db";

const assetsFindMany = async () => {
    const res = await db.asset.findMany();

    return res;
}
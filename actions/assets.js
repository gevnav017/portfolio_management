import db from "../db/db";

export const assetsFindMany = async () => {
    const res = await db.asset.findMany();

    res.send("test")
}
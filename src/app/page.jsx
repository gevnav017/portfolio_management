import db from "../../db/db";

const page = async () => {
  const result = await db.asset.findMany();

  return <>{result && result.map((item) => item.amount)}</>;
};

export default page;
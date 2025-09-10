import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const apiUserAuth = async () => {
  // get session
  const { user } = await getServerSession(authOptions);
  // if not logged in, return 401
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  return user;
};

export default apiUserAuth;

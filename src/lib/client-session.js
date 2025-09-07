"use client";

// route imports
import { useSession } from "next-auth/react";

// authenticate user session client side
export const useClientSession = () => {
  const { data: session, status } = useSession();

  const user = session?.user || null;

  return { user, status };
};

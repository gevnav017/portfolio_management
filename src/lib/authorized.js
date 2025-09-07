export const authorized = (user, action, resource) => {
  const perms = user?.roles?.permissions;
  if (!perms) return false;

  // Super-admin style full-wildcard
  if (perms.includes("*")) {
    return true;
  }

  // is this even a valid action for that resource?
  if (!permissions[resource]?.includes(action)) {
    return false;
  }

  // check for the exact `action:resource` permission
  return perms.includes(`${action}:${resource}`);
};

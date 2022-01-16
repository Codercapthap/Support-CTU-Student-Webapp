const authRole = (permissions) => {
  return (req, res, next) => {
    if (!req.user) throw new Error("No user found");
    const userRole = req.user[0].role;
    if (permissions.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You don't have permission");
    }
  };
};

const authAccount = (permissions) => {
  return (req, res, next) => {
    const id = parseInt(req.params.userID);
    if (!req.user) throw new Error("No user found");
    const currentUserID = req.user[0].userID;
    const userRole = req.user[0].role;
    if (id == currentUserID) {
      next();
    } else if (permissions.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You don't have permission");
    }
  };
};

module.exports = {
  authRole,
  authAccount,
};

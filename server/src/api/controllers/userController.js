const User = require("../services/user");

class userController {
  async getAllUsers(req, res, next) {
    try {
      const users = await User.all();
      return res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const users = await User.findOne("id", req.params.id);
      return res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      //check email
      const {
        username,
        gender,
        birthday,
        email,
        password,
        phone,
        role,
        address,
      } = req.body;
      const foundUser = await User.findOne("email", email);
      if (foundUser)
        return res
          .status(403)
          .json({ error: { message: "email is already exits" } });

      //save user
      const newUser = new User({
        username,
        gender,
        birthday,
        email,
        password,
        phone,
        role,
        address,
      });
      newUser.id = (await newUser.save()).insertId;

      return res.status(200).json({ user: newUser });
    } catch (error) {
      next(error);
    }
  }

  // async deleteUser(req, res, next) {
  //   try {
  //     const id = req.params.id
  //     User.deleteOneById(id)
  //     return res.status(200).json({success: true})
  //   } catch(err) { next(err) }
  // }

  // async restoreAccount(req, res, next) {
  //   try {
  //     const id = req.params.id
  //     User.restoreOneById(id)
  //     return res.status(200).json({success: true})
  //   } catch(err) { next(err) }
  // }

  // async destroyAccount(req, res, next) {
  //   try {
  //     const id = req.params.id
  //     User.destroyOneById(id)
  //     return res.status(200).json({success: true})
  //   } catch(err) { next(err) }
  // }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const newUser = req.body;
      if (!newUser.role) newUser.role = "user";
      const result = await User.findOneAndUpdate(id, newUser);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async getAllUsersOfDepartmentId(req, res, next){
    try {
      const id = req.params.id;
      const users = await User.findUsersByDepartmentId(id)
      return res.status(200).json(users)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new userController();

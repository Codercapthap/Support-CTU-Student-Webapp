const User = require("../services/user");

class userController {
  async getAllUsers(req, res, next) {
    try {
      const users = await User.all();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const users = await User.findOne("id", req.params.id);
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const {
        username,
        gender,
        birthday,
        email,
        password,
        phone,
        role,
        avatarUrl,
        address,
      } = req.body;
      const departmentIdList = req.body.departmentId;
      //check email
      const foundUser = await User.findOne("email", email);
      if (foundUser)
        return res
          .status(403)
          .json({ error: { message: "email is already exits" } });

      //save user
      var newUser = new User({
        username,
        gender,
        birthday,
        email,
        password,
        phone,
        role,
        avatarUrl,
        address,
      });
      newUser = await newUser.save(departmentIdList);

      return res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      const result = await User.deleteOneById(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async restoreAccount(req, res, next) {
    try {
      const id = req.params.id;
      const result = await User.restoreOneById(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async destroyAccount(req, res, next) {
    try {
      const id = req.params.id;
      const result = await User.destroyOneById(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const id = req.user.id;
      console.log(id);
      const { username, gender, birthday, email, phone, address } = req.body;
      // check email xem có ai khác đã sử dụng chưa
      const foundUser = await User.findOne("email", email);
      if (foundUser && foundUser.id !== id)
        return res
          .status(403)
          .json({ error: { message: "email is already exits" } });

      const departmentIdList = req.body.departmentId;
      const result = await User.findOneAndUpdate(
        id,
        { username, gender, birthday, email, phone, address },
        departmentIdList
      );
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async getAllUsersOfDepartmentId(req, res, next) {
    try {
      const id = req.params.id;
      const users = await User.findUsersByDepartmentId(id);
      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async updateAvatar(req, res, next) {
    try {
      const id = req.params.id;
      const newAvatar = req.body.avatarUrl;
      const result = await User.updateAvatar(newAvatar, id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async updateRole(req, res, next) {
    try {
      const { id } = req.params;
      const newRole = req.body.role;
      const result = await User.findOneAndUpdateUserRole(id, newRole);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const id = req.user.id;
      const newPassword = req.body.password;
      const oldPassword = req.body.oldPassword;
      const result = await User.findOneAndUpdatePassword(
        id,
        newPassword,
        oldPassword
      );
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new userController();

import React from "react";

import { generageTime } from "../../Common/js/vanillaJs";
import { useSelector } from "react-redux";

import UserService from "../../Services/User.service.js";

import "./_style_user_item.scss";

function UserItem(props) {
  const { user } = props;
  const token = useSelector((state) => state.auth.current.token);

  const handleDeleteUser = async () => {
    console.log("delete user");
    await UserService.deleteUserById(user.id, token);
  };

  const handleRestoreUser = async () => {
    console.log("restore user");
    await UserService.restoreAccount(user.id, token);
  };

  const handleDestroyUser = async () => {
    console.log("destroy user");
    await UserService.destroyAccount(user.id, token);
  };
  return (
    <tr
      className={
        !user.is_deleted ? "user-item-box" : "user-item-box deleted-user"
      }
    >
      <td className="user-item">
        <span>{user.id} </span>
      </td>
      <td className="user-item">
        <img src={user.avatar_url} alt="user avatar" />
      </td>
      <td className="user-item">
        <span>{user.username} </span>
      </td>
      <td className="user-item">
        <span>{user.email} </span>
      </td>
      <td className="user-item">
        <span>{user.gender === 1 ? "Nam" : "Nu"}</span>
      </td>
      <td className="user-item">
        <span>{generageTime(user.created_at)} </span>
      </td>
      <td className="user-item">
        <span>{user.role} </span>
      </td>
      <td className="user-item">
        <div className="control-box">
          <i
            class="fa-solid fa-user-slash"
            onClick={() => handleDestroyUser()}
          ></i>
          {!user.is_deleted ? (
            <i
              class="fa-solid fa-user-minus"
              onClick={() => handleDeleteUser()}
            ></i>
          ) : (
            <i
              class="fa-solid fa-user-plus"
              onClick={() => handleRestoreUser()}
            ></i>
          )}
        </div>
      </td>
    </tr>
  );
}

export default UserItem;

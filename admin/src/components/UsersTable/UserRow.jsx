import React, { useState } from "react";
import {
  useDeleteUserMutation,
  useEditUserLikeAdminMutation,
} from "../../apis/userApi";

const statuses = ["user", "admin"];
const positions = ["Директор", "Зам. директора", "Бухгалтер", "Мастер"];

const UserRow = ({ user, onUpdate, onDelete }) => {
  const [editUser, setEditUser] = useState({
    ...user,
    // Убедимся, что rank имеет значение по умолчанию
    rank: user.rank || "",
  });

  console.log(user);
  

  const [editUserLikeAdmin, { isLoading, error }] =
    useEditUserLikeAdminMutation();

  const [deleteUser, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteUserMutation();

  const handleInputChange = async (field, value) => {
    const confirmed = window.confirm("Вы уверены, что хотите изменить данные?");
    if (confirmed) {
      const updatedUser = { ...editUser, [field]: value };
      setEditUser(updatedUser);
      onUpdate(updatedUser);
      await editUserLikeAdmin(updatedUser).unwrap();
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{editUser.nickname ? editUser.nickname : "Аноним"}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {editUser.fullName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={editUser.rank}
          onChange={(e) => handleInputChange("rank", e.target.value)}
          className="w-full px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {/* Добавляем пустую опцию, если rank не установлен */}
          {!editUser.rank && (
            <option value="" disabled>
              Выберите должность
            </option>
          )}
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={editUser.status}
          onChange={(e) => handleInputChange("status", e.target.value)}
          className="w-full px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap ">
        <input
          type="checkbox"
          checked={user.isVerified === true || user.isVerified == 1}
          onChange={(e) =>
            handleInputChange("isVerified", e.target.checked ? 1 : 0)
          }
          className="w-5 h-5 accent-blue-600"
        />
      </td>
    </tr>
  );
};

export default UserRow;
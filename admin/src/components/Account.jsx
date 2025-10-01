import React, { useState } from "react";
import { Pencil, Save } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  useUpdateUserMutation,
  useGetAllUsersQuery,
} from "../apis/userApi";
import { setCredentials } from "../slices/authSlice";
import UsersTable from "./UsersTable/UsersTable";
import { toast } from "react-toastify";

const statuses = ["user", "admin"];
const positions = ["Директор", "Зам. директора", "Бухгалтер", "Мастер"];

const Account = () => {
  const { data } = useGetAllUsersQuery();
  const { status, createdAt } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const [updateUser] = useUpdateUserMutation();

  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    id: userData.id,
    nickname: userData.user,
    rank: userData.rank,
    status: userData.status,
    fullName: userData.fullName,
  });

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const result = await updateUser({
        fullName: user.fullName,
        rank: user.rank,
        status: user.status,
        nickname: user.nickname,
      }).unwrap();
      dispatch(setCredentials(result));
      setEditMode(false);
      toast.success("Данные успешно обновлены");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Ошибка при обновлении данных");
    }
  };

  return (
    <div className="p-6 w-full h-full flex flex-col mt-[11vh]">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 flex flex-col sm:flex-row gap-8 items-center relative border border-gray-200 dark:border-gray-700 transition-all w-full">
        {/* Edit/Save Toggle */}
        <button
          onClick={editMode ? handleSave : () => setEditMode(true)}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          {editMode ? <Save size={20} /> : <Pencil size={20} />}
        </button>

        {/* Avatar Section - только отображение */}
        <div className="relative">
          <img
            src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
            alt="User avatar"
            className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-700 shadow-lg object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 w-full space-y-3 text-center sm:text-left">
          {editMode ? (
            <div className="space-y-3">
              <input
                type="text"
                value={user.nickname}
                onChange={(e) => handleChange("nickname", e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Nickname"
              />

              <input
                type="text"
                value={user.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Full Name"
              />

              <select
                value={user.rank}
                onChange={(e) => handleChange("rank", e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {!user.rank && (
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

              <select
                value={user.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user.nickname}
              </h2>
              <p className="text-lg text-gray-800 dark:text-gray-300">
                <span className="font-medium">ФИО:</span>{" "}
                {user.fullName || "---"}
              </p>
              <p className="text-lg text-gray-800 dark:text-gray-300">
                <span className="font-medium">Должность:</span> {user.rank}
              </p>
              <p className="text-lg text-gray-800 dark:text-gray-300">
                <span className="font-medium">Статус:</span>{" "}
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                    user.status === "admin"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {user.status}
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Аккаунт создан: {createdAt}
              </p>
            </>
          )}
        </div>
      </div>
      {status === "admin" && (
        <UsersTable
          onUpdate={(updatedUser) => console.log("Обновить", updatedUser)}
          onDelete={(id) => console.log("Удалить пользователя с ID:", id)}
          users={data}
        />
      )}
    </div>
  );
};

export default Account;
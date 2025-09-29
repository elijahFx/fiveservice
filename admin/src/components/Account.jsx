import React, { useState, useRef } from "react";
import { Pencil, Save, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  useUploadAvatarMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useDeleteAvatarMutation,
} from "../apis/userApi";
import { setCredentials } from "../slices/authSlice";
import UsersTable from "./UsersTable/UsersTable";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";

const statuses = ["user", "admin"];

const Account = () => {
  const { data } = useGetAllUsersQuery();
  const { status, createdAt } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const [uploadAvatar] = useUploadAvatarMutation();
  const [deleteAvatar] = useDeleteAvatarMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editMode, setEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState({
    id: userData.id,
    nickname: userData.user,
    rank: userData.rank,
    status: userData.status,
    fullName: userData.fullName,
  });
  const [avatarPreview, setAvatarPreview] = useState(
    userData.avatar || "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
  );
  const [productImg, setProductImg] = useState("")

  const fileInputRef = useRef(null);

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

  const handleAvatarUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    setUploading(true);
    
    // Сжимаем изображение
    const compressedFile = await compressFile(file);
    
    // Загружаем сжатый файл напрямую (не преобразуем в base64)
    const result = await uploadAvatar(compressedFile).unwrap();
    
    // Обновляем превью и данные пользователя
    setAvatarPreview(URL.createObjectURL(compressedFile));
    dispatch(setCredentials({ ...userData, avatar: result.avatar }));
    
    toast.success("Аватар успешно обновлен");
  } catch (error) {
    console.error("Avatar upload error:", error);
    toast.error("Ошибка при загрузке аватара");
  } finally {
    setUploading(false);
  }
};

  const handleDeleteAvatar = async () => {
    try {
      setUploading(true);
      await deleteAvatar().unwrap();
      dispatch(setCredentials({ ...userData, avatar: null }));
      setAvatarPreview("https://default-avatar.url");
      toast.success("Аватар удален");
    } catch (error) {
      console.error("Delete avatar error:", error);
      toast.error("Ошибка при удалении аватара");
    } finally {
      setUploading(false);
    }
  };

  async function compressFile(file) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Compression error:", error);
    }
  }

  return (
    <div className="p-6 w-full h-full flex flex-col mt-[11vh]">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 flex flex-col sm:flex-row gap-8 items-center relative border border-gray-200 dark:border-gray-700 transition-all w-full">
        {/* Edit/Save Toggle */}
        <button
          onClick={editMode ? handleSave : () => setEditMode(true)}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
          disabled={uploading}
        >
          {editMode ? <Save size={20} /> : <Pencil size={20} />}
        </button>

        {/* Avatar Section */}
        <div className="relative group">
          <img
            src={avatarPreview}
            alt="User avatar"
            className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-700 shadow-lg object-cover"
          />
          {editMode && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-full">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                className="hidden"
                disabled={uploading}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full"
                disabled={uploading}
                title="Изменить аватар"
              >
                <Pencil size={16} />
              </button>
              {userData.avatar && (
                <button
                  onClick={handleDeleteAvatar}
                  className="text-white bg-red-600 hover:bg-red-700 p-2 rounded-full"
                  disabled={uploading}
                  title="Удалить аватар"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
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



              
              </select>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user.nickname}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ID: {user.id}
              </p>
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
                Аккаунт создан: {(createdAt)}
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

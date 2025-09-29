import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUpdateClaimMutation } from "../../apis/claimsApi";

function ClaimsElement({
  number,
  date,
  seller,
  consumer,
  reason,
  demand,
  responsible,
  status: initialStatus,
  id,
}) {
  const [status, setStatus] = useState(initialStatus);
  const [updateClaim, { isLoading }] = useUpdateClaimMutation();

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      await updateClaim({ id: id, status: newStatus }).unwrap();
    } catch (err) {
      console.error("Ошибка при обновлении статуса:", err);
      // Можно также вернуть старое значение если нужно
      // setStatus(initialStatus);
    } finally {
    }
  };

  const statusColor =
    status === "В обработке"
      ? "bg-red-200 border-red-400 text-red-700"
      : "bg-green-200 border-green-400 text-green-700";

  return (
   <>
      <td className="px-2 py-2 text-center text-gray-500 border-b">{number}</td>
      <td className="px-2 py-2 text-center text-gray-500 border-b">
        {(date)}
      </td>
      <td className="px-2 py-2 text-center text-gray-500 border-b max-w-[120px]">
        {seller}
      </td>
      <td className="px-2 py-2 text-center text-gray-500 border-b max-w-[120px]">
        {consumer}
      </td>
      <td className="px-2 py-2 text-center text-gray-500 border-b max-w-[150px]">
        {reason}
      </td>
      <td className="px-2 py-2 text-center text-gray-500 border-b max-w-[150px]">
        {demand}
      </td>
      <td className="px-2 py-2 text-center text-gray-500 border-b">
        {responsible}
      </td>
      <td className="px-2 py-2 text-center text-gray-500 border-b">
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={isLoading}
          className={`px-2 py-1 rounded text-sm border outline-none w-full ${
            status === "В обработке"
              ? "bg-red-200 border-red-400 text-red-700"
              : "bg-green-200 border-green-400 text-green-700"
          }`}
        >
          <option value="В обработке">В обработке</option>
          <option value="Обработано">Обработано</option>
        </select>
      </td>
      <td className="px-2 text-center text-gray-500 border-b">
        <Link
          to={`/claims/${number}`}
          className="text-blue-500 hover:underline text-xs"
        >
          [Просмотр]
        </Link>
      </td>
 </>
  );
}

export default ClaimsElement;

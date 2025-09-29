import React from "react";

const ClaimInfo = ({ data }) => {
  return (
    <div className="space-y-4 text-sm text-gray-800">
      <div className="flex">
        <div className="w-40 font-medium">ФИО потребителя:</div>
        <div>{data?.consumerFullName}</div>
      </div>
      <div className="flex">
        <div className="w-40 font-medium">Адрес потребителя:</div>
        <div>{data?.consumerAddress}</div>
      </div>
      <div className="flex">
        <div className="w-40 font-medium">Контактный номер потребителя:</div>
        <div>{data?.consumerPhone}</div>
      </div>
      <div className="flex">
        <div className="w-40 font-medium">Исполнитель/продавец:</div>
        <div>{data?.sellerName}</div>
      </div>
      <div className="flex">
        <div className="w-40 font-medium">Адрес исполнителя/продавца:</div>
        <div>{data?.sellerAddress}</div>
      </div>
      <div className="flex">
        <div className="w-40 font-medium">УНП:</div>
        <div>{data?.sellerUnp}</div>
      </div>
    </div>
  );
};

export default ClaimInfo;

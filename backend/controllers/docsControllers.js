const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");
const axios = require("axios");
const { shortenFullName, getGenitiveCase, toGenitive } = require("../utils/names");
const { COURTS_DATA } = require("../utils/courts");
const { getTodayDateFormatted, formatDate } = require("../utils/dates");
const { v4: uuidv4 } = require("uuid");
const createDbConnection = require("../db");

const YANDEX_API_KEY = process.env.YANDEX_API_KEY;
const YANDEX_API_URL = "https://cloud-api.yandex.net/v1/disk";

function findCourtAddress(courtName) {
  if (!courtName) return "";
  const court = COURTS_DATA.find((c) => c.name === courtName);
  return court ? court.address : "";
}

async function getFileDownloadLink(filePath) {
  try {
    const response = await axios.get(`${YANDEX_API_URL}/resources/download`, {
      headers: { Authorization: `OAuth ${YANDEX_API_KEY}` },
      params: { path: filePath },
    });
    return response.data.href;
  } catch (error) {
    console.error("Ошибка при получении ссылки на файл:", error.response?.data || error.message);
    throw new Error("Не удалось получить ссылку на файл");
  }
}

function sanitizeData(obj) {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === "undefined" || obj[key] === null) {
      result[key] = "";
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

async function generateDoc(req, res) {
  let connection;
  let regNum = null;

  try {
    const {
      fullName,
      id,
      type,
      place,
      rank,
      date,
      lastCourt = {},
      consumerFullName,
      sellerName,
      responsibleEmployee,
      number,
      creatorId,
      typeInRussian,
      courtDecision = {},
      consumerAddress,
      consumerPhone,
      consumerEmail,
    } = req.body;

    if (type !== "contract" && type !== "without_plaintiff") {
      const corrId = uuidv4();
      const createdAt = new Date().toISOString();

      connection = await createDbConnection();
      await connection.execute(
        `INSERT INTO out_cors 
         (id, createdAt, toWho, case_num, user_id, summary, responsibleEmployee) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          corrId,
          createdAt,
          lastCourt?.court || "",
          number,
          creatorId,
          typeInRussian,
          responsibleEmployee || null,
        ]
      );

      const [outCorrRows] = await connection.execute(
        `SELECT number FROM out_cors WHERE id = ?`,
        [corrId]
      );

      if (!outCorrRows.length) {
        throw new Error("Не удалось получить номер созданной корреспонденции");
      }

      regNum = outCorrRows[0].number;
    }

    const templatePath = `templates/${type}.docx`;
    const downloadLink = await getFileDownloadLink(templatePath);

    const response = await axios.get(downloadLink, {
      responseType: "arraybuffer",
      headers: { Authorization: `OAuth ${YANDEX_API_KEY}` },
    });

    if (!response.data || response.data.length === 0) {
      throw new Error("Получен пустой файл шаблона");
    }

    const zip = new PizZip(response.data);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const courtName = lastCourt?.court || "";
    const [consumerSurname = "", consumerName = "", consumerMiddlename = ""] = (consumerFullName || "").split(" ");

    let courtLow = "";
    switch (type) {
      case "writ_hand":
        courtLow = courtName.replace(/^Суд/, "судом");
        break;
      case "reasoned_decision":
        courtLow = courtName.replace(/^Суд/, "Судом");
        break;
      default:
        courtLow = courtName.replace(/^Суд/, "суда");
        break;
    }

    const rawData = {
      liabelee: sellerName,
      consumerFullName: getGenitiveCase(consumerFullName),
      court: courtName,
      courtLowCase: courtLow,
      shortName: shortenFullName(responsibleEmployee),
      fullName,
      id,
      place,
      rank,
      date: date || new Date().toLocaleDateString(),
      court_date: lastCourt?.date || "",
      court_time: lastCourt?.time || "",
      court_address: findCourtAddress(courtName),
      regNum,
      regDate: getTodayDateFormatted(),
      court_decision_date: courtDecision?.date ? formatDate(courtDecision.date) : "",
      consumerFullNameUsual: consumerFullName,
      consumerShortName: shortenFullName(consumerFullName),
      consumerAddress,
      consumerPhone,
      consumerEmail,
      consumerName,
      consumerMiddlename,
      consumerSurname,
      contractNum: number,
      genitiveRank: toGenitive(rank),
      genitiveResponsibleEmployee: getGenitiveCase(responsibleEmployee),
    };

    const data = sanitizeData(rawData);

    doc.render(data);

    const generatedBuffer = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    const filename = `${typeInRussian}_${consumerFullName || "Документ"} к ${sellerName || "Продавец"}.docx`;
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    res.setHeader("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
    res.send(generatedBuffer);

  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({
      error: "Ошибка при генерации документа",
      details: error.message,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

module.exports = { generateDoc };

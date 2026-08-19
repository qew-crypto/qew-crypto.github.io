export type BotId = "yuki" | "createstick" | "repainting";

export const bots: Record<BotId, {
  id: BotId;
  number: string;
  handle: string;
  title: string;
  telegramUrl: string;
  info: string[];
}> = {
  yuki: {
    id: "yuki",
    number: "01",
    handle: "@Yuki_AI_ChatBot",
    title: "YUKI AI CHAT BOT",
    telegramUrl: "https://t.me/Yuki_AI_ChatBot",
    info: ["Общение с Юки", "Крестики-нолики", "Камень-ножницы-бумага", "Угадай число", "Статистика"],
  },
  createstick: {
    id: "createstick",
    number: "02",
    handle: "@Createstickbot",
    title: "CREATE STICKERS",
    telegramUrl: "https://t.me/Createstickbot",
    info: ["Создать стикерпак", "Изменить стикерпак", "Добавить стикеры", "Премиум стикеры", "Мои стикерпаки", "Сменить эмодзи"],
  },
  repainting: {
    id: "repainting",
    number: "03",
    handle: "@Repaintingstickersbot",
    title: "REPAINTING STICKERS",
    telegramUrl: "https://t.me/Repaintingstickersbot",
    info: ["Перекрасить один стикер", "Перекрасить весь стикерпак", "Создать новый пак", "Тарифы", "Промокод"],
  },
};

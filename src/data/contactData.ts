import { AvailableLanguages } from "./dropdownData";

export const contactData: Record<AvailableLanguages, Record<string, any>> = {
  english: {
    title: "Get in touch",
    message: "Please don't hesitate to send a message.",
  },
  spanish: {
    title: "Ponte en contacto",
    message: "Por favor, no dudes en enviar un mensaje.",
  },
  japanese: {
    title: "お問い合わせください",
    message: "メッセージを送信することを躊躇しないでください.",
  },
};

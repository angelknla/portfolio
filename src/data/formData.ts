import { AvailableLanguages } from "./dropdownData";

export const formData: Record<AvailableLanguages, Record<string, any>> = {
  english: {
    success: 'Thank you for getting in touch!',
    back: ' Back to top',
    emailPlaceholder: '"Email"',
    toastSuccess: 'Message sent succesfully!',
    typePlaceholder: '"Type here your message"',
    send: 'Send',
  },
  spanish: {
    success: 'Gracias por tu mensaje!',
    back: 'Volver',
    emailPlaceholder: '"Email"',
    toastSuccess: 'Mensaje enviado!',
    typePlaceholder: '"Escribe aqui tu mensaje"',
    send: 'Enviar',
  },
  japanese: {
    success: 'ご連絡いただきありがとうございます!',
    back: 'トップに戻る',
    emailPlaceholder: 'Eメール',
    toastSuccess: '送信に成功しました!',
    typePlaceholder: '"ここにメッセージを入力してください"',
    send: '送信',
  }
};
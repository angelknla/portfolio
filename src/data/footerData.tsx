import reactIcon from "../assets/react-icon.svg";

const ReactIcon = (message: string) => <p>{message} <img src={reactIcon} alt="React" /></p>;

const ReactIconJapanese = () => <p>このサイトは <img src={reactIcon} alt="React" /> を使用して作成されました</p>;

export const footerData = {
    english: {
      message: ReactIcon("This site was created using") ,
    }, 
    spanish: {
      message: ReactIcon("Este sitio ha sido creado con"),
    },
    japanese: {
      message: ReactIconJapanese(),
    }
};
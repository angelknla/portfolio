import { GamePage } from './GamePage';

export const generateStaticParams = () => {
  return [
    { gameName: 'balloon' },
    { gameName: 'doroteyo' },
    { gameName: 'mario' },
    { gameName: 'snake' },
  ];
};

export const Games = ({
  params,
}: {
  params: Promise<{ gameName: string }>;
}) => {
  return <GamePage params={params} />;
};

export default Games;

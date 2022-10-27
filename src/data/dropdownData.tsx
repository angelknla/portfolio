
import ukFlag from '../assets/UK.png'
import spainFlag from '../assets/Spain.png'
import japanFlag from '../assets/japan.svg'

export type FlagsData = {
    flag: string;
    code: string;
}

export const flagsData: Array<FlagsData> = [
    {
      flag: ukFlag, 
      code: 'english'
    },
    {
      flag: spainFlag, 
      code: 'spanish'
    },
    {
      flag: japanFlag, 
      code: 'japanese'
    },

];
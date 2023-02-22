import cards from './cards'
import cardNames from './cardNames'

const cardNamesR = Object.fromEntries(
    Object.entries(cardNames).map(([key, value]) => [value, key])
)
 
const cardDB = {
    get : () => {
        return cards;
    },
    names : () => {
        return Object.keys(cardNames).filter((name)=>(name.slice(-2) !== '토큰'));
    },
    translate : (name) => {
        if(cardNames[name]) return cardNames[name];
        return name;
    },
    translateR : (name) => {
        if(cardNamesR[name]) return cardNamesR[name];
        return name;
    },
};


 
export default cardDB;
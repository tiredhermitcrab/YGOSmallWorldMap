import cards from './cards'
import cardNames from './cardNames'

const cardNamesR = [];
 
const cardDB = {
    get : () => {
        return cards;
    },
    names : () => {
        return Object.keys(cardNames).filter((name)=>(name.slice(-2) !== '토큰')).sort();
    },
    translate : (name) => {
        if(cardNames[name]) {
            cardNames[name].forEach(n => {
                if(cards[n]) {
                    cardNamesR[n] = name;
                    name = n;
                }
            });  
        }
        return name;
    },
    translateR : (name) => {
        if(cardNamesR[name]) return cardNamesR[name];
        return name;
    },
};


 
export default cardDB;
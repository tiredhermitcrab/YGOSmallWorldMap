const fs = require('fs')

/*

const axios = require('axios')

const questionMarkAtkId = '83235263,36021814,50263751,31042659,71544954,14291024,87978805,36584821,54493213,2948263,51196174,64379430,75198893,95403418,82693917,29088922,57869175,71870152,34471458,63845230,37829468,82971335,55586621,80887952,7845138,69838592,10000020,7634581,52512994,13893596,97811903,8794435,33093439,21208154,57793869,82103466,8400623,5008836,58604027,84769941,16306932,21686473,40591390,10000,98777036,33776734,4068622,17286057,18631392,23303072,10000010,93880808,10000040,10000080'
const questionMarkDefId = '45871897,50263751,71544954,14291024,87978805,36584821,54493213,64379430,75198893,95403418,82693917,29088922,57869175,71870152,34471458,63845230,82971335,55586621,80887952,69838592,10000020,33093439,21208154,57793869,8400623,5008836,16306932,40591390,10000,98777036,33776734,17286057,18631392,10000010,10000040,10000080'

const mainMonster = [
    "normal%20monster",
    "effect%20monster",
    "flip%20effect%20monster",
    "flip%20tuner%20effect%20monster",
    "gemini%20monster",
    "tuner%20monster",
    "normal%20tuner%20monster",
    "pendulum%20normal%20monster",
    "pendulum%20effect%20monster",
    "pendulum%20flip%20effect%20monster",
    "pendulum%20tuner%20effect%20monster",
    "ritual%20effect%20monster",
    "ritual%20monster",
    "spirit%20monster",
    "toon%20monster",
    "union%20effect%20monster",
  ].join(",")

axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${mainMonster}`).then((response) => {
    const wrongdata = response.data.data;
    var data = {};
    
    wrongdata.map((card) => {
        if (questionMarkAtkId.includes(card.id)) card.atk = '?';
        if (questionMarkDefId.includes(card.id)) card.def = '?';
        return card;
    }).forEach((card) => {
        const newcard = {
            name:card.name,
            race:card.race,
            attribute:card.attribute,
            atk:card.atk,
            def:card.def,
            level:card.level
        }
        data[card.name] = newcard;
    })
    fs.writeFileSync('dataaa.txt',JSON.stringify(data));
    
});

*/

const d = JSON.parse(fs.readFileSync('cardNames.txt',{encoding:'utf8'}));



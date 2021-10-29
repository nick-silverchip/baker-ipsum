const sentences = require('./data/test-data');
const { nouns, adjectives, pronouns, verbs } = require('./words');

const getPronoun = text => {
    // Spread all words together
    const allWords = [...nouns, ...adjectives, ...verbs];
    // Return null if no result
    let result = null;
    // Loop and match a word to its pronoun
    allWords.forEach(item => {
        if (item.value === text) result = item.pronoun;
    });
    return result;
};

// const findInNArrays = (data, match) => {
//     // Takes an array of arrays and matches a key:value pair in any of them
//     // if no match, return null
//     if (!match || Object.keys(match).length === 0) return null;
//     // Loop and detect
//     data.forEach(array => {
//         array.forEach(item => {
//             try {
//                 const key = Object.keys(match)[0];
//                 if (item[key] === match[key]) return item;
//             } catch {
//                 return null;
//             }
//         });
//     });
//     return null;
// };

const parseBaker = text => {
    // Match either { or } to split out keywords
    const textArr = text.split(/[\{\}]/g);
    // If no curly brackets are present, return the string as-is
    if (textArr.length === 1) return text;
    // Else replace keywords with new ones from list
    return textArr
        .map((item, i) => {
            if (item === 'noun') return nouns.sort(() => 0.5 - Math.random())[0].value;
            else if (item === 'adjective')
                return adjectives.sort(() => 0.5 - Math.random())[0].value;
            else if (item === 'verb') return verbs.sort(() => 0.5 - Math.random())[0].value;
            else return item;
        })
        .join('')
        .split(' ')
        .map((item, i, arr) => {
            // Find pronouns and correct from data if necessary
            if (pronouns.includes(item)) return getPronoun(arr[i + 1]) || item;
            else return item;
        })
        .join(' ');
};
console.log(parseBaker(sentences[Math.floor(Math.random() * sentences.length)]));

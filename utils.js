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

const parseBaker = text => {
    // Match either { or } to split out keywords
    const textArr = text.split(/[\{\}]/g);
    // If no curly brackets are present, return the string as-is
    if (textArr.length === 1) return text;
    // Else replace keywords with new ones from list
    return textArr
        .map((item, i) => {
            const isOptional = item.endsWith('?');
            const filteredItem = item
                .split('')
                .filter(l => l !== '?')
                .join('');
            let result = filteredItem;

            if (filteredItem === 'noun') result = nouns.sort(() => 0.5 - Math.random())[0].value;
            else if (filteredItem === 'adjective')
                result = adjectives.sort(() => 0.5 - Math.random())[0].value;
            else if (filteredItem === 'verb')
                result = verbs.sort(() => 0.5 - Math.random())[0].value;
            else result = filteredItem;
            return isOptional ? (Math.random() > 0.5 ? result : '') : result;
        })
        .join('')
        .split(' ')
        .map((item, i, arr) => {
            // Find pronouns and correct from data if necessary
            if (pronouns.includes(item)) return getPronoun(arr[i + 1]) || item;
            else return item;
        })
        .join(' ')
        .split(' ')
        .filter(item => item !== '')
        .join(' ');
};
console.log(parseBaker(sentences[Math.floor(Math.random() * sentences.length)]));

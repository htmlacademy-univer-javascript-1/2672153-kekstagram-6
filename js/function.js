function checkLength(string, len) {
    let lenString = string.length;
    return lenString <= len;
}

// Cтрока короче 20 символов
console.log(checkLength('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(checkLength('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(checkLength('проверяемая строка', 10)); // false

function checkPalindrome(string){
    let newString = string.replaceAll(' ', '').toLowerCase();
    let reverseString = newString.split('').reverse().join('');
    return reverseString === newString;
}

// Строка является палиндромом
console.log(checkPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(checkPalindrome('ДовОд')); // true
// Это не палиндром
console.log(checkPalindrome('Кекс'));  // false
console.log(checkPalindrome('Лёша на полке клопа нашёл ')); // true

function convertNumber(obj){
    let string = obj.toString();
    let result = '';
    for (let i = 0; i < string.length; i++){
        if (!Number.isNaN(parseInt(string[i]))){
            result += string[i];
        }
    }

    let totalResult = parseInt(result);

    if (Number.isNaN(totalResult)){
        return NaN;
    }
    return totalResult;
}

console.log(convertNumber('2023 год'));            // 2023
console.log(convertNumber('ECMAScript 2022'));     // 2022
console.log(convertNumber('1 кефир, 0.5 батона')); // 105
console.log(convertNumber('агент 007'));           // 7
console.log(convertNumber('а я томат'));           // NaN

console.log(convertNumber(2023)); // 2023
console.log(convertNumber(-1));   // 1
console.log(convertNumber(1.5));  // 15
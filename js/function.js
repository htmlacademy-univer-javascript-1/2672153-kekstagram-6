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
    let lowerString = string.toLowerCase();
    newString = lowerString.replaceAll(' ');
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
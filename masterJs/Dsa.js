// // // import { log } from "console";
// // // import { forEachChild } from "typescript";

import { log } from "console"


// // import { count } from "console";

// // const arr =[1,2,-3,4,5,6,6]

// // // //     // console.log(Math.max(...arr))
// // // // const cArray = [...arr]
// // // // const sum = cArray.reduce((acc, cur)=> acc+cur , 0)
// // // // console.log(sum);


// // // function countEvenOdd(arr){
// // //     let oddSum =0;
// // //      let evenSum =0;

// // //    arr.forEach(num =>{
// // //     if(num % 2 == 0) evenSum += num;
// // //     else oddSum += num
// // //    })




// // //     return {oddSum , evenSum}
// // // }


// // // const {oddSum , evenSum} = countEvenOdd(arr);
// // // console.log(oddSum, evenSum);



// // // function reverseArray(arr){

// // //     const result = [];

// // // //    const result= arr.reverse()
// // // //    return result;

// // // for(let i=arr.length-1; i>=0; i-- ){
// // //        result.push(arr[i])
// // // }
// // // return result;
// // // }

// // // const arr8=reverseArray(arr)
// // // console.log(arr8);



// // // function checkSorted(arr){
// // //     for(let i=0; i<arr.length-1; i++){
// // //         if(arr[i] < arr[i+1]) return true;
// // //     }
// // //     return false;
// // // }

// // // const result = checkSorted(arr)
// // // console.log(result);


// // function hasZeroSumSubArray(arr){
// //     let sum =0;
// //     // const set = new Set(); 
// //     for(let num of arr){
// //         sum += num;

// //         if(sum === 0 ) return true
// //     }
// //     // set.add(sum)

// //     return false
// // }

// // console.log(hasZeroSumSubArray(arr));


// // // const uniqueArr = [...new Set(arr)]
// // // console.log(uniqueArr);

// // const array = [1,4,5]
// // array.splice(1,2 , 2, 3)
// // console.log(array);




// function reverseString(str) {
//     let stack = [];

//     for (let char of str) {
//         stack.push(char);
//     }
//     let reversed = "";

//     while (stack.length > 0) {
//         reversed += stack.pop()
//     }

//     return reversed;
// }

// console.log(reverseString("vimal"));


// function paliandrome(str) {

//     let left = 0;
//     let right = str.length - 1;

//     while (left < right) {
//         if (str[left] !== str[right]) false
//         left++;
//         right--;
//     }
//     return true;
// }
// console.log(paliandrome("madam"))


// const arr = [1,2,2,3,3,4,4];
// const uniqueArr = [...new Set(arr)]
// console.log(uniqueArr,"unique");


const name = 'vimal'.toUpperCase()
console.log(name,'name');

const sliced = `${"******"}` + 'ACCQ123HD6789'.slice(-4);
console.log(sliced)


const startWithIN = 'INsdcasd76877'.startsWith('IN')
console.log(startWithIN)

const email = "admin@gmail.com"

const hasAdmin = email.includes('admin')
console.log(hasAdmin);


const sensitiveData = '123456789112'.replace(/\d{8}/, '**** **** ')
console.log(sensitiveData);

const trimms = 'hello '.trim();
console.log(trimms);

import R from 'ramda';
import fs from 'fs';
import log4js from 'log4js';

log4js.configure({
appenders: { cheese: { type: 'file', filename: 'logs/cheese.log' } },
categories: { default: { appenders: ['cheese'], level: 'debug' } }
});

let isIncluded = false;
const input = fs.readFileSync('./data/input.txt');
const inputByLine = input.toString().split('\n');

const {complement, reduceWhile, includes, append, last, dropLast, isEmpty} = R;

const logger = log4js.getLogger('cheese');

const getNumber = x => Number(x.substring(1));
const calculate = (x,elem) => elem.substring(0, 1)==="+"? x + getNumber(elem) : x - getNumber(elem);
const undefinedSafe =  x => (typeof x === 'undefined')?0:x;
const appendToAcc = (accArray, elem) => {
    //logger.info("Elem1: " + elem + ", Acc1: " + accArray); 
    return append(calculate(undefinedSafe(last(accArray)),elem), accArray);
};

const includesInAcc = (acc, elem) => {
    //logger.info("Elem2: " + last(acc) + ", Acc2: " + acc);
    if(isEmpty(acc)) return false;
    isIncluded = includes(last(acc), dropLast(1, acc));
    return isIncluded;
};

const calcSubArray = (input, accumulated) => reduceWhile(complement(includesInAcc), appendToAcc, accumulated, input);


const calcEx1 = () => {
    let accumu = [];
    let i=1;
    while(!isIncluded){
        console.log(i);
        accumu = calcSubArray(inputByLine, accumu);
        i++;
    }

    return last(accumu);
}

module.exports = calcEx1;
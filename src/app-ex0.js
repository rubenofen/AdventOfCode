import R from 'ramda';
import fs from 'fs';

const input = fs.readFileSync('./data/input.txt');
const inputByLine = input.toString().split('\n');

const {reduce} = R;

const getNumber = x => Number(x.substring(1));
const calculate = (x,y) => (y.substring(0, 1)==="+"? x + getNumber(y) : x - getNumber(y));
const calcEx0 = reduce(calculate, 0, inputByLine);

module.exports = calcEx0;
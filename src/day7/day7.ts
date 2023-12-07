import {
  calculateWins,
  cardStrength,
  cardStrengthPart2,
  compareMatches,
  compareOneByOne,
  getInput,
  getMatch,
} from './helpers';

function solve() {
  const now = new Date().getTime();
  const input = getInput();

  // Part 1
  const sortedInput = getSortedInput(input, cardStrength, false);
  const winning = calculateWins(sortedInput);
  console.log(winning);

  //Part 2
  const sortedInput2 = getSortedInput(input, cardStrengthPart2, true);
  const winning2 = calculateWins(sortedInput2);
  console.log(winning2);

  //62ms
  console.log('ELAPSED', new Date().getTime() - now);
}

solve();

//256448566 part one
//254412181 part 2

function getSortedInput(input, strengthMap, isJoker = false) {
  return input.sort((a, b) => {
    let aMatch;
    let bMatch;
    //five of a kind
    aMatch = getMatch(a[0], 5, isJoker);
    bMatch = getMatch(b[0], 5, isJoker);
    if (aMatch || bMatch) {
      return compareMatches(aMatch, bMatch, a, b, strengthMap);
    }
    //four of a kind
    aMatch = getMatch(a[0], 4, isJoker);
    bMatch = getMatch(b[0], 4, isJoker);
    if (aMatch || bMatch) {
      return compareMatches(aMatch, bMatch, a, b, strengthMap);
    }
    //full house
    aMatch = getMatch(a[0], 'fullHouse', isJoker);
    bMatch = getMatch(b[0], 'fullHouse', isJoker);
    if (aMatch || bMatch) {
      return compareMatches(aMatch, bMatch, a, b, strengthMap);
    }
    //three of a kind
    aMatch = getMatch(a[0], 3, isJoker);
    bMatch = getMatch(b[0], 3, isJoker);
    if (aMatch || bMatch) {
      return compareMatches(aMatch, bMatch, a, b, strengthMap);
    }
    //two pair
    aMatch = getMatch(a[0], 'twoPairs', isJoker);
    bMatch = getMatch(b[0], 'twoPairs', isJoker);
    if (aMatch || bMatch) {
      return compareMatches(aMatch, bMatch, a, b, strengthMap);
    }
    //one pair
    aMatch = getMatch(a[0], 'onePair', isJoker);
    bMatch = getMatch(b[0], 'onePair', isJoker);
    if (aMatch || bMatch) {
      return compareMatches(aMatch, bMatch, a, b, strengthMap);
    }
    return compareOneByOne(a[0], b[0], strengthMap);
  });
}

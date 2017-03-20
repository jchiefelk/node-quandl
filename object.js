function isShuffle(str1, str2, shuffle) {
  var pointer1 = str1.length - 1;
  var pointer2 = str2.length - 1;
  var shufflePointer = shuffle.length - 1;


  while (shufflePointer >= 0) {
    if (shuffle[shufflePointer] === str2[pointer2]) {
      pointer2--;
    } else if (shuffle[shufflePointer] === str1[pointer1]){
      pointer1--;
    } else if (shuffle[shufflePointer]!== str1[pointer1] && shuffle[shufflePointer] != str2[pointer2]) {
      return false;
    }

    shufflePointer--;
  }
  return true;
}

function test() {
  if (isShuffle('acc', 'abc', 'abaccc') === true &&
      isShuffle('acc', 'abc', 'baacc') === false) {
    console.log('success');
  }
}

test(); // Prints success
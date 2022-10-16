// My own implementation of key-value hash table.  Obviously, I can simply use JSON as a hash table
// but want to do this as an educational exercise.  Dealing with collisions by simply using an array
// of arrays.  Not very efficient, but simple.
const newHashKeyValue = () => {
    return {
        array: [[],[],[],[],[],[],[],[],[],[]],
        clearArray: function() {
            this.array = [[],[],[],[],[],[],[],[],[],[]];
        },
        insert: function(key, value) {
            var hashIndex = this.getIndex(key);
            this.array[hashIndex].push({key, value});
        },
        search: function(key) {
            var hashIndex = this.getIndex(key);
            for (var i = 0; i < this.array[hashLoc].length; i++) {
                if (this.array[hashLoc][i].key == key) {
                    return this.array[hashLoc][i].value;
                }
            }
            return false;
        },
        // We get a key's index by adding the ascii values for all for the characters in the key.
        // Right now, the hashtable is limited to an array with length 10.  We could improve speed with a bigger array.
        // Using ascii total of the word, as opposed to going off, say, the first character, ensures a more
        // even distribution of keys spread throughout the array.
        getIndex: function(key) {
            var asciiTotal = 0;
            for (var i = 0; i < key.length; i++) {
                asciiTotal += key.charCodeAt(i);
            }
            return(asciiTotal % 10)
        },
        remove: function(key) {
            var hashLoc = this.getIndex(key);
            for (var i = 0; i < this.array[hashLoc].length; i++) {
                if (this.array[hashLoc][i].key == key) {
                    this.array[hashLoc].splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
};

// Creates Hash Table for single elements.
const newHashSingleElement = () => {
    return {
        array: [[],[],[],[],[],[],[],[],[],[]],
        clearArray: function() {
            this.array = [[],[],[],[],[],[],[],[],[],[]];
        },
        insert: function(key) {
            var hashLoc = this.assign(key);
            this.array[hashLoc].push(key);
        },
        search: function(key) {
            var hashLoc = this.assign(key);
            for (var i = 0; i < this.array[hashLoc].length; i++) {
                if (this.array[hashLoc][i] == key) {
                    return true;
                }
            }
            return false;
        },
        assign: function(key) {
            var asciiTotal = 0;
            for (var i = 0; i < key.length; i++) {
                asciiTotal += key.charCodeAt(i);
            }
            return(asciiTotal % 10)
        },
        remove: function(key) {
            var hashLoc = this.assign(key);
            for (var i = 0; i < this.array[hashLoc].length; i++) {
                if (this.array[hashLoc][i] == key) {
                    this.array[hashLoc].splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
};

var testHash = newHashSingleElement();
console.log (testHash);

//1.1 Brute    Determine if a string has all unique characters
const unique = (inputWord) => {
    var inputArray = inputWord.split('');
    for (i=0; i<inputWord.length; i++) {
      for (j=i+1; j<inputWord.length; j++) {
        if (inputArray[i] == inputArray[j]) {
          return(false);
      }}
    }
    return(true);
  }

  const uniqueRedo = (inputWord) => {
    for (var i = 0; i < inputWord.length-1; i++) {
        for (var j = i + 1; j < inputWord.length; j++) {
            console.log(inputWord[i] + ", " + inputWord[j])
            if (inputWord[i] == inputWord[j])
                return false
        }
    }
    return true
  } 
  console.log(unique("1234593"));

  //console.log("expect true: " + unique("helo"));

//1.1  with Hash table
const uniqueWithHash = (inputWord) => {
    var uniqueHash = newHashSingleElement ();
    for (var i = 0; i < inputWord.length - 1; i++) {
        uniqueHash.insert(inputWord[i]);
        if(uniqueHash.search(inputWord[i+1])) {
            return false;
        }
    }
    return true;
}

//1.2 Brute    Determine if two strings are permutations of each other
const permutations = (string1, string2) => {
    if (string1.length != string2.length) {
        return false
    }
    var hashString1 = newHashSingleElement();
    for (var i = 0; i < string1.length; i++ ) {
        hashString1.insert(string1[i]);
    }

    for (var i = 0; i < string2.length; i++ ) {
        if (!hashString1.remove(string2[i])) {
            return false;
        }
    }
    return true;
}
// console.log(permutations('andy ', 'adyn'));

const permutationsRedo = (string1, string2) => {
    if (string1.length != string2.length)
        return false;
    var string1Array = string1.split('').sort();
    var string2Array = string2.split('').sort();
    for (var i = 0; i < string1Array.length; i++) {
        if (string1Array[i] != string2Array[i])
            return false;
    }
    return true;
}

console.log("permutations:  " + permutationsRedo("strawberry", "strawberyy"))


//1.3 Brute     Replace spaces with '%20.'  Time O=n    Space

const urlIfy = (input) => {
    var outputString = "";

    for (var i = 0; i < input.length; i++) {
        if (input[i] == ' ') {
            outputString += "%20";
        } else {
            outputString += input[i];
        }
    }
    return outputString;
}
// console.log(urlIfy("ahsdfsgisdfg8"))

const urlifyRedo = (inputString) => {
    let outputString = "";
    for (i = 0; i < inputString.length; i++) {
        if (inputString[i] == " ")
            outputString += "%20";
        else
            outputString += inputString[i]
    };
    return outputString;
};
// console.log("urlifyRedo test:  " + urlifyRedo("ahs dfsgis dfg8"))

//1.3 Character Array

const urlIfy2 = (input) => {
    var charArray = input.split('');
    var outputArray = [];
    for (var i = 0; i < charArray.length; i++) {
        if (charArray[i] == ' '){
            outputArray.push("%20")
        } else {
        outputArray.push(charArray[i])
        }
    }
    return outputArray.join("");
}
// console.log(urlIfy2('an  dy'));

//1.4  brute Palindrome Permutation
const palPerm = (input) => {
    var charTable = {};
    for (var i = 0; i < input.length; i++) {
        if(!charTable.hasOwnProperty(input[i])) {
            charTable[input[i]] = 1;
        } else {
            charTable[input[i]] ++;
        }
    }
    var numOdds = 0;
    for (var key in charTable) {
        if (charTable[key] % 2 != 0) {
            numOdds ++;
        }
    }
    if (input.length % 2 == 0) {
        return (numOdds == 0);
    } else {
        return (numOdds == 1);
    }
}
// console.log(palPerm('andyasrsdnr'));

//1.4  Palindrome Permutation, eliminates second for loop
const palPerm2 = (input) => {
    var charTable = {};
    var numOdds = 0;
    for (var i = 0; i < input.length; i++) {
        if(!charTable.hasOwnProperty(input[i])) {
            charTable[input[i]] = 1;
            numOdds ++;
        } else {
            delete charTable[input[i]];
            numOdds --;
        }
    }

    if (input.length % 2 == 0) {
        return (numOdds == 0);
    } else {
        return (numOdds == 1);
    }
}
// console.log(palPerm('andyydandr'));


// 1.5  One Away   Time O(n)
// There are three types of edits that can be performed on strings:  
// insert a character, remove a character, or replace a character.  
// Given two strings, write a function to check if they are one edit (or zero edits) away.

// Questions:
// Should spaces be included or trimmed?

const oneAway = (input1, input2) => {
    if(input1 == input2) {
        return true;
    }
    
    if(input1.length - input2.length > 1 || input1.length - input2.length < -1) {
        return false;
    }

    var foundDiff = false;

    if(input1.length > input2.length) {
        long = input1;
        short = input2;
    } 
    else if (input1.length < input2.length){
        long = input2;
        short = input1;
    }
    else {
        for (var i = 0; i < input1.length; i++) {
            if(input1[i] != input2[i]) {
                if (foundDiff)
                    return false;
                foundDiff = true;
            }
        }
        return true;
    }

    var shortIndex = 0;
    var longIndex = 0;
    
    while (longIndex < long.length) {
        if (short[shortIndex] == long[longIndex]) {
            shortIndex ++;
            longIndex ++;
        } else {
            if (foundDiff)
                return false;
            longIndex++;
            foundDiff = true;
        }
    }
    return true;
}
// console.log("Expect true: " + oneAway('asdf', 'asdf'));  
// console.log("Expect false: " + oneAway('asdgrg', 'asdf'));  //length differ by more than one
// console.log("Expect true: " + oneAway('asdr', 'asdf'));  //same length, one character different
// console.log("Expect false: " + oneAway('msdr', 'asdf'));  //same length, two characters different
// console.log("Expect true: " + oneAway('adf', 'asdf'));  //first input needs a character added
// console.log("Expect true: " + oneAway('aasdfdf', 'aasdfd'));  //second input needs a character added
// console.log("Expect false: " + oneAway('aasdfdf', 'zasdfd'));  //second input needs a character added AND a character
// console.log("Expect true: " + oneAway("", ""));



// 1.6 String Compression
// Implement a method to perform basic string compression using the counts of repeated characters.  For example, the string aabcccccaaa would become a2b1c5a3.  
// If "compressed" string would not become smaller than the original string, your method should return the original string.  
// You can assume the string has only uppercase and lowercase letters (a - z).

// Questions:
// Should we trim spaces?
// What should we do with a string of numbers?  We'd possibly have to separate each pair with another character, such as a comma.

const stringCompress = (input) => {
    if (input === null) {
        return null;
    }
    if (input === undefined) {
        return undefined;
    }
    var curChar = input[0];
    var newString = "";
    var consecutive = 1;
    for (var i = 1; i < input.length; i++) {
        if (input[i] == curChar) {
            consecutive ++;
        } else {
            newString += curChar + consecutive;
            if (!isNaN(parseInt(input[i]))) { //deals with the number situation.  places a period before any number characters to avoid confusions arrising from the count of the previous character.
                newString += ".";
            }
            curChar = input[i];
            consecutive = 1;
        }
    }
    newString += curChar + consecutive; 
    if (newString.length < input.length) {
        return newString;
    } else {
        return input;
    }
}
// console.log("Expected: a3b2c1d3a2 --- Actual: " + stringCompress("aaabbcdddaa"));
// console.log("Expected: aaabbcddda --- Actual: " + stringCompress("aaabbcddda")); //compressed string would be same length
// console.log("Expected: aaabcddda --- Actual: " + stringCompress("aaabcddda")); //compressed string would be longer
// console.log("Expected:  --- Actual: " + stringCompress("")); //empty string input
// console.log("Expected: null --- Actual: " + stringCompress(null));
// console.log("Expected: undefined --- Actual: " + stringCompress());
// console.log("Expected: 1323331435111 --- Actual: " + stringCompress("11122233344451")); 
// console.log("Expected: 13.224.312.43.51.11 --- Actual: " + stringCompress("11122222222222222222222222233333333333344451"));
// console.log("Expected: a3z3a3.35t1 --- Actual: " + stringCompress("aaazzzaaa33333t"));



// 1.7 7 Rotate Matrix:  Given an image represented by an NxN matrix, 
// where each pixel in the image is 4 bytes, write a method to rotate 
// the image by 90 degrees.  can you do this in place?

// const flipMatrix = () => {

// }

// console.log("Expected: [[7,4,1],[8,5,2],[9,6,3]] --- Actual: " + flipMatrix([[1,2,3],[4,5,6],[7,8,9]]));


// 1.8 Zero Matrix

// Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.
// Seems much easier

const zeroMatrix = (input) => {
    var zeroColumns = [];
    
    for (var i = 0; i < input.length; i++ ) {
        var rowIsZero = false;
        for (var j = 0; j < input[1].length; j++) {
            if(input[i][j] == 0) {
                rowIsZero = true;
                zeroColumns.push(j);
                if(i != 0) {
                    for (var k = i - 1; k >= 0; k--) {
                        input[k][j] = 0;
                    }
                }
                if(j != 0 ){
                    for (var l = j - 1; l >= 0; l--) {
                        input[i][l] = 0
                    }                    
                }
            } else {
                if(rowIsZero || zeroColumns.includes(j)) {
                    input[i][j] = 0;
                }
            }
        }
    }
    return input;
}
// console.log("Expected: 0,0,0,8,0,2,9,0,3 --- Actual: " + zeroMatrix([[7,0,1],[8,5,2],[9,6,3]]));
// console.log("Expected: 7,0,1,0,0,0,9,0,3 --- Actual: " + zeroMatrix([[7,9,1],[8,0,2],[9,6,3]]));

// 1.9 String Rotation:
// Assume you have a method isSubstring which checks if one word is a substring of another.  Given two strings, 
// s1 and s2, write code to check if s2 is a rotation of s1 using only one call to isSubstring (e.g. "Waterbottle" is a rotation of "erbottlewat").

//Questions:
// Are we considering identical strings to be rotations of each other?
const stringRotation = (s1,s2) => {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    if (s1.length != s2.length)  //strings must have the same length
        return false;
    if (s1 == s2) // assumes that identical strings are NOT rotations of eachother
        return false;
    
    for (var i = 0; i < s1.length; i++ ) {
        s2 = s2.slice(1) + s2[0];
        if (s1 == s2) 
        return true;
    }
    return false;
}

const stringRotation2 = (s1,s2) => {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    return (s1 + s1).includes(s2);
}
// console.log("Expected: true --- Actual: " + stringRotation2("Waterbottle", "erbottlewat"));
// console.log("Expected: true --- Actual: " + stringRotation2("Watbottle", "bottlewat"));
// console.log("Expected: false --- Actual: " + stringRotation2("Watbottler", "bottrlewat"));


// 2.1 Remove Dups
// Write code to remove duplicates from an unsorted linked list.
// FOLLOW UP
// How would you solve this problem if a temporary buffer is not allowed?

// 2.2 Return Kth to Last
// Implement an algorithm to find the kth to last element of a singly linked list.
// Question -- are we using traditional ordering (i.e. 2ng from last would be the 
// node immediately before the last node) or ordering starting with 0?

class SingleNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor(firstNode) {
        this.first = firstNode;
        this.last = firstNode;
    }
    appendData (data) {
        var newNode = new SingleNode(data);
        if (this.first == undefined || this.first == null) {
            this.first = newNode;
            this.last = newNode;
            return newNode;
        }
        this.last.next = newNode;
        this.last = newNode;
        return newNode;
    }
    appendNode (node) {
        if (this.first == undefined || this.first == null) {
            this.first = node;
            this.last = node;
            return node;
        }
        this.last.next = node;
        this.last = node;
        return node;
    }
    contains (searchData) {
        var curNode = this.first;
        while (curNode.next !== null) {
            if (curNode.data == searchData)
                return true;
            curNode = curNode.next;
        }
        if (curNode.data == searchData)
                return true;
        return false;
    }
    print () {
        var printString = "";
        var curNode = this.first;
        while (curNode !== null) {
            printString += curNode.data;
            if (curNode.next !== null)
                printString +=  " -> ";
            curNode = curNode.next;
        }
        console.log(printString);
    }
    removeRepeats () {
        var hashList = {};  //using JS objects to take advantage of their hash features
        var duplicates = {}; // ^
        var curNode = this.first;
        while (curNode !== null) {  //while we still have another node to look at...
            if (hashList[curNode.data] !== undefined)  //look and see if that node's data is already stored inside of the hashList
                duplicates[curNode.data] = true;  //if yes, add to duplicates
            else
                hashList[curNode.data] = true;  //if no, add to hashList
            curNode = curNode.next;
        }                                   //now every duplicate value is stored inside of the duplicates list
        while (duplicates[this.first.data])    //while the first node is one of the duplicates...
            this.first = this.first.next     //chop it off the front
            if(this.first === null)
                this.last === null
        curNode = this.first; //at this point, we know curNode is not a duplicate
        while (curNode) {
            while (curNode.next && duplicates[curNode.next.data]) {      //if curNode's next is a duplicate.... -- need curNode.next check to make sure curNode.next.data doesn't error out when curNode.next is null
                curNode.next = curNode.next.next;  //chop the next one out of the list
            }
            if(curNode.next === null)
                this.last = curNode;
            curNode = curNode.next;
        }
    }
    removeDuplicates () {
        var hashList = {};  //using JS objects to take advantage of their hash features
        var duplicates = {}; // ^
        var curNode = this.first;
        while (curNode) {  //while we still have another node to look at...
            hashList[curNode.data] = true;
            while (curNode.next && hashList[curNode.next.data] !== undefined) {//look and see if that node's data is already stored inside of the hashList
                curNode.next = curNode.next.next;
            }
            if(curNode.next === null)
                this.last = curNode;
            curNode = curNode.next;
        }                                 
    }
    removeDuplicatesNoBuffer () { // In a linked list 1,2,3,4,1,5 
        var startNode = this.first;
        while (startNode) {  // we use 1 one pointer
            var curNode = startNode;
            while (curNode) { // sequence through the rest of the list with a second pointer
                while (curNode.next && (curNode.next.data == startNode.data)) //see if they match
                    curNode.next = curNode.next.next;  //if so, yank the second pointer node out of the list
                curNode = curNode.next
            }
            if(startNode.next === null)  // be sure to reassign last, so the other methods continue to function
                this.last = startNode;
            startNode = startNode.next;
        }
    }
    kFromLast (k) {
        var curNode = this.first;
        var counter = 0;
        var hashList = {};
        while (curNode !== null) {  //while we still have another node to look at...
            hashList[counter] = curNode;  // add each node to hashList with an increasing counter as the key
            counter ++;
            curNode = curNode.next;
        }
        if (k < 1 || k > counter) //at this point, counter is the length of the linkedList
            return undefined;
        return hashList[counter - k];   
    }
    remove (inputNode) {
        var curNode = this.first;
        while (curNode.next !== null) {
            if (curNode.next.data == inputNode.data)
                curNode.next = curNode.next.next;
            curNode = curNode.next;
        }
    }
}
// 2.3  Delete Middle Node:
// Implement an algorithm to delete a node in the middle (i.d., any node but the first and last node, not necessarily the exact middle) of a singly linked list, given only access to that node.
// EXAMPLE
// Input:  the node c from the linked list a,b,c,d,e,f
// Result: nothing is returned, but the new linked list looks like a,b,d,e,f
const deleteMiddleNode = (inputNode) => {
    if (inputNode.next === null)
        return;
    inputNode.data = inputNode.next.data;
    inputNode.next = inputNode.next.next;
}

// 2.4 Partition:  Write code to partition a linked list around a value x, such that all nodes less than x come before all nodes greater than or equal to x.  If x is contained within the list, the values of x only need to be after the elements less than x (see below).  the partition element x can appear anwhere in the "right partition"; it does not ned to appear between the left and right partitions.
// EXAMPLE
// Input:  3,5,8,5,10,2,1    [partition = 5]
// Output:  3,1,2,10,5,5,8
// Questions
// Should we do data validation AKA make sure the input is an integer?

const partition = (linkedList, splitNum) => {  
    var partitionedArray = [];
    var curNode = linkedList.first;
    while (curNode) { // iterates through every node in linkedList
        if (curNode.data >= splitNum) {
            partitionedArray.push(curNode); // adds node to end of array if node's value is greater than or equal to splitNum
        } else {
            partitionedArray.unshift(curNode); // adds node to beggining of array if node's value is less than splitNum
        }
        curNode = curNode.next
    }
    for (var i = 0; i < partitionedArray.length - 1; i++) {
        partitionedArray[i].next = partitionedArray[i + 1];  // iterates through array and links nodes in same order
    }
    partitionedArray[partitionedArray.length - 1].next = null;
    linkedList.first = partitionedArray[0];
    linkedList.last = partitionedArray[partitionedArray.length - 1];
}

const partition2 = (linkedList, splitNum) => { // this solution doesn't use an array, just redirects next pointers
    var curNode = linkedList.first;
    var tempNode;
    while (curNode.next) {  // we always operate on the node one ahead of the curNode so that we don't lose reference to curNode's next pointer
        if (curNode.next.data >= splitNum) {
            curNode = curNode.next;  // just sequences over a node if it's value is greater than or equal to splitNum
        } else {
            tempNode = curNode.next;  //if not, we put it at the beginning
            curNode.next = curNode.next.next;
            tempNode.next = linkedList.first;
            linkedList.first = tempNode;
        }
    }
    linkedList.last = curNode;
}

var testNode = new SingleNode(1);
var testLinkedList = new SinglyLinkedList(testNode);
testLinkedList.appendData(5);
testLinkedList.appendData(2);
testLinkedList.appendData(11);
testLinkedList.appendData(3);
testLinkedList.appendData(4);
testLinkedList.appendData(3);
testLinkedList.appendData(1);
testLinkedList.appendData(1);
// testLinkedList.print();
// console.log("Last: " + testLinkedList.last.data);
// console.log("Removing duplicates...");
// testLinkedList.removeDuplicatesNoBuffer();
// testLinkedList.print();
// console.log("Last: " + testLinkedList.last.data);
// console.log("Adding nodes....");
// var twentyOneNode = testLinkedList.appendData(21);
// var sixNode = testLinkedList.appendData(6);
// testLinkedList.appendData(49);
// testLinkedList.appendData(8);
// testLinkedList.appendData(5);
// testLinkedList.appendData(9);
// testLinkedList.appendData(4);
// testLinkedList.appendData(5);
// testLinkedList.appendData(9);
// testLinkedList.print();
// console.log("Removing duplicates...");
// testLinkedList.removeDuplicatesNoBuffer();
// testLinkedList.print();
// console.log("Removing the 6 node...");
// deleteMiddleNode(sixNode);
// testLinkedList.print();
// console.log("Removing the 21 node...");
// deleteMiddleNode(twentyOneNode);
// testLinkedList.print();
// console.log("Last: " + testLinkedList.last.data);
// console.log("Contains 49? " + testLinkedList.contains(49));
// console.log("Contains 7? " + testLinkedList.contains(7));
// console.log("Expect 9 node:");
// console.log(testLinkedList.kFromLast(1));
// console.log("Expect 49 node:");
// console.log(testLinkedList.kFromLast(3));
// console.log("Expect undefined:");
// console.log(testLinkedList.kFromLast(0));
// console.log("Expect undefined:");
// console.log(testLinkedList.kFromLast(15));
// partition2(testLinkedList, 49);
// testLinkedList.print();

// 2.5 Sum Lists:  You have two numbers represented by a linked list, where each node contains a single digit.  
// The digits are stored in reverse order, such that the 1's digit is at the head of the list.  
// Write a function that adds the two numbers and returns the sum as a linked list.
// EXAMPLE
// Input:  (7,1,6) + (5,9,2).  That is, 617 + 295.
// Output:  2, 1, 9.  that is, 912.
// FOLLOW UP
// Suppose the digits are stored in forward order.  Repeat the above problem. 
// EXAMPLE 
// Input:  (6,1,7) + (2, 9, 5).  That is, 617 + 295.
// Output:  9, 1, 2. That is, 912.

var starter1 = new SingleNode(7);
var addend1 = new SinglyLinkedList(starter1);
addend1.appendData(1);
addend1.appendData(6);
var starter2 = new SingleNode(5);
var addend2 = new SinglyLinkedList(starter2);
addend2.appendData(9);
addend2.appendData(2);

const sumLists = (addend1, addend2) => {
    var curNode1 = addend1.first;  // keeps track of iterating node in addend1
    var curNode2 = addend2.first;  // keeps track of iterating node in addend2
    var carry = 0;
    var starterNode = new SingleNode(null);
    var sumList = new SinglyLinkedList(starterNode);
    var listStarted = false;  // used in conjuction with a one-time switch below
    var curSumNode; // keeps track of iterating node in sum (output list)
    while (curNode1 || curNode2 || carry > 0) {
        var digitTotal = carry;
        if (curNode1)
            digitTotal += curNode1.data;
            curNode1 = curNode1.next;
        if (curNode2)
            digitTotal += curNode2.data;
            curNode2 = curNode2.next;
        if (digitTotal > 9) { // these are instances in which carrying is required
            carry = 1;
            digitTotal -= 10;
        } else {
            carry = 0;
        }
        if (!listStarted) {  // one-time switch used to construct a new linkedList only with the first sum digit
            starterNode.data = digitTotal;
            curSumNode = starterNode;
            listStarted = true;
        } else {  // if sumList has already been created
            var digitTotalNode = new SingleNode(digitTotal);  // create a new node, using the digitTotal for the data
            curSumNode.next = digitTotalNode;  // link it onto the end of the sumList
            curSumNode = curSumNode.next;
            sumList.last = curSumNode;
        }
    }
    return sumList;
}

// var boogie = (sumLists(addend1, addend2));
// console.log(boogie);

//  3.3 Stack of Plates:  Imagine a (literal) stack of plates.  If the stack gets too high, 
//  it might topple.  Therefore, in real life, we would likely start a new stack when the
//  previous stack exceeds some threshold.  Implement a data structure SetOfStacks that 
//  mimics this.  SetOfStacks should be composed of several stacks and should create a new 
//  stack once the previous one exceeds capacity.  SetOfStacks.push() and SetOfStacks.pop() 
//  should behave identically to a single stack (that is, pop() should return the same 
//  values as it would if there wre just a single stack).

//  FOLLOW UP
//  Implement a function popAt(int index) which performs a pop operation on a specific sub-stack.

class StackSet {
    constructor(startNode, stackCap) {    // if stackCap is 4, each stack within the stackArray will have 4 nodes max
        this.stackArray = [];   // arry of linked list stacks
        this.stackArray.push(new SinglyLinkedList(startNode));
        this.stackArray[0].capacity = stackCap - 1; 
        this.curStack = 0;  // this is the index of the current stack within the stackArray
        this.stackCap = stackCap;
    }
    pop() {
        if (this.stackArray[this.curStack].capacity == this.stackCap - 1) { // if there is only one node left in the current stack...
            this.stackArray.splice(this.curStack, 1);   //delete that stack
            this.curStack --;
        } else {       // if there are multiple nodes in the current stack
            var tempNode = this.stackArray[this.curStack].first; // store in a temp so we can return it at the end
            this.stackArray[this.curStack].first = this.stackArray[this.curStack].first.next;   // the stacks's second node is now its first
            this.stackArray[this.curStack].capacity ++;  // we've freed up a spot in the stack, so increment the capacity
            return tempNode;
        }
    }
    push(pushNode) {
        if (this.stackArray[this.curStack].capacity > 0) { // if we have room for another node in the current stack
            var tempNode = this.stackArray[this.curStack].first;  // use temp node to hold that stack's first...
            this.stackArray[this.curStack].first = pushNode; // ...while the pushNode become the new first
            pushNode.next = tempNode;
            this.stackArray[this.curStack].capacity --;  // we've taken another space in the stack, so decrement the capacity      
        } else {   // if there is no room in the current stack...
            this.stackArray.push(new SinglyLinkedList(pushNode));    // make a new stack
            this.curStack ++;      
            this.stackArray[this.curStack].capacity = this.stackCap - 1;
            pushNode.next = this.stackArray[this.curStack - 1].first;    // connect the new node's pointer to the previous stack's first
        }
    }
    popAt(stackIndex) {
        if (stackIndex == this.stackArray.length - 1) {  //if the stackIndex refers to the last stack in stackArray, perform a normal pop
            this.pop();
        } else {  // if the stackIndex is not the last stack in stackArray
            var tempNode = this.stackArray[stackIndex].first;   // keep the pop node in temp variable so we can return at end
            this.stackArray[stackIndex].first = this.stackArray[stackIndex].first.next;            
            this.stackArray[stackIndex + 1].last.next = this.stackArray[stackIndex].first;   // we have to connect the next stack's final node to this stack's first, my "last" property from my SinglyLinkedList class came in handy!
            this.stackArray[stackIndex].capacity ++;
            return tempNode;
        }
    }
    print() {
        var index = this.stackArray.length - 1;
        var printString = "";
        var curNode = this.stackArray[index].first;
        while (curNode !== this.stackArray[0].last) {
            printString += curNode.data;
            if (curNode.next !== null)
                printString +=  " -> ";
            if (this.stackArray[index - 1] && curNode.next === this.stackArray[index - 1].first) {
                printString += "   |   ";
                index --;
            }
            curNode = curNode.next;
        }
        printString += curNode.data;
        console.log(printString);
    }
}

var testNode2 = new SingleNode("a");
var testStackSet = new StackSet(testNode2, 4);
testStackSet.push(new SingleNode("b"));
testStackSet.push(new SingleNode("c"));
testStackSet.push(new SingleNode("d"));
testStackSet.push(new SingleNode("e"));
testStackSet.push(new SingleNode("f"));
testStackSet.push(new SingleNode("g"));
testStackSet.push(new SingleNode("h"));
testStackSet.push(new SingleNode("i"));
testStackSet.push(new SingleNode("j"));
testStackSet.push(new SingleNode("k"));
testStackSet.push(new SingleNode("l"));
testStackSet.push(new SingleNode("m"));
testStackSet.push(new SingleNode("n"));
testStackSet.push(new SingleNode("o"));
// console.log("original");
// testStackSet.print();
// console.log("pushing p...");
// testStackSet.push(new SingleNode("p"));
// testStackSet.print();
// console.log("pushing q...");
// testStackSet.push(new SingleNode("q"));
// testStackSet.print();
// console.log("popping...");
// testStackSet.pop();
// testStackSet.print();
// console.log("popping...");
// testStackSet.pop();
// testStackSet.print();
// console.log("popping at index 1");
// testStackSet.popAt(1);
// testStackSet.print();
// console.log("popping at index 0");
// testStackSet.popAt(0);
// testStackSet.print();
// console.log("popping at index 3");
// testStackSet.popAt(3);
// testStackSet.print();

class GraphNode {
    constructor(data) {
        this.data = data;
        this.pointers = [];  // array of other GraphNode's
    }
}

class Queue {
    constructor (firstNode) {
        this.first = firstNode;
        this.last = firstNode;
    }
    enqueue (node) {
        if (!this.first) { // queue is empty 
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = node;
        }
    }
    dequeue () {
        if (!this.first) { //if no elements remain
            return null;
        }
        else if (this.first === this.last) { // if only one element remains
            var output = this.first;
            this.first = null;
            this.last = null;
            return output;
        }
        else {
            var output = this.first;
            this.first = this.first.next;
            return output;
        }
    }
    isEmpty () {
        return (!this.first);
    }
    print () {
        if (!this.first)
            return;
        var printString = "";
        var curNode = this.first;
        while (curNode !== this.last) {
            printString += curNode.data;
            if (curNode.next !== null)
                printString +=  " -> ";
            curNode = curNode.next;
        }
        printString += curNode.data;
        console.log(printString);
    }
}
// var testQueue = new Queue(new SingleNode("a"));
// testQueue.enqueue(new SingleNode("b"));
// testQueue.enqueue(new SingleNode("c"));
// testQueue.enqueue(new SingleNode("d"));
// testQueue.enqueue(new SingleNode("e"));
// testQueue.enqueue(new SingleNode("f"));
// testQueue.print();
// console.log(testQueue.dequeue());
// testQueue.print();
// testQueue.enqueue(new SingleNode("g"));
// testQueue.print();
// console.log(testQueue.dequeue());
// testQueue.print();


// 4.1 Route Between Nodes:

// Given a directed graph, design an algorithm to find out whether there is a route between two nodes.
const isRoute = (node1, node2) => {
    var queue = new Queue(node1);
    var output = false;
    while(!queue.isEmpty()) {
        var curNode = queue.dequeue();
        curNode.pointers.forEach(function(nextNode) {
            if (!nextNode.checked) {
                if(nextNode === node2)
                    output = true;
                nextNode.checked = true;
                queue.enqueue(nextNode);
            }
        });
    }
    return output;
}

// const isRouteRecursive = (node1, node2) => {
//     node1.pointers.forEach(function(nextNode) {
//         if(!nextNode.checked) {
//             if(nextNode === node2)
//                 return true;
//             else {
//                 nextNode.check = true;
//                 return(isRouteRecursive(nextNode, node2));
//             }
//         }
//     });
// }

const isRouteRecursive = (node1, node2) => {
    node1.checked = true;
    if (node1 === node2) 
        return true;
    node1.pointers.forEach(function(nextNode) {
        if(!nextNode.checked) {
            isRouteRecursive(nextNode, node2);
        }
    });
} //!!!!!!!!!!!!!!!!!!


var a = new GraphNode("A");
var b = new GraphNode("B");
var c = new GraphNode("C");
var d = new GraphNode("D");
var e = new GraphNode("E");
var f = new GraphNode("F");
var g = new GraphNode("G");
var h = new GraphNode("H");
var i = new GraphNode("I");
var j = new GraphNode("J");
var k = new GraphNode("K");
var x = new GraphNode("X");
var z = new GraphNode("Z");
a.pointers = [b, c, d];
b.pointers = [e, i];
c.pointers = [f];
d.pointers = [f, g, h];
e.pointers = [c];
g.pointers = [j];
j.pointers = [k];
z.pointers = [k];


console.log("Expect true: " + isRouteRecursive(a,k));
console.log("Expect true: " + isRoute(a,i));
console.log("Expect false: " + isRoute(a,x)); // x is not connected in any way
console.log("Expect false: " + isRoute(a,z)); // z is connected but cannot be reached (wrong way on a one-way street)

class BinaryNode {
    constructor(data) {
        this.data = data;
        this.lesser = null;
        this.greater = null;
    }
}

class BinarySearchTree {
    add(addNode) {
        if(this.root === undefined) {
            this.root = addNode;
            return;
        }
        var curNode = this.root;
        while(curNode) {
            if (addNode.data < curNode.data) {
                if (curNode.lesser === null) {
                    curNode.lesser = addNode;
                } else {
                    curNode = curNode.lesser;
                }
            }
            else if (addNode.data > curNode.data) {
                if (curNode.greater === null) {
                    curNode.greater = addNode;
                } else {
                    curNode = curNode.greater;
                }
            }
            else {
                return
            }
        }
    }
}
// var testBinarySearchTree = new BinarySearchTree();
// testBinarySearchTree.add(new BinaryNode(8));
// testBinarySearchTree.add(new BinaryNode(4));
// testBinarySearchTree.add(new BinaryNode(12));
// testBinarySearchTree.add(new BinaryNode(2));
// testBinarySearchTree.add(new BinaryNode(6));
// testBinarySearchTree.add(new BinaryNode(10));
// testBinarySearchTree.add(new BinaryNode(14));
// console.log(testBinarySearchTree.root);
// console.log(Math.floor(1/2));
var testArray = [0,1,2,3,4,5,6,7,8,9,10,11,12];

const shortestTree = (array) => {
    var tree = new BinarySearchTree();
    var treeRoot = Math.ceil((testArray.length-1)/2);
    tree.add(new BinaryNode(array[treeRoot]));
    var queue = new Queue({
        middle: treeRoot,
        min: 0,
        max: testArray.length - 1
    });
    while(!queue.isEmpty()) {
        var curNode = queue.dequeue();
        // find the index halfway between curIndex and it's associated min
        var targetIndex = Math.floor((curNode.middle - curNode.min) / 2) + curNode.min;
        tree.add(new BinaryNode(array[targetIndex]));
        if (targetIndex > curNode.min + 1) {
            queue.enqueue({
                middle: array[targetIndex],
                min: curNode.min,
                max: curNode.middle
            });
        }
        else if (targetIndex === curNode.min + 1) {
            tree.add(new BinaryNode(array[curNode.min]));
            tree.add(new BinaryNode(array[targetIndex + 1]));
        }
        targetIndex = Math.ceil((curNode.max - curNode.middle) / 2) + curNode.middle;
        tree.add(new BinaryNode(array[targetIndex]));
        if (targetIndex < curNode.max - 1) {
            queue.enqueue({
                middle: array[targetIndex],
                min: curNode.middle,
                max: curNode.max
            });
        }
        else if (targetIndex === curNode.max - 1) {
            tree.add(new BinaryNode(array[curNode.max]));
            tree.add(new BinaryNode(array[targetIndex - 1]));            
        }
    }
    return tree;
};
// console.log(shortestTree(testArray).root);

// 4.3 List of Depths:
// Given a binary tree, design an algorithm which creates a linked list of all the nodes at each depth 
// (e.g. if you have a tree with depth D, you'll have D linked lists).

const listOfDepths = (tree) => {
    var listList = [];
    var curQueue = new Queue();
    var nextQueue = new Queue();
    curQueue.enqueue(tree.root);
    while(!curQueue.isEmpty()) {
        var curList = new SinglyLinkedList();
        while(!curQueue.isEmpty()) {
            var curNode = curQueue.dequeue();
            curList.appendData(curNode.data);
            if (curNode.lesser)
                nextQueue.enqueue(curNode.lesser);
            if (curNode.greater)
                nextQueue.enqueue(curNode.greater);
        }
        listList.push(curList);
        curQueue = nextQueue;
        nextQueue = new Queue();
    }
    return listList;
}

var testTree = new BinarySearchTree();
testTree.add(new BinaryNode(6));
testTree.add(new BinaryNode(3));
testTree.add(new BinaryNode(9));
testTree.add(new BinaryNode(1));
testTree.add(new BinaryNode(4));
testTree.add(new BinaryNode(7));
testTree.add(new BinaryNode(11));
testTree.add(new BinaryNode(0));
testTree.add(new BinaryNode(2));
testTree.add(new BinaryNode(5));
testTree.add(new BinaryNode(8));
testTree.add(new BinaryNode(10));
testTree.add(new BinaryNode(12));

//                  6
//                /   \
//               3     9
//              / \   / \
//             1  4  7   11
//            / \  \  \  /\
//           0  2  5  8 10 12

// var testDepths = (listOfDepths(testTree));
// testDepths.forEach(function(linkedList) {
//   linkedList.print();
// });


// 4.4 Check Balanced:
// Implement a function to check if a binary tree is balanced.  For the purposes of this questions,
// a balanced tree is defined to be a tree such that the heights of the two subtrees of any node 
// never differ by more than one.

const checkBalanced = (tree) => {
    var allRowsFull = true;
    var curQueue = new Queue();
    var nextQueue = new Queue();
    var powerOf2 = 1;
    curQueue.enqueue(tree.root);
    while(!curQueue.isEmpty()) {
        var rowCount = 0;
        while(!curQueue.isEmpty()) {
            var curNode = curQueue.dequeue();
            rowCount ++;
            if (curNode.lesser)
                nextQueue.enqueue(curNode.lesser);
            if (curNode.greater)
                nextQueue.enqueue(curNode.greater);
        }
        curQueue = nextQueue;
        nextQueue = new Queue();
        if (!allRowsFull && !curQueue.isEmpty()) {
            return false
        }
        if (rowCount !== powerOf2) {
            if (!allRowsFull)
                return false;
            allRowsFull = false;
        }
        powerOf2 *= 2;
    }
    return true;
}

// console.log(checkBalanced(testTree));


var node15 = new BinaryNode(15);
var node16 = new BinaryNode(16);
var node14 = new BinaryNode(14);
var node17 = new BinaryNode(17);
var node12 = new BinaryNode(12);
var node13 = new BinaryNode(13);
var node0 = new BinaryNode(0);
var node18 = new BinaryNode(18);

node15.lesser = node14;
node15.greater = node16;
node14.lesser = node12;
node12.lesser = node0;
node12.greater = node13;
node16.greater = node17;
node12.greater = node18;   //this is a bad node, plug it in at different places or change it's value to produce false results
var fakePlasticTree = {root: node15};

    // 4.5 Validate BST

    // Implement a function to check if a binary tree is a binary search tree.

const checkBinarySearch2 = (tree) => { // DOESN'T FUNCTION
    debugger;
    var qStart = {...tree.root, min: null, max: null};
    var q = new Queue(qStart);
    while(!q.isEmpty()) {
        var curNode = q.dequeue();
        if (curNode.lesser) {
            if(curNode.lesser.data <= curNode.data && curNode.min == curNode.data)
                q.enqueue({...curNode.lesser, min: curNode.lesser.data, max: curNode.max});
            else if(curNode.lesser.data <= curNode.data && curNode.lesser.data > curNode.min)   // I find this <= to be a weird trait of binary search trees.
                q.enqueue({...curNode.lesser, min: curNode.min, max: curNode.max ? curNode.max : curNode.data});
            else
                return false;
        }
        if (curNode.greater) {
            if(curNode.greater.data > curNode.data && curNode.max == curNode.data)
                q.enqueue({...curNode.greater, min: curNode.min, max: curNode.greater.data})
            else if(curNode.greater.data > curNode.data && curNode.max ? curNode.greater.data < curNode.max : true)
                q.enqueue({...curNode.greater, min: curNode.min ? curNode.min : curNode.data, max: curNode.greater.data});
            else
                return false;
        }
    }
    return true;
};

const checkBinarySearch = (tree) => {
    var qStart = {...tree.root, min: null, max: null};
    var q = new Queue(qStart);
    while(!q.isEmpty()) {
        var curNode = q.dequeue();
        if (curNode.lesser) {
            if (curNode.min === null) {
                if (curNode.lesser.data > curNode.data)
                    return false;
            } else {
                if (curNode.lesser.data > curNode.data || curNode.lesser.data <= curNode.min)
                    return false;
            }
            q.enqueue({...curNode.lesser, min: curNode.min, max: curNode.data})
        }
        if (curNode.greater) {
            if (curNode.max === null) {
                if (curNode.greater.data <= curNode.data)
                    return false;
            } else {
                if (curNode.greater.data <= curNode.data || curNode.greater.data > curNode.max)
                    return false;
            }
            q.enqueue({...curNode.greater, min: curNode.data, max: curNode.max})
        }
    }
    return true;
};

console.log(checkBinarySearch(fakePlasticTree));

// 4.6 Successor:
// Write an algorithm to find the "next" node (i.e. in-order successor) of a given node in a binary search tree.  
// You man assume that each node has a link to its parent.

const successor = (inputNode) => {
    if(inputNode.greater === null) {
        if(inputNode.parent.lesser === inputNode) {
            return inputNode.parent;
        }
        else if(inputNode.parent.greater === inputNode) {
            var curParent = inputNode.parent;
            while(curParent.parent) {
                if(curParent.parent.lesser === curParent)
                    return curParent.parent;
                curParent = curParent.parent;
            }
            return null;
        }
    } else {
        var curNode = inputNode.greater;
        while(curNode) {
            if(curNode.lesser === null)
                return curNode;
            curNode = curNode.lesser;
        }
    }
};

var node8 = new BinaryNode(8);
var node4 = new BinaryNode(12);
var node2 = new BinaryNode(2);
var node6 = new BinaryNode(6);
var node10 = new BinaryNode(10);
var node14 = new BinaryNode(14);

node8.lesser = node4; node8.greater = node12;
node4.lesser = node2; node4.greater = node6; node4.parent = node8;
node12.lesser = node10; node12.greater = node14; node12.parent = node8;
node2.parent = node4; node6.parent = node4; node10.parent = node12; node14.parent = node12;

console.log(successor(node14));
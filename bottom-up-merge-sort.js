function sort(arr) {

    function mergeHalf(sp1, ep1, sp2, ep2) {
        var startPos = sp1;
        var outputPos = 0;
        var copyArr1 = arr.slice(sp1, ep1);

        if(ep1 === ep2) {
            return;
        }

        while(sp1 < ep1 && sp2 < ep2) {
            if(copyArr1[sp1 - startPos] > arr[sp2]) {
                arr[startPos + outputPos] = arr[sp2];
                sp2++;
            } else {
                arr[startPos + outputPos] = copyArr1[sp1 - startPos];
                sp1++;
            }

            outputPos++;
        }

        while(sp1 < ep1) {
            arr[startPos + outputPos] = copyArr1[sp1 - startPos];
            outputPos++;
            sp1++;
        }

        while(sp2 < ep2) {
            arr[startPos + outputPos] = arr[sp2];
            outputPos++;
            sp2++;
        }
    }

    function merge(sp1, ep1, sp2, ep2) {
        var startPos = sp1;
        var outputPos = 0;
        var outArr = new Array(ep1 - sp1 + ep2 - sp2);

        if(ep1 === ep2) {
            return;
        }

        while(sp1 < ep1 && sp2 < ep2) {
            if(arr[sp1] > arr[sp2]) {
                outArr[outputPos] = arr[sp2];
                sp2++;
            } else {
                outArr[outputPos] = arr[sp1];
                sp1++;
            }

            outputPos++;
        }

        while(sp1 < ep1) {
            outArr[outputPos] = arr[sp1];
            outputPos++;
            sp1++;
        }

        while(sp2 < ep2) {
            outArr[outputPos] = arr[sp2];
            outputPos++;
            sp2++;
        }

        Array.prototype.splice.apply(arr, [startPos, outArr.length].concat(outArr));
    }

    for(var k = 0, maxLevel = Math.ceil(Math.log2(arr.length)); k < maxLevel; k++) {
        var blockSize = Math.pow(2, k);
        var iterationCount = Math.ceil(arr.length / blockSize);

        for(var lastPos = 0; lastPos < arr.length; lastPos+=2*blockSize) {
            var sp1 = lastPos;
            var ep1 = Math.min(lastPos + blockSize, arr.length);
            var sp2 = ep1;
            var ep2 = Math.min(sp2 + blockSize, arr.length);

            mergeHalf(sp1, ep1, sp2, ep2);
        }
    }

    return arr;
}

function generate(length) {
    function rnd(min, max) {
        return min + Math.floor(Math.random() * (max - min));
    }

    var arr = new Array(length);

    for(var i = 0; i < length; i++) {
        arr[i] = rnd(1, 100);
    }

    return arr;
}

//test merge
//var input = generate(15);
//console.log(input);
//var output = sort(input);
//console.log(output);
//console.log(sort(generate(15)));
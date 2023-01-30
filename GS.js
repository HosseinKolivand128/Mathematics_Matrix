
let A = Array(10).fill(0).map(
    x => Array(10).fill(0));
let b = [2, 4, 6, 8, 10, 12, 14, 16, 18, 31];
let x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let y = Array(10).fill(0);

console.log(y);

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
        if (i === j) {
            A[i][j] = 4
        } else if (j - i > -2 && j - i < 2) {
            A[i][j] = -1;
            A[j][i] = -1;
        }
    }
}

// let A = [
//     [8, 1, 1],
//     [1, 8, 1],
//     [1, 1, 8]
// ]
// let x = [0, 0, 0];
// let b = [10, 10, 10];
// let y = [0, 0, 0];

console.log(A);
let m = 1;
let n = Math.pow(10, -5);
let counter = 0;
// 
function maximumX(x, X) {
    let z = []
    for (let i = 0; i < x.length; i++) {
        z[i] = Math.abs(X[i] - x[i]);
    }
    let min = z[0];
    for (let i = 0; i < z.length; i++) {
        if (z[i] < min) {
            min = z[i];
        }
    }
    return min;
}
//m-- m>0 m=3
while (m > n) {
    console.log(counter + 1);

    let X = [];
    for (i = 0; i < 3; i++) {
        X[i] = x[i];
        y[i] = (b[i] / A[i][i]);

        for (j = 0; j < 3; j++) {

            if (j === i)

                continue;

            y[i] = y[i] - ((A[i][j] / A[i][i]) * x[j]);

            x[i] = y[i];

        }

        console.log(i + 1, y[i]);

    }
    console.log("X:" + y[i]);

    console.log("\n");

    m = maximumX(x, X);
    // console.log(m);
    counter++
}



function luDecomposition(mat, n) {
    let lower = Array(n).fill(0).map(
        x => Array(n).fill(0));
    let upper = Array(n).fill(0).map(
        x => Array(n).fill(0));

    for (let i = 0; i < n; i++) {

        // Upper Triangular
        for (let k = i; k < n; k++) {

            // Summation of L(i, j) * U(j, k)
            let sum = 0;
            for (let j = 0; j < i; j++)
                sum += (lower[i][j] * upper[j][k]);

            // Evaluating U(i, k)
            upper[i][k] = mat[i][k] - sum;
        }

        // Lower Triangular
        for (let k = i; k < n; k++) {
            if (i == k)

                // Diagonal as 1
                lower[i][i] = 1;
            else {

                // Summation of L(k, j) * U(j, i)
                let sum = 0;
                for (let j = 0; j < i; j++)
                    sum += (lower[k][j] * upper[j][i]);

                // Evaluating L(k, i)
                lower[k][i] = parseInt((mat[k][i] - sum) /
                    upper[i][i]);
            }
        }
    }

    //LOWER
    console.log("L Matrix");
    for (let i = 0; i < n; i++) {
        console.log(lower[i]);
    }

    //UPPER
    console.log("U Matrix");
    for (let i = 0; i < n; i++) {
        console.log(upper[i]);
    }
}

// let MATRIX = [[2, -1, -2],
// [-4, 6, 3],
// [-4, -2, 8]];
let MATRIX =
    [[95, 54, 26, 6, 10],
    [70, 40, 20, 5, 8],
    [46, 26, 14, 4, 6],
    [25, 14, 8, 3, 4],
    [9, 5, 3, 2, 2]];

luDecomposition(MATRIX, 5);


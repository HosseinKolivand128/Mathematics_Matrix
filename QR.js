
const A = [
    [1, 2, 3],
    [3, 6, 5],
    [5, 2, 8],
    [8, 9, 3]];

// const A = [
//     [1, 2, -1],
//     [1, -1, 1],
//     [1, -1, 0],
//     [-1, 2, 0]
// ];

// const A = [
//     [95, 54, 26, 6, 10],
//     [70, 40, 20, 5, 8],
//     [46, 26, 14, 4, 6],
//     [25, 14, 8, 3, 4],
//     [9, 5, 3, 2, 2]
// ];

/* CHANGE THE ROW AND COLUMN VALUE BELOWWWWWWW*/
let R = Array(4).fill(0).map(
    x => Array(3).fill(0));;
let Q = Array(4).fill(0).map(
    x => Array(3).fill(0));

qr_decompose(A, Q, R, 4, 3);

console.log(Q);

console.log(R);



//to calculate inner multiply
function vector_dot(a, b, L) {
    let mag = 0;
    for (let i = 0; i < L; i++)
        mag += a[i] * b[i];

    return mag;
}
//to find |V| magnitude
function vector_mag(vector, L) {
    let dot = vector_dot(vector, vector, L);//send vector with its row size to calculate inner multiply
    return Math.sqrt(dot);
}

function vector_proj(a, b, out, L) {
    let num = vector_dot(a, b, L);//inner multiply of col_vec(a2).col_vec2(q1)
    let deno = vector_dot(b, b, L);//inner multiply of col_vec2.col_vec2 (q1.q1)
    for (let i = 0; i < L; i++)
        out[i] = num * b[i] / deno;//a2*q1[]/q1q1

    return out;//to Change colVec2 to the 
}

function vector_sub(a, b, out, L) {
    for (let i = 0; i < L; i++)
        out[i] = a[i] - b[i];

    return out;
}

function qr_decompose(A, Q, R, row, column) {
    let col_vector = [];
    let col_vector2 = [];
    let tmp_vector = [];
    /* for each column => R is a square matrix of NxN */
    for (let i = 0; i < column; i++) {
        for (let j = 0; j < i; j++) /* second dimension of column */
            R[i][j] = 0; /* make R upper triangular */

        /* make the columns : a1 a2 a3 ... */
        for (let j = 0; j < row; j++) {
            tmp_vector[j] = A[j][i];//a
            col_vector[j] = A[j][i];
        }
        //finding V and changing tempVect to V
        for (let j = 0; j < i; j++) {
            for (let k = 0; k < row; k++)
                col_vector2[k] = Q[k][j]; //make colVec2 equal to q1->2->3
            vector_proj(col_vector, col_vector2, col_vector2, row);//change colVec2(q2)  
            vector_sub(tmp_vector, col_vector2, tmp_vector, row);//a2-newColVec2 to change tempVec(a2)
        }
        let mag = vector_mag(tmp_vector, row); //calculate tempVect magnitude
        //making q
        for (let j = 0; j < row; j++) {
            // console.log(tmp_vector[j] / mag);
            // console.log(Q[j][j]);
            Q[j][i] = tmp_vector[j] / mag;// a1/r11=a1_mag
        }

        /* compute upper triangular values of R */
        for (let kk = 0; kk < row; kk++)
            col_vector[kk] = Q[kk][i]; //put q1 into the col_vec

        for (let k = i; k < column; k++) {
            for (let kk = 0; kk < row; kk++)

                col_vector2[kk] = A[kk][k];//make col_vec2 equal to the a1 or temp_vec or past value of col_vec
            R[i][k] = vector_dot(col_vector, col_vector2, row);//make R matrix by column with inner miltiply of 
            //q.a
        }
    }


}
const fs = require('fs');
const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

//Just change the name of the file to change the test case
const file = fs.readFileSync('mochila01.txt.txt', 'utf-8');
const array = file.split('\r\n').map(nodes => {
    return nodes.split(' ').map(it => {
        return Number.parseInt(it);
    }).filter(it => {
        return it !== undefined && !isNaN(it);
    })
});
let tamanho = array.shift()[1]
let valores = []
let pesos = []
array.forEach(element =>{
    valores.push(element[1])
    pesos.push(element[0])
})
const mochila = (W,wt,val) => {
    let n = val.length;
    let i, w;
    let K = new Array(n + 1);
    for( i=0;i<K.length;i++)
    {
        K[i]=new Array(W+1);
        for(let j=0;j<W+1;j++)
        {
            K[i][j]=0;
        }
    }
    for (i = 0; i <= n; i++) {
        for (w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                K[i][w] = 0;
            else if (wt[i - 1] <= w)
                K[i][w] = Math.max(val[i - 1] +
                    K[i - 1][w - wt[i - 1]],
                    K[i - 1][w]);
            else
                K[i][w] = K[i - 1][w];
        }
    }
    let res = K[n][W];
    console.log(res);

    w = W;
    let chosen = []
    for (i = n; i > 0 && res > 0; i--)
    {
        if (res == K[i - 1][w])
            continue;
        else {

            chosen.push(i);

            res = res - val[i - 1];
            w = w - wt[i - 1];
        }
    }
    console.log("Elementos", chosen.reverse())
  }
mochila(tamanho, pesos, valores)

process.exit(1);

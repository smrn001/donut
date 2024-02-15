async function donutAnimation() {
  let A = 0,
    B = 0;
  let i, j;
  let k;
  let z = new Array(1760).fill(0);
  let b = new Array(1760).fill(" ");

  function usleep(microseconds) {
    return new Promise((resolve) => setTimeout(resolve, microseconds / 1000));
  }

  function updateOutput() {
    let output = "";
    for (k = 0; k < 1761; k++) {
      output += k % 80 ? String(b[k]) : "\n";
      A += 0.00004;
      B += 0.00002;
    }
    document.getElementById("output").textContent = output;
  }

  for (;;) {
    b.fill(" ", 0, 1760);
    z.fill(0, 0, 7040);
    for (j = 0; j < 6.28; j += 0.07) {
      for (i = 0; i < 6.28; i += 0.02) {
        let c = Math.sin(i);
        let d = Math.cos(j);
        let e = Math.sin(A);
        let f = Math.sin(j);
        let g = Math.cos(A);
        let h = d + 2;
        let D = 1 / (c * h * e + f * g + 5);
        let l = Math.cos(i);
        let m = Math.cos(B);
        let n = Math.sin(B);
        let t = c * h * g - f * e;
        let x = Math.floor(40 + 30 * D * (l * h * m - t * n));
        let y = Math.floor(12 + 15 * D * (l * h * n + t * m));
        let o = x + 80 * y;
        let N = 8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n);
        if (22 > y && y > 0 && x > 0 && 80 > x && D > z[o]) {
          z[o] = D;
          // Ensure N falls within the range of the string
          let index = Math.floor(N > 0 ? N : 0); // Ensure N is non-negative
          if (index >= 0 && index < ".,-~:;=!*#$@".length) {
            b[o] = ".,-~:;=!*#$@"[index];
          }
        }
      }
    }
    updateOutput();
    await usleep(30e3); // Delay in microseconds
  }
}

donutAnimation().catch(console.error);

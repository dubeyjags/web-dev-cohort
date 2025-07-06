function shinyDiamondRug(n) {
    let diamond = "";
    for (let i = 1; i <= n; i++) {
      let stars = "*".repeat(2 * i - 1);
      diamond += stars + "\n";
    }
    for (let i = n - 1; i >= 1; i--) {
      let stars = "*".repeat(2 * i - 1);
      diamond += stars + "\n";
    }
    return diamond;
  }
  console.log(shinyDiamondRug(4));
  
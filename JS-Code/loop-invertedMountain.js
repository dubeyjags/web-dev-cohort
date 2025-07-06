function invertedMountain(n){
    let mnt = ''
    for (let i = n; i >= 1; i--) {
        let stars = "*".repeat(i);
        if(i !== 1){
            mnt += stars + "\n";
        }else{
            mnt += stars;
        }
      }
    return mnt;
}
console.log(invertedMountain(4));



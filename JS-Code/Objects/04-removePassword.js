function removePassword(user) {
    // Remove password property
    delete user['password']
  }

  let user = {"name":"aaa","password":10}
  removePassword(user)
  console.log(user)
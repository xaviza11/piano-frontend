function isValidEmail(email:string) {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email);
  }
  
  function isValidPassword(password:string) {
    const passwordRegex = /^(?=.*[A-ZÑÁÉÍÓÚÜ])(?=.*\d)[A-Za-z\dñáéíóúüÑÁÉÍÓÚÜ]{8,}$/;
    return passwordRegex.test(password);
  }
  
  function isValidUserName(username:string) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
  }

  export {isValidEmail, isValidPassword, isValidUserName}
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

  function isValidTone(tone: string): boolean {
    const validTones = [
        "C Major", "C# Major", "D Major", "D# Major", "E Major", "F Major", "F# Major", "G Major", "G# Major", "A Major", "A# Major", "B Major",
        "C Minor", "C# Minor", "D Minor", "D# Minor", "E Minor", "F Minor", "F# Minor", "G Minor", "G# Minor", "A Minor", "A# Minor", "B Minor"
    ];
    return validTones.includes(tone);
}


  export {isValidEmail, isValidPassword, isValidUserName, isValidTone}
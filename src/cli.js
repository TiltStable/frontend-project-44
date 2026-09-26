import readlineSync from "readline-sync";

const greetUser = (askName = () => readlineSync.question("May I have your name? ")) => {
  console.log("Welcome to the Brain Games!");
  const userName = askName();
  console.log(`Hello, ${userName}!`);
  return userName;
};

export default greetUser;

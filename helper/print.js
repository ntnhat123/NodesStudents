import chalk from "chalk";
class Print {
  constructor() {
    this.chalk = chalk;
  }
  error(message) {
    console.log(chalk.red(message));
  }
  success(message) {
    console.log(chalk.green(message));
  }
  info(message) {
    console.log(chalk.blue(message));
  }
  warning(message) {
    console.log(chalk.yellow(message));
  }
}
export default new Print();
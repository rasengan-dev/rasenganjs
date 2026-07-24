import chalk from 'chalk';

export const logRedirection = (source: string, destination: string) => {
  const time = new Date().toLocaleTimeString();

  console.log(
    `${chalk.grey(time)} ${chalk.blue('[Rasengan]')} ${chalk.green(
      'REDIRECT'
    )}: ${chalk.grey(source)} ${chalk.green('->')} ${chalk.grey(destination)}`
  );
};

export const logGetRequest = (url: string) => {
  const time = new Date().toLocaleTimeString();

  console.log(
    `${chalk.grey(time)} ${chalk.blue('[Rasengan]')} ${chalk.green(
      'GET'
    )}: ${chalk.grey(url)}`
  );
};

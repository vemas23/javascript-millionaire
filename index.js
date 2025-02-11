#!/usr/bin/env node

// /*
// /$$$$$$$$ /$$$$$$ / $$$$$$$ / $$$$$$$$ / $$$$$$ / $$ / $$ / $$$$$$ / $$$$$$$ / $$
// | $$_____/|_  $$_/| $$__  $$| $$_____/ /$$__  $$| $$  | $$|_  $$_/| $$__  $$|__/
// | $$        | $$  | $$  \ $$| $$      | $$  \__/| $$  | $$  | $$  | $$  \ $$ /$$  /$$$$$$
// | $$$$$     | $$  | $$$$$$$/| $$$$$   |  $$$$$$ | $$$$$$$$  | $$  | $$$$$$$/| $$ /$$__  $$
// | $$__/     | $$  | $$__  $$| $$__/    \____  $$| $$__  $$  | $$  | $$____/ | $$| $$  \ $$
// | $$        | $$  | $$  \ $$| $$       /$$  \ $$| $$  | $$  | $$  | $$      | $$| $$  | $$
// | $$       /$$$$$$| $$  | $$| $$$$$$$$|  $$$$$$/| $$  | $$ /$$$$$$| $$ /$$  | $$|  $$$$$$/
// |__/      |______/|__/  |__/|________/ \______/ |__/  |__/|______/|__/|__/  |__/ \______/
// */

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let spielerName;

const schlafen = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function willkommen() {
  const regenbogenTitel = chalkAnimation.rainbow(
    'Wer wird JavaScript-Millionär? \n'
  );

  await schlafen();
  regenbogenTitel.stop();

  console.log(`
    ${chalk.bgBlue('SO WIRD GESPIELT')} 
    Ich bin ein Prozess auf deinem Computer.
    Wenn du eine Frage falsch beantwortest, werde ich ${chalk.bgRed('beendet')}
    Also beantworte alle Fragen richtig...

  `);
}

async function prüfeAntwort(istKorrekt) {
  const spinner = createSpinner('Antwort wird überprüft...').start();
  await schlafen();

  if (istKorrekt) {
    spinner.success({ text: `Gut gemacht, ${spielerName}. Das ist die richtige Antwort!` });
  } else {
    spinner.error({ text: `💀💀💀💀💀💀💀💀💀💀💀💀 Spiel vorbei, du hast verloren, ${spielerName}!` });
    process.exit(1);
  }
}

async function frageName() {
  const antworten = await inquirer.prompt({
    name: 'spieler_name',
    type: 'input',
    message: 'Wie heißt du?',
    default() {
      return 'Spieler';
    },
  });

  spielerName = antworten.spieler_name;
}

function gewinner() {
  console.clear();
  figlet(`Glückwunsch, ${spielerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');

    console.log(
      chalk.green(
        `Programmieren geht nicht darum, was du weißt, sondern darum, das Terminal cool aussehen zu lassen!`
      )
    );
    process.exit(0);
  });
}

async function frage1() {
  const antworten = await inquirer.prompt({
    name: 'frage_1',
    type: 'list',
    message: 'JavaScript wurde in 10 Tagen erstellt und dann veröffentlicht am\n',
    choices: [
      '23. Mai 1995',
      '24. Nov 1995',
      '4. Dez 1995',
      '17. Dez 1996',
    ],
  });

  return prüfeAntwort(antworten.frage_1 === '4. Dez 1995');
}

async function frage2() {
  const antworten = await inquirer.prompt({
    name: 'frage_2',
    type: 'list',
    message: 'Was ist x? var x = 1_1 + "1" + Number(1)\n',
    choices: ['4', '"4"', '"1111"', '69420'],
  });
  return prüfeAntwort(antworten.frage_2 === '"1111"');
}

async function frage3() {
  const antworten = await inquirer.prompt({
    name: 'frage_3',
    type: 'list',
    message: `Was ist das erste Element im Array? ['🐏', '🦙', '🐍'].length = 0\n`,
    choices: ['0', '🐏', '🐍', 'undefined'],
  });

  return prüfeAntwort(antworten.frage_3 === 'undefined');
}

async function frage4() {
  const antworten = await inquirer.prompt({
    name: 'frage_4',
    type: 'list',
    message: 'Welche der folgenden ist KEIN primitiver Datentyp?\n',
    choices: [
      'boolean',
      'number',
      'null',
      'object', // Korrekt
    ],
  });
  return prüfeAntwort(antworten.frage_4 === 'object');
}

async function frage5() {
  const antworten = await inquirer.prompt({
    name: 'frage_5',
    type: 'list',
    message:
      'JS ist eine hochstufige, einsträngige, speicherbereinigende,\n' +
      'interpretierte (oder just-in-time kompilierte), prototypbasierte,\n' +
      'multi-paradigmatische, dynamische Sprache mit einer ____ Ereignisschleife\n',
    choices: ['mehrsträngig', 'nicht-blockierend', 'synchron', 'versprechensbasiert'],
  });

  return prüfeAntwort(antworten.frage_5 === 'nicht-blockierend');
}

// Starte das Spiel mit top-level await
console.clear();
await willkommen();
await frageName();
await frage1();
await frage2();
await frage3();
await frage4();
await frage5();
gewinner();

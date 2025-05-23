import { main } from "./main.js";

async function run() {
  const multipleAccounts = [
    { region: "EUW1", nameId: "marquesafanacc", hashtag: "EUW" },
    { region: "EUW1", nameId: "TheNameIsMartin", hashtag: "HAHAH" },
    { region: "EUW1", nameId: "Goosy", hashtag: "2828" },
    { region: "EUW1", nameId: "Goosy", hashtag: "123123122828" },
  ];

  await main(multipleAccounts);
}

run();

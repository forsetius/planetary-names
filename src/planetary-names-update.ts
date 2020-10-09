#!/usr/bin/env node
import args from 'args';
import DataRepository from './internals/DataRepository';

const flags = args
  .option('store', 'data store name', 'iau')
  .parse(process.argv);

if (flags.help) {
  args.showHelp();
}

async function main() {
  const store = new DataRepository(flags.store);

  store.close();
}

main();

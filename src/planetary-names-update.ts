#!/usr/bin/env node
import args from 'args';

const flags = args
  .option('store', 'data store name', 'iau')
  .parse(process.argv);

if (flags.help) {
  args.showHelp();
}

async function main() {

}

main();

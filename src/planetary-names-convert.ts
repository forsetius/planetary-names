#!/usr/bin/env node
import args from 'args';

const flags = args
  .option('from', 'directory containing the local data store', './data')
  .option('to', 'celestial body to update', 'all')
  .parse(process.argv);

if (args.sub.length === 0 || flags.help) {
  args.showHelp();
}

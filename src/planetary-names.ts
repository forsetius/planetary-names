#!/usr/bin/env node
import args from 'args';

const flags = args
  .command('convert', 'Convert between local JSON format and either PlanetaryNames\' CSV or Celestia\'s SSC format')
  .command('update', 'Get the latest data from PlanetaryNames and store them locally as JSON')
  .parse(process.argv);

if (args.sub.length === 0 || flags.help) {
  args.showHelp();
}

#!/usr/bin/env node

let os = require('os');
let misc = require('./misc');
let filter = require('./filter');

// Main
async function main(args)
{
    try
    {
        await misc.run(args[0], args.slice(1), null, (line) => console.log(filter(line)));
    }
    catch (err)
    {
        if (err.code)
        {
            process.exit(err.code);
        }
        else
        {
            console.error(`${err.message}`);
            process.exit(7);
        }
    }
}


// Invoke main
main(process.argv.slice(2));


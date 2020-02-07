# sdcc-filter - SDCC Message Fitler for VS Code

sdcc-filter is front-end the [SDCC toolchain](http://sdcc.sourceforge.net) that can filter and normalize its 
output messages to match [VS Code](https://code.visualstudio.com)'s $msCompile format.

sdcc-filter also fully qualifies filenames for easy reference with VS Code's problem matchers.

## Installation

Install with:

    sudo npm install -g sdcc-filter

(Requires Node 8 or later)

## Running

To use, simply run SDCC as normal but preceeed it with the `sdcc-filter` command.

eg:

```
$ sdcc-filter /opt/sdcc/bin/sdcc myfile.c
```


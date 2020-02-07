# sdcc-filter - SDCC Message Fitler for VS Code

sdcc-filter is front-end for launching the SDCC toolchain that can filter and normalize its 
output messages to match VS Code's $msCompile format.

sdcc-filter also qualifies 

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


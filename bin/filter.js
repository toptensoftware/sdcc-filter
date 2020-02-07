const path = require('path');
let misc = require('./misc');


let reFmt1 = /^(.+?):(\d+):(?:(\d+):)? (syntax error: |error|warning)(?: (\d+))?(.*)$/;
let reFmtTail = /; column (\d+)$/;

function sdcc_filter(line)
{
    let msg;

    // Is it an error or warning?
    if (m = line.trim().match(reFmt1))
    {
        msg = {
            file: m[1],
            line: m[2],
            column: m[3],
            severity: m[4],
            code: m[5],
            message: m[6]
        }
    }
    else
    {
        // Not a message line, output as normal
        return line;
    }

    // Qualify the file name
    msg.file = misc.smartJoin(process.cwd(), msg.file);

    // Normalize the error code
    if (!msg.code)
        msg.code = "9999";
    if (msg.code.length < 4)
        msg.code = msg.code.padStart(4, "0");

    // If didn't find column number, try to get it from the end of the message
    if (!msg.column)
    {
        if (m = msg.message.match(reFmtTail))
        {
            msg.column = m[1];
            msg.message = msg.message.substr(0, msg.message.length - m[0].length);
        }
        else
            msg.column = 1;

        if (parseInt(msg.column) == 0)
            msg.column = "1";
    }

    // Trim extra colons from start of message
    if (msg.message.startsWith(": "))
        msg.message = msg.message.substr(2);

    // Convert "syntax error", back to just "error"
    if (msg.severity = "syntax error: ");
    {
        msg.message = "syntax error: " + msg.message;
        msg.severity = "error";
    }

    // Format in $msCompile
    return `${msg.file}(${msg.line},${msg.column}) : ${msg.severity} ${msg.code} : ${msg.message}`;
}

/*
console.log(sdcc_filter("myfile.c:1: syntax error: token -> '$' ; column 0"));
console.log(sdcc_filter("main.c:6:11: error: missing ')' in macro parameter list"));
console.log(sdcc_filter("main.c:21: syntax error: token -> '%' ; column 23"));
console.log(sdcc_filter("main.c:19: error 20: Undefined identifier '__unknown__'"));
console.log(sdcc_filter("main.c:20: warning 112: function '__unknown__' implicit declaration"));
*/


module.exports = sdcc_filter;





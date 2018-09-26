const flags = require('minimist')(process.argv);
const args = flags._
const interpreter = require('./lib/interpreter');
const fs = require('fs');
const tc = require('turbocolor');
let scriptFlag = flags.c || flags.code;
let fileFlag = flags.f || flags.file;

if (!fs.existsSync(fileFlag) && !scriptFlag) {
    console.error('Usage: hl -f <file> or hl -c "your script"')
    process.exit(1);
}

let code;
if (scriptFlag) {
    code = scriptFlag;
} else {
    code = fs.readFileSync(fileFlag).toString();
}

let iout = interpreter.interpret(scriptFlag ? code.split(';') : code.split('\n'));
if (!iout) process.exit();

if (iout.error) {
    console.error(`${tc.red('ERROR:')} ${iout.error}`)
} else {
    console.log(iout.formattedOutput);
}

if (flags.verbose || flags.v) {
    console.log(iout.variables);
}
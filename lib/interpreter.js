const statements = require('./statements')
const ExecutionContext = require('./ExecutionContext')
const HlException = require('./HlException')
const util = require('util');

module.exports = {
    interpret: function(code, options) {
        let ctx = new ExecutionContext();
        options = options || {};
        for (let i = 0; i < code.length; i++) {
            line = code[i].trim();
            if (line.startsWith(']]')) continue; // comment
            let spl = line.split(' ');
            let stm = spl[0].trim();
            if (!stm) continue;
            if (!statements[stm]) return {error: `undefined statement ${stm}\n    at ${options.file || '<script>'} line ${i+1}`}
            try {
                statements[stm](ctx, spl.slice(1));
            } catch(e) {
                if (e instanceof HlException) {
                    return {error: e.message}
                }
            }
        }
        return ctx;
    }
}
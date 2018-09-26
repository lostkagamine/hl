module.exports = class ExecutionContext {
    constructor(variables={}) {
        this.variables = variables
        this.output = [];
    }

    log(msg) {
        this.output.push(msg);
    }

    get formattedOutput() {
        return this.output.join('\n')
    }
}
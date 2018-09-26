module.exports = {
    puts: function(ctx, args) {
        ctx.log(args.join(' '))
    },
    var: function(ctx, args) {
        let t = args.join(' ').split('=')
        ctx.variables[t[0]] = t.slice(1).join(' ')
    },
    putvar: function(ctx, args) {
        // temp until i implement $variable
        ctx.log(ctx.variables[args[0]])
    }
}
import arg from 'arg';

function parseArgs(rawArgs) {
    const args = arg(
        {
            '--decoded': String,
            '--encoded': String,
            '-d': '--decoded',
            '-e': '--encoded'
        },
        {
            argv: rawArgs.slice(2)
        }
    );
    return {
        skipPrompts: args['--decoded'] || '',
        encoded: args['--encoded'] || ''
    }
}

function atob(str) {
    return Buffer.from(str, 'base64').toString('binary');
}

function jwtDecoded (token) {
    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(base64);
}

export function cli (args) {
    let options = parseArgs(args);
    console.log(jwtDecoded(options.skipPrompts));
}
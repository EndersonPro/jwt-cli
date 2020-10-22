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

function forHuman (object) {
    const keys = Object.keys(object);
    if (keys.includes('iat')) {
        object.iat_human = new Date(object['iat']).toISOString()
    }
    return object;
}


const jwtDecoded = (token) => JSON.parse(decodeURIComponent(atob(token.split('.')[1]).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));

export function cli (args) {
    let options = parseArgs(args);
    // console.log(typeof JSON.parse(jwtDecoded(options.skipPrompts)));
    console.log(forHuman(jwtDecoded(options.skipPrompts)));
}
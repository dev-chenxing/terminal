import request from 'request';

const curl = async (args: string[]) => {
    if (args.length === 0) {
        return 'curl: no URL provided';
    }

    const url = args[0];

    request(url, (error, response, body) => {
        if (error) {
            return `curl: Could not resolve host: ${url}. ${error}`;
        }
        return body
    });

}

export default curl
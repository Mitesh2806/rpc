const express = require('express');
const body = require('body-parser');

const app = express();

app.use(body.json());

const port = 3000;

function add(a, b) {
    return a + b;
}

app.post('/rpc', (req, res) => {
    const{ jsonrpc, id, method, params } = req.body;
    if (jsonrpc !== '2.0' || !method || !Array.isArray(params)) {
        res.status(400).json({ jsonrpc: '2.0', error: { code: -32600, message: 'Invalid Request' }, id });
        return;
    }

    // Execute the method
    let result;
    switch (method) {
        case 'add':
            result = add(params[0], params[1]);
            break;
        default:
            res.status(404).json({ jsonrpc: '2.0', error: { code: -32601, message: 'Method not found' }, id });
            return;
    }

    // Send back the response
    res.json({ jsonrpc: '2.0', result, id });
});

// Start the server
app.listen(port, () => {
    console.log(`JSON-RPC server listening at http://localhost:${port}`);
});
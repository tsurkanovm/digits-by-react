export async function getBestResultsFromServer() {
    const response = await fetch('http://fin.local/rest/V1/digits/best');
    const resData = await response.json();

    if (!response.ok) {
        throw Error('Failed to fetch best results');
    }

    return resData;
}

export async function sendResultToServer(time, hits, size) {
    const payload = {
        result: {
            time: time,
            hits: hits,
            size: size,
            customerId: 1,
        }
    };
    const response = await fetch(
        'http://fin.local/rest/V1/digits/save',
        {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    if (!response.ok) {
        throw Error('Failed to send current result to the server');
    }
}
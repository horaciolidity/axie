import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { id } = req.query;
    const response = await fetch(`https://axieinfinity.com/api/v2/axies/${id}`);
    const data = await response.json();
    res.status(200).json(data);
}

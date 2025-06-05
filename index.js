import reasons from './reasons.json' assert { type: 'json' };

export const handler = async () => {
  const reason = reasons[Math.floor(Math.random() * reasons.length)];
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason })
  };
};

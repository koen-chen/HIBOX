export default function handler(req, res) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }

  async function getUser () {
    const baas = useBaas().value
    return await baas.getCurrentUser()
  }

  const user = getUser()

  const name = user ? 'Koen' : 'World'

  res.end(`Hello ${name} !`);
}
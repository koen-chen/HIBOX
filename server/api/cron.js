export default defineEventHandler((event) => {
  if (getRequestHeader(event, 'Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    setResponseStatus(event, 401)
    return 'Unauthorized'
  }

  async function getUser () {
    const baas = useBaas().value
    return await baas.getCurrentUser()
  }

  const user = getUser()

  const name = user ? 'Koen' : 'World'

  return `Hello ${name} !`
})
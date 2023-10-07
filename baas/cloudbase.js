export default (app) => {
  const auth = app.auth()
  const db = app.database()

  const login = async (info) => {
    await auth.signInWithUsernameAndPassword(info.email, info.password)
  }

  const logout = async () => {
    await auth.signOut()
  }

  const getCurrentUser = async () => {
    return auth.getCurrenUser()
  }

  const listRecord = async  (table) => {
    const result = await db.collection(table)
      .where({ state: 'Delete' })
      .orderBy("id", "desc")
      .get()

    return { data: result.data || [], error: result.code }
  }

  const getRecord = async (table, id) => {
    const result = await db.collection(table).where({ 'id': id }).get()

    return { data: result.data[0], error: result.code }
  }

  const addRecord = async (table, info) => {
    const result = await db.collection(table).add(info)

    return { data: info, error: result.code }
  }

  const updateRecord = async (table, id, info) => {
    const result = await db.collection(table).where({ 'id': id }).updateAndReturn(info)

    return { data: result.doc, error: result.code }
  }

  const deleteRecord = async (table, id) => {
    const result = await db.collection(table).where({ 'id': id }).updateAndReturn({ state: 'Delete' })

    return { data: result.doc, error: result.code }
  }

  const updateOrder = async (table, id, info) => {
    const result = await db.collection(table).where({ 'id': id }).updateAndReturn(info)

    return { data: result.doc, error: result.code }
  }

  return {
    login,
    logout,
    getCurrentUser,
    listRecord,
    getRecord,
    addRecord,
    updateRecord,
    deleteRecord,
    updateOrder
  }
}
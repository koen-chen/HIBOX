export default (app) => {
  const auth = app.auth
  const db = app

  const login = async (info) => {
    await auth.signInWithPassword({
      email: info.email,
      password: info.password,
    })
  }

  const logout = async () => {
    await auth.signOut()
  }

  const getCurrentUser = async () => {
    const { data: { user } } = await auth.getUser()
    console.log('user', user)
    return user
  }

  const listRecord = async (table, filter = {}) => {
    let query = db.from(table).select()

    if (filter) {
      Object.keys(filter).forEach(key => {
        if (key == 'neq') {
          query = query.neq(filter[key][0], filter[key][1])
        }

        if (key == 'eq') {
          query = query.eq(filter[key][0], filter[key][1])
        }
      })
    }

    const result = await query.order('id', { ascending: false })

    return { data: result.data || [], error: result.error }
  }

  const getRecord = async (table, id) => {
    const result = await db.from(table)
      .select()
      .eq('id', id)

    return { data: result.data[0], error: result.error }
  }

  const addRecord = async (table, info) => {
    const result = await db.from(table).insert(info)

    return { data: info, error: result.error }
  }

  const updateRecord = async (table, id, info) => {
    const result = await db.from(table)
        .update(info)
        .eq('id', id)
        .select()

    return { data: result.data[0], error: result.error }
  }

  const deleteRecord = async (table, id) => {
    const result = await db.from(table)
        .update({ state: 'Delete' })
        .eq('id', id)
        .select()

    return { data: result.data[0], error: result.error }
  }

  const updateOrder = async (table, id, info) => {
    const result = await db.from(table)
        .update(info)
        .eq('id', id)
        .select()

    return { data: result.data[0], error: result.error }
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


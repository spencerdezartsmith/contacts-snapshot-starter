module.exports = (env) => {
  if (process.env.NODE_ENV === 'development') {
    return 'postgres://localhost:5432/contacts_development'
  } else if (process.env.NODE_ENV === 'test') {
    return 'postgres://localhost:5432/contacts_test'
  }
}

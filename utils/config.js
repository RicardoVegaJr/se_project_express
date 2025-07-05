const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'; // Use environment variable if available, else a default for dev

module.exports = {
  JWT_SECRET,
};
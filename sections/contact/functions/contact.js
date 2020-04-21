// Serverless function signature
exports.handler = (event, _context, callback) => {
  console.log({event})

  // 1st param = error (if no error, then pass null)
  // 2nd thing is JSON
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({boop: true})
  })
}
const jwt = require('jsonwebtoken')

const jwtTest = () => {
    try {
        // create a jwt payload -- the data that is encoded
        const payload = {
            // public user information
            name: 'Allen',
            id: '1234',
            email: 'a@t.com'
            // do not include the password or any secrets in payload!!!
        }
        // 'sign' jwt by supplying a secret to hash in the signature
        const secret = 'my super big secret'
        // jwt.sign({ payload to encode }, 'secret to create signature', { options })
        const token = jwt.sign(payload, secret)
        console.log(token)
        // head (specifies encoding standard for the jwt): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        // payload (encoded data): eyJuYW1lIjoiQWxsZW4iLCJpZCI6IjEyMzQiLCJlbWFpbCI6ImFAdC5jb20iLCJpYXQiOjE2NjUwODIyMzV9.
        // signature (hash of the payload and secret): lryoA01VDilCLyHW_y7R6zh5oFVaYf9SkAUJCm-eCj4

        // signing a token will log a user in
        // jwt.verify(token, 'secret') -- throws an error if it cannot verify (otherwise returns decoded data to us)
        const decode = jwt.verify(token, secret)
        console.log(decode)

        // when we decode jwts we will check the signature to make sure the user's login is valid, this authorizes the user
    } catch (error) {
        console.log(error)
    }
}

jwtTest()
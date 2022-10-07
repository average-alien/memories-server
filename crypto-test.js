const bcrypt = require('bcryptjs')
// const { createHash } = require('crypto')

// const hash = createHash('sha256')
// hash.update('hello')
// const digest = hash.digest('hex')
// console.log('sha256', digest)

const testCrypto = async () => {
    try {
        // when a use is registering, we need to make a hash of their password
        // test password hashing
        const password = 'hello'
        const saltRounds = 12 // how many times we will rehash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        console.log('bcrypt', hashedPassword)

        // when a user is logging in, we need to test the password that they supply against a hash that we have stored in the database
        // test comparing hashes
        // bcrypt.compare('string to match', hash to match)
        const matchPasswords = await bcrypt.compare('sah', hashedPassword)
        console.log(matchPasswords)
    } catch(err) {
        console.warn(err)
    }
}

testCrypto()
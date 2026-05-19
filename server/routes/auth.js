const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('../db')

const router = express.Router()

router.post('/login', async (req, res) => {

  try {

    const { id, password } = req.body

    const [rows] = await db.query(
      'SELECT * FROM users WHERE login_id = ?',
      [id]
    )

    if (!rows.length) {
      return res.status(401).json({
        message: '아이디가 없습니다.'
      })
    }

    const user = rows[0]

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {
      return res.status(401).json({
        message: '비밀번호가 틀렸습니다.'
      })
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    )

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
      },
    })

  } catch (err) {

    console.error(err)

    res.status(500).json({
      message: 'server error',
    })
  }
})

module.exports = router

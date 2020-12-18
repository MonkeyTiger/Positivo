import React, { useState } from 'react'
import { Box, Label, Input, Button, Spinner, Divider, Text } from 'theme-ui'
import firebase from 'gatsby-plugin-firebase'
import { navigate } from 'gatsby'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import * as queryString from 'query-string'

const RegisterForm = () => {
  const params = queryString.parse(window.location.search)
  const [name, setName] = useState('')
  const [email, setEmail] = useState(params.email || '')
  const [phone, setPhone] = useState(params.phone || '')
  const [company, setCompany] = useState('')
  const [idCard, setIdCard] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [invalidIdNumber, setInvalidIdNumber] = useState(false)

  const handleChangeName = e => {
    setName(e.target.value)
  }

  const handleChangeEmail = e => {
    setEmail(e.target.value)
  }

  const handleChangeCompany = e => {
    setCompany(e.target.value)
  }

  const handleChangeIdCard = e => {
    setIdCard(e.target.value)
  }

  const valicationIdNumber = param => {
    const value = String(param)
    if (!/^[1-9]\d{10}$/.test(value)) return false
    const digits = value.split('')
    // store last 2 digits (10th and 11th) which are actually used for validation
    const d10 = Number(digits[9])
    const d11 = Number(digits[10])
    // we'll also need the sum of first 10 digits for validation
    let sumOf10 = 0
    let evens = 0
    let odds = 0
    digits.forEach(function(item, index) {
      let d = Number(item)
      if (index < 10) sumOf10 += d
      if (index < 9) {
        if ((index + 1) % 2 === 0) {
          evens += d
        } else {
          odds += d
        }
      }
    })
    // check if the unit-digit of the sum of first 10 digits equals to the 11th digit.
    if (sumOf10 % 10 !== d11) return false
    // check if unit-digit of the sum of odds * 7 and evens * 9 is equal to 10th digit.
    if ((odds * 7 + evens * 9) % 10 !== d10) return false
    // check if unit-digit of the sum of odds * 8 is equal to 11th digit.
    if ((odds * 8) % 10 !== d11) return false
    return true
  }

  const handleRegister = () => {
    setSubmitted(true)
    const userInfo = {
      name,
      email,
      phone: `+${phone}`,
      company,
      idCard
    }

    if (!valicationIdNumber(idCard)) {
      setInvalidIdNumber(true)
      setSubmitted(false)
    } else {
      setInvalidIdNumber(false)
      firebase
        .firestore()
        .collection('users')
        .add(userInfo)
        .then(res => {
          console.log(res)
          firebase.auth().languageCode = 'tr'

          window.registerRecaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            'register',
            {
              size: 'invisible',
              callback: function(response) {}
            }
          )

          firebase
            .auth()
            .signInWithPhoneNumber(
              `+${phone}`,
              window.registerRecaptchaVerifier
            )
            .then(function(confirmationResult) {
              setSubmitted(false)
              window.confirmationResult = confirmationResult
              navigate('/verify/phone')
            })
        })
    }
  }

  return (
    <>
      <Box variant='forms.row'>
        <Box variant='forms.column'>
          <Label htmlFor='name'>Adınız Soyadınız</Label>
          <Input
            type='text'
            id='name'
            value={name}
            onChange={handleChangeName}
          />
        </Box>
        <Box variant='forms.column'>
          <Label htmlFor='company'>Kurumunuz</Label>
          <Input
            type='text'
            id='company'
            value={company}
            onChange={handleChangeCompany}
          />
        </Box>
      </Box>
      <Box variant='forms.row'>
        <Box variant='forms.column'>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            value={email}
            id='email'
            onChange={handleChangeEmail}
            placeholder='email@example.com'
          />
        </Box>
        <Box variant='forms.column'>
          <Label htmlFor='id-card'>TC Kimlik Numaranız</Label>
          <Input
            type='text'
            value={idCard}
            onChange={handleChangeIdCard}
            id='id-card'
          />
          {invalidIdNumber && (
            <Text style={{ color: 'red' }}>Geçersiz kimlik no</Text>
          )}
        </Box>
      </Box>
      <Box variant='forms.row'>
        <Label htmlFor='phone'>Cep Telefonu</Label>
        <PhoneInput
          country={'tr'}
          inputStyle={{
            background: '#e2e8f0',
            border: 'none',
            height: '44px',
            width: '100%'
          }}
          id='phone'
          value={phone}
          onChange={setPhone}
        />
      </Box>
      <Divider />
      <Button type='button' id='register' onClick={handleRegister}>
        Kayıt Ol {submitted && <Spinner size='20' />}
      </Button>
      <Text style={{ marginTop: '10px' }}>
        Önceden kayıt oldunuz mu?
        <span
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            marginLeft: '5px'
          }}
          onClick={() => navigate('/login')}
        >
          Giriş yapın
        </span>
      </Text>
      <Text>
        Kayıt olarak gizlilik ve çerez politikamızı kabul etmiş olursunuz.
        <span
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            marginLeft: '5px'
          }}
          onClick={() => navigate('/privacy')}
        >
           Ayrıntılı okuyun
        </span>
      </Text>
    </>
  )
}

export default RegisterForm

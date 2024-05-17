"use client"

import { useState } from "react";
import styles from "./login.module.css"
import { Input, Button } from "@medusajs/ui";
import { useAdminLogin } from "medusa-react"
import { useRouter } from 'next/navigation'


export default function Home() {
  const adminLogin = useAdminLogin()
  const router = useRouter()
  
  const [loginError, setLoginError] = useState('')
  const [formData, setFormData] = useState({
    username:'',
    password:''
  })

  function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
    adminLogin.mutate({
      email: formData.username,
      password: formData.password,
    }, { onSuccess: () => {
      console.log("logged in")
      router.push('/')
    }, onError: (e) => {
      const error = e.response.data
      console.log(error)
      setLoginError(error)
    }})
  }

  return (
    <main className={styles.main}>
        <form action="" method="post" onSubmit={handleSubmit}>
          <Input type="text" placeholder="Username" name="username" value={formData.username} onChange={e => {setFormData({...formData, username:e.currentTarget.value})}}/>
          <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={e => {setFormData({...formData, password:e.currentTarget.value})}} />
          <Button>Log In</Button>
          {loginError && <span className={styles.errorMessage}>{loginError.message || loginError}</span>}
        </form>
    </main>
  );
}

"use client";
import styles from './page.module.css'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'


export default function Home() {

  const [prompt, setPrompt] = useState('')
  const [imageSize, setImageSize] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: any) {
    e.preventDefault();
    setImageUrl('')
    if (prompt === '' || imageSize === '') {
      toast('Prompt and Image size is required')
    }
    try {
      setLoading(true)
      const res = await fetch('/api/openai/generateimage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
          imageSize
        })
      })
      let { data,error } = await res.json()

       if (error) {
        toast.warn(error)
       } else {
        setImageUrl(data)
       }

    } catch (err: any) {
      toast.warn(err.message)
    }
     
    setLoading(false)
  }

  return (
    <main className={styles.main}>
      <form onSubmit={onSubmit} className={styles.form}>
        <input className={styles.prompt} type='text' onChange={e => setPrompt(e.target.value)} value={prompt} placeholder='Please tell us what image to create '></input>

        <select  className={styles.imageSize} onChange={e => setImageSize(e.target.value)} value={imageSize}>
          <option value="">Select Image Size ---  </option>
          <option value='small'>Small</option>
          <option value='medium'> Medium</option>
          <option value='large'>Large</option>
        </select>

        <input className={styles.submit} type='submit' value='Create Image' />

        {loading && <p className={styles.center}> Generating Image ... </p>}  
        {imageUrl&& 
        <div className={styles.center}>
          <img src={imageUrl} alt='image'></img>
          </div>}
        
      </form>
      <ToastContainer 
         progressClassName={styles.toastProgress}
         bodyClassName={styles.toastBody}
      />
    </main>
  )
}

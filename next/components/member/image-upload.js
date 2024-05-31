import { object } from 'prop-types'
import { useState } from 'react'

export default function ImageUpload() {
  //記錄選中的檔案
  const [selectedFile, setSelectedFile] = useState(null)
  // 預覽圖片的網址(呼叫URL.createObjectURL)
  const [previewUrl, setPreviewUrl] = useState('')

  const handleFileChange = (e) => {
    // 取得檔案，只取第一個檔
    const file = e.target.files[0]

    console.log(file)

    // 如果有檔案時
    if (file) {
      setSelectedFile(file)
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
    } else {
      setSelectedFile(file)
      setPreviewUrl('')
    }
  }

  // POST http://localhost:5555/upload-avatar
  const handleFileUpload = async () => {
    const fd = new FormData()
    // 對照伺服器上要獲取的檔案名稱(req.files.avatar)
    fd.append('avatar', selectedFile)

    // 用fetch送至伺服器
    const res = await fetch('http://localhost:5555/upload-avatar', {
      method: 'POST',
      body: fd,
    })

    const data = await res.json()

    console.log(data)
  }

  return (
    <>
      <h1>圖片上傳與預覽</h1>
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={handleFileUpload}>上傳</button>
      <br />
      <h3>預覽</h3>
      <img src={previewUrl} />
      <p>檔名: {selectedFile && selectedFile.name}</p>
      <p>大小: {selectedFile && selectedFile.size}</p>
      <p>類型: {selectedFile && selectedFile.type}</p>
    </>
  )
}

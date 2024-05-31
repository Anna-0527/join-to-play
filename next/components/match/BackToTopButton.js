import { useEffect, useState } from 'react'

function BackToTopButton() {
  const [backToTopButton, setBackToTopButton] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true)
      } else {
        setBackToTopButton(false)
      }
    })
  }, [])
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {backToTopButton && (
        <button
          className="btn btn-dark my-0 px-2"
          style={{
            position: 'fixed',
            bottom: '50px',
            right: '50px',
            fontSize: '20px',
          }}
          onClick={scrollUp}
        >
          TOP
        </button>
      )}
    </>
  )
}

export default BackToTopButton

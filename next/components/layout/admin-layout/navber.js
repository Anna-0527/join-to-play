import React from 'react'

export default function Navbar() {
  return (
    <>
      <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
        <a
          href="#/"
          className="d-flex align-items-center text-body-emphasis text-decoration-none"
        >
          <svg className="bi me-2" width="40" height="32">
            <use xlinkHref="#bootstrap" />
          </svg>
          <span className="fs-4">Starter template</span>
        </a>
      </header>
    </>
  )
}

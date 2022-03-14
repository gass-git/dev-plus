import React from 'react'
import MainContent from './mainContent'
import { ScrollDisplay, MainMenu, BasicInfo, FooterContent, Links } from '../utilities/componentsImports'

export default function Layout() {
  return (
    <>
      <main className="main-wrapper" data-aos="zoom-in" data-aos-duration="500">

        <section className="first-row">
          <ScrollDisplay />
        </section>

        <section className="second-row">
          <div className="left-side">
            <MainMenu />
          </div>
          <div className="right-side">
            <BasicInfo />
          </div>
        </section>

        <section className="third-row">
          <MainContent />
        </section>

        <section className="fourth-row">
          <Links />
        </section>
      </main>

      <footer>
        <FooterContent />
      </footer>
    </>
  )
}
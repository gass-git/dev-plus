import React from 'react'
import MainContent from './mainContent'
import Scroller from '../components/scroller/scroller'
import MainMenu from '../components/mainMenu/mainMenu'
import BasicInfo from '../components/basicInfo/basicInfo'
import FooterContent from '../components/footerContent/footerContent'
import Links from '../components/links/links'

export default function Layout() {
  return (
    <>
      <main className="main-wrapper" data-aos="zoom-in" data-aos-duration="500">

        <section className="first-row">
          <Scroller />
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
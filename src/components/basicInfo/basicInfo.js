import React, { useContext } from "react"
import ReactTooltip from "react-tooltip"
import './basicInfo.css'
import avatar from "../../assets/images/avatar.png"
import { AppContext } from "../../App"
import ReputationData from "./ReputationData"

export default function BasicInfo() {
  const { state } = useContext(AppContext)
  const { reputation } = state

  return [
    <section key="basic-info-identifier" className="basic-info">
      <div className="border-img">

        <div className="inner-container">

          <div className="avatar-wrapper">
            <img src={avatar} alt="" title="Pixel art made by Eric Barone" />
          </div>

          <ReactTooltip />

          {/* -- Avatar & username -- */}
          <div className="username-wrapper">
            <div className="username">
              GASS
            </div>
            <div className="sub-username">
              Programmer
            </div>
          </div>

          {/* -- Profile summary -- */}
          <div className="info">
            <div>
              <label>Studies</label>
              <data>Engineering</data>
            </div>
            <div>
              <label>Started Coding</label>
              <data>2006</data>
            </div>
            <div>
              <label>Turned Pro</label>
              <data>2020</data>
            </div>
            <div>
              <label data-tip="Stack Overflow reputation">SO Points</label>
              <data>
                <ReputationData reputation={reputation} />
              </data>
            </div>
          </div>

        </div>
      </div>
    </section>
  ]
}
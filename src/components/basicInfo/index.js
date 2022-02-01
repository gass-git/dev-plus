import React from "react";
import ReactTooltip from "react-tooltip";
import './basicInfo.css';
import avatar from "../../assets/images/avatar.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";


export default function BasicInfo({ reputation, space1 }) {
  const spacer = <span>&nbsp;&nbsp;</span>

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
              Web Artisan
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
              <data>2004</data>
            </div>
            <div>
              <label>Turned Pro</label>
              <data>2020</data>
            </div>
            <div>
              <label data-tip="Stack Overflow reputation">SO Points</label>
              <data>
                <label data-tip="Total">{reputation.total} {spacer}</label>
                {
                  reputation.total > 0 ?
                    <FontAwesomeIcon icon={faArrowUp} className="icon-green shadow-04" />
                    :
                    <FontAwesomeIcon icon={faArrowDown} className="icon-red shadow-04" />
                }
                {spacer}
                <span style={{ cursor: "default" }} data-tip="Month change">
                  {reputation.monthChange}
                </span>
              </data>
            </div>
          </div>

        </div>
      </div>
    </section>
  ]
}
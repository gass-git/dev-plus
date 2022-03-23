import React from 'react'
import { space2 } from '../../utilities/spaces'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons"
import './loader.css'

export default function ReputationData({ reputation }) {

  if (reputation.total === undefined) {
    return <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  }
  else return (
    <>
      <label data-tip="Total">{reputation.total}{space2}</label>
      {
        reputation.monthChange >= 0 ?
          <FontAwesomeIcon icon={faArrowUp} className="icon-green shadow-04" />
          :
          <FontAwesomeIcon icon={faArrowDown} className="icon-red shadow-04" />
      }
      {space2}
      <span style={{ cursor: "default" }} data-tip="Month change">
        {reputation.monthChange}
      </span>
    </>
  )
}

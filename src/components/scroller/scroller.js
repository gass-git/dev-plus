import { Fragment, useContext } from 'react'
import { AppContext } from '../../App'
import s from './scroller.module.css'

export default function ScrollDisplay() {
    const { state } = useContext(AppContext)
    const {
        lastCommit,
        lastAnswer,
        lastPost,
        uniqueVisits,
        userLocation,
        scrollerSwitch,
        msgIndex
    } = state

    let messages = [
        <Fragment>
            Welcome fellow visitor from {userLocation ? userLocation : "Planet Earth"}!
            I'm glad you came by, feel free to take a look around...
        </Fragment>,
        <Fragment>
            Last Github commit - {lastCommit.message} (repo: {lastCommit.repo})
            &nbsp; {lastCommit.date} {lastCommit.time}
        </Fragment>,
        <Fragment>
            Last blog post - {lastPost.title}
        </Fragment>,
        <Fragment>
            Latest on Stack Overflow - {lastAnswer}
        </Fragment>,
        <Fragment>
            Unique visitors to date: {uniqueVisits} and counting...
        </Fragment>,
        <Fragment>
            Web app using: Reactjs, FontAwesome, AOS, SVG Backgrounds, Axios & Use Sound...
        </Fragment>
    ]

    return [
        <section key='scroller-key'>
            <div className={s.border_img}>
                <div className={s.inner_container}>
                    <div className={s.msg_display}>
                        {
                        scrollerSwitch === 'on' ?
                        <div className={s.scroll_text}>
                            {messages[msgIndex]}
                        </div>
                        :
                        null
                        }
                    </div>
                </div>
            </div>
        </section>
    ]
}
import React, { useContext } from 'react'
import { Fragment } from 'react'
import { AppContext } from '../../../App'

export default function GithubEvents({ gitEvents }) {
  const { space3 } = useContext(AppContext)

  return (
    <Fragment key='git-identifier'>
      <div className='sub-title'>
        LATEST COMMITS
      </div>
      <div className='container'>
        {
          gitEvents.map((data) => {
            let repoURL = `https://github.com/${data.repo.name}/commits/master`

            return (
              <a
                key={data.id}
                href={repoURL}
                className='block'
                target='_blank'
                rel='noreferrer'
                title='See details on GitHub'
              >
                <div className='events-date'>
                  {data.created_at.slice(0, 10)}
                </div>
                <div className='commit'>
                  {data.payload.commits[0].message}
                </div>
                {space3}
                <div className='repo-name' title='Repository name'>
                  {data.repo.name.slice(9)}
                </div>
              </a>
            )
          })
        }
      </div>
    </Fragment>
  )
}
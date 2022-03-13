import { getAnswers, getReputation, getSkillScores } from './api/stackOverflow'
import { getRepos, getGitEvents } from './api/github'
import { processVisit, getUniqueVisits, getUserLocation } from './api/visits'
import getWritings from './api/getWritings'

export { getAnswers, getReputation, getSkillScores, getRepos, getGitEvents, processVisit, getUniqueVisits, getUserLocation, getWritings } 
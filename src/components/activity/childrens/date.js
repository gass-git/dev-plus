export default function Date({ entry }) {
  let x = new window.Date(entry * 1000)
  let year = x.getFullYear()
  let month = x.getMonth() + 1
  let day = x.getDate()

  if (day < 10) day = `0${day}`
  if (month < 10) month = `0${month}`

  return `${year}-${month}-${day}`
}


export const fetchAPI = (path: string) => {
  return fetch(`https://www.dnd5eapi.co/api/${path}`)
}

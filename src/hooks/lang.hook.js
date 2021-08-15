import { useCallback, useEffect, useState } from "react"
import { LANG } from "../lang/lang"

export const useLang = () => {

  const currentLang = localStorage.getItem('lang')
  const [lang, setLang] = useState('')

  const createLang = useCallback((language) => {
    if(!language) {
      setLang('RU')
      localStorage.setItem('lang', lang)
    } else {
      setLang(language)
    }
  }, [lang])

  const renderText = (lang) => lang === 'EN' ? LANG.EN : LANG.RU;

  const setNewLang = (lang) => {
    setLang(lang)
    localStorage.setItem('lang', lang)
  }

  useEffect(() => {
    createLang(currentLang)
  }, [currentLang, createLang])


  return { lang, renderText, setNewLang }

}
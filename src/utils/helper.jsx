import dateFormat from "dateformat"

export const setLocalData = (key, data) => {
    localStorage.setItem([key], JSON.stringify(data))
}

export const getLocalData = (key) => {
    let data = localStorage.getItem([key])

    if (!data)
        return []
    return JSON.parse(data)
}


export const dateTime = (date = new Date()) => {
    return dateFormat(date, "ddd, mmm dS, yyy, h:MM TT")
}

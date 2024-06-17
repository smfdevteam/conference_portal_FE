import { api } from "./api"

const getHymnsTitles = async () => {
    try {
        const hymns = await api.get('/hymns')
        return hymns.data
    } catch (e) {
        throw new Error(e.message)
    }
}

export {getHymnsTitles}

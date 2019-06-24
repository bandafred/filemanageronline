export default {
    state: {
        viewText: false,
        viewImag: false,
        fileInfo: ''
    },
    mutations: {
        falseAll(state) {
            state.viewImag = false
            state.viewText = false
        },
        setViewText(state, payload) {
            state.viewText = payload
        },
        setViewImag(state, payload) {
            state.viewImag = payload
        },
        setFileInfo(state, payload) {
            state.fileInfo = payload
        },

    },
    actions: {
        SetViewText(state, payload) {
            state.commit('falseAll')
            state.commit('setViewText', payload)
        },
        SetViewImag(state, payload) {
            state.commit('falseAll')
            state.commit('setViewImag', payload)
        },
        SetFileInfo(state, payload) {
            state.commit('setFileInfo', payload)
        },
    },
    getters: {
        getViewText(state) {
            return state.viewText
        },
        getViewImag(state) {
            return state.viewImag
        },
        getFileInfo(state) {
            return state.fileInfo
        },
    }
}
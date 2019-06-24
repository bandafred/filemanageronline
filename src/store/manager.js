import { BASE_URL_UploadFile } from '@/plugins/common.js'
import { BASE_URL } from '@/plugins/common.js'

export default {
    state: {
        filesPath: '',
        filesInfo: [],
    },
    mutations: {
        setFilesPath(state, payload) {
            state.filesPath = payload
        },
        setFilesInfo(state, payload) {
            state.filesInfo = payload
        },
    },
    actions: {
        async GetFilesPath(state) {
            const result = await BASE_URL.get('FileManager/GetFilesPath')
            await state.commit('setFilesPath', result.data)
        },
        async GetFilesInfo(state) {
            const result = await BASE_URL.get('FileManager/GetFilesInfo')
            await state.commit('setFilesInfo', result.data)
        },
        async UploadFile(state, file) {
            await BASE_URL.post('FileManager/UploadFile', file)
            const result = await BASE_URL.get('FileManager/GetFilesInfo')
            await state.commit('setFilesInfo', result.data)
        },
        async DeleteFile(state, file) {
            await BASE_URL_UploadFile.delete('FileManager/DeleteFile?file=' + file)
            const result = await BASE_URL.get('FileManager/GetFilesInfo')
            await state.commit('setFilesInfo', result.data)
        },
    },
    getters: {
        getFilesPath(state) {
            return state.filesPath
        },
        getFilesInfo(state) {
            return state.filesInfo
        },
    }
}
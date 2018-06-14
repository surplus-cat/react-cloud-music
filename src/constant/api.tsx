import { compile } from 'path-to-regexp'

type Iapi = string & {
  path: string
}

type Iapis = {
  banner: Iapi
  recommendList: Iapi
  recommendSong: Iapi
  songDetail: Iapi
  playlist: Iapi
  songUrl: Iapi
}

const ProxyHost = '/api'

const NETEASE_API = {
  banner: '/banner', // 轮播图
  recommendList: '/personalized', // 推荐歌单
  recommendSong: '/personalized/newsong', // 推荐歌曲
  songDetail: {
    // 歌曲详情
    path: '/song/detail?ids=:ids'
  },
  // 歌单详情
  playlist: {
    path: '/playlist/detail?id=:id'
  },
  // 歌曲URL
  songUrl: {
    path: 'http://music.163.com/song/media/outer/url?id=:id.mp3 '
  }
}

const addHost = (APIs, hostPath) => {
  const ApiWithPrefix = {} as Iapis
  Object.keys(APIs).forEach(key => {
    if (typeof APIs[key] === 'string') {
      ApiWithPrefix[key] = `${hostPath}${APIs[key]}`
    } else {
      ApiWithPrefix[key] = {
        path: `${hostPath}${APIs[key].path}`
      }
    }
  })
  console.log(ApiWithPrefix)
  return ApiWithPrefix
}

export const getURL = (API: any, params?) => {
  // simple API
  if (!params) {
    return API
  }
  // complex API
  const toPath = compile(`${API.path}`)
  return toPath(params)
}

export default addHost(NETEASE_API, ProxyHost)
const { sep, dirname } = require('path')
const { writeFileSync, copyFileSync, constants, existsSync, mkdirSync, readFileSync } = require('fs')
const chokidar = require('chokidar')
const { parse } = require('yaml')

const pages = () => {
  // 当前是开发模式还是调试模式
  let mode = 'development'
  // 监听程序是否加载完成
  let ready = false
  const createRouter = watcher => {
    if (!ready) {
      return
    }
    const watched = watcher.getWatched()
    const list = Object.keys(watched)
      .filter(key => {
        if (!watched[key].includes('index.js')) {
          return false
        }
        return true
      })
      .map(key => {
        const paths = key.split(sep)
        return paths.slice(-2)
      })
    const template = `import { registerRoutes } from 'duxweb'
    
${list.map(v => `import { duxwebData as ${v[1]}${v[0]} } from './app/${v[0]}/${v[1]}'`).join('\n')}

registerRoutes([
  ${list.map(v => `['${v[1]}', '${v[0]}', ${v[1]}${v[0]}.route, ${v[1]}${v[0]}.routeConfig]`).join(',\n  ')}
])

${false ? `menu.registerMenus([
  ${list.map(v => `['${v[1]}', '${v[0]}', ${v[1]}${v[0]}.menu]`).join(',\n  ')}
])`: ''}
`
    writeFileSync('./client/autoInit.js', template, { encoding: 'utf8' })
    if (mode !== 'development') {
      watcher.close()
    }
  }
  return {
    name: 'vite-plugin-duxweb-page',
    config(config, env) {
      mode = env.mode
    },
    buildStart() {
      const watcher = chokidar.watch('./client/app/*/*/index.js', {
        ignored: [],
        persistent: true
      })

      watcher.on('ready', () => {
        ready = true
        createRouter(watcher)
      })
      watcher.on('add', file => {
        createRouter(watcher)
      })
      watcher.on('unlink', file => {
        createRouter(watcher)
      })
    },
    configureServer(server) {
      // server.ws.on('route-list-change', (data, client) => {
      // })
    }
  }
}

const copy = () => {
  // 当前是开发模式还是调试模式
  let mode = 'development'

  function mkdirsSync(dir) {
    if (existsSync(dir)) {
      return true
    } else {
      if (mkdirsSync(dirname(dir))) {
        mkdirSync(dir)
        return true
      }
    }
  }
  const editFile = file => {
    const [, app, , ...dir] = file.split(sep)
    const destApp = app[0].toLocaleLowerCase() + app.substring(1)
    const dest = `./client/app/${destApp}/${dir.join('/')}`.split('/')
    mkdirsSync(dest.slice(0, dest.length - 1).join('/'))
    copyFileSync(`./app/${app}/Client/${dir.join('/')}`, dest.join('/'), constants.COPYFILE_FICLONE)
  }
  return {
    name: 'vite-plugin-duxweb-copy',
    config(config, env) {
      mode = env.mode
    },
    buildStart() {
      const watcher = chokidar.watch('./app/*/Client/**/*.*', {
        ignored: [],
        persistent: true
      })
      watcher.on('change', file => {
        editFile(file)
      })
      watcher.on('add', file => {
        editFile(file)
      })
      watcher.on('unlink', file => {
        editFile(file)
      })
      if (mode !== 'development') {
        setTimeout(() => {
          watcher.close()
        }, 3000)
      }
    }
  }
}

const config = option => {
  let mode = ''
  return {
    name: 'vite-plugin-duxweb-config',
    config(config, env) {
      mode = env.mode
    },
    buildStart() {
      const configs = ['client', 'use'].map(name => {
        let config = {}
        const url = `./config/${name}.yaml`
        const devUrl = `./config/${name}.dev.yaml`
        if (mode === 'development' && existsSync(devUrl)) {
          config = parse(readFileSync(devUrl, { encoding: 'utf8' }))
        } else if (existsSync(url)) {
          config = parse(readFileSync(url, { encoding: 'utf8' }))
        }
        // use 只读取链接地址 调试模式使用代理，不生成请求地址
        if (name === 'use' && config.app) {
          config = {
            app: {
              domain: option?.app?.domain ?? config.app.domain,
              websocket: option?.app?.websocket ?? config.app.websocket
            }
          }
          if (!option?.disableProxy) {
            if (mode === 'development') {
              config.app.domain = ''
            }
          }
          if (typeof config.app.domain !== 'string') {
            config.app.domain = ''
          }
        }
        return [name, config]
      })

      writeFileSync('./client/config.json', JSON.stringify(Object.fromEntries(configs), null, 2), { encoding: 'utf8' })
    }
  }
}

module.exports = options => [copy(), pages(), config(options?.config)]
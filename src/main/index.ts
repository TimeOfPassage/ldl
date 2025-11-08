import { app } from 'electron'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import WindowManager from './window_manager'
import IPCManager from './ipc_manager'
import { join } from 'path'
import { IWindowOptions } from './types/windows'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  // 监听浏览器窗口创建事件 优化窗口快捷键
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // 注册 IPC 事件
  IPCManager.INSTANCE.register('ping', () => console.log('pong'))
  IPCManager.INSTANCE.register('window:create', (e, options: IWindowOptions) => {
    console.log('window:create', e, options);
    WindowManager.createWindow(options)
  });
  IPCManager.INSTANCE.register('window:close', (e, options: IWindowOptions) => {
    console.log('window:close', e, options);
    WindowManager.closeWindow(options.title)
  })
  IPCManager.INSTANCE.register('window:show', (e, options: IWindowOptions) => {
    console.log('window:show', e, options);
    WindowManager.showWindow(options.title)
  })
  IPCManager.INSTANCE.register('window:hide', (e, options: IWindowOptions) => {
    console.log('window:hide', e, options);
    WindowManager.hideWindow(options.title)
  });

  // 确定渲染进程 URL
  let url = "";
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    url = process.env['ELECTRON_RENDERER_URL'];
  } else {
    url = join(__dirname, `../renderer/index.html`);
  }

  // 创建主窗口
  const options = {
    title: "login",
    width: 860,
    height: 600,
    url,
  }
  WindowManager.createWindow(options);

  // 当应用激活时 判断是否存在窗口 如果不存在则创建主窗口
  app.on('activate', function () {
    if (WindowManager.size() === 0) {
      WindowManager.createWindow(options);
    }
  })
})

// 当所有窗口都关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
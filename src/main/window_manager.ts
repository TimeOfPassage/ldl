import { BrowserWindow, shell, screen } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { IWindowOptions } from './types/windows'

class WindowManager {
    private static _instance: WindowManager
    public static get INSTANCE(): WindowManager {
        if (!WindowManager._instance) {
            WindowManager._instance = new WindowManager()
        }
        return WindowManager._instance
    }

    // 窗口管理，记录窗口名称和窗口实例，同时还需要记录父级窗口名称
    // key: 窗口名称，value: 窗口实例
    private windows: Map<string, BrowserWindow> = new Map()
    // key: 子窗口名称，value: 父窗口名称
    private parentWindowsName: Map<string, string> = new Map()

    private constructor() { }

    public createWindow(options: IWindowOptions): BrowserWindow {
        const name = options.title;
        let window = this.getWindow(name)
        if (window && !window.isDestroyed()) {
            window.focus()
            return window
        }
        // 获取当前鼠标位置
        const { x, y } = screen.getCursorScreenPoint()
        // 获取该坐标所在的屏幕
        const display = screen.getDisplayNearestPoint({ x, y })
        // 可选：打印当前屏幕信息，调试用
        console.log('Mouse is on display:', display.bounds)
        window = new BrowserWindow({
            width: options.width,
            height: options.height,
            show: options.show || false,
            // 窗口显示在当前鼠标所在屏幕上的中心位置
            x: (display.bounds.width - options.width) / 2 + display.bounds.x,
            y: (display.bounds.height - options.height) / 2 + display.bounds.y,
            autoHideMenuBar: options.autoHideMenuBar || true,
            ...(process.platform === 'linux' ? { icon } : {}),
            titleBarStyle: options.titleBarStyle || 'hidden',
            webPreferences: {
                preload: join(__dirname, '../preload/index.js'),
                sandbox: false
            }
        })

        window.on('ready-to-show', () => {
            // 如果窗口不可见，则调用show显示
            if (!options.show) {
                window.show();
            }
        })

        // 处理窗口打开外部链接事件
        window.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url)
            return { action: 'deny' }
        })

        const url = options.url

        if (url.startsWith('http') || url.startsWith('https')) {
            window.loadURL(url)
        } else {
            window.loadFile(url)
        }

        window.on('close', () => {
            console.log(name, 'close window');
            // 关闭子窗口时，需要向父窗口发送关闭事件
            const parentName = this.parentWindowsName.get(name)
            if (parentName) {
                const willCloseWindow = this.getWindow(parentName)
                if (willCloseWindow) {
                    console.log('name', name);
                    willCloseWindow.webContents.send('window:close', { title: name })
                }
            }
            this.windows.delete(name)
        });

        window.on('closed', () => {
            console.log(name, 'closed window');
            this.windows.delete(name)
        });

        this.windows.set(name, window);
        if (options.parent) {
            this.parentWindowsName.set(name, options.parent)
        }
        return window
    }

    public getWindow(name: string): BrowserWindow | undefined {
        return this.windows.get(name)
    }

    public closeWindow(name: string): void {
        const window = this.windows.get(name)
        if (window) {
            window.close()
            this.windows.delete(name)
        }
    }

    public showWindow(name: string): void {
        const window = this.windows.get(name)
        if (window) {
            window.show()
        }
    }

    public hideWindow(name: string): void {
        const window = this.windows.get(name)
        if (window) {
            window.hide()
        }
    }

    public closeAll(): void {
        for (const window of this.windows.values()) {
            window.close()
        }
        this.windows.clear()
    }

    public size(): number {
        return this.windows.size
    }
}

export default WindowManager.INSTANCE
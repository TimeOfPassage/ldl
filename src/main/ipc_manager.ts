import { ipcMain } from "electron"

class IPCManager {
    private static _instance: IPCManager
    public static get INSTANCE(): IPCManager {
        if (!IPCManager._instance) {
            IPCManager._instance = new IPCManager()
        }
        return IPCManager._instance
    }

    private constructor() { }

    public register(event: string, listener: (event: Electron.IpcMainEvent, ...args: any[]) => void) {
        ipcMain.on(event, listener)
    }
}

export default IPCManager
import { useEffect } from 'react'
import logo from './assets/electron.svg'

function App(): React.JSX.Element {
  const openNewWin = (): void => {
    window.electron.ipcRenderer.send('window:hide', { title: "login" })
    window.electron.ipcRenderer.send('window:create', {
      title: "openBaidu",
      parent: "login",
      width: 860,
      height: 600,
      show: true,
      titleBarStyle: 'default',
      url: "https://www.baidu.com",
    })
  }

  useEffect(() => {
    // 监听窗口关闭事件
    window.electron.ipcRenderer.on('window:close', (e, options: any) => {
      console.log('e', e, options);
      if (options.title === "openBaidu") {
        window.electron.ipcRenderer.send('window:show', { title: "login" })
      }
    })
  }, [])

  return (
    <div className='w-full h-screen flex flex-row'>
      <div className="w-[46%] h-full flex flex-col items-center justify-center bg-linear-to-br from-white to-[#77b2fd] drag">
        <div className="w-14 h-14 rounded-full shadow-2xl">
          <img src={logo} alt="logo" className='w-full h-full' />
        </div>
        <div className="flex flex-col justify-center items-center font-extralight text-2xl mt-4">
          SeaBox 测试助手
          <div className="font-extralight text-sm mt-4">
            一站式电商跨境解决方案
          </div>
        </div>
        <div className="w-4/5 h-14 bg-[#d5e8fe] rounded flex items-center justify-row mt-8 relative z-10">
        </div>
        <div className="w-4/5 h-14 bg-[#d5e8fe] rounded flex items-center justify-row mt-8 relative z-10">
        </div>
        <div className="w-4/5 h-14 bg-[#d5e8fe] rounded flex items-center justify-row mt-8 relative z-10">
        </div>
      </div>
      <div className="flex-1 h-full flex flex-col items-center justify-start pt-4">
        <div className="w-full h-10 flex flex-row justify-between items-center p-2">
          <div className="flex-1"></div>
          <div className="w-18 h-fit flex flex-row justify-between items-center no-drag">
            <div
              className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-black/50 cursor-pointer text-sm select-none'
              onClick={openNewWin}
            >中</div>
            <div className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-black/50 cursor-pointer text-sm select-none'>光</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="title">欢迎使用</div>
          <div className="my-6">
            一站式电商跨境解决方案
          </div>
          <div className="input"></div>
          <div className="btn"></div>
        </div>
      </div>
    </div>
  )
}

export default App

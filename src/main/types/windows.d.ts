export interface IWindowOptions {
    // 窗口标题
    title: string
    // 父窗口名称
    parent?: string 
    // 宽
    width: number
    // 高
    height: number
    // 窗口打开URL
    url: string
    // 是否立即显示, 默认不立即打开，等ready好在打开
    show?: boolean = false
    // 标题bar样式
    titleBarStyle?: ('default' | 'hidden' | 'hiddenInset' | 'customButtonsOnHover')
    // 是否自动隐藏menubar
    autoHideMenuBar?: boolean
}
export const isVercelProd = typeof window !== 'undefined' && 
                           window.location.host.includes('vercel.app')

export const forceReload = () => {
  if (isVercelProd) {
    // 在Vercel环境强制刷新以确保加载完整i18n
    if (!sessionStorage.getItem('i18n_loaded')) {
      sessionStorage.setItem('i18n_loaded', '1')
      window.location.reload()
    }
  }
}

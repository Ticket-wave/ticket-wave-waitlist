import Layout from '@/components/Layout'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { IToastOptions } from '../components/models/toastOptions';
import { ToastMessageType } from '../components/models/ToastMessageType';
import { ToastContext } from '../extensions/toast';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {

  const [toastOptions, setToastOptions] = useState<IToastOptions>({
    type: ToastMessageType.Info,
    title: 'Welcome',
    description: '',
    timeout: 0.01,
    visible: false
  });

  /**
   * Logs success message
   * @param title The title of the success
   * @param description The description of the success
   * @param timeout The display timeout of the toast
   */
  function logSuccess(title: string, description: string, timeout: number = 4000) {
    setToastOptions({
      type: ToastMessageType.Success,
      title: title,
      description: description,
      timeout: timeout,
      visible: true
    });
  }

  /**
   * Logs info message
   * @param title The title of the info
   * @param description The description of the info
   * @param timeout The display timeout of the toast
   */
  function logInfo(title: string, description: string, timeout: number = 4000) {
    setToastOptions({
      type: ToastMessageType.Info,
      title: title,
      description: description,
      timeout: timeout,
      visible: true
    });
  }

  /**
   * Logs warning message
   * @param title The title of the warning
   * @param description The description of the warning
   * @param timeout The display timeout of the toast
   */
  function logWarning(title: string, description: string, timeout: number = 4000) {
    setToastOptions({
      type: ToastMessageType.Warning,
      title: title,
      description: description,
      timeout: timeout,
      visible: true
    });
  }

  /**
   * Logs error message
   * @param title The title of the error
   * @param description The description of the error
   * @param timeout The display timeout of the toast
   */
  function logError(title: string, description: string, timeout: number = 4000) {
    setToastOptions({
      type: ToastMessageType.Error,
      title: title,
      description: description,
      timeout: timeout,
      visible: true
    });
  }

  function closeToast() {
    setToastOptions({
      type: ToastMessageType.None,
      title: '',
      description: '',
      timeout: 0.01,
      visible: false
    });
  }

  return <>
    <ToastContext.Provider value={{ toastOptions, logSuccess, logInfo, logWarning, logError, closeToast }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ToastContext.Provider>
  </>
}

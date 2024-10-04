import { createApp } from 'vue'

import Keycloak from 'keycloak-js'
import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'

// Styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'

const initOptions = {
  url: `${import.meta.env.VITE_KEYCLOAK_URL}`,
  realm: 'uinar',
  clientId: 'siserkom-admin',
}

const keycloak = Keycloak(initOptions)

keycloak
  .init({ onLoad: 'login-required' })
  .then(() => {
    if (keycloak.resourceAccess['siserkom-admin']) {
      localStorage.setItem(
        'userRole',
        keycloak.resourceAccess['siserkom-admin'].roles[0],
      )
    }
    else {
      keycloak.logout()
    }

    // Create vue app
    const app = createApp(App)

    // Register plugins
    registerPlugins(app)
    app.config.globalProperties.keycloak = keycloak
    // app.config.globalProperties.adminId = keycloak.tokenParsed.preferred_username
    app.provide('adminId', keycloak.tokenParsed.preferred_username)

    // Mount vue app
    app.mount('#app')
  })
  .catch(() => {
    console.log('Authenticated Failed')
  })

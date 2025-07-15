import { createApp } from 'vue'

import Keycloak from 'keycloak-js'
import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'

// Styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
})

keycloak
  .init({ onLoad: 'login-required' })
  .then(() => {
    if (keycloak.resourceAccess['siserkom-admin']?.roles[0]) {
      localStorage.setItem(
        'userRole',
        keycloak.resourceAccess['siserkom-admin']?.roles[0],
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
    app.provide('keycloak', keycloak)

    // Mount vue app
    app.mount('#app')

    setInterval(() => {
      keycloak
        .updateToken(70)
        .then(refreshed => {
          if (refreshed) {
            console.debug(`Token refreshed ${refreshed}`)
          }
          else {
            console.debug(
              `Token not refreshed, valid for ${
                Math.round(
                  keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000,
                )
              } seconds`,
            )
          }
        })
        .catch(() => {
          console.error('Failed to refresh token')
        })
    }, 60000)
  })
  .catch(() => {
    console.log('Authenticated Failed')
  })

import 'vuetify/styles'
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const light: ThemeDefinition = {
  dark: false,
  variables: {
    'border-color': '#f0f0f0',
    'carousel-control-size': 10,
    gradient: 'linear-gradient(250.38deg, #e6f4ff 2.39%, #69b1ff 34.42%, #1677ff 60.95%, #0958d9 84.83%, #002c8c 104.37%)',
    gradient2: 'linear-gradient(to right, rgb(9, 89, 218), rgb(22, 119, 255))',
    'card-shadow': '0px 1px 4px rgba(0, 0, 0, 0.08)',
    'medium-opacity': 0.85,
    'high-opacity': 1
  },
  colors: {
    primary: '#24388c ',
    secondary: '#48338b ',
    info: '#07699a ',
    success: '#0a7132 ',
    accent: '#b24c17 ',
    warning: '#c49f07 ',
    error: '#ab2b2b ',
    lightprimary: '#e6ebf8',
    lightsecondary: '#eceaf6',
    lightsuccess: '#dbf3e3',
    lightaccent: '#f7e3db',
    lighterror: '#f8e0e0',
    lightwarning: '#f9f2da',
    darkText: '#111827 ',
    lightText: '#6B7280 ',
    darkprimary: '#0958d9',
    darksecondary: '#7a7878',
    borderLight: '#e6ebf1',
    inputBorder: '#a1a1a5',
    containerBg: '#F1F5F9 ',
    surface: '#fff',
    'on-surface-variant': '#fff',
    facebook: '#4267b2',
    twitter: '#1da1f2',
    linkedin: '#0e76a8',
    gray100: '#f5f5f5',
    primary200: '#a1d2ff',
    secondary200: '#eeeeee'
  }
};

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
    }
  },
  defaults: {
    VBtn: {},
    VCard: {
      rounded: 'md'
    },
    VTextField: {
      rounded: 'lg',
      variant: 'outlined'
    },
    VSelect: {
      rounded: 'lg',
      variant: 'outlined'
    },
    VTextarea: {
      rounded: 'lg',
      variant: 'outlined'
    },
    VTooltip: {
      // set v-tooltip default location to top
      location: 'top'
    }
  }
});

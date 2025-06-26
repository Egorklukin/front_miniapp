import {
  createHashRouter
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = {
  HOME: 'home',
  PERSIK: 'persik',
  PROFILE: 'profile',
  PHASES: 'phases',
  CHAT: 'chat',
};
export const DEFAULT_MODALS = {
  MODAL_CARD_Moon:'moon',
  MODAL_CARD_Sun:'sun',
  MODALS: 'modals',
};
export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  PERSIK: 'persik',
  PROFILE: 'profile',
  PHASES: 'phases',
  ONEPAGE: 'onepage',
  TWOPAGE: 'twopage',
  THREEPAGE: 'threepage',
  FOURPAGE: 'fourpage',
  FIVEPAGE: 'fivepage',
  SIXPAGE:'sixpage',
  SEVENPAGE:'sevenpage',
  EIGHTPAGE:'eightpage',
  NINEPAGE:'ninepage',
  TENPAGE: 'tenpage',
  ELEVENPAGE: 'elevenpage',
  REPORT: 'report',
  FAQONE: 'faqone',
  FAQTWO: 'faqtwo',
  FAQTHREE: 'faqthree',
  FAQFOUR: 'faqfour',
  FAQFIVE: 'faqfive',
  CHAT: 'chat',
};
export const DEFAULT_TABS = {
  MOONTAB: 'moon',
  SUNTAB: 'sun',
};

export const router = createHashRouter([
  {
    path: '/',
    panel: DEFAULT_VIEW_PANELS.HOME,
    modal: DEFAULT_MODALS.MODAL_CARD_Moon,
    modal: DEFAULT_MODALS.MODAL_CARD_Sun,
    modal: DEFAULT_MODALS.MODALS,
    view: DEFAULT_VIEW.HOME,
  },
  {
    path: '/profile',
    panel: DEFAULT_VIEW_PANELS.PROFILE,
    view: DEFAULT_VIEW.PROFILE,
  },
  {
    path: '/profile/report',
    panel: DEFAULT_VIEW_PANELS.REPORT,
    view: DEFAULT_VIEW.PROFILE,
  },
  {
    path: '/phases',
    panel: DEFAULT_VIEW_PANELS.PHASES,
    view: DEFAULT_VIEW.PHASES,
  },
  {
    path: '/guide',
    panel: DEFAULT_VIEW_PANELS.PERSIK,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/chatassistant',
    panel: DEFAULT_VIEW_PANELS.CHAT,
    view: DEFAULT_VIEW.CHAT,
  },
  {
    path: '/guide/onepage',
    panel: DEFAULT_VIEW_PANELS.ONEPAGE,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/twopage',
    panel: DEFAULT_VIEW_PANELS.TWOPAGE,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/threepage',
    panel: DEFAULT_VIEW_PANELS.THREEPAGE,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/fourpage',
    panel: DEFAULT_VIEW_PANELS.FOURPAGE,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/fivepage',
    panel: DEFAULT_VIEW_PANELS.FIVEPAGE,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/sixpage',
    panel: DEFAULT_VIEW_PANELS.SIXPAGE,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/eightpage',
    panel: DEFAULT_VIEW_PANELS.EIGHTPAGE,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/ninepage',
    panel: DEFAULT_VIEW_PANELS.NINEPAGE,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/tenpage',
    panel: DEFAULT_VIEW_PANELS.TENPAGE,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/elevenpage',
    panel: DEFAULT_VIEW_PANELS.ELEVENPAGE,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/faqone',
    panel: DEFAULT_VIEW_PANELS.FAQONE,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/faqtwo',
    panel: DEFAULT_VIEW_PANELS.FAQTWO,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/faqthree',
    panel: DEFAULT_VIEW_PANELS.FAQTHREE,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/faqfour',
    panel: DEFAULT_VIEW_PANELS.FAQFOUR,
    view: DEFAULT_VIEW.PERSIK,
  },
  {
    path: '/guide/faqfive',
    panel: DEFAULT_VIEW_PANELS.FAQFIVE,
    view: DEFAULT_VIEW.PERSIK,
  },
]);

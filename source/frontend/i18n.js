const moment = require('moment');
const NextI18Next = require('next-i18next').default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
const path = require('path');

module.exports = new NextI18Next({
  otherLanguages: ['en', 'es'],
  ns: ['common', 'signup'],
  localeSubpaths,
  defaultNS: 'common',
  browserLanguageDetection: true,
  fallbackLng: 'en',
  fallbackNS: 'common',
  ignoreRoutes: ['/_next/', '/static/', '/public/', '/api/'],
  localeExtension: 'json',
  localeStructure: '{{lng}}/{{ns}}',
  localePath: path.resolve('./public/static/locales'),
  interpolation: {
    format: function (value, format, lng) {
      if (format === 'capitalize') return value.charAt(0).toUpperCase() + value.slice(1);
      if (value instanceof Date) return moment(value).format(format);
      return value;
    },
  },
});

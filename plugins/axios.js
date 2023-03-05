export default function ({$axios, store}) {
  $axios.onRequest(config => {
    config.headers.common['Locale'] = store.state?.i18n?.locale; // eslint-disable-line
  });

  $axios.onError(error => {
    console.log(error);
    return Promise.reject(error);
  });
}

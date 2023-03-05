module.exports = shipit => {
  shipit.initConfig({
    default: {
      // repositoryUrl: '',
    },
    prod: {
      branch: 'develop',
      deployTo: '/home/a/abysssscom',
      key: '/Users/Frank/.ssh/id_rsa',
      servers: 'abysssscom@77.222.40.139:22',

      ext: {
        buildMode: 'generate'
      }
    }
  });

  shipit.task('deploy', async () => {
    await shipit.copyToRemote(
      'dist',
      shipit.config.deployTo,
    );
    await shipit.remote(`
      cd ${shipit.config.deployTo}
      rm -rf ./public_html_previous_build
      mv public_html public_html_previous_build
      mv dist public_html
      cp public_html/200.html public_html/index.html
    `);
  });
};

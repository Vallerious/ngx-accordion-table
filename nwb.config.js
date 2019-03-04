module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'NgxAccordionTable',
      externals: {
        react: 'React'
      }
    }
  }
}

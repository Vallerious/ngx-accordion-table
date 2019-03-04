module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'RAccordionTable',
      externals: {
        react: 'React'
      }
    }
  }
}

export const homePageController = (request, response) => {
  response.render('index', {
    title: 'Pug 템플릿 테스트!',
    message: 'Welcome to the Pug Template!',
  })
}

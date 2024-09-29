export const getRootMessage = (req, res) => {
  res.send('🚀 API 서버 동작 중')
}

export const getErrorMessage = (req, res) => {
  res
    .status(400)
    .send({ status: 'error', message: '일반적인 예외가 발생했습니다.' })
}

export const getUnexpectedError = (req, res) => {
  try {
    JSON.parse('유효하지 않은 JSON입니다.')
  } catch (error) {
    res
      .status(500)
      .send({ status: 'error', message: '서버 오류가 발생했습니다.' })
  }
}

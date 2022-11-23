
const resultDict = {
  success: 'SUCCEED',
  login: 'LOGIN',
  fail: 'FAIL'
}

export const getMock = function({ data, status, code, msg, total }) {
  if (!status) {
    status = 'success'
  }
  const res = {
    result: resultDict[status],
    data: data,
    code: code,
    errorMessage: msg,
    totalCount: total
  }
  return {
    status: status,
    data: res
  }
}
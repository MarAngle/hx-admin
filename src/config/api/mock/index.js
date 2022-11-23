
const resultDict = {
  success: 'SUCCEED',
  login: 'LOGIN',
  fail: 'FAIL'
}

export const format = function({ $unFormat, data, status, code, msg, total }) {
  if ($unFormat) {
    return data
  }
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
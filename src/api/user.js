import request from '@/util/request'

export function login(user) {
  return request({
    url: `login`,
    method: 'post',
    data: {
      username: user.username,
      passwd: user.passwd
    }
  })
}


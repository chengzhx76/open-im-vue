const chatRouter = {
  path: '/chat',
  name: 'chat',
  component: () => import('@/views/chat'),
}



export const routers = [
  chatRouter
]
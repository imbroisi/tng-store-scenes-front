import { rest } from 'msw'

export const handlers = [
  rest.post('/msw/save-scene', (req, res, ctx) => {
    console.log('==>>', req.body, typeof req.body)

    return res(
      ctx.status(200)
    )
  }),

    // rest.get('/msw/testando', (req, res, ctx) => {
    //   console.log('--->> PEGUEI A REQUISIÇÃO');
    //     return res(
    //         ctx.status(200),
    //         ctx.json([
    //             {
    //                 userId: 1001,
    //                 id: 1001,
    //                 title: 'Mocked To Do 1001',
    //                 completed: true
    //             },
    //             {
    //                 userId: 1001,
    //                 id: 1002,
    //                 title: 'Mocked To Do 1002',
    //                 completed: false
    //             }
    //         ])
    //     )
    // }),
]

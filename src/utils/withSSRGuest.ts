import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

export function withSSRGuest(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx)

    if (cookies['fiopreto.token']) {
      return {
        redirect: {
          destination: '/perfil',
          permanent: false,
        },
      }
    }

    return await fn(ctx)
  }
}

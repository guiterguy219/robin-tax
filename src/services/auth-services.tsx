import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import { ROBINHOOD_TOKEN_COOKIE } from '../common/constants';

interface Props {
    children: React.ReactNode;
}

const Authenticate: React.FC<Props> = (props) => {
    const router = useRouter();

    useEffect(() => {
        setInterval(() => {
            if (!getCookie(ROBINHOOD_TOKEN_COOKIE)) {
                router.push('/login?session_expired=true');
            }
        }, 2000);
    }, []);

    return (
        <Fragment>
            { props.children }
        </Fragment>
    )
}

export const getCookie = (name: string, cookieString?: string): string | null | undefined => {
    const val = (cookieString || document?.cookie)?.match(
        '(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)'
    );
    return val ? val.pop() : null;
};

export const logout = () => {
    document.cookie = `${ROBINHOOD_TOKEN_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    window.location.reload();
}

export async function getAuthenticationServerSideProps(context: NextPageContext) {
    if (!getCookie('robinhoodToken', context.req?.headers.cookie)) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
    return { props: {} };
}  

export default Authenticate;
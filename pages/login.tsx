import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import { Credentials } from '../common/types';
import { NextPageContext } from 'next';
import axios from 'axios';

const Home: React.FC = () => {
    const [credentials, setCredentials] = useState<Credentials>();
    const [showMFAModal, setShowMFAModal] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(c => ({ ...c, [event.target.name]: event.target.value }));
    }

    const storeToken = (token: string, maxAge: number) => {
        if (token && maxAge) {
            // document.cookie = `robinhoodToken=${token}; max-age=${maxAge}; path=/`;
            console.debug('cookie to be stored', `robinhoodToken=${token}; max-age=${maxAge}; path=/`);
        }
    }

    const handleLogin = async (event?: React.FormEvent) => {
        event?.preventDefault();
        const loginRes = await axios.post('/api/login', credentials);
        if (loginRes.status === 200) {
            if (loginRes.data.access_token) {
                storeToken(loginRes.data.access_token, loginRes.data.expires_in);
            } else if (loginRes.data.mfa_required) {
                switch (loginRes.data.mfa_type) {
                    case 'app': {
                        setShowMFAModal(true);
                    }
                }
            }
        }
    }

    return (
        <Fragment>
            <Head>
                <title>Login | RobinTax</title>
            </Head>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" onChange={e => handleInputChange(e)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={e => handleInputChange(e)} />
                <button type="submit" onClick={e => handleLogin(e)}>Login</button>
            </form>
            { showMFAModal &&
                <div>
                    <form>
                        <label htmlFor="mfa_code">Enter MFA code:</label>
                        <input type="text" id="mfa_code" name="mfa_code" onChange={e => handleInputChange(e)} />
                        <button type="button" onClick={e => handleLogin(e)}>Submit</button>
                    </form>
                </div>
            }
        </Fragment>
    )
}

export default Home;

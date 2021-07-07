export const urls = {
    ROBINHOOD_LOGIN: 'https://api.robinhood.com/oauth2/token/',
    ROBINHOOD_USER: 'https://api.robinhood.com/user/',
    ROBINHOOD_ACCOUNTS: 'https://api.robinhood.com/accounts/',
    ROBINHOOD_PORTFOLIOS: (accountId: string) => `https://api.robinhood.com/portfolios/${accountId}`,
    ROBINHOOD_FORGOT_PASSWORD_LINK: 'https://robinhood.com/forgot_password',
    ROBINHOOD_CHALLENGE_RESPONSE: (challengeId: string) => `https://api.robinhood.com/challenge/${challengeId}/respond/`
}

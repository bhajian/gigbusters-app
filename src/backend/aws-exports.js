
const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_content_delivery_bucket": "fameorbitportal-20230201142504-hostingbucket-dev",
    "aws_content_delivery_bucket_region": "us-east-1",
    "aws_content_delivery_url": "https://d1j1495gocjvnj.cloudfront.net",
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-east-1:354dcde7-e500-44c3-b7ba-e30b1801934f',

        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: 'us-east-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_OL1w4ne45',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '59j60vfqh642vhqaql9kfen8hb',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
        // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
        signUpVerificationMethod: 'code', // 'code' | 'link'

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        //     // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: 'auth.dev2.fameorbit.com',
        //     // OPTIONAL - Cookie path
        //     path: '/',
        //     // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        //     // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
        //     sameSite: "none",
        //     // OPTIONAL - Cookie secure flag
        //     // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //     secure: true
        // },

        // OPTIONAL - customized storage object
        // storage: MyStorage,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        // authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

        // OPTIONAL - Hosted UI configuration
        // oauth: {
        //     domain: 'auth.dev2.fameorbit.com',
        //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        //     redirectSignIn: 'https://example.com/',
        //     redirectSignOut: 'http://example:3000/logout/',
        //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        // }
    }
};


export default awsmobile;

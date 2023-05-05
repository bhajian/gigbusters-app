import {Auth} from "aws-amplify";

const awsmobile = {

    "aws_appsync_graphqlEndpoint": "https://keiak4c5vvgxraldm24md3mklq.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",

    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-east-1:5be7a2cd-2d01-4af0-bc35-9ca58fab26da',

        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: 'us-east-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_CzI0ql6Mi',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '1ssolv5otr9st30m8qkuqgmdb5',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
        // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
        signUpVerificationMethod: 'code', // 'code' | 'link'

        // OPTIONAL - customized storage object
        // storage: MyStorage,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

        // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: 'auth.dev.gigbusters.app',
            scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: 'gigb://',
            redirectSignOut: 'gigb://signout',
            responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    },
    API: {
        endpoints: [
            {
                name: "GigbusterApi",
                endpoint: "https://api.dev.gigbusters.app",
                custom_header: async () => {
                    return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
                }
            }
        ]
    },
    Storage: {
        AWSS3: {
            bucket: '',
            region: 'us-east-1',
            identityPoolId: 'us-east-1:5be7a2cd-2d01-4af0-bc35-9ca58fab26da'
        }
    }
};


export default awsmobile;

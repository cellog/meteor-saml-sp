

// Service Provider(SP), having a certificate is not mandatory. However, some IDPs may require.
//If you enable a certificate for your Service Provider, it may be able to sign requests and response sent to the Identity Provider,
//as well as receiving encrypted responses.
// A SAML entity uses public key cryptography to secure the data transmitted to trusted partners.
// Public keys are published in the form of X.509 certificates in metadata whereas the corresponding private keys are held securely by the entity.
// These keys are used for message-level signing and encryption, and to create secure back channels for transporting SAML messages over TLS.
// They are not used for browser-facing TLS transactions on port 443. See the Key Usage topic for more information.
//
// <md:KeyDescriptor use="signing">
// <md:KeyDescriptor use="encryption">
// <md:KeyDescriptor>
// A type 1 key is used for both signing and TLS. That is, the key is used to provide authenticity and integrity but not necessarily confidentiality.
// A type 2 key is used for encryption only, that is, the key is used to provide confidentiality.
// Since the use XML attribute is missing on a type 3 key descriptor, such a key may be used for all of the above, that is, for signing, TLS, and encryption.
//
// SP supports SAML V2.0, there MUST be at least one encryption key in metadata at all times; that is, there MUST be at least one <md:KeyDescriptor> element with no use XML attribute in Federation metadata.

saml = {
  // this is the setting for the meteor application which acts as a Service Provider.
  serviceProvider : {
    // Service Provider's entityId
    issuer : Meteor.absoluteUrl("_samlsp"),
    // This is the AssertionConsumerService end point of this Service Provider.
    callbackUrl : Meteor.absoluteUrl("_samlsp/validate"),
    // SingleLogoutService
    logoutCallbackUrl : Meteor.absoluteUrl("_samlsp/logout"),
    // The format of the NameID we request from the IdP.
    // Following is the default if you don't specify anything, better that you know what you are requesting the IDP
    identifierFormat : "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
    validateInResponseTo : true,
    host : process.env.ROOT_URL,
    // sha1 or sha256
    signatureAlgorithm : "sha256",
    path : "_saml/sp/validate",
    // openssl req -newkey rsa:2048 -new -x509 -days 3652 -nodes -out saml.crt -keyout saml.pem
    // contents of the pem file without the top and bottom text
    decryptionPvk: "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwz4B7CLpggSgq RdeeluekNc0/EbngULArlhZO3wPzoeSdxJ20iKNY7hGdyffsMc7EwolK8m1W7Ysp 5eAsN/t9OvCVlm85us7BNSuEOn7gLD4Z7oM0kgJxwc8S+109BZ1VBRDCvMTP7lML 7uN8UWTUJlppUAf/6QFDd7XNRTZE84tBd9mwycbCPGYLiD8PccjSXGlWPJLbtsdG dc8FAM+8Ybt/b6A2D8RQx3rRYGlz2Es3M70SnQhwBgX7C6Iv6bRWf7solpla5/va ZfKnCOO7BbMg0zg8sOS/9e/3WTRVTMhf3mrlLy/eXW9AV1vm+83+WZShMp23YvBY GluVjLezAgMBAAECggEANbAMV0+jKEKPq6Zhfqpb1CTyGcCMLGzT0ahVRcW6MXRr MuzM5lDHKO3BM6RsP7AwFNbtUXCjes3Of/5pP4QQPUp0Wze+tkzfExPODuykMfW9 NaqS9JeRXnF3K1BgU3Ms/u/20ur26Bx54xm6wbkFYNX0hh3jD/X0iEQFVDs761t3 A7H8odlgIibzpi4obXX+swasPbXgXOA4oBrCMVlFEXOa5yXCr3HES/Io74Q8LYSR V1dbFmrjdsnopjqsTSppYNrxh8HrYQY7pxi7YCHKvyAEvBEdaj21W7KE3vSRG/6l LEpBvUptEynZyvSkQ524/9pUNAPmnhkOChQWeVOHwQKBgQDfrUvTWfau5D5NP8k7 3x+knagzwScGU4mSsFzYnO9mY0FidPXBSY2++mrhkJ1QXPU6U21/80KSd3zo0RaL tcLMgsSpAmiwEUJZCf70uIf8I+hsje+kQiHSBPJQRzFfF0StB9BM/Oq36spg1+DL DxxIKWdnZRZAiI541lp7c9/JKQKBgQDKXG5MKzblFbuKFxuaHi0+lx/Ds9QRkKjW hKlSdlQe2r0VB8qvxgMUPOkDpSPkocK2yglpJag9cvx9Bux2PcH3EV9X4/X9AmjO BWX7gIY4G/EGMxpplhL2neQSukYxI0brz6YyzgWpBXGl8HwiGpZyDUzlKhly0huu k8idu8OpewKBgF9ZP0aERhz9nPVPKJhGH/YLYuVVBC61M6L9XUbVd1P9IaU32H8h vLPZifBHtlfImJzZbYcqiolnOC8C2oqJ29VUNUMajMfpQ5AzK6TkeMtp/y0vQCWU L1iY1TaVcp1njNX5y7jV47Ss+MJZpDDLazHzvGmd9ONjkuA99+pCVfYpAoGBAKzD EstmjXww/KZdKgx+vOPVw6Gh0miYlvxlz+T97r1Uw97DgzBjnddWVRzujOExlPnX LQeexa6Ij7TyB0i/Wuxi4YI4tZcmynExPKrmRDB88l33nRINtOzlSYUPkMN8uZyy 79Ip/70YT7l6wY+gIVcHseFn+sgDRuzZcInxdo8nAoGAd2TbOMWZuhQOj5UrWH63 kYEb69lHbCMSwaLxGxppbzJD9lSY+EDdPQzkaPAV2KbOuAYToV48+RaE17VbyiYR 4FiFAbYKIStuYojSL330QI1xH065MWtfuqCxpB9Vlu0AHpfxLO5bl9h0Ljjmo2P/ gpodugVVkxclPL/IhMz71nk=",
    decryptionCert: "MIIDezCCAmOgAwIBAgIJAKyDizz1lDefMA0GCSqGSIb3DQEBCwUAMFQxCzAJBgNV BAYTAlVLMQ8wDQYDVQQIDAZMb25kb24xDzANBgNVBAcMBkxvbmRvbjENMAsGA1UE CgwEVGVzdDEUMBIGA1UEAwwLc3AudGVzdC5jb20wHhcNMTUxMjI5MDg0NzUyWhcN MjUxMjI4MDg0NzUyWjBUMQswCQYDVQQGEwJVSzEPMA0GA1UECAwGTG9uZG9uMQ8w DQYDVQQHDAZMb25kb24xDTALBgNVBAoMBFRlc3QxFDASBgNVBAMMC3NwLnRlc3Qu Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsM+Aewi6YIEoKkXX npbnpDXNPxG54FCwK5YWTt8D86HkncSdtIijWO4Rncn37DHOxMKJSvJtVu2LKeXg LDf7fTrwlZZvObrOwTUrhDp+4Cw+Ge6DNJICccHPEvtdPQWdVQUQwrzEz+5TC+7j fFFk1CZaaVAH/+kBQ3e1zUU2RPOLQXfZsMnGwjxmC4g/D3HI0lxpVjyS27bHRnXP BQDPvGG7f2+gNg/EUMd60WBpc9hLNzO9Ep0IcAYF+wuiL+m0Vn+7KJaZWuf72mXy pwjjuwWzINM4PLDkv/Xv91k0VUzIX95q5S8v3l1vQFdb5vvN/lmUoTKdt2LwWBpb lYy3swIDAQABo1AwTjAdBgNVHQ4EFgQUdpYi4E+J1Y6TTN2kY7+d7ID6sg0wHwYD VR0jBBgwFoAUdpYi4E+J1Y6TTN2kY7+d7ID6sg0wDAYDVR0TBAUwAwEB/zANBgkq hkiG9w0BAQsFAAOCAQEABCxIQWT3P+wdJnyYUW47+eL91sP7/VohWByg46yZXLUJ PHJDu4qE0gxXA57+OyR3xefBJz6fPGWppHI3TckIE2IKH07yyGpBvTxa5+mbZRD9 sXVMdLwUoF/jHpTnBVOI7SVlJqlVjZX3pZ0FueezZiUlvmYI7ebZh+LDyJGwZ8Rh 3cZDILyUdz71gBv5BLTbo7uQv6IWMJO72G8xr368ANM1g3KEBdClIZTA8aaf7WU4 da/PYgPme6ayWbCKVxnhQxnHoshBLJGscbRY+0pJb30sClXQ0tNChNETEwh+5XXe x4g+P5ttj+I1tny33v4er0DLNH6CzRKQLrKZ+qDV6g=="
  },
  identityProviders : [{
    name: "default",
    entityId : "http://idp.acme.com:8080/saml/saml2/idp/metadata.php",
    // SingleSignOnService of the IdentityProvider.
    entryPoint : "http://idp.acme.com:8080/saml/saml2/idp/SSOService.php",
    // SingleLogoutService of the IdentityProvider
    logoutUrl : "http://idp.acme.com:8080/saml/saml2/idp/SingleLogoutService.php",
    cert : "MIIDgTCCAmmgAwIBAgIJAK3j1F2fBSk2MA0GCSqGSIb3DQEBCwUAMFcxCzAJBgNVBAYTAlVLMQ4wDAYDVQQIDAVIZXJ0czESMBAGA1UEBwwJU3RldmVuYWdlMQ0wCwYDVQQKDARBQ01FMRUwEwYDVQQDDAxpZHAuYWNtZS5jb20wHhcNMTUxMjI5MDkxMjAzWhcNMjUxMjI4MDkxMjAzWjBXMQswCQYDVQQGEwJVSzEOMAwGA1UECAwFSGVydHMxEjAQBgNVBAcMCVN0ZXZlbmFnZTENMAsGA1UECgwEQUNNRTEVMBMGA1UEAwwMaWRwLmFjbWUuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu06kqzHCqTBaevUzmDsKYhAWFNOxkQfVu3B4bmvdbysFYW92lvc8qVuIxewX9bj3ERPKHO8ayDWQDBqxWlUUslqUGa9wQqogbTdWGwNj1onUImEyk5Cyg7jESPPk2ioaoef6RTgIX8Y5jR0l+gTEZsZAYSigH3hzH+ZneAj2ZnqcnrQFLhgudFjhcmuzhXM9W/R+dv+TZR9l7PJRXyHYM6K5WcN6F/7ubaLjPGIZXSx3D0nXXYCl9XSvkUjWkPlJK9QgNJtmsD/zt0a59kanXY2FPZT23KaOGM7riiRJsn5ULayKYNy8WowBHmQrvxyYdpJcECosgnnrd/957OwMIQIDAQABo1AwTjAdBgNVHQ4EFgQU1VjD7zigW/yn06I4cq3n4h4K7GEwHwYDVR0jBBgwFoAU1VjD7zigW/yn06I4cq3n4h4K7GEwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAHx8iwlwRQdure1huqmi8/BvtdyyAAZpeOyF0AHBSaXM04rg+UW7x0NyjZ2vCRd4UP0OfNBjk/kzG11dX2Xdj0ISjLCA6OVw0lsNpN1i3+rv7zs0YFZEKg0dGt4Fcj5yrTrMwtIx0HH0OACH1gx2WGjQYwLG9hgtKTOx+tTlUwsEvftIOkU7UfQC+k9+3khpOcXDkRFYziN5PkthZwr0NpucwJCgXhDPitAoQeDMOE+Pc5FwrPccOQBSnV1Xt4tMqOi7CxsVqnURQtqAMZiohUqnIhjgR+0Qgi2m+MU0QSRnlkGvEbgHT0+uUIpQblgPpSeSTWY9jtSQbEV1GnbvsFQ=="
  }]
}

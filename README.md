# Tech Stack. - Prisma - Nodejs - Swagger - Express - Otp generator - Africas Talking - Cloudinary

API URL = `/api`
AUTH_HEADERS = `token`

## Profile Service

_GET_ `profile/user`

- user/ facility profile

```
{
    [profile]
}
```

_POST_ `profile/user`

- user profile

Request Body

```
{
    "name": "<input>",
    "avatar": "<input>"
    "streetName": "<input>",
    "streetNumber": "<input>"
    "city": "<input>",
    "country": "<input>"
}
```

_POST_ `profile/update`

- update profile

```
{
    name: "<input>",
    dateOfBirth: "<input>",
    bloodType: "<input>",
    avatar: "<input>" ,
    email: "<input>",
    streetName: "<input>",
    city: "<input>",
    country: "<input>",
    streetNumber: "<input>",
  }
```

_POST_ `profile/facility`

- update facility profile

```
{
    name: "<input>",
    mission "<input>",
    streetName "<input>",
    streetNumber "<input>",
    license "<input>",
    city "<input>",
    country "<input>",
    licenseNumber "<input>",
  }
```

Request Body

```
{
    "name": "<input>",
    "avatar": "<input>"
    "streetName": "<input>",
    "streetNumber": "<input>"
    "city": "<input>",
    "country": "<input>"
}
```

## BroadCast Service.

## Address Service.

## Authentication Service.

_POST_ `auth/login`

- Facility Login

Request Body

```
{
    "email": "<input>",
    "password": "<input>"
}
```

_POST_ `auth/signup`

- Facility Signup
  Request Body

```
{
    "name": "<input>",
    "email": "<input>,
    "password": "<input>",
}
```

_POST_ `auth/mobile-login`

- Donor Login
  Request Body

```
{
    "phone": "input>",
    "password": "<input>"
}
```

_POST_ `auth/mobile-signup`

- Donor Signup
  Request Body

```
{
    "phone": "input>",
    "password": "<input>"
}
```

_POST_ `auth/verify`

- Facility Email Verification.
  Request Body

```
{
    "otp": "<input>"
}
```

_POST_ `auth/verify`

- Facility Email Verification.
  Request Body

```
{
    "otp": "<input>"
}
```

_POST_ `auth/mobile-verify`

- Donor Phone Verification.
  Request Body

```
{
    "otp": "<input>"
}
```

_POST_ `auth/update-password`

- Password Update.
  Request Body

```
{
    "password": "<input>"
}
```

_POST_ `auth/create-user`

- Donor Phone Verification.
  Request Body

```
{
    "email": "<input>",
    "password": "<input>"
}
```

## Donation Service.

_GET_ `donation/feed/`

- Planned donation feed.

Response - 200

```
{
    [feeds]
}
```

_POST_ `donation/schedule`

- shedule donation

Request Body

```
{
    "when": "<input>",
    "venue": "<input>",
    "description": "<input>"
}

```

_POST_ `donation/centres`

- Search and find donation centres.

```
{
    "query": "<input>"
}
```

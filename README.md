# Karrio Dashboard

![Karrio Dashboard](screenshots/dashboard.png)
<img referrerpolicy="no-referrer-when-downgrade" src="https://static.scarf.sh/a.png?x-pxid=b8c7c533-f1eb-4615-b966-79a90307e6b4" />

[![karrio-dashboard](https://github.com/karrioapi/karrio-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/karrioapi/karrio-dashboard/actions/workflows/ci.yml)

Karrio Dashboard is a browser-based logistics and shipping app for [karrio](https://github.com/karrioapi/karrio).

## Getting Started

### Using a Karrio Dashboard Release

If you just want to try Karrio out, check out the [karrio/dashboard](https://hub.docker.com/repository/docker/karrio/dashboard) Docker Image to give it a whirl.

Or launch the demo for free on vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkarrioapi%2Fkarrio-dashboard&env=NEXT_PUBLIC_KARRIO_API_URL,JWT_SECRET,NEXTAUTH_URL&envDescription=NEXT_PUBLIC_KARRIO_API_URL%20should%20be%20the%20link%20to%20your%20karrrio%20server%20instance%20and%20NEXTAUTH_URL%20the%20link%20to%20your%20vercel%20deployed%20URL&envLink=https%3A%2F%2Fgithub.com%2Fkarrioapi%2Fkarrio-dashboard%23configuration)

### Building and Running Karrio Dashboard

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites

- Node.js v14+
- A running instance of [karrio server](https://github.com/karrioapi/karrio).

#### Installing

Clone the repository

```terminal
git clone https://github.com/karrioapi/karrio-dashboard.git

cd karrio-dashboard

npm install
```

#### Configuration

Use the following environment variables to configure the dashboard:

- `NEXT_PUBLIC_KARRIO_API_URL` (**required**) - URL of a running instance of karrio server. If you are running karrio-server locally with the default settings, set `NEXT_PUBLIC_KARRIO_API_URL` to: `http://localhost:5002`.

- `JWT_SECRET` (**required**) - A secret to use for JWT key generation - you should set this explicitly.

- `NEXTAUTH_URL` (**required**) - The URL of your dashboard to restrict the authentication host to your instance. If you are running the dashboard locally, set `NEXTAUTH_URL` to: `http://localhost:3000`.

#### Development

Start the development server

```bash
npm run dev
```

Karrio Dashboard should now be running at [http://localhost:3000](http://localhost:3000).

#### Production

Build the application bundle

```bash
npm run build
```

## Resources

- [**Documentation**](https://docs.karrio.io)
- [**Github Community**](https://github.com/karrioapi/karrio/discussions)
- [**Issue Tracker**](https://github.com/karrioapi/karrio-dashboard/issues)
- [**Blog**](https://docs.karrio.io/blog)

> [Join us on Discord](https://discord.gg/gS88uE7sEx)

## License

This project is licensed under the terms of the `Apache 2` license.

See the [LICENSE file](/LICENSE) for license rights and limitations.

Any other questions, mail us at hello@karrio.io We’d love to meet you!

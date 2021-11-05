# Purplship Dashboard

<picture><img alt="Purplship Dashboard" src="./screenshots/dashboard.png" /></picture>

[![puprlship-dashboard](https://github.com/purplship/purplship-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/purplship/purplship-dashboard/actions/workflows/ci.yml)

Purplship Dashboard is a browser-based logistics and shipping orchestration dashboard for [purplship](https://github.com/purplship/purplship).

## Getting Started

### Using a Purplship Dashboard Release

If you just want to try Purplship out, check out the our [purplship/dashboard Docker Image](https://hub.docker.com/repository/docker/purplship/dashboard) to give it a whirl.

### Building and Running Purplship Dashboard

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites

- Node.js v14+
- A running instance of [purplship server](https://github.com/purplship/purplship).

#### Installing

Clone the repository

```terminal
git clone https://github.com/purplship/purplship-dashboard.git

cd purplship-dashboard

npm install
```

#### Configuration

Use the following environment variables to configure the dashboard:

- `NEXT_PUBLIC_PURPLSHIP_API_URL` (**required**) - URL of a running instance of purplship-server. If you are running purplship-server locally with the default settings, set `NEXT_PUBLIC_PURPLSHIP_API_URL` to: `http://localhost:5002`.

- `JWT_SECRET` - A secret to use for JWT key generation - you should set this explicitly.

#### Development

Start the development server

```bash
npm run dev
```

Purplship Dashboard should now be running at [http://localhost:3000](http://localhost:3000).

#### Production

Build the application bundle

```bash
npm run build
```

## Resources

- [**Documentation**](https://next.purplship.com/docs)
- [**Github Community**](https://github.com/purplship/purplship/discussions)
- [**Issue Tracker**](https://github.com/purplship/purplship-dashboard/issues)
- [**Blog**](https://next.purplship.com/blog)

> [Join us on Discord](https://discord.gg/gS88uE7sEx)

## License

This project is licensed under the terms of the `Apache 2` license.

See the [LICENSE file](/LICENSE) for license rights and limitations.

Any other questions, mail us at hello@purplship.com We’d love to meet you!

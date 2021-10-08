# purplship-dashboar

<img src="https://github.com/purplship/purplship-server/raw/main/artifacts/shipping-dashboard.jpeg"/>

[![puprlship-dashboard](https://github.com/purplship/purplship-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/purplship/purplship-dashboard/actions/workflows/ci.yml)

A Next.js dashboard for [purplship-server](https://github.com/purplship/purplship-server)

## Deployment

### `Docker`

Use our Docker image [purplship/dashboard](https://hub.docker.com/repository/docker/purplship/dashboard)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js v14+
- A running instance of [purplship-server](https://github.com/purplship/purplship-server).

### Installing

Clone the repository

```terminal
git clone https://github.com/purplship/purplship-dashboard.git

cd purplship-dashboard

npm install
```

### Configuration

Use the following environment variables to configure the dashboard:

- `NEXT_PUBLIC_PURPLSHIP_API_URL` (**required**) - URL of a running instance of purplship-server. If you are running purplship-server locally with the default settings, set `NEXT_PUBLIC_PURPLSHIP_API_URL` to: `http://localhost:5002`.

- `JWT_SECRET` - A secret to use for JWT key generation - you should set this explicitly.

### Development

Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production

Build the application bundle

```bash
npm run build
```


## Resources

- **Documentation** - Learn more at [docs.purplship.com](https://docs.purplship.com)
- **Community** - Feature requests, general questions on [Discord](https://discord.gg/kXEa3UMRHd)
- **Bug Tracker** - [File bugs](https://github.com/purplship/purplship-server/issues)
- **Blog** - Get the latest updates from the [purplship blog](https://blog.purplship.com).
- **Twitter** - Follow [purplship](https://twitter.com/purplship).


## License

This project is licensed under the terms of the `Apache 2` license.

See the [LICENSE file](/LICENSE) for license rights and limitations.

Any other questions, mail us at hello@purplship.com We’d love to meet you!

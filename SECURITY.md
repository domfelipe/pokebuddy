# Security Policy

PokeBuddy CLI is local-first and stores user state at:

```text
~/.pokebuddy/state.json
```

It does not require network access, accounts or telemetry.

## Supported versions

| Version | Supported |
|---|---|
| 0.x | Yes |

## Reporting a vulnerability

Please report security issues privately when possible. If a private channel is not yet listed, open a minimal GitHub issue requesting security contact without publishing exploit details.

## Security principles

- No telemetry by default.
- No hidden network calls.
- No shell command execution from companion data.
- Companion plugins must be explicit and user-installed.
- Local state should remain human-readable.

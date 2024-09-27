# The Name?

**pici** is the pronunciation of **pg** in Turkish.

# Why?

Because:

- I hate using credentials in the command line interface (CLI)
- I dislike having to remember to use psql instead of pg_restore for pgdump outputs
- I want to have a clear separation between source and target databases

# Installation

Just clone the repo and run commands below

```bash
npm install
npm run build
npm link
```

# Usage

After installation, you can use pici in any directory that contains a `.env` file with values similar to those in the [.env.example](.env.example) file.

You can get a list of commands by running:

```bash
pici --help
```

## Example

```bash
pici dump --source <source_db>
```

## Advanced Usage

- Use an encrypted volume
- Place an `.env` file your encrypted volume
- Place a a symbolic link to this file in your working directory
- Mount the encrypted volume when you need

# Gitless

A simple implementation of Git in TypeScript.

## Learning resources

- [What's inside .git directory](https://gitready.com/advanced/2009/03/23/whats-inside-your-git-directory.html)
- [oclif](https://www.joshcanhelp.com/oclif/)

## Features to implement

- [x] init
- [ ] add
- [ ] rm
- [ ] commit
- [ ] branch
- [ ] checkout
- [ ] diff
- [ ] remote
- [ ] fetch
- [ ] merge
- [ ] pull
- [ ] push
- [ ] status
- [ ] clone

## What I learned during this project?

### The `.git` directory

At a bare minimum, a `.git` repository should contain the following files and dirs:

```md
- .git
    - objects/
    - refs/
    - HEAD
    - config
```

### Read a blob object

Blobs are used to store file data. Blobs only store the contents of a file,
not its name or permissions. All Git objects are identifiable by a 40-character
SHA-1 hash, also known asthe "object hash". Example of an object hash: `e88f7a929cd70b0274c4ea33b209c97fa845fdbc`
Each Git Blob is stored inside the `.git/objects` directory.

#### THe `cat-file` command

This command shows the type of an object, it's size and it's content.
Example usage:

```bash
$ git cat-file -p <blob_sha>
hello world # This is the contents of the blob
```

Todo:

- [x] Read the contents of the blob object file from the `.git/objects` directory
- [x] Decompress the contents using Zlib
- [x] Extract the actual "content" from the decompressed data
- [x] Print the content to stdout

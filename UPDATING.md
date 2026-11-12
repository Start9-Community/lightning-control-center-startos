# Updating the upstream version

Lightning Control Center ships as the upstream Docker image `sparkielabs/lightning-control-center`, pinned in `startos/manifest/index.ts` (`images.lcc.source.dockerTag`) as `<tag>@sha256:<digest>`. The digest is what is pulled; the tag is a label.

## Determining the upstream version

Upstream publishes its image to Docker Hub. List the tags, newest first, with their digests and architectures:

```
curl -fsSL 'https://hub.docker.com/v2/repositories/sparkielabs/lightning-control-center/tags?page_size=20&ordering=last_updated' \
  | jq -r '.results[] | "\(.name) \(.digest) \([.images[].architecture] | join(","))"'
```

Use a tag that publishes both `amd64` and `arm64`. GitHub releases (`gh release view -R lioranecho-cpu/lightning-control-center --json tagName -q .tagName`) are not kept in step with the image.

## Applying the bump

- Set `images.lcc.source.dockerTag` to `sparkielabs/lightning-control-center:<tag>@sha256:<digest>`.
- Set the upstream part of `version` in `startos/versions/current.ts` to the new upstream version and reset the downstream revision to `:0`.
- Read the diff of `lcc_api.py` between the two images for new environment variables, new files under `LCC_DATA_DIR`, and changes to login, since the package manages the password through `LCC_PASSWORD`.

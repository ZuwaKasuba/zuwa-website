# Zuwa Investments Limited, website

The site at https://zuwainvestments.com. Eleventy builds it, Cloudflare serves it,
and Patience edits it at https://zuwainvestments.com/admin.

## How a change reaches the website

1. Someone edits a page at `/admin` and presses Save.
2. The editor commits the change to this repository.
3. Cloudflare sees the commit, runs `npm run build`, and deploys `_site`.

A change is live in about a minute. Nobody needs to touch HTML.

## What is editable

| In the editor | File it writes |
| --- | --- |
| Company details | `src/content/settings/company.yml` |
| Pages, 11 of them | `src/content/pages/*.yml` |
| Projects | `src/content/projects/*.md` |
| Team | `src/content/team/*.md` |
| Vacancies | `src/content/careers/*.md` |
| Photographs | `assets/img/` |

Company details appear in the footer of every page. Each page file holds that page's
browser tab title, its search description, the heading at the top, the sentence under
it and the background photograph.

Projects, Team and Vacancies are lists. Each section stays hidden while its list is
empty and appears by itself once there is an entry, so nothing half finished is ever
public. Switching a vacancy to closed removes it from the site without deleting it.

Everything else, the body of each page, is in the templates under `src/`.

## Layout

    src/*.njk                 one template per page
    src/_includes/layout.njk  the header, footer and head of every page
    src/_data/                reads the content files above
    src/content/              everything the editor writes
    assets/                   stylesheet, script, photographs, logos
    static/                   copied to the site root untouched
      admin/                  the editor
      book.html               the booking tool
    _site/                    the built site. Not in the repository.

## Running it locally

    npm install
    npm start        # http://localhost:8080
    npm run build    # writes _site

## Deploying by hand

Cloudflare deploys on every commit, so this is only for a fallback.

    npm run deploy

It builds and pushes `_site` to the `1stdeploy2026` Worker, which is what
zuwainvestments.com points at. Do not rename that Worker.

## The editor's sign in

`/admin` signs in through GitHub. That runs through a small Cloudflare Worker called
`sveltia-cms-auth`, which holds the GitHub client ID and secret. Its address is the
`base_url` at the top of `static/admin/config.yml`. Anyone who should be able to edit
the site needs a GitHub account with write access to this repository.

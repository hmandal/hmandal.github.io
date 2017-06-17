---
layout: post
title: (Draft) Issues faced while installing Jekyll locally on windows
excerpt:
         <pre><code class="C#">No GitHub API authentication could be found. Some fields may be missing or have incorrect data.</code></pre>
tags: [jekyll, short reading, windows, local-install, issue, technical]
date: 2017-06-17
published: true
---

## Issue

The `jekyll serve -watch` builds your site as soon as it detects a change in one of the files. You may get an error stating
```batchfile
GitHub Metadata: No GitHub API authentication could be found. Some fields may be missing or have incorrect data.
```

<!--more-->

## Solution

Add
```yaml
github: [metadata]
```
to `_config.yml`

[Reference: https://github.com/github/pages-gem/issues/399](https://github.com/github/pages-gem/issues/399)
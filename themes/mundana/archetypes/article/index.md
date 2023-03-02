---
title: "{{ replace .Name "-" " " | title }}" ## Means name of the article is filename
date: {{ .Date }}
author: ["ath"]
summary:
categories: ["{{.CurrentSection.Params.category}}"]
tags: []
keywords: []
draft: true
hasVideo: false

---

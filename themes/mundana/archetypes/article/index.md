---
title: "{{ replace .Name "-" " " | title }}" ## Means name of the article is filename
date: {{ .Date }}
author: ["theMundane"]
summary:
categories: ["{{.CurrentSection.Params.category}}"]
tags: []
keywords: []
draft: true
hasVideo: false


---

---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
publishdate: {{ .Date }}
summary:
categories:
tags: []
keywords:
image:
draft: true

slug: {{ .File.BaseFileName }} # Will take the filename as the slug. Feel free to change this to any format you like.  I like including this, so that I remind myself I have the option to change if I want.





---

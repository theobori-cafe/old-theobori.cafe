---
title: Linux environment workflow
description: A reproducible environment based on i3 and rofi.
updatedAt: "2023-02-20"
categories: [
  "Linux",
  "i3wm",
  "X",
  "Ansible"
]
author: "Théo Bori"
---

# Introduction

I've been using only Linux for years now, I've almost always used GNOME and even i3 but without any real configuration effort. Now I have a working environment that I find very practical and that allows me to be fast and more comfortable.

# Overview

<p align="center" width="100%">
  <img src="/workflow.png">
</p>

# Theme: `Dracula`

<p align="center" width="100%">
  <img src="/dracula_logo.png">
</p>

I have used the Dracula theme for almost every applications.

# Environment

I won't list every single software I use, but only my most frequently used and important ones (modern Rust apps, suckless, etc..).

**`i3`**: As window manager, minimalist, pretty useful and suckless

**`i3blocks`**: Status bar, customed with some Luke Smith scripts + mine

**`rofi`**: Application launcher as a dmenu replacement

**`rofimoji`**: Emoji manager / character picker

**`wezterm`**: GPU-accelerated cross-platform terminal emulator and multiplexer, implemented in Rust

**`tmux`**: Terminal multiplexer

**`fish`**: Unix shell

**`oh-my-fish`** plugins:
  - `bobthefish`
  - `peco`
  - `bang-bang`
  - `fish_logo`

**`nix`**: Cross platform packager manager

**`feh`**: Image viewer, used to set the wallpaper

**`flameshot`**: Screenshot software

**`slock`**: Suckless screen locker

# Easy to install

I have made an automatic installation with Ansible for a faster, easier and more customizable environment setup.

The Nix installation assumes that SELinux is disabled, because Nix has made its own security system.

<p align="center" width="100%">
  <img src="/nix_security.png">
</p>

*Source: [Repository](https://github.com/theobori/self-config)*

# Conclusion

Creating your own environment can be time consuming but in the end you will save time and it is much more comfortable.
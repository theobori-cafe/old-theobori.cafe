---
title: CHIP-8 emulator
description: A CHIP-8 emulator that is able to support multiple API(s) and interpreter(s) implementations, it also supports some quirks for load and shift instructions. Adjustable clock speed from 500hz to 2000hz.
updatedAt: "2023-03-08"
categories: [
  "Rust",
  "Emulator",
]
author: "Théo Bori"
---

# ~

I wanted to learn the basics of emulator development and emulation in general. So I decided to make a chip8 emulator.
In fact it's a misuse of language to say that it's an "emulator" because chip8 is a language, so we should rather say "interpreter".

# How does it works ?

So, basically there are three main components that make it works. The **CPU**, the **API** and the **Core** (kernel).

The API polls the keyboard inputs and send them to the CPU that put them in the right memory location.
The CPU fetch, decode and execute an instruction from a **ROM** (program or game), it can change the VRAM and the CPU registers, etc ..
Depending of the CPU state, the window draw the VRAM throught the API.

There are approximately ~n instructions executed per second for a frequency of n hz (n is 500 by default).
And the sound and delay timers are managed with 60hz.

# Screenshots


<p align="center" width="100%">
  <img src="/breakout_320_160.png">
  <img src="/space_invaders_320_160.png">
</p>

<p align="center" width="100%">
  <img src="/ibm_logo_640_320.png" width="640px" height="320px">
</p>

### CPU

Almost everything is managed by the CPU, RAM, VRAM, pressed hotkeys (keyboard inputs), the sound, etc...

### API

It manages the graphical window and the sound and fills the CPU with the keyboard inputs.

### Core

The core makes the links between this two components.

# Some extra informations

As I said, it supports some quirks for specific instructions, because according to some old documents,`fx55`, `fx65`, `8xy6` and `8xye` dont have the same semantic depending of the machine they were implemeneted on.

I implemented the 36 instructions + the 4 I was taking before to be compatible with more ROM.

# Try

[*Source*](https://github.com/theobori/tinychip)
